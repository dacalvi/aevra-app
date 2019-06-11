import React from 'react';
import { connect } from 'react-redux';
import  LogoTitle  from './LogoTitle';
import styles from '../constants/Styles';
import OpenDrawerProfesional from '../components/OpenDrawerProfesional';
import RestApi from '../common/RestApi';
import { isSignedIn } from '../common/auth';
import validate from '../constants/validate_wrapper';
import { 
  Image, 
  View, 
  ScrollView, 
  Text, 
  TextInput, 
  Picker
} from 'react-native';
import { Button, Snackbar  } from 'react-native-material-ui';
import IconHeaderAndTopTitle  from '../components/IconHeaderAndTopTitle';
import MultilineText from '../components/MultilineText';
import {MultiImagePicker} from '../components/MultiImagePicker';
import GroupTitle from '../components/GroupTitle';
import Tilde from '../components/Tilde';
import { Constants, MapView } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import IconText from '../components/IconText';
import Horario from '../components/Horario';
import DireccionMapa from '../components/DireccionMapa';
import ADiaSemanaSelector from '../components/Semana/ADiaSemanaSelector';
class SolicitarServicio2 extends React.Component {
  
  static navigationOptions = {
    headerTitle: <LogoTitle />,
    headerRight: <OpenDrawerProfesional/>,
    headerStyle: {
      backgroundColor: '#00AAB4',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {flex: 1, textAlign: 'center'}
  };
  
  constructor(){
    super();
  
    this.state = {
        errorMsg: '',
        urgente: false,
        horario: '9a12',
        direccion: '',
        guardar_direccion: true,
        direccionError: '',
        dias: [
          false, //dom
          false, //lun
          false, //mar
          false, //mier
          false, //juev
          false, //vier
          false //Sabado
        ],
        diasError: ''
    }

    isSignedIn()
    .then(()=>{ 
      
    })
    .catch(()=>{ this.props.navigation.navigate('Auth') });
  }

  btnContinuarClick(){
    let nombreDias = ['domingo','lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
    const dias = this.state.dias.map( (item, index) => { return item? nombreDias[index] : false} ).filter(Boolean).join(',');
    const diasError = dias == '' ? "Ingrese al menos un día" : false;
    this.setState({diasError});


    const direccionError = validate('direccion', this.state.direccion);
    this.setState({direccionError});

    if(!direccionError && !diasError){
      let serviceRequestData = {
        direccion: this.state.direccion,
        urgente: this.state.urgente,
        horario: this.state.horario,
        guardar_direccion: this.state.guardar_direccion,
        coordenadas: this.state.location.latitude + ',' + this.state.location.longitude,
        dias
      };
      this.props.saveSolicitudData(serviceRequestData);
      this.props.navigation.navigate('SolicitarServicio3', this.props.navigation.state.params);
    }
  }

  render() {
    const {isVisible} = this.state
    return (
        <ScrollView>
         <View style={{marginleft: 20, marginRight:20, marginTop:20, paddingLeft: 10, paddingRight: 10}} >
            <IconHeaderAndTopTitle 
                topTitle="Servicio solicitado" 
                title={this.props.navigation.getParam('nombre')}
                source={this.props.navigation.getParam('imagen')}
                />
            <Tilde 
              label="Es una urgencia? (Realizarse inmediatamente)"
              checked={this.state.urgente}
              onPress={(checked) => {
                this.setState({urgente: checked});
              }} />
            
            <IconText 
              text="Seleccione los dias en los que puede realizar el trabajo" 
              icon="perm-contact-calendar" />
            
            <View style={{marginHorizontal:10, marginTop: 10}}>
              <ADiaSemanaSelector onDayChange={(dayIndex, status)=> {
                let { dias } = this.state;
                dias[dayIndex] = status;
                this.setState({dias});
                console.log(dias);
              }}/>
              { this.state.diasError!=='' ? <Text style={{color: 'red'}}>{this.state.diasError}</Text> : <Text> </Text> }
            </View>

            <Horario label="Horarios"
              onValueChange={(itemValue, itemIndex)=>{
                this.setState({horario: itemValue});
              }}
              selectedValue={this.state.horario} 
              items={[{label: '9 a 12', value: '9a12'}, {label: '13 a 18', value: '13a18'}]} />

            <GroupTitle label="Donde se realizara el servicio" />
            
            <DireccionMapa 
              onChangeAddress={(address)=>{this.setState({direccion: address})}}
              onChangeLocation={(location)=>{ this.setState({location}) }}
              guardar_direccion={true}
              error={this.state.direccionError}
              onChangeGuardarDireccion={(guardar_direccion) => {
                this.setState({guardar_direccion: guardar_direccion});
              }} />

              <View style={{flexDirection: `row`,justifyContent: `center`, marginBottom: 40}}>      
                <Button raised primary text="CONTINUAR" style={styles.botonAevra} 
                  onPress={() => { this.btnContinuarClick();}}/>
                <Snackbar visible={isVisible} message={this.state.errorMsg} onRequestClose={() => this.setState({ isVisible: false })} />
              </View>
            </View>
        </ScrollView>
    );
  }
}

function mapStateToProps(state){
  return {
    serviceRequest : state.serviceRequest
  }
}

function mapDispatchToProps(dispatch){
  return {
    saveSolicitudData : (serviceRequestData) => dispatch({type: 'SAVE_SERVICE_REQUEST_DATA2', payload: serviceRequestData})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SolicitarServicio2);