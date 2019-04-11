import React from 'react';
import  LogoTitle  from './LogoTitle';
import { Button } from 'react-native-material-ui';
import {
	Dimensions,
	Image,
	StyleSheet,
  View,
  ScrollView,
	Text,
  KeyboardAvoidingView,
  Alert,
  StatusBar
} from 'react-native';
import { TextInput, Colors } from 'react-native-paper';
import { connect } from 'react-redux';
import IconHeaderAndTopTitle from '../components/IconHeaderAndTopTitle';


class SolicitudServicioGracias extends React.Component { 

  constructor(props){
    super(props);
  }

  btnIngresarClick = () => {

    let promResponse = fetch('http://aevra.96.lt/auth/login', {
      method: 'POST',   
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
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
    headerLeft: <Text></Text>,
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
            style={{ flex: 1, backgroundColor: '#fff' }} 
            behavior="position" 
            keyboardVerticalOffset={-200}
            enabled>  
            <ScrollView>
              <View style={{marginleft: 20, marginRight:20, marginTop:20}} >
            <IconHeaderAndTopTitle 
                topTitle="Servicio solicitado" 
                title={this.props.navigation.getParam('nombre')}
                source={this.props.navigation.getParam('imagen')}
                />
                
                <Text>Muchas Gracias</Text>
        <Text>A la brevedad un trababajador</Text>
        <Text>se pondra en contacto con usted</Text>
          
              <Button raised primary text="TERMINAR" style={styles.botonAevra} 
              onPress={() => {this.props.navigation.navigate('ElegirServicio');}}
              />
                
    
            
               
                <View style={{ height: 150 }} />
            </View>
            </ScrollView>
  
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

export default connect(mapStateToProps, mapDispatchToProps)(SolicitudServicioGracias);


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