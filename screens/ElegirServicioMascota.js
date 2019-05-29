import React from 'react';
import { connect } from 'react-redux';
import  LogoTitle  from './LogoTitle';
import styles from '../constants/Styles';
import OpenDrawerProfesional from '../components/OpenDrawerProfesional';
import RestApi from '../common/RestApi';
import { isSignedIn } from '../common/auth';
import validate from '../constants/validate_wrapper';
import { Image, View, ScrollView, Text, KeyboardAvoidingView } from 'react-native';
import { Button, Snackbar  } from 'react-native-material-ui';
import IconHeaderAndTopTitle  from '../components/IconHeaderAndTopTitle';
import MultilineText from '../components/MultilineText';
import {MultiImagePicker} from '../components/MultiImagePicker';
import GroupTitle from '../components/GroupTitle';
import Tilde from '../components/Tilde';
import { RadioButton } from 'react-native-paper';


class ElegirServicioMascota extends React.Component {
  
  static navigationOptions = {
    headerTitle: <LogoTitle />,
    headerRight: <OpenDrawerProfesional/>,
    headerStyle: {
      backgroundColor: '#00AAB4',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {flex: 1, textAlign: 'center'}
  };

  state = {};

  constructor(){
    super();
  
    this.state = {
        isVisible: false,
        errorMsg: '',
        descripcion: '',
        tamanio: 'chico',
        buscar_mascota: 'venir_a_buscar'
    }

    isSignedIn()
    .then(()=>{ 
      
    })
    .catch(()=>{ this.props.navigation.navigate('Auth') });
  }

  btnContinuarClick(){

    const descripcionError = validate('descripcion', this.state.descripcion);
    
    this.setState({
      descripcionError: descripcionError
    })

    if(!descripcionError){
      //Save to store
      let serviceRequestData = {
        descripcion: this.state.descripcion,
        mascota_tamanio: this.state.tamanio,
        mascota_buscar_mascota: this.state.buscar_mascota
      };
      this.props.saveSolicitudData(serviceRequestData);
      this.props.navigation.navigate('SolicitarServicio2', this.props.navigation.state.params);
    }
  }




  render() {
    const {isVisible, tamanio, buscar_mascota} = this.state
    return (

      <KeyboardAvoidingView 
            style={{ flex: 1, backgroundColor: '#fff' }} 
            behavior="position" 
            keyboardVerticalOffset={-200}
            enabled>  
        <ScrollView>
          <View style={{marginleft: 20, marginRight:20, marginTop:20, paddingLeft: 10, paddingRight: 10}} >
            <IconHeaderAndTopTitle 
                topTitle="Servicio solicitado" 
                title={this.props.navigation.getParam('nombre')}
                source={this.props.navigation.getParam('imagen')}
                />
            
            <MultilineText 
                label="Descripcion de la tarea a realizar"
                placeholder="Cuanto mejor describa el trabajo mejor podremos orientar su servicio"
                onChangeText={(text)=>{ this.setState({descripcion: text}) }}
                error={this.state.descripcionError}
                />

            <GroupTitle label="Tamaño de la mascota" />
            <View style={{ marginLeft: 10 }}>
              <RadioButton.Group
                onValueChange={tamanio => this.setState({ tamanio })}
                value={this.state.tamanio} >
                
                <View>
                  <View style={{flex:1, flexDirection: 'row'}}>
                    <Text style={{width: '80%'}}>Chico (entre 1 a 13 kilos)</Text>
                    <RadioButton  style={{width: '20%'}} value="chico" />
                  </View>
                </View>

                <View>
                  <View style={{flex:1, flexDirection: 'row'}}>
                    <Text style={{width: '80%'}}>Mediano (entre 14 a 30 kilos)</Text>
                    <RadioButton  style={{width: '20%'}} value="mediano" />
                  </View>
                </View>
                
                <View>
                  <View style={{flex:1, flexDirection: 'row'}}>
                    <Text style={{width: '80%'}}>Grande (entre 31 kilos o más)</Text>
                    <RadioButton  style={{width: '20%'}} value="grande" />
                  </View>
                </View>
              </RadioButton.Group>
            </View>
            
            <GroupTitle label="Lugar del servicio" />
            <View style={{ marginLeft: 10 }}>
              <RadioButton.Group
                onValueChange={buscar_mascota => this.setState({ buscar_mascota })}
                value={this.state.buscar_mascota} >
                
                <View>
                  <View style={{flex:1, flexDirection: 'row'}}>
                    <Text style={{width: '80%'}}>¿Quiere que vayan a buscar a su mascota?</Text>
                    <RadioButton  style={{width: '20%'}} value="venir_a_buscar" />
                  </View>
                </View>

                <View>
                  <View style={{flex:1, flexDirection: 'row'}}>
                    <Text style={{width: '80%'}}>¿Puede llevar a su mascota?</Text>
                    <RadioButton  style={{width: '20%'}} value="yo_llevo" />
                  </View>
                </View>
                
                <View>
                  <View style={{flex:1, flexDirection: 'row'}}>
                    <Text style={{width: '80%'}}>¿Quere realizar el servicio en su hogar?</Text>
                    <RadioButton  style={{width: '20%'}} value="en_mi_casa" />
                  </View>
                </View>
              </RadioButton.Group>
            </View>
            
            
              <View style={{flexDirection: `row`,justifyContent: `center`, marginBottom: 40}}>      
                <Button raised primary text="CONTINUAR" style={styles.botonAevra} 
                  onPress={() => { this.btnContinuarClick();}}/>
                <Snackbar visible={isVisible} message={this.state.errorMsg} onRequestClose={() => this.setState({ isVisible: false })} />
              </View>
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
    saveSolicitudData : (serviceRequestData) => dispatch({type: 'SAVE_SERVICE_REQUEST_DATA', payload: serviceRequestData})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ElegirServicioMascota);