import React from "react";
import  LogoTitle  from './LogoTitle';
import { Dimensions, StyleSheet, View, ScrollView, KeyboardAvoidingView, DatePickerAndroid } from 'react-native';
import { Button } from 'react-native-material-ui';
import IconHeader from '../components/IconHeader';
import IDAndPerson from '../components/IDAndPerson';
import validate from '../constants/validate_wrapper';
import IDWithPictures from '../components/IDWithPictures';
import FechaNacimiento from '../components/FechaNacimiento';
import Nacionalidad from '../components/Nacionalidad';
import { connect } from 'react-redux';

class RegistroProfesional1 extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            fotofrente: '',
            fotodnifrente: '',
            fotodnidorso: '',            
            dni: '',            
            fechanacimiento: '',            
            paisnacimiento: 'Argentina',
            dniError: '',
            fotofrenteError: '',
            fotodnifrenteError: '',
            fotodnidorsoError: '',
            fechanacimientoError: ''
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

    btnContinuarClick(){
      
      const fotofrenteError = validate('fotofrente', this.state.fotofrente.uri);
      const fotodnifrenteError = validate('fotodnifrente', this.state.fotodnifrente.uri);
      const fotodnidorsoError = validate('fotodnidorso', this.state.fotodnidorso.uri);
      const fechanacimientoError = validate('fechanacimiento', this.state.fechanacimiento);
      const dniError = validate('dni', this.state.dni);
    
      this.setState({
        fotofrenteError: fotofrenteError,
        fotodnifrenteError: fotodnifrenteError,
        fotodnidorsoError: fotodnidorsoError,
        fechanacimientoError: fechanacimientoError,
        dniError: dniError
      })

      if (!fotofrenteError && !fotodnifrenteError && !fotodnidorsoError && !fechanacimientoError && !dniError) {
        let registrationData = {
          "fotofrente": this.state.fotofrente,
          "fotodnifrente": this.state.fotodnifrente,
          "fotodnidorso": this.state.fotodnidorso,
          "fechanacimiento": this.state.fechanacimiento,
          "paisnacimiento": this.state.paisnacimiento,
          "dni": this.state.dni
        }
        this.props.saveRegistrationData(registrationData);
        this.props.navigation.navigate('RegistroProfesional2');
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
              <View style={{margin: 20}} >
                <IconHeader 
                    source={require('../assets/images/icon-user-black.png')}
                    topTitle="Registro"
                    title="Prestador"
                    style={{marginBottom: 20}} />
                <IDAndPerson 
                  onPictureTaken={fotofrente => this.setState({fotofrente})}
                  error={this.state.fotofrenteError}
                />

                <IDWithPictures
                  placeholder="DNI"
                  errorFrente={this.state.fotodnifrenteError}
                  errorDorso={this.state.fotodnidorsoError}
                  errorDNI={this.state.dniError}
                  onChangeText={(dni)=>{this.setState({dni})}}
                  onPictureFrenteTaken={(fotodnifrente)=>{this.setState({fotodnifrente})}}
                  onPictureDorsoTaken={(fotodnidorso)=>{this.setState({fotodnidorso})}}
                />

                <FechaNacimiento 
                  placeholder="Fecha de Nacimiento"
                  onDateChange={(fechanacimiento)=>{ this.setState({fechanacimiento}) }}
                  error={this.state.fechanacimientoError}
                  />

                <Nacionalidad
                  onCountryChange={(paisnacimiento)=>{this.setState({paisnacimiento})}}
                  selected={this.state.paisnacimiento}/>

                <View style={{flexDirection: 'row',justifyContent: 'center'}}>
                  <Button raised primary text="CONTINUAR" style={{color: 'white',backgroundColor: '#00AAB4', borderRadius: 30}} 
                    onPress={() => { this.btnContinuarClick();}}/>
                </View>
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
    saveRegistrationData : (registrationData) => dispatch({type: 'SAVE_REGISTRATION_DATA_ID_PROFESIONAL', payload: registrationData})
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(RegistroProfesional1);

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