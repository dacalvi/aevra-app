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
import { View, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Button  } from 'react-native-material-ui';
import RestApi from '../common/RestApi';
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

  constructor(){
    super();
    this.state = {
        comentarioError: '',
        precio:'',
        comentario:'',
        buttondisabled : false
    }
  }

  btnEnviarClick(){
    const montoError = validate('montoPostulacion', this.state.precio);
    const comentarioError = validate('descripcion', this.state.comentario);
    
    this.setState({
        montoError: montoError,
        comentarioError: comentarioError
    })

      if (!montoError && !comentarioError) {
        let registrationData = {
          "solicitud_id": this.props.navigation.state.params.solicitud_id,
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
        
     
      }
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
                        <View style={{width: '90%'}}>
                            <ATextinputNumberWithIcon
                                onChangeText={(precio)=> this.setState({precio})} 
                                iconSource={require('../assets/images/icon-wallet.png')}
                                placeholder="Monto"
                                error={this.state.montoError}
                                />

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
