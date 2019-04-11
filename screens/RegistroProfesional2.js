import React from "react";
import  LogoTitle  from './LogoTitle';
import { Dimensions, StyleSheet, View, ScrollView, KeyboardAvoidingView, ImageEditor, ImageStore } from 'react-native';
import { Button, Snackbar  } from 'react-native-material-ui';
import RestApi from '../common/RestApi';
import ATextinputWithIcon from '../components/ATextinputWithIcon';
import Tilde from '../components/Tilde';
import IconHeader from '../components/IconHeader';
import validate from '../constants/validate_wrapper';
import { connect } from 'react-redux';

class RegistroProfesional2 extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            calle: '',
            numerocasa: '',
            aceptatarjeta: false,
            depto: '',            
            terminos: false,
            calleError: '',
            numerocasaError: '',
            terminosError: '',
            deptoError: ''
        }
    }

    static navigationOptions = {
        headerTitle: <LogoTitle />,
        headerStyle: {
            backgroundColor: '#00AAB4',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {flex: 1, textAlign: 'center'}
    };


    resizeImage(image, width, height){
      return new Promise((resolve, reject)=>{
        let cropConfig = {
          offset: {x:0,y:0},
          size: {width: image.width, height: image.height},
          displaySize: {width: width, height: height},
          resizeMode: 'stretch'
        };
        ImageEditor.cropImage(image.uri, cropConfig, (imageURI) => {
          ImageStore.getBase64ForTag(imageURI, (base64Data) => {
              resolve(base64Data);
          }, (reason) => {
            console.error(reason);
            reject(reason);
          });
        }, (reason) => {
          console.error(reason);
          reject(reason);
        });
      });
    }

    async resizeImagesAndSend(dataset){
      let ff = await this.resizeImage(dataset.fotofrente, 500, 500);
      let fdf = await this.resizeImage(dataset.fotodnifrente, 500, 500);
      let fdd = await this.resizeImage(dataset.fotodnidorso, 500, 500);
      dataset.fotofrente = ff;
      dataset.fotodnifrente = fdf;
      dataset.fotodnidorso = fdd;
      console.log(dataset);
      let api = new RestApi();
      let result = await api.registerProfesional(dataset);
      console.log(result);
      this.props.navigation.navigate('GraciasRegistroProfesional');
    }

    btnRegistrarmeClick(){
      const calleError = validate('calle', this.state.calle);
      const numerocasaError = validate('numerocasa', this.state.numerocasa);
      const terminosError = validate('terminos', this.state.terminos);
    
      this.setState({
        calleError: calleError,
        numerocasaError: numerocasaError,
        terminosError: terminosError
      })


      if (!calleError && !numerocasaError && !terminosError) {
        let data = {calle, numerocasa, depto, aceptatarjeta, terminos } = this.state;
        this.props.saveRegistrationData(data);
        let registrationData = { apellido, email, nombre, password, telefono } = this.props.register.registrationData;
        let registrationDataID = { dni: dni_numero, fecha_nacimiento: fechanacimiento, nacionalidad: paisnacimiento, dni_frente_persona:fotofrente, dni_frente:fotodnifrente, dni_dorso:fotodnidorso} = this.props.register.registrationDataID;
        
        let { aceptatarjeta: acepta_tarjeta } = this.state;
        acepta_tarjeta ? acepta_tarjeta = 1 : acepta_tarjeta = 0;
        let registrationDataLocation = { calle, depto, numerocasa: numero } = this.state;
        let registrationCompleteSet = {
          acepta_tarjeta,
          ...registrationData, 
          ...registrationDataID, 
          ...registrationDataLocation};

        

        this.resizeImagesAndSend(registrationCompleteSet);
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
              <View style={{margin: 20, width: '80%'}} >
                <IconHeader 
                    source={require('../assets/images/icon-user-black.png')}
                    topTitle="Registro"
                    title="Prestador"
                    style={{marginBottom: 20}} />

                <View>
                  <ATextinputWithIcon
                    onChangeText={(calle)=> this.setState({calle})} 
                    iconSource={require('../assets/images/icon-user.png')}
                    placeholder="CALLE"
                    error={this.state.calleError}/>
                </View>
                <View style={{flexDirection: 'row' }} >
                  <View style={{ width: `50%` }}>
                    <ATextinputWithIcon
                      onChangeText={(numerocasa)=> this.setState({numerocasa})} 
                      iconSource={require('../assets/images/icon-user.png')}
                      placeholder="NUMERO"
                      error={this.state.numerocasaError}/>
                  </View>
                  <View style={{ width: `50%` }}>
                  <ATextinputWithIcon
                    onChangeText={(depto)=> this.setState({depto})} 
                    iconSource={require('../assets/images/icon-user.png')}
                    placeholder="DEPTO"
                    error={this.state.deptoError}/>
                  </View>
                </View>
                <View>
                  <Tilde 
                    label="Acepta pagos con tarjeta?" 
                    checked={this.state.aceptatarjeta} 
                    onPress={(aceptatarjeta) => { 
                      this.setState({ aceptatarjeta }) 
                    }} />
                  <Tilde 
                    label="Acepta terminos y condiciones de Aevra?" 
                    checked={this.state.terminos}
                    error={this.state.terminosError}
                    onPress={(terminos) => { 
                      this.setState({ terminos }) 
                      }}/>
                </View>


              </View>
                <View style={{flexDirection: `row`,justifyContent: `center`}}>
                  <Button raised primary 
                    text="REGISTRARME" 
                    style={{color: 'white',backgroundColor: '#00AAB4', borderRadius: 30}} 
                    onPress={() => { this.btnRegistrarmeClick();}}/>
                </View>

            </ScrollView>
      
          </KeyboardAvoidingView>
          
        );
      }

}

function mapStateToProps(state){
  return {
    register : state.register
  }
}

function mapDispatchToProps(dispatch){
  return {
    saveRegistrationData : (registrationData) => dispatch({type: 'SAVE_REGISTRATION_DATA_LOCATION_PROFESIONAL', payload: registrationData})
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(RegistroProfesional2);

const dimensions = Dimensions.get('window');
const imageHeight = dimensions.height / 1;
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