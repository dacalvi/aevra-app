import React from 'react';
import styles from '../constants/Styles';
import LogoTitle  from './LogoTitle';
import layout from '../constants/Layout';
import OpenDrawerProfesional from '../components/OpenDrawerProfesional';
import {MapaRadio} from '../components';
import IconHeader from '../components/IconHeader';
import GroupTitle from '../components/GroupTitle';
import Horario from '../components/Horario';
import ADiaSemanaSelector from '../components/Semana/ADiaSemanaSelector';
import {Dimensions, View, ScrollView, KeyboardAvoidingView, Text, Alert, Slider, ImageEditor, ImageStore } from 'react-native';
import { Button } from 'react-native-material-ui';
import RestApi from '../common/RestApi';
import validate from '../constants/validate_wrapper';
import { Constants, MapView } from 'expo';
import { connect } from 'react-redux';
const height = Dimensions.get('window').height;

class RegistroProfesionalValidado extends React.Component {

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

  constructor(props){
    super(props);
    this.state = {
      epicentro: null,
      radio: null,
      dias: [
        false, //dom
        false, //lun
        false, //mar
        false, //mier
        false, //juev
        false, //vier
        false //Sabado
      ],
      horario: '9a12'
    }
  }



  resizeImage(image, width, height){
    return new Promise((resolve, reject)=>{
      let cropConfig = {
        offset: {x:0,y:0},
        size: {width: image.width, height: image.height},
        displaySize: {width: width, height: height},
        resizeMode: 'stretch'
      };
      ImageEditor.cropImage(image.uri, cropConfig, (imageURI) => {
        ImageStore.getBase64ForTag(imageURI, (base64Data) => {
            resolve(base64Data);
        }, (reason) => {
          console.error(reason);
          reject(reason);
        });
      }, (reason) => {
        console.error(reason);
        reject(reason);
      });
    });
  }

  async resizeImagesAndSend(dataset){
    if(dataset.length == 0){
      return new Promise( (resolve) => {
        resolve(dataset);
      })
    }else{
      const promises = dataset.map(async (item, key)=> {
        item.image = await this.resizeImage(item.image, 500, 500);
        return item;
      });
      return Promise.all(promises);
    }
  }
  
  sendAllRequests(categorias){
    let api = new RestApi();
    const promises = categorias.map(async (categoria, key)=> {
      item = await api.adherirCateogoria(categoria);
      return item;
    });
    return Promise.all(promises);
  }
  
  saveWorkingArea(params){
    let nombreDias = ['domingo','lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
    let api = new RestApi();
    let payload = {};
    payload.epicentro = params.epicentro;
    payload.radio = params.radio;
    payload.horario = params.horario;
    payload.dias = params.dias.filter(Boolean).map((item, index) => { return nombreDias[index] });
    payload.dias = payload.dias.join(",");
    if(
      payload.dias == '' || 
      payload.radio == null ||
      payload.epicentro == null ||
      payload.horario == null
      ){
        return new Promise((resolve, reject)=>{ reject("Por favor complete todos los datos")})
      }else{
        return api.disponibilidad(payload);
      }
  }

  btnTerminarClick(){

    

    let payload = {...this.props.adherirCategorias.adherirCategorias, ...this.state};
    this.resizeImagesAndSend(payload.selectedCategoriasImages).then( (selectedCategoriasImages) => {
      payload.selectedCategoriasImages = selectedCategoriasImages;
      let categorias = payload.selectedCategorias.map((categoria)=> {
        let img = payload.selectedCategoriasImages.find((image)=>{return image.id == categoria});
        img = img ? img.image: '';
        return {
          categoria_id: categoria,
          imagen: img
        }
      });

      this.sendAllRequests(categorias).then( (response) => {
        this.saveWorkingArea(payload)
        .then( (response) => {
          this.props.navigation.navigate('OfertasTrabajo');
        });
      }).catch((error) =>{
        Alert.alert(error);
      });
    });
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
        <View style={{ marginTop:20}} >
          <IconHeader 
            source={require('../assets/images/icon-user-black.png')}
            topTitle="Registro"
            title="Prestador"
            style={{marginBottom: 20}} />
          
          <GroupTitle label="SELECCIONE UNA ZONA DE TRABAJO" />
          <Text style={{ marginLeft: 10}}>Marque un punto en el mapa y seleccione un radio.</Text>
          
          <MapaRadio radius={500} onChange={(latLngRad)=> {
            
            this.setState({
              epicentro: latLngRad.latitude + ',' + latLngRad.longitude,
              radio: latLngRad.radius
            });
          }
          }/>

          <ADiaSemanaSelector onDayChange={(dayIndex, status)=> {
            let { dias } = this.state;
            dias[dayIndex] = status;
            this.setState({dias});
          }} />

          <Horario 
            selectedValue="9a12"
            onValueChange={(horario)=>{ 
              this.setState( {horario})
            }}
            />

          <View style={{flexDirection: 'row',justifyContent: 'center', marginBottom: 40}}>      
            <Button raised primary text="TERMINAR" style={styles.botonAevra} 
              onPress={() => {  this.btnTerminarClick(); }}/>
          </View>
          
        </View>

        
      </ScrollView>

    </KeyboardAvoidingView>
    );
  }
}


function mapStateToProps(state){
  return {
    adherirCategorias : state.adherirCategoria
  } 
}

function mapDispatchToProps(dispatch){
  return {
    saveRegistrationData : (registrationData) => dispatch({type: 'SAVE_REGISTRATION_DATA_ID_PROFESIONAL', payload: registrationData})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistroProfesionalValidado);


