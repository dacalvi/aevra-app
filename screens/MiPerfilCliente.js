import React from 'react';
import  LogoTitle  from './LogoTitle';
import layout from '../constants/Layout';
import IconHeader from '../components/IconHeader';
import OpenDrawerProfesional from '../components/OpenDrawerProfesional';
import { 
  Image, 
  View, 
  Text, 
  StyleSheet, 
  KeyboardAvoidingView, 
  Button, 
  ScrollView, 
  ImageEditor, 
  ImageStore, 
  RefreshControl 
} from 'react-native';
import { GroupTitle, AevraRating } from '../components';
import AvatarCliente from '../components/AvatarCliente';
import RestApi from '../common/RestApi';
import Tilde from '../components/Tilde';
import { isSignedIn } from '../common/auth';

const imageHeight = layout.window.height / 2.5;
const imageWidth = layout.window.width;

export default class MiPerfilCliente extends React.Component {

  static navigationOptions = {
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#00AAB4',
    },
    headerRight: <Text></Text>,
    headerRight: <OpenDrawerProfesional/>,
    headerTintColor: '#fff',
    headerTitleStyle: {flex: 1, textAlign: 'center'}
  };


  constructor(){
    super();
    this.state = {
      refreshing: false,
      avatar: '',
      perfil: {
        nombre: '',
        trabajos_finalizados: 0,
        rating_promedio: 0,
        rating_puntualidad: 0,
        rating_amabilidad: 0,
        rating_calidad: 0,
        rating_orden: 0,
        comentarios: [],
        recibir_notificaciones: true,
        mensajes_privados: true
      }
    }
  }




  _onRefresh = () => {
    isSignedIn()
    .then(()=>{ 
      let api = new RestApi();
      this.setState({refreshing: true});
      api.miperfilcliente()
        .then((responseJson)=>{
          //console.log(">>>>>RESPONSE PERFIL>>>", responseJson);
          this.setState({refreshing: false, perfil : responseJson}, ()=>{   
            //console.log("newstate:",this.state) 
          });
        })
        .catch((err)=>{
          //console.log(err);
          this.setState({refreshing: false});
          alert(err);
        });
    })
    .catch(()=>{ 
      this.props.navigation.navigate('Auth') 
    });
  }


  
  componentWillMount(){
    this._onRefresh();
  }

  actualizar_avatar(avatar){
    let api = new RestApi();
    api.actualizaravatarprofesional()
    .then((responseJson)=>{
      //console.log(">>>>>RESPONSE PERFIL>>>", responseJson);
    })
    .catch((err)=>{
      //console.log(err);
      alert(err);
    });
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
    let avatarbase64 = dataset.avatar !== '' ? await this.resizeImage(dataset.avatar, 500, 500) : '';
    let api = new RestApi();
    api.actualizaravatarcliente(avatarbase64)
    .then((responseJson)=>{
      //console.log(">>>>>RESPONSE PERFIL>>>", responseJson);
    })
    .catch((err)=>{
      //console.log(err);
      alert(err);
    });
  }

  render() {
    return (
      <KeyboardAvoidingView 
            style={{ flex: 1, backgroundColor: '#fff' }} 
            behavior="position" 
            keyboardVerticalOffset={-200}
            enabled>
        <ScrollView refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }>
          <View style={{marginleft: 20, marginRight:20, marginTop:20, paddingLeft: 10, paddingRight: 10}} >
            

          <IconHeader 
            source={require('../assets/images/icon-user-black.png')}
            topTitle=""
            title="Mi Perfil"
            style={{marginBottom: 20}} />

            <AvatarCliente 
              avatar={this.state.perfil.avatar}
              editable={true}
              onChangeAvatar={(avatar)=>{this.setState({avatar}, ()=>{ 
                let apiPayload = {avatar: avatar};
                this.resizeImagesAndSend(apiPayload);
              })}}
              nombre={this.state.perfil.nombre}
              cantidadTrabajosSolicitados={this.state.perfil.trabajos_finalizados} 
              estrellas={this.state.perfil.rating_promedio}/>
            
            
            <Text style={{
              textDecorationLine: 'underline',
              marginBottom: 20
              
              }}>Cambiar contraseña</Text>
            
            <Tilde 
              label="Recibir Notificaciones"
              checked={this.state.recibir_notificaciones}
              onPress={(checked) => {
                this.setState({recibir_notificaciones: checked});
                //console.log(this.state);
              }}
              />

            <Tilde 
              label="Mensajes privados"
              checked={this.state.mensajes_privados}
              onPress={(checked) => {
                this.setState({mensajes_privados: checked});
                //console.log(this.state);
              }}
              />
          
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}




