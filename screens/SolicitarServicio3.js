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
import { Constants, MapView } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import IconText from '../components/IconText';

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
        costo_presupuesto_aceptadoError: ''
    }

    isSignedIn()
    .then(()=>{ 
      
    })
    .catch(()=>{ this.props.navigation.navigate('Auth') });
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
    //console.log("Dataset REACT", dataset);
    dataset.image1 = dataset.image1 !== '' ? await this.resizeImage(dataset.image1, 500, 500) : '';
    dataset.image2 = dataset.image2 !== '' ? await this.resizeImage(dataset.image2, 500, 500) : '';
    dataset.image3 = dataset.image3 !== '' ? await this.resizeImage(dataset.image3, 500, 500) : '';
    dataset.image4 = dataset.image4 !== '' ? await this.resizeImage(dataset.image4, 500, 500) : '';
    dataset.image5 = dataset.image5 !== '' ? await this.resizeImage(dataset.image5, 500, 500) : '';
    //console.log(dataset);
    let api = new RestApi();
    let result = await api.serviceRequest(dataset);
    //console.log(result);
    this.props.navigation.navigate('SolicitudServicioGracias', this.props.navigation.state.params);
  }


  btnContinuarClick(){
    const costo_presupuesto_aceptadoError = validate('costo_presupuesto_aceptado', this.state.costo_presupuesto_aceptado);
    this.setState({
      costo_presupuesto_aceptadoError: costo_presupuesto_aceptadoError
    })
    if(!costo_presupuesto_aceptadoError){
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
    dataset.prestador_favorito = ''; //TODO
    return dataset;
  }

  render() {
    const {isVisible} = this.state
    return (
        <ScrollView>
        <View style={{marginleft: 20, marginRight:20, marginTop:20, paddingLeft: 10, paddingRight: 10}} >
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
            
            
            <Tilde 
              label="Este presupuesto tiene un valor de $200 que se descuentan al finalizar el trabajo."
              checked={false}
              error={this.state.costo_presupuesto_aceptadoError}
              onPress={(presupuesto_aceptado) => {
                this.setState({costo_presupuesto_aceptado: presupuesto_aceptado});
              }}
              />

              <Text style={{marginLeft: 10, marginTop: 20}}>En caso de cancelar luego de pedir el presupuesto no seran reintegrados</Text>

            <View style={{flexDirection: `row`,justifyContent: `center`, marginBottom: 40}}>      
                <Button raised primary text="CONTINUAR" style={styles.botonAevra} 
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