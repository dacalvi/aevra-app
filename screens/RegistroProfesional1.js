import React from "react";
import  LogoTitle  from './LogoTitle';
import { 
  Dimensions, 
  StyleSheet, 
  View, 
  ScrollView, 
  KeyboardAvoidingView,
  DatePickerAndroid,
  Text, 
} from 'react-native';
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

        console.log("Lo que vino del store es:", props.register);
        this.state = {
            fotofrente: {uri:''},
            fotodnifrente: {uri:''},
            fotodnidorso: {uri:''},            
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

    componentDidMount(){
      console.log("componentDidMount", this.props.register);
      let newState = {};
      if(typeof this.props.register.registrationDataID.fotofrente !== 'undefined'){
        newState.fotofrente = this.props.register.registrationDataID.fotofrente;
      }else{
        newState.fotofrente = {uri:''};
      }

      if(typeof this.props.register.registrationDataID.fotodnifrente !== 'undefined'){
        newState.fotodnifrente = this.props.register.registrationDataID.fotodnifrente;
      }else{
        newState.fotodnifrente = {uri:''};
      }

      if(typeof this.props.register.registrationDataID.fotodnidorso !== 'undefined'){
        newState.fotodnidorso = this.props.register.registrationDataID.fotodnidorso;
      }else{
        newState.fotodnidorso = {uri:''};
      }

      if(typeof this.props.register.registrationDataID.fechanacimiento !== 'undefined'){
        newState.fechanacimiento = this.props.register.registrationDataID.fechanacimiento;
      }else{
        newState.fechanacimiento = '';
      }

      if(typeof this.props.register.registrationDataID.paisnacimiento !== 'undefined'){
        newState.paisnacimiento = this.props.register.registrationDataID.paisnacimiento;
      }else{
        newState.paisnacimiento = '';
      }

      if(typeof this.props.register.registrationDataID.dni !== 'undefined'){
        newState.dni = this.props.register.registrationDataID.dni;
      }else{
        newState.dni = '';
      }
      this.setState(newState);
    }

    componentWillUnmount(){
      this.save();
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
        this.save();
        this.props.navigation.navigate('RegistroProfesional2');
      }
    }

    save(){
      let registrationData = {
        "fotofrente": this.state.fotofrente,
        "fotodnifrente": this.state.fotodnifrente,
        "fotodnidorso": this.state.fotodnidorso,
        "fechanacimiento": this.state.fechanacimiento,
        "paisnacimiento": this.state.paisnacimiento,
        "dni": this.state.dni
      }
      this.props.saveRegistrationData(registrationData);
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
                  initialImage={this.state.fotofrente}
                  onPictureTaken={fotofrente => this.setState({fotofrente})}
                  error={this.state.fotofrenteError}
                />

                <IDWithPictures
                  initialImage1={this.state.fotodnifrente}
                  initialImage2={this.state.fotodnidorso}
                  placeholder="DNI"
                  errorFrente={this.state.fotodnifrenteError}
                  errorDorso={this.state.fotodnidorsoError}
                  keyboardType="numeric"
                  value={this.state.dni}
                  errorDNI={this.state.dniError}
                  onChangeText={(dni)=>{this.setState({dni})}}
                  onPictureFrenteTaken={(fotodnifrente)=>{this.setState({fotodnifrente})}}
                  onPictureDorsoTaken={(fotodnidorso)=>{this.setState({fotodnidorso})}}
                />

                <FechaNacimiento
                  value={this.state.fechanacimiento}
                  placeholder="Fecha de Nacimiento"
                  onDateChange={(fechanacimiento)=>{ 
                      console.log(fechanacimiento);
                    this.setState({fechanacimiento}) }}
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