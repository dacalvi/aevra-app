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
  ScrollView, 
  ImageEditor, 
  ImageStore, 
  RefreshControl,
  TouchableOpacity
} from 'react-native';
import { GroupTitle, AevraRating } from '../components';
import AvatarProfesional from '../components/AvatarProfesional';
import RestApi from '../common/RestApi';

import { isSignedIn } from '../common/auth';

import { Button } from 'react-native-material-ui';

const imageHeight = layout.window.height / 2.5;
const imageWidth = layout.window.width;

export default class MiPerfilProfesional extends React.Component {

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
      api.miperfilprofesional()
        .then((responseJson)=>{
          this.setState({refreshing: false, perfil : responseJson}, ()=>{   
          });
        })
        .catch((err)=>{
          this.setState({refreshing: false});
          alert(err);
        });

        //Notificaciones
        let api2 = new RestApi();
        api2.notificacionesStatus()
        .then((responseJson)=>{
          let recibir_notificaciones = responseJson.status == "1"? true : false;
          this.setState({recibir_notificaciones});
        })
        .catch((err)=>{
          alert(err);
        });

        //Privados
        let api3 = new RestApi();
        api3.privadosStatus()
        .then((responseJson)=>{
          this.setState({mensajes_privados : responseJson.status == "1"? true:false});
        })
        .catch((err)=>{
          alert(err);
        });

    })
    .catch(()=>{ 
      this.props.navigation.navigate('Auth') 
    });
  }

  recibirNotificaciones(checked){
    let api = new RestApi();
    api.recibirNotificaciones(checked)
    .then((responseJson)=>{
    })
    .catch((err)=>{
      alert(err);
    });
  }

  recibirMensajesPrivados(checked){
    let api = new RestApi();
    api.recibirMensajesPrivados(checked)
    .then((responseJson)=>{
    })
    .catch((err)=>{
      alert(err);
    });
  }
  
  componentWillMount(){
    this._onRefresh();
  }

  actualizar_avatar(avatar){
    let api = new RestApi();
    api.actualizaravatarprofesional()
    .then((responseJson)=>{
    })
    .catch((err)=>{
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
    api.actualizaravatarprofesional(avatarbase64)
    .then((responseJson)=>{
    })
    .catch((err)=>{
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
            <AvatarProfesional 
              avatar={this.state.perfil.avatar}
              editable={true}
              onChangeAvatar={(avatar)=>{this.setState({avatar}, ()=>{ 
                let apiPayload = {avatar: avatar};
                this.resizeImagesAndSend(apiPayload);
              })}}
              nombre={this.state.perfil.nombre}
              cantidadTrabajosFinalizados={this.state.perfil.trabajos_finalizados} 
              estrellas={this.state.perfil.rating_promedio}/>
            <AevraRating label="Puntualidad" rating={this.state.perfil.rating_puntualidad}/>
            <AevraRating label="Amabilidad" rating={parseInt(this.state.perfil.rating_amabilidad)}/>
            <AevraRating label="Calidad de Servicio" rating={this.state.perfil.rating_calidad}/>
            <AevraRating label="Orden Limpieza" rating={this.state.perfil.rating_orden}/>
            <GroupTitle label="Comentarios de Clientes"/>
              
            {this.state.perfil.comentarios.map((comentario, i)=>{
                return (
                  <Comentario key={i} titulo={comentario.nombre} texto={comentario.comentarios}/>
                );
            })}

            <TouchableOpacity onPress={()=> { this.props.navigation.navigate("CambiarContrasena") }}>
              <Text style={{textDecorationLine: 'underline',marginBottom: 20}}>Cambiar contraseña</Text>
            </TouchableOpacity>

            <View style={{ flex:1, flexDirection: 'column', alignItems: "center"}}>
              <Button raised primary 
                text="DETALLE DE DEUDA" 
                style={styles.botonAevra} 
                onPress={() => {this.props.navigation.navigate('DetalleDeuda')} } />
              <Button raised primary 
                text="INSCRIBIRSE A UN SERVICIO" 
                style={styles.botonAevra} 
                onPress={() => {this.props.navigation.navigate('AdherirCategoriaProfesional')} } />
            </View>
            
            {recibir_notificaciones ?
              <TouchableOpacity onPress={() => {
                this.setState({recibir_notificaciones: false});
                this.recibirNotificaciones(false);
              }}>
                <Text style={{textDecorationLine: 'underline',marginBottom: 20}}>Dejar de recibir notificaciones</Text>
              </TouchableOpacity>:
              <TouchableOpacity onPress={() => {
                this.setState({recibir_notificaciones: true});
                this.recibirNotificaciones(true);
              }}>
                <Text style={{textDecorationLine: 'underline',marginBottom: 20}}>Recibir notificaciones</Text>
              </TouchableOpacity>
            }
            
            {mensajes_privados ? 
              <TouchableOpacity onPress={() => {
                this.setState({mensajes_privados: false});
                this.recibirMensajesPrivados(false);
              }}>
                <Text style={{textDecorationLine: 'underline',marginBottom: 20}}>Dejar de recibir Mensajes Privados</Text> 
              </TouchableOpacity>
              
              : 
              <TouchableOpacity onPress={() => {
                this.setState({mensajes_privados: true});
                this.recibirMensajesPrivados(true);
              }}>
                <Text style={{textDecorationLine: 'underline',marginBottom: 20}}>Recibir mensajes privados</Text>
              </TouchableOpacity>
                
            }
              
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}


const styles = StyleSheet.create({
  botonAevra: {
    color: 'white',
    backgroundColor: '#00AAB4', 
    borderRadius: 30
  }
});



