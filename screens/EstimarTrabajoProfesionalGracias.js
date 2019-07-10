import React from 'react';
import  LogoTitle  from './LogoTitle';
import layout from '../constants/Layout';
import {
        IconHeader, 
        OpenDrawerProfesional, 
        GroupTitle, 
        MultilineText,
        ATextinputWithIcon
} from '../components';
import validate from '../constants/validate_wrapper';
import { View, Text, KeyboardAvoidingView, ScrollView, Image } from 'react-native';
import { Button  } from 'react-native-material-ui';
import RestApi from '../common/RestApi';
const imageHeight = layout.window.height / 2.5;
const imageWidth = layout.window.width;

export default class EstimarTrabajoProfesionalGracias extends React.Component {

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

  state = {};

  constructor(){
    super();
    this.state = {
        comentarioError: '',
        precio:'',
        comentario:''
    }
  }
  /*
  btnEnviarClick(){
    const montoError = validate('montoPostulacion', this.state.precio);
    const comentarioError = validate('descripcion', this.state.comentario);
    
    this.setState({
        montoError: montoError,
        comentarioError: comentarioError
    })

      if (!montoError && !comentarioError) {
        let registrationData = {
          "solicitud_id": this.props.navigation.state.params.id,
          "monto": this.state.precio,
          "comentario": this.state.comentario
        };
        let api = new RestApi();
        api.postular(registrationData).then((result)=>{
            if(result.status == "postuled"){
                this.props.navigation.navigate('PostularGracias', {...this.props.navigation.state.params, precio: registrationData.monto});
            }
        }).catch((error)=>{
        });
        
     
      }
    }
  */

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
                            topTitle=""
                            title="Edicion de presupuesto"
                            style={{marginBottom: 20}} />

                        

                        <View style={{flex: 1, flexDirection: 'column'}}>
                            <GroupTitle label="Presupuesto editado correctamente"/>
                            
                            <View style={{flex:1, flexDirection:'row', marginLeft: 10}}>
                              <Image style={{width: 20, height: 20 }} source={require('../assets/images/icon-wallet.png')}/>
                              <Text style={{fontSize: 18, fontWeight: 'bold'}}> $ {this.props.navigation.state.params.precio}</Text>
                            </View>
                            
                            <View style={{marginLeft: 10, marginTop: 20}}>
                              <Text>Muchas Gracias.</Text>
                              
                            </View>
                        </View>
 
                    </View>
                </ScrollView>
                <View style={{flexDirection: 'row',justifyContent: 'center', height: 40}}>
                    <Button raised primary text="CERRAR" style={{color: 'white',backgroundColor: '#00AAB4', borderRadius: 30}} 
                    onPress={ () => { this.props.navigation.navigate('OfertasTrabajo') } }/>
                </View>
            </KeyboardAvoidingView>
    );
  }
}
