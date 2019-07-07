import React from 'react';
import { connect } from 'react-redux';
import  LogoTitle  from './LogoTitle';
import styles from '../constants/Styles';
import OpenDrawerProfesional from '../components/OpenDrawerProfesional';
import RestApi from '../common/RestApi';
import { isSignedIn } from '../common/auth';
import validate from '../constants/validate_wrapper';
import { Image, View, ScrollView, Text, ImageEditor, ImageStore} from 'react-native';
import { Button, Snackbar  } from 'react-native-material-ui';
import IconHeaderAndTopTitle  from '../components/IconHeaderAndTopTitle';
import MultilineText from '../components/MultilineText';
import {MultiImagePicker} from '../components/MultiImagePicker';
import GroupTitle from '../components/GroupTitle';
import Tilde from '../components/Tilde';
import { Constants, MapView, Linking } from 'expo';
import { RadioButton } from 'react-native-paper';
import { API_URL } from '../common/config';
import { Avatar } from 'react-native-paper';
class SolicitarServicio3 extends React.Component {
  
  static navigationOptions = {
    headerTitle: <LogoTitle />,
    headerRight: <OpenDrawerProfesional/>,
    headerStyle: {
      backgroundColor: '#00AAB4',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {flex: 1, textAlign: 'center'}
  };
  
  constructor(){
    super();
  
    this.state = {
        errorMsg: '',
        observaciones : '',
        costo_presupuesto_aceptado: false,
        costo_presupuesto_aceptadoError: '',
        buttondisabled : false,
        continuar_button_text: 'CONTINUAR',
        rango_presupuesto: '',
        prestador_favorito: '',
        recomendados : []
    }

    isSignedIn().then(()=>{ }).catch(()=>{ this.props.navigation.navigate('Auth') });
  }

  resizeImage(image, width, height){
    return new Promise((resolve, reject)=>{
      let cropConfig = {
        offset: {x:0,y:0},
        size: {width: image.width, height: image.height},
        displaySize: {width: width, height: height},
        resizeMode: 'stretch'
      };
      ImageEditor.cropImage(image.uri, cropConfig, (imageURI) => {
        ImageStore.getBase64ForTag(imageURI, (base64Data) => {
            resolve(base64Data);
        }, (reason) => {
          console.error(reason);
          reject(reason);
        });
      }, (reason) => {
        console.error(reason);
        reject(reason);
      });
    });
  }

  async resizeImagesAndSend(dataset){
    if(dataset.image1){dataset.image1 = dataset.image1 !== '' ? await this.resizeImage(dataset.image1, 500, 500) : '';}
    if(dataset.image2){dataset.image2 = dataset.image2 !== '' ? await this.resizeImage(dataset.image2, 500, 500) : '';}
    if(dataset.image3){dataset.image3 = dataset.image3 !== '' ? await this.resizeImage(dataset.image3, 500, 500) : '';}
    if(dataset.image4){dataset.image4 = dataset.image4 !== '' ? await this.resizeImage(dataset.image4, 500, 500) : '';}
    if(dataset.image5){dataset.image5 = dataset.image5 !== '' ? await this.resizeImage(dataset.image5, 500, 500) : '';}

    //Lets add the deep_link_base for push notifications
    dataset.deep_link_base = Expo.Linking.makeUrl();

    let api = new RestApi();
    this.setState({buttondisabled: true});
    api.serviceRequest(dataset)
    .then((result)=>{
      this.setState({buttondisabled: false});
      this.props.navigation.navigate('SolicitudServicioGracias', this.props.navigation.state.params);
    })
    .catch((error)=>{
    });
  }

  

  btnContinuarClick(){
    //const costo_presupuesto_aceptadoError = validate('costo_presupuesto_aceptado', this.state.costo_presupuesto_aceptado);
    //this.setState({costo_presupuesto_aceptadoError: costo_presupuesto_aceptadoError,})
    //if(!costo_presupuesto_aceptadoError){
    if(true){ //Kept this for the presupuesto stuff
      this.setState({continuar_button_text: 'SOLICITANDO...'})
      //Save to store
      let serviceRequestData = {
        observaciones: this.state.observaciones,
        costo_presupuesto_aceptado: this.state.costo_presupuesto_aceptado,
      };
      this.props.saveSolicitudData(serviceRequestData);
      let apiPayload = { 
        ...this.state, 
        ...this.props.serviceRequest.serviceRequestData,
        ...this.props.serviceRequest.serviceRequestData2,
        }
      delete apiPayload.costo_presupuesto_aceptadoError;
      delete apiPayload.errorMsg;
      delete apiPayload.buttondisabled;
      apiPayload.categoria = this.props.navigation.state.params.id;
      
      apiPayload = this.renameDataSet(apiPayload);


      this.resizeImagesAndSend(apiPayload);
    }
  }

  renameDataSet(dataset){
    dataset.traer_materiales = dataset.desea_traigan_materiales;
    delete dataset.desea_traigan_materiales;
    dataset.obs_materiales = dataset.observaciones_materiales;
    delete dataset.observaciones_materiales;
    dataset.acepta_pagar_presupuesto = dataset.costo_presupuesto_aceptado;
    delete dataset.costo_presupuesto_aceptado;
    dataset.horarios = dataset.horario;
    delete dataset.horario;
    dataset.urgencia = dataset.urgente;
    delete dataset.urgente;
    dataset.guardar_direccion_permanente = dataset.guardar_direccion;
    delete dataset.guardar_direccion;
    delete dataset.recomendados;
    return dataset;
  }

  componentWillMount(){


    let api = new RestApi();
    api.recomendedpros({
      categoria: this.props.navigation.state.params.id
      })
    .then((recomendados)=>{
      this.setState({recomendados});
    })
    .catch((error)=>{
    });
  }

  render() {
    const {isVisible} = this.state
    return (
        <ScrollView>
        <View style={{marginleft: 20, marginRight:20, marginTop:20, paddingLeft: 10}} >
            <IconHeaderAndTopTitle 
                topTitle="Servicio solicitado" 
                title={this.props.navigation.getParam('nombre')}
                source={this.props.navigation.getParam('imagen')}
                />
            <MultilineText 
                label="Observaciones"

                placeholder=""
                onChangeText={(observaciones)=>{ this.setState({observaciones: observaciones}) }}
                error={this.state.descripcionError}
                />
            
            <GroupTitle label="Presupuesto a domicilio" />
            
            <View style={{marginBottom: 30}}>
              <Tilde 
                label="Este presupuesto tiene un valor de $200 que se descuentan al finalizar el trabajo."
                checked={false}
                error={this.state.costo_presupuesto_aceptadoError}
                onPress={(presupuesto_aceptado) => {
                  this.setState({costo_presupuesto_aceptado: presupuesto_aceptado});
                }}
                />
            </View>

            <Text style={{marginLeft: 10, marginTop: 20, marginBottom: 20}}>En caso de cancelar luego de pedir el presupuesto no seran reintegrados</Text>
            
            <GroupTitle label="Rango de Presupuestos" />
              <View style={{ marginLeft: 10 }}>
                <Text>Indique cuanto considera que deberia costar un trabajo de este tipo.</Text>
                <Text>(Esta informacion no sera compartida con nadie y tiene como fin incentivar al profesional a proponer presupuestos reales)</Text>
                

              </View>

              <View style={{marginTop: 10, marginLeft: 10}}>
                  <RadioButton.Group
                    onValueChange={rango_presupuesto => this.setState({ rango_presupuesto })}
                    value={this.state.rango_presupuesto} >
                    
                    <View style={{ marginBottom: 5}}>
                      <View style={{flex:1, flexDirection: 'row'}}>
                        <Text style={{width: '80%', marginTop: 8}}>$500 a $1.500</Text>
                        <RadioButton  style={{width: '20%'}} value="500a1500" />
                      </View>
                    </View>

                    <View style={{ marginBottom: 5}}>
                      <View style={{flex:1, flexDirection: 'row'}}>
                        <Text style={{width: '80%', marginTop: 8}}>$1.500 a $3.000</Text>
                        <RadioButton  style={{width: '20%'}} value="1500a3000" />
                      </View>
                    </View>

                    <View style={{ marginBottom: 5}}>
                      <View style={{flex:1, flexDirection: 'row'}}>
                        <Text style={{width: '80%', marginTop: 8}}>$3.000 a $5.000</Text>
                        <RadioButton  style={{width: '20%'}} value="3000a5000" />
                      </View>
                    </View>

                    <View style={{ marginBottom: 5}}>
                      <View style={{flex:1, flexDirection: 'row'}}>
                        <Text style={{width: '80%', marginTop: 8}}>$5.000 a $10.000</Text>
                        <RadioButton  style={{width: '20%'}} value="5000a10000" />
                      </View>
                    </View>

                    <View style={{ marginBottom: 5}}>
                      <View style={{flex:1, flexDirection: 'row'}}>
                        <Text style={{width: '80%', marginTop: 8}}>$10.000 a $20.000</Text>
                        <RadioButton  style={{width: '20%'}} value="10000a20000" />
                      </View>
                    </View>

                    <View style={{ marginBottom: 5}}>
                      <View style={{flex:1, flexDirection: 'row'}}>
                        <Text style={{width: '80%', marginTop: 8}}>$20.000 a $40.000</Text>
                        <RadioButton  style={{width: '20%'}} value="20000a40000" />
                      </View>
                    </View>

                    <View style={{ marginBottom: 5}}>
                      <View style={{flex:1, flexDirection: 'row'}}>
                        <Text style={{width: '80%', marginTop: 8}}>$40.000 a $70.000</Text>
                        <RadioButton  style={{width: '20%'}} value="40000a70000" />
                      </View>
                    </View>

                    <View style={{ marginBottom: 5}}>
                      <View style={{flex:1, flexDirection: 'row'}}>
                        <Text style={{width: '80%', marginTop: 8}}>$70.000 o mas</Text>
                        <RadioButton  style={{width: '20%'}} value="70000omas" />
                      </View>
                    </View>
                  </RadioButton.Group>
                </View>


              <GroupTitle label="Elegir un prestador conocido" />

              {this.state.recomendados.length == 0 ? 
                <View style={{
                    flex:1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 20  
                  }}>
                  <Text>No ha contratado ningun profesional de esta categoria todavia...</Text>
                  
                </View>
                : <Text></Text>  
              }

              <View style={{marginLeft: 10, marginRight: 10}}>
                <RadioButton.Group
                  onValueChange={ prestador_favorito => this.setState({ prestador_favorito }) }
                  value={this.state.prestador_favorito}>
                  {this.state.recomendados.map((recomendado, i)=>{
                      return (
                        <View key={i} style={{flex:1, flexDirection: 'row'}}>
                          <Avatar.Image 
                            size={40} 
                            source={{uri: API_URL + recomendado.avatar}} />
                          <Text style={{width: '66%', marginLeft: 10, marginTop:10}}>{recomendado.nombre}</Text>
                          <RadioButton
                            style={{width: '20%'}} 
                            value={recomendado.user_id} />
                        </View>
                      );
                  })}

                </RadioButton.Group>
              </View>

  
            <View style={{flexDirection: `row`,justifyContent: `center`, marginBottom: 40}}>      
                <Button disabled={this.state.buttondisabled} raised primary text={this.state.continuar_button_text} style={styles.botonAevra} 
                  onPress={() => { this.btnContinuarClick();}}/>
                <Snackbar visible={isVisible} message={this.state.errorMsg} onRequestClose={() => this.setState({ isVisible: false })} />
              </View>
              </View>
        </ScrollView>
    );
  }

}

function mapStateToProps(state){
    return {
        serviceRequest : state.serviceRequest
      }
}

function mapDispatchToProps(dispatch){
  return {
    saveSolicitudData : (serviceRequestData) => dispatch({type: 'SAVE_SERVICE_REQUEST_DATA3', payload: serviceRequestData})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SolicitarServicio3);