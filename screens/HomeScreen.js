import React from 'react';
import { Dimensions } from "react-native";
import { Button } from 'react-native-material-ui';
import { 
  Image, 
  Platform, 
  ScrollView, 
  StyleSheet, 
  Text, 
  View,
  Alert
} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import LocalStore from '../common/localstore';
import { connect } from 'react-redux';
import { Permissions } from 'expo';

class HomeScreen extends React.Component {

  constructor(props){
    super(props);
    this.pedirPermisos();
  }

  checkSession(){
    return LocalStore.getData('session_token') !== null;
  }

  isUserCliente(){
    return LocalStore.getData('session_type') == 'cliente';
  }

  isUserCliente(){
    return LocalStore.getData('session_type') == 'cliente';
  }

  pedirPermisos = () => {
    let permPromise = Permissions.askAsync(Permissions.LOCATION, Permissions.CAMERA);
    permPromise
    .then((result)=>{
      
      console.log(result);

      if (result.permissions.camera.status !== 'granted') {
        Alert.alert("Aviso", "Debe permitir a AEVRA utilizar su camara para poder acceder a los servicios");
      }

      if (result.permissions.location.status !== 'granted') {
        Alert.alert("Aviso", "Debe permitir a AEVRA utilizar su ubicacion para poder acceder a los servicios");
      }

      if (result.status !== 'granted') {
        Alert.alert(
          "Aviso", 
          "Faltan algunos permisos, verifique de otorgar estos permisos e intente nuevamente",
          [
            {text: 'Otorgar permisos', onPress: () => this.pedirPermisos()}
          ],
          {cancelable: false},);
        this.props.navigation.navigate('Auth')
      }
      
    })
    .catch((error)=>{
      alert(error);
    })
    ;
    
  }

  render() {
    
    return (
      <View style={styles.container}>
        
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image 
              source={ require('../assets/images/home_header.png') } 
              style={{ height: imageHeight, width: imageWidth}} />
            <Image source={ require('../assets/images/logo.jpeg') } />
            <Text style={{ fontSize: 18, color: '#777777' }}>La red de servicios para tu</Text>
            <Text style={{ fontSize: 18, color: '#777777' }}>hogar o empresa {this.props.userType} </Text>
            <Button raised primary text="NECESITO UN SERVICIO" onPress={() => {
                                                                                this.props.setUserTypeClient();
                                                                                this.props.navigation.navigate('LoginCliente');
                                                                              }} style={styles.botonAevra} />
            <Button raised primary text="SOY PRESTADOR" onPress={() => {
                                                                          this.props.setUserTypeProfesional();
                                                                          this.props.navigation.navigate('LoginProfesional');
                                                                        }}/>

            
          </View>
        </ScrollView>
      </View>
    );
  }

  
}

function mapStateToProps(state){
  return {
    userType : state.userType
  } 
}

function mapDispatchToProps(dispatch){
  return {
    setUserTypeClient : () => dispatch({type: 'SET_USERTYPE_CLIENT'}),
    setUserTypeProfesional : () => dispatch({type: 'SET_USERTYPE_PROFESIONAL'})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const dimensions = Dimensions.get('window');

const imageHeight = 390;
//const imageHeight = dimensions.height / 2.1;
const imageWidth = dimensions.width / 1;


const styles = StyleSheet.create({
  botonAevra: {
    color: 'white',
    backgroundColor: '#00AAB4', 
    borderRadius: 30
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 13,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: -20,
    marginBottom: 20,
  },
  welcomeImage: {
    alignSelf: 'stretch',
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
