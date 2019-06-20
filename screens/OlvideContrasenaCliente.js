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
  StatusBar,
  Platform
} from 'react-native';
import { TextInput, Colors } from 'react-native-paper';
import { connect } from 'react-redux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import RestApi from '../common/RestApi';
import validate from '../constants/validate_wrapper';

class OlvideContrasenaCliente extends React.Component { 

  constructor(props){
    super(props);
    this.state = {
      email: '',            
      emailError: '',
      buttonRecuperarDisabled: false,
      buttonRecuperarText: 'RECUPERAR CONTRASEÑA'
    }
  }

  btnRecuperarClick = () => {
    const emailError = validate('email', this.state.email);
    this.setState({emailError});

    if(!emailError){
      this.setState({
        buttonRecuperarDisabled: true,
        buttonRecuperarText: "ENVIANDO..."
      });
      console.log("test");
      let api = new RestApi();
      api.olvideContrasenaCliente({'email': this.state.email })
      .then((responseJson) => {
        
        Alert.alert('Listo!', responseJson);
        this.setState({
          buttonRecuperarDisabled: true,
          buttonRecuperarText: "ENVIADO" 
        });

      })
      .catch((error)=>{
        Alert.alert('Error!', error);
        this.setState({
          buttonRecuperarDisabled: false,
          buttonRecuperarText: "RECUPERAR CONTRASEÑA"
        });
      })
      
    }

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
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
              style={{backgroundColor: Colors.white, marginHorizontal: 40,  marginBottom: 20}}
            />
            
            <View style={{ marginHorizontal: 40, marginBottom: 10}}>
              { this.state.emailError ? <Text style={{color: 'red'}}>{this.state.emailError}</Text> : <Text> </Text> }
            </View>

            <View style={styles.welcomeContainer}>
            	<Button 
                disabled={this.state.buttonRecuperarDisabled} 
                raised 
                primary 
                text={this.state.buttonRecuperarText}
                style={styles.botonAevra} 
                onPress={this.btnRecuperarClick} />
              <Text style={{
                marginTop:20, 
                color: '#777777',
                marginHorizontal: 40
                }}>Ingrese el email con el que se registro y le enviaremos un enlace para restablecer su contraseña</Text>
              <Text style={{marginTop:15, color: '#00AAB3'}} onPress={ ()=> this.props.navigation.navigate('LoginCliente') }>Ir a Login</Text>
            </View>

        	<View style={{ height: 50 }} />
          {Platform.OS === 'android' ? <KeyboardSpacer /> : null }
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