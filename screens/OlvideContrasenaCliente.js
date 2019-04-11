import React from 'react';
import  LogoTitle  from './LogoTitle';
import { Button } from 'react-native-material-ui';
import {
	Dimensions,
	Image,
	StyleSheet,
	View,
	Text,
    KeyboardAvoidingView,
    Alert,
    StatusBar
} from 'react-native';
import { TextInput, Colors } from 'react-native-paper';
import { connect } from 'react-redux';

class OlvideContrasenaCliente extends React.Component { 


  btnIngresarClick = () => {

    let promResponse = fetch('http://aevra.96.lt/auth/recoverpasswordclient', {
      method: 'POST',   
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username
      }),
    });

    promResponse
    .then((response) => response.json())
    .then((responseJson) => {
      if( responseJson && responseJson.error && responseJson.error == "Unauthorised"){
        Alert.alert('Usuario o contrasena incorrectas');
        this.state.password = '';
        this.inputPassword.focus();
      }else{
        this.props.login(responseJson.token);
        console.log(responseJson);
        this.props.navigation.navigate('ElegirServicio');
      }
    })
    .catch((error) =>{
      console.error(error);
    });
  }
  
  static navigationOptions = {
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#00AAB4',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {flex: 1, textAlign: 'center'}
  };

  state = {
    username: '',
    password: ''
  };

  render() {
    return (
        <KeyboardAvoidingView 
            style={styles.container} 
            behavior="position" 
            keyboardVerticalOffset={-StatusBar.currentHeight}
            enabled>    
            <Image source={ require('../assets/images/home_header_cliente.png') } style={{ height: imageHeight, width: imageWidth, marginTop: 0}} />
            
            <TextInput
              textContentType='emailAddress'
              label='Email'
              mode='flat'
              value={this.state.username}
              onChangeText={username => this.setState({ username })}
              style={{backgroundColor: Colors.white, marginHorizontal: 40,  marginBottom: 20}}
            />

            <View style={styles.welcomeContainer}>
            	<Button raised primary text="RECUPERAR CONTRASEÑA" style={styles.botonAevra} onPress={this.btnIngresarClick} />
              <Text style={{marginTop:20, color: '#777777'}}>Ingrese el email con el que se registro y le enviaremos un enlace para restablecer su contraseña</Text>
              <Text style={{marginTop:15, color: '#00AAB3'}} onPress={ ()=> this.props.navigation.navigate('LoginCliente') }>Ir a Login</Text>
            </View>

        	<View style={{ height: 50 }} />
  
      </KeyboardAvoidingView>
      
    );
  }
}


function mapStateToProps(state){
  return {} 
}

function mapDispatchToProps(dispatch){
  return {
    login : (token) => dispatch({type: 'LOGIN', payload: token})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OlvideContrasenaCliente);


const dimensions = Dimensions.get('window');
const imageHeight = dimensions.height / 2.5;
const imageWidth = dimensions.width;
  
const styles = StyleSheet.create({
  botonAevra: {
    color: 'white',
    backgroundColor: '#00AAB4', 
    borderRadius: 30
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 0
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 10,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: -10,
    marginBottom: 20,
  }
  
});