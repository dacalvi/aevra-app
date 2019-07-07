import React from 'react';
import  LogoTitle  from './LogoTitle';
import { Button } from 'react-native-material-ui';
import { 
    Image, 
    View, 
    Text,
    ScrollView, 
    KeyboardAvoidingView, 
    StyleSheet,
    Alert,
    Snackbar
} from 'react-native';
import { TextInput, Colors } from 'react-native-paper';
import styles from '../constants/Styles';
import layout from '../constants/Layout';
import { connect } from 'react-redux';
import IconHeader from '../components/IconHeader';
import ATextInput from '../components/ATextInput';
const imageHeight = layout.window.height / 2.5;
const imageWidth = layout.window.width;
import validate from '../constants/validate_wrapper';
import RestApi from '../common/RestApi';

class CambiarContrasena extends React.Component {
  
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
    oldpassword: '',
    newpassword: '',
    renewpassword: '',
    oldpasswordError: '',
    newpasswordError: '',
    renewpasswordError: ''
  };

  btnCambiarClick(){
    const oldpasswordError = validate('oldpassword', this.state.oldpassword);
    const newpasswordError = validate('password', this.state.newpassword);
    const renewpasswordError = validate('repassword', this.state.renewpassword);
    const passwordMatchError = this.state.newpassword !== this.state.renewpassword ? "Las contraseñas deben coincidir" : false;


    this.setState({
        oldpasswordError: oldpasswordError,
        newpasswordError: newpasswordError,
        renewpasswordError: renewpasswordError,
        passwordMatchError: passwordMatchError
    })

    if (!oldpasswordError && !newpasswordError && !renewpasswordError && !passwordMatchError) {
      let registrationData = {
        "oldpassword": this.state.oldpassword,
        "newpassword": this.state.newpassword
      }
     
      let api = new RestApi();
      api.changePassword(registrationData)
      .then((status)=>{
        if(status == 'ok'){
          Alert.alert("Correcto!", "La contraseña se ha cambiado correctamente");
          this.props.navigation.navigate('MiPerfilCliente1');
        }else if(status == 'fail'){
          Alert.alert("Error!", "La contraseña no es la correcta");
        }else{
          Alert.alert("Error!", "Hubo un error, intente nuevamente");
        }

      })
      .catch((err)=>{
        if(err){
          Alert.alert("Aviso", err.error);
          
        }
      });
    }else{
      
    }
  }

  render() {
    //const {isVisible} = this.state;
    return (
        <KeyboardAvoidingView style={styles.container}>
            <IconHeader 
                source={require('../assets/images/icon-user-black.png')}
                topTitle="Perfil de usuario"
                title="Cambiar contraseña"
                style={{marginBottom: 20}} />
            
            <ATextInput 
                  source={ require('../assets/images/icon-user.png') }
                  placeholder="Contraseña anterior"
                  onChangeText={value => this.setState({oldpassword: value.trim()})}
                  onBlur={() => {
                    this.setState({
                      oldpasswordError: validate('password', this.state.oldpassword)
                    })
                  }}
                  error={this.state.oldpasswordError}/>

            <ATextInput 
                  source={ require('../assets/images/icon-user.png') }
                  placeholder="Nueva contraseña"
                  onChangeText={value => this.setState({newpassword: value.trim()})}
                  onBlur={() => {
                    this.setState({
                      newpasswordError: validate('password', this.state.newpassword)
                    })
                  }}
                  error={this.state.newpasswordError}/>
            
            <ATextInput 
                  source={ require('../assets/images/icon-user.png') }
                  placeholder="Repetir Nueva contraseña"
                  onChangeText={value => this.setState({renewpassword: value.trim()})}
                  onBlur={() => {
                    this.setState({
                      renewpasswordError: validate('password', this.state.renewpassword)
                    })
                  }}
                  error={this.state.renewpasswordError}/>
            <View style={{marginLeft: 50}}>
                { this.state.passwordMatchError ? <Text style={{color: 'red'}}>{this.state.passwordMatchError}</Text> : <Text> </Text> }
            </View>
            
            
            <View style={{flexDirection: `row`,justifyContent: `center`, marginTop: 20}}>      
                <Button raised primary text="CAMBIAR CONTRASEÑA" style={styles.botonAevra} 
                onPress={() => { this.btnCambiarClick();}}/>
            </View>
            
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

export default connect(mapStateToProps, mapDispatchToProps)(CambiarContrasena);


  
