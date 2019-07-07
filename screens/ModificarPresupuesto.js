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

export default class ModificarPresupuesto extends React.Component {

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
        api.modificarpresupuesto(registrationData).then((result)=>{
            if(result.status == "postuled"){
                this.props.navigation.navigate('PostularGracias', {...this.props.navigation.state.params, precio: registrationData.monto});
            }
        }).catch((error)=>{
            //bugsnagClient.notify(new Error(error));
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
                            topTitle="Modificar presupuesto para trabajo"
                            title={this.props.navigation.state.params.nombre}
                            style={{marginBottom: 20}} />
                         
                        
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
                            placeholder="Comentario explicando la razon de la modificacion del presupuesto"
                            onChangeText={ (comentario)=>{this.setState({comentario}) } }
                            error={this.state.comentarioError}
                            />

                        
                    </View>
                </ScrollView>
                <View style={{flexDirection: 'row',justifyContent: 'center', height: 40}}>
                    <Button raised primary text="MODIFICAR PRESUPUESTO" style={{color: 'white',backgroundColor: '#00AAB4', borderRadius: 30}} 
                    onPress={ () => { this.btnEnviarClick() } }/>
                </View>
            </KeyboardAvoidingView>
    );
  }
}
