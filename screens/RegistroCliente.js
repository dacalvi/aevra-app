import React from "react";
import  LogoTitle  from './LogoTitle';
import { Dimensions, StyleSheet, View, ScrollView, KeyboardAvoidingView, Text } from 'react-native';
import { Button, Snackbar  } from 'react-native-material-ui';
import RestApi from '../common/RestApi';
import ATextInput from '../components/ATextInput';
import IconHeader from '../components/IconHeader';
import validate from '../constants/validate_wrapper';
import { connect } from 'react-redux';


class RegistroCliente extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            nombre: '',
            apellido: '',
            email: '',                      
            password: '',            
            repassword: '',
            isVisible: false,
            errorMsg: '',
            emailError: '',
            nombreError: '',
            apellidoError: '',
            passwordError: '',
            repasswordError: '',
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

    btnRegistrarClick(){
      console.log("btnRegistrarClick");
      const emailError = validate('email', this.state.email);
      const nombreError = validate('nombre', this.state.nombre);
      const apellidoError = validate('apellido', this.state.apellido);
      const passwordError = validate('password', this.state.password);
      const repasswordError = validate('repassword', this.state.repassword);

    
      this.setState({
        emailError: emailError,
        nombreError: nombreError,
        apellidoError: apellidoError,
        passwordError: passwordError,
        repasswordError: repasswordError
      })

      if (!emailError && !nombreError && !apellidoError && !passwordError && !repasswordError) {
        let registrationData = {
          "nombre": this.state.nombre,
          "apellido": this.state.apellido,
          "email": this.state.email,
          "password": this.state.password
        }
        console.log(registrationData);

        let api = new RestApi();
        api.registerCliente(registrationData)
        .then((result)=>{
          console.log(result);
          this.props.navigation.navigate('GraciasRegistroCliente');
        })
        .catch((err)=>{
          if(err){
            console.log(err);
            this.setState({isVisible: true, errorMsg: err.error});
          }
        });
      }else{
        this.setState({isVisible: true, errorMsg: 'Validacion Fallida'});
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
                  title="Usuario"
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
                  source={ require('../assets/images/icon-mail.png') }
                  placeholder="Email"
                  keyboardType="email-address"
                  onChangeText={value => this.setState({email: value.trim()})}
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

export default connect(mapStateToProps, mapDispatchToProps)(RegistroCliente);

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