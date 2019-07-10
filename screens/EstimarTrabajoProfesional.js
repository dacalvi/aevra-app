import React from 'react';
import  LogoTitle  from './LogoTitle';
import layout from '../constants/Layout';
import {
        IconHeader, 
        OpenDrawerProfesional, 
        GroupTitle, 
        MultilineText,
        ATextinputNumberWithIcon
} from '../components';
import validate from '../constants/validate_wrapper';
import { 
  View, 
  Text, 
  KeyboardAvoidingView, 
  ScrollView,
  Alert
} from 'react-native';
import { Button  } from 'react-native-material-ui';
import RestApi from '../common/RestApi';
import { RadioButton } from 'react-native-paper';
const imageHeight = layout.window.height / 2.5;
const imageWidth = layout.window.width;

export default class Postular extends React.Component {

  static navigationOptions = {
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#00AAB4',
    },
    headerRight: <Text></Text>,
    headerRight: <OpenDrawerProfesional/>,
    headerTintColor: '#fff',
    headerTitleStyle: {flex: 1, textAlign: 'center'}
  };

  constructor(props){

    super(props);
    this.state = {
        comentarioError: '',
        precio:'',
        comentario:'',
        buttondisabled : false,
        rangos_visibles: true,
        rango_presupuesto: ''
    }
    console.log(this.props.navigation.state.params);
  }


  validarRango(){
    if(this.state.rango_presupuesto.split('a').length == 2){
      let minimo = this.state.rango_presupuesto.split('a')[0];
      let maximo = this.state.rango_presupuesto.split('a')[1];
      if(this.state.precio >= parseFloat(minimo) && this.state.precio <= parseFloat(maximo)){
        return null;
      }else{
        return 'El precio estimado no coincide con el rango otorgado de entre ' + minimo + ' y ' + maximo;
      }
    }else{
      return 'Rango no válido';
    }

  }

  btnEnviarClick(){
    const montoError = validate('montoPostulacion', this.state.precio);
    const comentarioError = validate('descripcion', this.state.comentario);
    const rangoError = this.validarRango();
    
    this.setState({
        montoError: montoError,
        comentarioError: comentarioError,
        rangoError: rangoError
    })

      if (!montoError && !comentarioError && !rangoError) {
        let registrationData = {
          "solicitud_id": this.props.navigation.state.params.item.solicitud_id,
          "monto": this.state.precio,
          "comentario": this.state.comentario
        };
        this.setState({buttondisabled: true});
        let api = new RestApi();

        api.presupuestoedicionfinal(registrationData).then((result)=>{
            this.setState({buttondisabled: false});
            if(result.status == "enproceso"){
                this.props.navigation.navigate('EstimarTrabajoProfesionalGracias', {...this.props.navigation.state.params, precio: registrationData.monto});
            }
        }).catch((error)=>{
        });
        
     
      }else{
        console.log(this.state, montoError, comentarioError, rangoError);
      }
    }
  
    chequearRango(){
      if(this.props.navigation.state.params.item.rango_presupuesto == this.state.rango_presupuesto){
        Alert.alert('Felicitaciones!', 'Tenes un 33% de descuento en tu comisión de Aevra');
      }else{
        Alert.alert('Su respuesta no coincide', 'Esta vez no pudimos hacer el descuento');
      }
      this.setState({rangos_visibles: false});
    }

  render() {
    return (
            <KeyboardAvoidingView 
                style={{ flex: 1, backgroundColor: '#fff' }} 
                behavior="position" 
                keyboardVerticalOffset={-200}
                enabled>  
                <ScrollView>
                    <View style={{marginTop:20, marginLeft: 20, marginRight: 20}} >

                        <IconHeader 
                            source={require('../assets/images/icon-user-black.png')}
                            topTitle="Edicion de presupuesto"
                            title="Estimación final"
                            style={{marginBottom: 20}} />
                        <Text style={{marginLeft: 30}}>En este lugar puedes establecer el precio final</Text>
                        <Text style={{marginLeft: 30}}>del presupuesto, acordado con el cliente.</Text>
                        <Text style={{marginLeft: 30, marginTop: 10, color: 'green'}}>
                        Si coincide el monto dentro del rango estimado por el cliente, 
                        se le cobrara menos comision por 
                        este trabajo
                        </Text>
                        

                        <GroupTitle title="Presupuesto"/>

                        {this.state.rangos_visibles? <View style={{marginTop: 10, marginLeft: 10}}>
                          <RadioButton.Group
                            onValueChange={rango_presupuesto => {
                              this.setState({ rango_presupuesto }, ()=>{
                                this.chequearRango();
                              })
                            }}
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
                        </View>: null}
                        


                        
                        <View style={{width: '90%'}}>
                            <ATextinputNumberWithIcon
                                onChangeText={(precio)=> this.setState({precio})} 
                                iconSource={require('../assets/images/icon-wallet.png')}
                                placeholder="Monto"
                                error={this.state.montoError}
                                />
                                { this.state.rangoError ? <Text style={{color: 'red', marginLeft: 5}}>{this.state.rangoError}</Text> : <Text> </Text> }

                        </View>
                        <MultilineText 
                            label="Añadir Comentario" 
                            placeholder="Comentario Sobre el presupuesto final."
                            onChangeText={ (comentario)=>{this.setState({comentario}) } }
                            error={this.state.comentarioError}
                            />

                        
                    </View>
                </ScrollView>
                <View style={{flexDirection: 'row',justifyContent: 'center', height: 40}}>
                    <Button disabled={this.state.buttondisabled} raised primary text="ENVIAR" style={{color: 'white',backgroundColor: '#00AAB4', borderRadius: 30}} 
                    onPress={ () => { this.btnEnviarClick() } }/>
                </View>
            </KeyboardAvoidingView>
    );
  }
}
