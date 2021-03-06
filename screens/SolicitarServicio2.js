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
  Picker,
  AsyncStorage
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
        ciudad: '',
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

      //Save Address for future uses
      if(this.state.guardar_direccion){
        AsyncStorage.multiSet([
            ['direccion_guardadas', this.state.direccion],
            ['ciudad_guardadas', this.state.ciudad],
            ['coordenadas_guardadas', this.state.location.latitude + ',' + this.state.location.longitude]
          ], () => {}
        );
      }

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
                
              }}/>
              { this.state.diasError!=='' ? <Text style={{color: 'red'}}>{this.state.diasError}</Text> : <Text> </Text> }
            </View>

            <Horario label="Horarios"
              onChangeValue={(horario => {
                console.log(horario);
                this.setState({horario});
              })}
              selectedValue={this.state.horario} 
              items={[
                {label: '00:00 a 04:00', value: '0a4'}, 
                {label: '04:00 a 08:00', value: '4a8'}, 
                {label: '08:00 a 12:00', value: '8a12'}, 
                {label: '12:00 a 16:00', value: '12a16'}, 
                {label: '16:00 a 20:00', value: '16a20'}, 
                {label: '20:00 a 24:00', value: '20a24'}
                ]} />

            <GroupTitle label="Donde se realizara el servicio" />
            
            <DireccionMapa 
              onChangeAddress={(address)=>{
                this.setState({direccion: address});
                }}
              onChangeCiudad={(ciudad)=>{this.setState({ciudad})}}
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