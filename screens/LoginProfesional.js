import React from 'react';
import  LogoTitle  from './LogoTitle';
import { Button } from 'react-native-material-ui';
import { Image, View, Text, KeyboardAvoidingView, Alert } from 'react-native';
import { TextInput, Colors } from 'react-native-paper';
import styles from '../constants/Styles';
import layout from '../constants/Layout';
import RestApi from '../common/RestApi';


const imageHeight = layout.window.height / 2.6;
const imageWidth = layout.window.width;

export default class LoginProfesional extends React.Component {
  
  static navigationOptions = {
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#00AAB4',
    },
    headerRight: <Text></Text>,
    headerTintColor: '#fff',
    headerTitleStyle: {flex: 1, textAlign: 'center'}
  };

  state = {
    username: '',
    password: ''
  };

  btnIngresarClick(){
    //console.log(this.state);
    let api = new RestApi();
    api.login({
      "username": this.state.username,
      "password": this.state.password
    })
    .then((response)=>{
      //console.log(response);
      if(response.type == 'profesional'){
        this.props.navigation.navigate('ProfesionalApp');
      }else{
        Alert.alert("Importante", 'Esta cuenta no es una cuenta de profesional.');
        if(response.type == 'cliente'){
          this.props.navigation.navigate('ClienteApp');
        }
      }

      
    })
    .catch((err)=>{
      //console.log("ERROR?"+err);
      if(err && err.error){
        if(err.error == "Inactive"){
          Alert.alert("Aviso", "Su cuenta no se activa todavia, para activarla haga click en el link que le enviamos por email");
        }else if(err.error == "Pending"){
          Alert.alert("Aviso", "Su cuenta se encuentra en proceso de revision, recibira un email con el resultado del proceso muy pronto");
        }else if(err.error == "Unauthorized"){
          Alert.alert("Error", "Usuario o clave incorrectas");
        }else{
          Alert.alert("Error", err.error);
        }
      }
    });
  }

  render() {
    return (
    	<KeyboardAvoidingView style={styles.container} behavior="position" enabled> 
          <View style={{ minHeight: '40%',flex: 1,justifyContent: 'flex-end',alignItems: 'center',overflow: 'hidden',maxHeight: 400 }} >
            <Image
              style={{ overflow: 'hidden', width: '100%', zIndex: 0, height: 500 }}
              source={ require('../assets/images/home_header.png') } />
          </View>

          <View style={{}}>
            
            <Image style={{ 
              height: 25, 
              width: 25, 
              marginTop: 25,
              marginLeft: 30,
              position: 'absolute'
            }} source={require('../assets/images/icon-user.png')} />

            <TextInput
              textContentType='emailAddress'
              label='Email'
              mode='flat'
              value={this.state.username}
              theme={{
                colors: {
                  placeholder: 'gray', text: 'darkgray', primary: 'gray',
                  underlineColor: 'gray', background: '#003489'
                }
              }}
              onChangeText={username => this.setState({ username })}
              style={{backgroundColor: Colors.white, marginHorizontal: 70,  marginBottom: 20}}
            />

          </View>

          <View style={{}}>

            <Image style={{ 
              height: 25, 
              width: 25, 
              marginTop: 25,
              marginLeft: 30,
              position: 'absolute'
            }} source={require('../assets/images/icon-check.png')} />

            <TextInput
              textContentType='password'
              label='Contraseña'
              mode='flat'
              value={this.state.password}
              theme={{
                colors: {
                  placeholder: 'gray', text: 'darkgray', primary: 'gray',
                  underlineColor: 'gray', background: '#003489'
                }
              }}
              onChangeText={password => this.setState({ password })}
              secureTextEntry={true}
              style={{backgroundColor: Colors.white, marginHorizontal: 70, marginBottom: 20 }}
            />
          </View>


        

        
          <View style={styles.welcomeContainer}>
            <Button raised primary text="INGRESAR" style={styles.botonAevra} onPress={()=>{ this.btnIngresarClick(); }}/>
            <Text style={{marginTop:20, color: '#777777'}} onPress={ ()=> this.props.navigation.navigate('OlvideContrasenaProfesional') }>Olvidé mi contraseña</Text>
            <Text style={{marginTop:15, color: '#00AAB3'}} onPress={ ()=> this.props.navigation.navigate('RegistroProfesional') }>¿No estás registrado? Registrate!</Text>
          </View>

        	<View style={{ height: 150 }} />
  
      </KeyboardAvoidingView>
      
    );
  }
}


  
