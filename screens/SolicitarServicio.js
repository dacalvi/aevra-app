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


class SolicitarServicio extends React.Component {
  
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
        observaciones_materiales: ''
    }

    isSignedIn()
    .then(()=>{ 
      
    })
    .catch(()=>{ this.props.navigation.navigate('Auth') });
  }

  btnContinuarClick(){
    console.log(this.props.navigation.state.params);
    const descripcionError = validate('descripcion', this.state.descripcion);
    this.setState({
      descripcionError: descripcionError
    })
    if(!descripcionError){
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
        observaciones_materiales: this.state.observaciones_materiales
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
                //title="Carpinteria"
                //source="http://192.168.0.12/aevra_api/assets/uploads/categorias/2f906-aire.fw.png"
                />
            <MultilineText 
                label="Descripcion de la tarea a realizar"
                placeholder="Cuanto mejor describa el trabajo mejor podremos orientar su servicio"
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
                console.log(this.state);
                
            }} />

            <GroupTitle label="Materiales" />
            <Tilde 
              label="Dispone de materiales para realizar el trabajo?"
              checked={this.state.dispone_materiales}
              onPress={(checked) => {
                this.setState({dispone_materiales: checked});
                console.log(this.state);
              }}
              />
            <Tilde 
              label="Desea que traigan los materiales a utilizar?"
              checked={this.state.terminos}
              onPress={(checked) => {
                this.setState({desea_traigan_materiales: checked});
                console.log(this.state);
              }}
              />
            <MultilineText 
                label="Observaciones sobre los materiales"
                placeholder=""
                onChangeText={(text)=>{ 
                    this.setState({observaciones_materiales: text});
                    console.log(this.state);
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

export default connect(mapStateToProps, mapDispatchToProps)(SolicitarServicio);