import React from "react";
import  LogoTitle  from './LogoTitle';
import { Dimensions, StyleSheet, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Button, Snackbar  } from 'react-native-material-ui';
import RestApi from '../common/RestApi';
import ATextInput from '../components/ATextInput';
import IconHeader from '../components/IconHeader';
import validate from '../constants/validate_wrapper';
import { connect } from 'react-redux';


class RegistroProfesional extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            nombre: '',
            apellido: '',
            email: '',            
            telefono: '',            
            password: '',            
            repassword: '',
            isVisible: false,
            errorMsg: '',
            emailError: '',
            telefonoError: '',
            nombreError: '',
            apellidoError: '',
            passwordError: '',
            repasswordError: '',
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

    btnRegistrarClick(){
      const emailError = validate('email', this.state.email);
      const telefonoError = validate('telefono', this.state.telefono);
      const nombreError = validate('nombre', this.state.nombre);
      const apellidoError = validate('apellido', this.state.apellido);
      const passwordError = validate('password', this.state.password);
      const repasswordError = validate('repassword', this.state.repassword);

    
      this.setState({
        emailError: emailError,
        telefonoError: telefonoError,
        nombreError: nombreError,
        apellidoError: apellidoError,
        passwordError: passwordError,
        repasswordError: repasswordError
      })


      if (!emailError && !telefonoError && !nombreError && !apellidoError && !passwordError && !repasswordError) {
        let registrationData = {
          "nombre": this.state.nombre,
          "apellido": this.state.apellido,
          "email": this.state.email,
          "telefono": this.state.telefono,
          "password": this.state.password
        }
        this.props.saveRegistrationData(registrationData);
        this.props.navigation.navigate('RegistroProfesional1');
      }
    }

    
    render() {
        const {isVisible} = this.state

        return (
          <KeyboardAvoidingView 
            style={{ flex: 1, backgroundColor: '#fff' }} 
            behavior="position" 
            keyboardVerticalOffset={-200}
            enabled>  
            <ScrollView>
              <View style={{marginleft: 20, marginRight:20, marginTop:20}} >
                <IconHeader 
                  source={require('../assets/images/icon-user-black.png')}
                  topTitle="Registro"
                  title="Prestador"
                  style={{marginBottom: 20}} />
                
                <ATextInput 
                  source={ require('../assets/images/icon-user.png') }
                  placeholder="Nombre"
                  onChangeText={value => this.setState({nombre: value.trim()})}
                  onBlur={() => {
                    this.setState({
                      nombreError: validate('nombre', this.state.nombre)
                    })
                  }}
                  error={this.state.nombreError}/>

                <ATextInput 
                  source={ require('../assets/images/icon-user.png') }
                  placeholder="Apellido"
                  onChangeText={value => this.setState({apellido: value.trim()})}
                  onBlur={() => {
                    this.setState({
                      apellidoError: validate('apellido', this.state.apellido)
                    })
                  }}
                  error={this.state.apellidoError}/>

                <ATextInput 
                  source={ require('../assets/images/icon-wallet.png') }
                  placeholder="Telefono"
                  keyboardType="phone-pad"
                  onChangeText={value => this.setState({telefono: value.trim()})}
                  onBlur={() => {
                    this.setState({
                      telefonoError: validate('telefono', this.state.telefono)
                    })
                  }}
                  error={this.state.telefonoError}/>

                <ATextInput 
                  source={ require('../assets/images/icon-mail.png') }
                  placeholder="Email"
                  keyboardType="email-address"
                  onChangeText={value => this.setState({email: value.trim()})}
                  autoCapitalize ={false}
                  onBlur={() => {
                    this.setState({
                      emailError: validate('email', this.state.email)
                    })
                  }}
                  error={this.state.emailError}/>


                <ATextInput 
                  source={ require('../assets/images/icon-check.png') }
                  placeholder="Contraseña"
                  textContentType="password"
                  secureTextEntry={true}
                  onChangeText={value => this.setState({password: value.trim()})}
                  onBlur={() => {
                    this.setState({
                      passwordError: validate('password', this.state.password)
                    })
                  }}
                  error={this.state.passwordError} />

                <ATextInput 
                  source={ require('../assets/images/icon-check.png') }
                  placeholder="Confirmar Contraseña"
                  textContentType="password"
                  secureTextEntry={true}
                  onChangeText={value => this.setState({repassword: value.trim()})}
                  onBlur={() => {
                    this.setState({
                      repasswordError: validate('repassword', this.state.repassword)
                    })
                  }}
                  error={this.state.repasswordError}/>
              </View>

              <View style={{flexDirection: `row`,justifyContent: `center`}}>      
                <Button raised primary text="REGISTRARME" style={styles.botonAevra} 
                  onPress={() => { this.btnRegistrarClick();}}/>
                <Snackbar visible={isVisible} message={this.state.errorMsg} onRequestClose={() => this.setState({ isVisible: false })} />
              </View>
            </ScrollView>
      
          </KeyboardAvoidingView>
          
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
    saveRegistrationData : (registrationData) => dispatch({type: 'SAVE_REGISTRATION_DATA_PROFESIONAL', payload: registrationData})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistroProfesional);

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