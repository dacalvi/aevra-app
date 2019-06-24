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
import DireccionMapa from '../components/DireccionMapa';

class ElegirServicioFlete extends React.Component {
  
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
        isVisible: false,
        errorMsg: '',
        descripcion: '',
        image1: '',
        image2: '',
        image3: '',
        image4: '',
        image5: '',
        dispone_materiales: false,
        desea_traigan_materiales: false,
        observaciones_materiales: '',
        destino: '', 
        destino_location: '',
        ciudad: ''
    }

    isSignedIn()
    .then(()=>{ 
      
    })
    .catch(()=>{ this.props.navigation.navigate('Auth') });
  }

  btnContinuarClick(){
    //console.log(this.state);
    const descripcionError = validate('descripcion', this.state.descripcion);
    const ciudadError = validate('ciudad', this.state.descripcion);
    this.setState({
      descripcionError: descripcionError,
      ciudadError: ciudadError,
    })
    if(!descripcionError && !ciudadError){
      //Save to store
      let serviceRequestData = {
        descripcion: this.state.descripcion,
        image1: this.state.image1,
        image2: this.state.image2,
        image3: this.state.image3,
        image4: this.state.image4,
        image5: this.state.image5,
        dispone_materiales: this.state.dispone_materiales,
        desea_traigan_materiales: this.state.desea_traigan_materiales,
        observaciones_materiales: this.state.observaciones_materiales,
        flete_destino: this.state.destino, 
        flete_location: this.state.destino_location.latitude + ',' + this.state.destino_location.longitude
      };
      this.props.saveSolicitudData(serviceRequestData);
      this.props.navigation.navigate('SolicitarServicio2', this.props.navigation.state.params);
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
          <View style={{marginleft: 20, marginRight:20, marginTop:20, paddingLeft: 10, paddingRight: 10}} >
            <IconHeaderAndTopTitle 
                topTitle="Servicio solicitado" 
                title={this.props.navigation.getParam('nombre')}
                source={this.props.navigation.getParam('imagen')}
                />

            <GroupTitle label="¿Qué desea trasladar?" />

            <MultilineText 
                label="Describa lo que desea trasladar"
                placeholder="Cuanto mejor describa el cargamento mejor podremos orientar su servicio"
                onChangeText={(text)=>{ this.setState({descripcion: text}) }}
                error={this.state.descripcionError}
                />
            <MultiImagePicker 
              label="Adjuntar Imágenes" 
              ImageAmount={5}
              onPictureTaken={(imageIndex, imageBase64) => {
                let newState = {};
                newState['image'+imageIndex] = imageBase64;
                this.setState(newState);
                //console.log(this.state);
                
            }} />

            <GroupTitle label="Destino del Flete" />
            
            <DireccionMapa
              onChangeCiudad={(ciudad)=>{this.setState({ciudad})}}
              onChangeAddress={(address)=>{this.setState({destino: address})}}
              onChangeLocation={(destino_location)=>{ this.setState({destino_location}) }}
              guardar_direccion={false}
              error={this.state.direccionError}
              onChangeGuardarDireccion={(guardar_direccion_flete) => {
                this.setState({guardar_direccion_flete});
              }} />

              { this.state.ciudadError ? <Text style={{color: 'red'}}>{this.state.ciudadError}</Text> : <Text> </Text> }
            
            <MultilineText 
                label="Observaciones"
                placeholder=""
                onChangeText={(text)=>{ 
                    this.setState({observaciones_materiales: text});
                    //console.log(this.state);
                    }}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(ElegirServicioFlete);