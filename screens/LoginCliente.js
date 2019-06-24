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
import RestApi from '../common/RestApi';


class LoginCliente extends React.Component { 
  btnIngresarClick = () => {
    let api = new RestApi();
    api.login({
      "username": this.state.username,
      "password": this.state.password
    })
    .then((response)=>{
      if(response.type == 'cliente'){
        this.props.navigation.navigate('ClienteApp');
      }else{
        Alert.alert("Importante", 'Esta cuenta no es una cuenta de cliente.');
        if(response.type == 'profesional'){
          this.props.navigation.navigate('ProfesionalApp');
        }
      }
    })
    .catch((err)=>{
      //console.log("ERROR?"+err);
      if(err && err.error){
        if(err.error == "Pending"){
          Alert.alert("Importante", "Su cuenta se encuentra en proceso de revision, recibira un email con el resultado del proceso muy pronto");
        }else if(err.error == "Unauthorized"){
          Alert.alert("Importante", 'Usuario o contrasena incorrectas');
          this.state.password = '';
          this.inputPassword.focus();
        }else{
          Alert.alert("Importante", err.error);
        }
      }
    });
  }
  


  

  static navigationOptions = {
    headerTitle: <LogoTitle />,
    headerRight: <Text></Text>,
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
                onChangeText           ={username => this.setState({ username })}
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
                ref={ref => (this.inputPassword = ref)}
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
                secureTextEntry={true}
                value={this.state.password}
                theme={{
                  colors: {
                    placeholder: 'gray', text: 'darkgray', primary: 'gray',
                    underlineColor: 'gray', background: '#003489'
                  }
                }}
                style={{backgroundColor: Colors.white, marginHorizontal: 70, marginBottom: 20 }}
              />
            </View>

            <View style={styles.welcomeContainer}>
            	<Button raised primary text="INGRESAR" style={styles.botonAevra} onPress={this.btnIngresarClick} />
              <Text style={{marginTop:20, color: '#777777'}} onPress={ ()=> this.props.navigation.navigate('OlvideContrasenaCliente') }>Olvidé mi contraseña</Text>
              <Text style={{marginTop:15, color: '#00AAB3'}} onPress={ ()=> this.props.navigation.navigate('RegistroCliente') }>¿No estás registrado?</Text>
              <Text style={{color: '#00AAB3'}} onPress={ ()=> this.props.navigation.navigate('RegistroCliente') }>Registrate!</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginCliente);


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