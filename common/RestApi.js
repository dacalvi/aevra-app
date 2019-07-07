import { AsyncStorage } from 'react-native';
import { isSignedIn } from './auth';
import { API_URL } from './config';
import { Permissions, Notifications } from 'expo';
//import bugsnag from '@bugsnag/expo';

export default class RestApi {


  handleErrors(response) {
    console.log(response);
    if (!response.ok) {
        //throw Error(response.statusText);
    }
    return response;
  }

  post(endpoint, params){

    console.log(">>>POST", endpoint, params);

    return new Promise((resolve, reject)=>{
      let headers = {
        Accept: 'application/json', 
        'Content-Type': 'application/json'
      };
      isSignedIn().then((token) => {
        headers['Authorization'] = token;
        resolve(fetch( endpoint , {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(params),
          })
        );
      }).catch((error)=>{
        reject(fetch( endpoint , {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(params)
          }));
      });
    });



  }

  get(endpoint){
    console.log(">>>GET", endpoint);
    return new Promise((resolve, reject)=>{
      let headers = {
        Accept: 'application/json', 
        'Content-Type': 'application/json'
      };

      isSignedIn().then((token) => {
        headers['Authorization'] = token;
        resolve(fetch( endpoint , {
          method: 'GET',
          headers: headers,
          withCredentials: true,
          credentials: 'include'
        }));

      }).catch((error)=>{
        reject(fetch( endpoint , {
          method: 'GET',
          headers: headers
        }));
      });
    });
  }

  comisiones(){
    return new Promise((resolve, reject)=>{
      let api = this.get(API_URL + 'comisiones');
      api
      .then(this.handleErrors)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.error){
          //console.log("<<<<<<API GET RESPONSE:", responseJson);
          reject(responseJson);
        }else{
          // console.log("<<<<<<API GET RESPONSE:", responseJson);
          resolve(responseJson);
        }
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  pagar(listado){
    return new Promise((resolve, reject)=>{
      let api = this.post(API_URL + 'pago', {'solicitudes': listado});
      api
      .then(this.handleErrors)
      .then((response) =>  response.json() )
      .then((responseJson) => {
        //console.log("service request then", responseJson);
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson);
        }
      })
      .catch((error) => {
        //console.log("service request catch", error, params);
        reject(error.error);
        //bugsnag.notify(error.error);
      });
    });
  }

  registerProfesional(params){
    return new Promise((resolve, reject)=>{
      let api = this.post( API_URL + 'register/profesional', params);
      api
      //.then(this.handleErrors)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson);
        }
      })
      .catch((error) => {
        reject(error.error);
      });
    });
  }

  registerCliente(params){
    //console.log("registro");
    return new Promise((resolve, reject)=>{
      let api = this.post(API_URL + 'register/cliente', params);
      api
      .then(this.handleErrors)
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson);
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson);
        }
      })
      .catch((error) => {
        //console.log(error);
        reject(error);
        //bugsnag.notify(error.error);
      });
    });
  }

  async registerForPushNotificationsAsync() {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
  
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
  
    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }
  
    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
  
    // POST the token to your backend server from where you can retrieve it to send push notifications.

    return this.saveexpotoken({expotoken: token})
    .then((responseJson)=>{
      //console.log(responseJson);
      //this.setState({categorias : responseJson.data});
    })
    .catch((err)=>{
      //console.log(err);
      alert(err);
    });
  }

  
  login(params){
    //console.log(params);
    return new Promise((resolve, reject) => {
      let api = this.post(API_URL + 'auth/login', params);
      api.then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.error){
          reject(responseJson);
        }else{
          if(responseJson.token && responseJson.token != ''){
            //Save token to store
            AsyncStorage.multiSet([
              ['token', responseJson.token],
              ['type', responseJson.type],
              ['user_id', responseJson.user_id]
            ], ()=> {
              resolve(responseJson);
            });

            this.registerForPushNotificationsAsync();
          }else{
            resolve(responseJson);
          }
        }
      })
      .catch((error) => {
        reject(error.error);
        //bugsnag.notify(error.error);
      });
    });
  }

  categorias(){
    return new Promise((resolve, reject)=>{
      let api = this.get(API_URL + 'categorias');
      api.then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.error){
          //console.log("<<<<<<API GET RESPONSE:", responseJson);
          reject(responseJson);
        }else{
          //console.log("<<<<<<API GET RESPONSE:", responseJson);
          resolve(responseJson);
        }
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  miscategorias(){
    return new Promise((resolve, reject)=>{
      let api = this.get(API_URL + 'categorias/mias');
      api.then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson);
        }
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  serviceRequest(params){
    console.log('service request', params);
    return new Promise((resolve, reject)=>{
      let api = this.post(API_URL + 'servicerequest', params);
      api
      .then(this.handleErrors)
      .then((response) =>  response.json() )
      .then((responseJson) => {
        console.log("service request then", responseJson);
        if(responseJson.error){
          console.log("<<<<<<API GET RESPONSE:", responseJson);
          reject(responseJson);
        }else{
          console.log("<<<<<<API GET RESPONSE:", responseJson);
          resolve(responseJson);
        }
      })
      .catch((error) => {
        //console.log("service request catch", error);
        reject(error.error);
        //bugsnag.notify(error.error);
      });
    });
  }


  adherirCateogoria(params){
    return new Promise((resolve, reject)=>{
      let api = this.post(API_URL + 'adherircategoria', params);
      api.then((response) =>  response.json() )
      .then((responseJson) => {
        //console.log("service request then", responseJson);
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson);
        }
      })
      .catch((error) => {
        //console.log("service request catch", error);
        reject(error.error);
        //bugsnag.notify(error.error);
      });
    });
  }

  disponibilidad(params){
    return new Promise((resolve, reject)=>{
      //console.log(params);

      let api = this.post(API_URL + 'disponibilidad', params);
      api.then((response) =>  response.json() )
      .then((responseJson) => {
        //console.log("service request then", responseJson);
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson);
        }
      })
      .catch((error) => {
        //console.log("service request catch", error, params);
        reject(error.error);
        //bugsnag.notify(error.error);
      });
    });
  }

  ofertas(){
    return new Promise((resolve, reject)=>{
      let api = this.get(API_URL + 'ofertas');
      api
      .then(this.handleErrors)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.error){
          console.log("then", responseJson);
          reject(responseJson);
        }else{
          console.log("<<<<<<API GET RESPONSE:", responseJson);
          resolve(responseJson);
        }
      })
      .catch((error) => {
        //console.log("catch", error);
        reject(error);
      });
    });
  }

  postular(params){
    return new Promise((resolve, reject)=>{
      let api = this.post(API_URL + 'ofertas', params);
      api
      //.then(this.handleErrors)
      .then((response) =>  response.json() )
      .then((responseJson) => {
        //console.log("service request then", responseJson);
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson);
        }
      })
      .catch((error) => {
        //console.log("service request catch", error, params);
        reject(error.error);
        //bugsnag.notify(error.error);
      });
    });
  }


  
  presupuestoedicionfinal(params){
    return new Promise((resolve, reject)=>{
      let api = this.post(API_URL + 'ofertas/edicionfinal', params);
      api
      .then(this.handleErrors)
      .then((response) =>  response.json() )
      .then((responseJson) => {
        console.log("service request then", responseJson);
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson);
        }
      })
      .catch((error) => {
        //console.log("service request catch", error, params);
        reject(error.error);
        //bugsnag.notify(error.error);
      });
    });
  }

  modificarpresupuesto(params){
    return new Promise((resolve, reject)=>{
      let api = this.post(API_URL + 'modificarpresupuesto', params);
      api.then((response) =>  response.json() )
      .then((responseJson) => {
        //console.log("service request then", responseJson);
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson);
        }
      })
      .catch((error) => {
        //console.log("service request catch", error, params);
        reject(error.error);
        //bugsnag.notify(error.error);
      });
    });
  }

  requestedServices(){
    return new Promise((resolve, reject)=>{
      let api = this.get(API_URL + 'requestedservices');
      api.then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson);
        }
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  requestedPendingServices(){
    return new Promise((resolve, reject)=>{
      let api = this.get(API_URL + 'requestedpendingservices');
      api
      .then(this.handleErrors)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson);
        }
      })
      .catch((error) => {
        reject(error);
      });
    });
  }
  


  cancelServiceRequest(id){
    return new Promise((resolve, reject)=>{
      let params = {"solicitud_id": id};
      let api = this.post(API_URL + 'servicerequest/cancel', params);
      api.then((response) =>  response.json() )
      .then((responseJson) => {
        //console.log("service request then", responseJson);
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson);
        }
      })
      .catch((error) => {
        //console.log("service request catch", error, params);
        reject(error.error);
        //bugsnag.notify(error.error);
      });
    });
  }

  aceptarPostulacion(solicitud_id, prestador, postulacion_id, monto){
    return new Promise((resolve, reject)=>{
      let params = {
        "solicitud_id": solicitud_id, 
        "prestador_seleccionado": prestador,
        "postulacion_aceptada_id": postulacion_id,
        "monto": monto
      };
      let api = this.post(API_URL + 'postulaciones/aceptar', params);
      api.then((response) =>  response.json() )
      .then((responseJson) => {
        //console.log("service request then", responseJson);
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson);
        }
      })
      .catch((error) => {
        //console.log("service request catch", error, params);
        reject(error.error);
        //bugsnag.notify(error.error);
      });
    });
  }

  postulaciones(){
    return new Promise((resolve, reject)=>{
      let api = this.get(API_URL + 'postulaciones');
      api.then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson);
        }
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  cancelarPostulacion(id){
    let params = {"postulacion_id": id};
    return new Promise((resolve, reject)=>{
      let api = this.post(API_URL + 'postulaciones/cancelar', params);
      api.then((response) =>  response.json() )
      .then((responseJson) => {
        //console.log("service request then", responseJson);
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson);
        }
      })
      .catch((error) => {
        //console.log("service request catch", error, params);
        reject(error.error);
        //bugsnag.notify(error.error);
      });
    });
  }



  enprocesocliente(){
    return new Promise((resolve, reject)=>{
      let api = this.get(API_URL + 'enproceso');
      api
      //.then(this.handleErrors)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson);
        }
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  enprocesoprofesional(){
    return new Promise((resolve, reject)=>{
      let api = this.get(API_URL + 'enproceso/profesional');
      api.then((response) => response.json())
      .then((responseJson) => {
        //console.log(responseJson);
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson);
        }
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  terminartrabajo(params){
    return new Promise((resolve, reject)=>{
      let api = this.post(API_URL + 'finishservice', params);
      api
      .then(this.handleErrors)
      .then((response) =>  response.json() )
      .then((responseJson) => {
        //console.log("service request then", responseJson);
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson);
        }
      })
      .catch((error) => {
        //console.log("service request catch", error, params);
        reject(error.error);
        //bugsnag.notify(error.error);
      });
    });
  }

  trabajosterminados(params){
    return new Promise((resolve, reject)=>{
      let api = this.get(API_URL + 'finishedservices');
      api
      .then(this.handleErrors)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson);
        }
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  /* params: expotoken: String */
  saveexpotoken(params){
    return new Promise((resolve, reject)=>{
      let api = this.post(API_URL + 'user/saveexpotoken', params);
      api.then((response) =>  response.json() )
      .then((responseJson) => {
        //console.log("Expo token saved:", responseJson);
        if(responseJson.error){
          //console.log("<<<<<<API GET RESPONSE:", responseJson);
          reject(responseJson);
        }else{
          //console.log("<<<<<<API GET RESPONSE:", responseJson);
          resolve(responseJson);
        }
      })
      .catch((error) => {
        //console.log("Problem saving expo token", error, params);
        reject(error.error);
        //bugsnag.notify(error.error);
      });
    });
  }
  
  cancelarTrabajoProfesional(id){
    //console.log(">>>>>>>ITEM", id);
    let params = {"solicitud_id": id};
    return new Promise((resolve, reject)=>{
      let api = this.post(API_URL + 'ofertas/cancelartrabajoprofesional', params);
      api
      //.then(this.handleErrors)
      .then((response) =>  response.json() )
      .then((responseJson) => {
        //console.log("service request then", responseJson);
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson);
        }
      })
      .catch((error) => {
        //console.log("service request catch", error, params);
        reject(error.error);
        //bugsnag.notify(error.error);
      });
    });
  }

  cancelarTrabajoCliente(id){
    let params = {"solicitud_id": id};
    return new Promise((resolve, reject)=>{
      let api = this.post(API_URL + 'ofertas/cancelartrabajocliente', params);
      api
      .then(this.handleErrors)
      .then((response) =>  response.json() )
      .then((responseJson) => {
        //console.log("service request then", responseJson);
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson);
        }
      })
      .catch((error) => {
        //console.log("service request catch", error, params);
        reject(error.error);
        //bugsnag.notify(error.error);
      });
    });
  }

  miperfilprofesional(){
    return new Promise((resolve, reject)=>{
      let api = this.get(API_URL + 'perfil/miperfilprofesional');
      api
      //.then(this.handleErrors)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.error){
          //console.log("then", responseJson);
          reject(responseJson);
        }else{
          //console.log("<<<<<<API GET RESPONSE:", responseJson);
          resolve(responseJson);
        }
      })
      .catch((error) => {
        //console.log("catch", error);
        reject(error);
      });
    });
  }

  miperfilcliente(){
    return new Promise((resolve, reject)=>{
      let api = this.get(API_URL + 'perfil/miperfilcliente');
      api
      //.then(this.handleErrors)
      .then((response) => response.json()) 
      .then((responseJson) => {
        if(responseJson.error){
          //console.log("then", responseJson);
          reject(responseJson);
        }else{
          //console.log("<<<<<<API GET RESPONSE:", responseJson);
          resolve(responseJson);
        }
      })
      .catch((error) => {
        //console.log("catch", error);
        reject(error);
      });
    });
  }

  perfilprofesional(profesional_id){
    return new Promise((resolve, reject)=>{
      let api = this.get(API_URL + 'perfil/perfilprofesional/'+ profesional_id);
      api
      //.then(this.handleErrors)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.error){
          //console.log("then", responseJson);
          reject(responseJson);
        }else{
          //console.log("<<<<<<API GET RESPONSE:", responseJson);
          resolve(responseJson);
        }
      })
      .catch((error) => {
        //console.log("catch", error);
        reject(error);
      });
    });
  }

  actualizaravatarprofesional(avatarbase64){
    let params = {"avatar": avatarbase64};
    return new Promise((resolve, reject)=>{
      let api = this.post(API_URL + 'perfil/actualizaravatarprofesional', params);
      api
      //.then(this.handleErrors)
      .then((response) =>  response.json() )
      .then((responseJson) => {
        //console.log("service request then", responseJson);
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson);
        }
      })
      .catch((error) => {
        //console.log("service request catch", error, params);
        reject(error.error);
        //bugsnag.notify(error.error);
      });
    });
  }

  actualizaravatarcliente(avatarbase64){
    let params = {"avatar": avatarbase64};
    return new Promise((resolve, reject)=>{
      let api = this.post(API_URL + 'perfil/actualizaravatarcliente', params);
      api
      //.then(this.handleErrors)
      .then((response) =>  response.json() )
      .then((responseJson) => {
        //console.log("service request then", responseJson);
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson);
        }
      })
      .catch((error) => {
        //console.log("service request catch", error, params);
        reject(error.error);
        //bugsnag.notify(error.error);
      });
    });
  }


  getChatMessages(chat_id){
    return new Promise((resolve, reject)=>{
      let api = this.get(API_URL + 'chat/messages/'+ chat_id);
      api
      .then(this.handleErrors)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.error){
          //console.log("then", responseJson);
          reject(responseJson);
        }else{
          //console.log("<<<<<<API GET RESPONSE:", responseJson);
          resolve(responseJson);
        }
      })
      .catch((error) => {
        //console.log("catch", error);
        reject(error);
      });
    });
  }


  sendChat(params){
    return new Promise((resolve, reject)=>{
      let api = this.post(API_URL + 'chat/sendChat', params);
      api
      .then(this.handleErrors)
      .then((response) =>  response.json() )
      .then((responseJson) => {
        //console.log("Expo token saved:", responseJson);
        if(responseJson.error){
          //console.log("<<<<<<API GET RESPONSE:", responseJson);
          reject(responseJson);
        }else{
          //console.log("<<<<<<API GET RESPONSE:", responseJson);
          resolve(responseJson);
        }
      })
      .catch((error) => {
        //console.log("Problem saving expo token", error, params);
        reject(error.error);
        //bugsnag.notify(error.error);
      });
    });
  }

  recomendedpros(params){
    return new Promise((resolve, reject)=>{
      let api = this.post(API_URL + 'recomendedpros/byrequesterandcategory', params);
      api
      .then(this.handleErrors)
      .then((response) =>  response.json() )
      .then((responseJson) => {
        //console.log("Expo token saved:", responseJson);
        if(responseJson.error){
          //console.log("<<<<<<API GET RESPONSE:", responseJson);
          reject(responseJson);
        }else{
          //console.log("<<<<<<API GET RESPONSE:", responseJson);
          resolve(responseJson.data);
        }
      })
      .catch((error) => {
        //console.log("Problem saving expo token", error, params);
        reject(error.error);
        //bugsnag.notify(error.error);
      });
    });
  }

  olvideContrasenaCliente(params){
    return new Promise((resolve, reject)=>{
      let api = this.post(API_URL + 'auth/forgotpassword', params);
      api
      .then((response) =>  response.json() )
      .then((responseJson) => {
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson.status);
        }
      })
      .catch((error) => {
        console.log(error);
        //console.log("Problem saving expo token", error, params);
        reject(error.error);
        //bugsnag.notify(error.error);
      });
    });
  }

  
  changePassword(params){
    return new Promise((resolve, reject)=>{
      let api = this.post(API_URL + 'changepassword', params);
      api
      .then((response) =>  response.json() )
      .then((responseJson) => {
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson.status);
        }
      })
      .catch((error) => {
        console.log(error);
        //console.log("Problem saving expo token", error, params);
        reject(error.error);
        //bugsnag.notify(error.error);
      });
    });
  }

  recibirNotificaciones(checked){
    console.log(checked);
    return new Promise((resolve, reject)=>{
      let api = this.post(API_URL + 'alertas/notificaciones', {checked});
      api
      .then((response) =>  response.json() )
      .then((responseJson) => {
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson.status);
        }
      })
      .catch((error) => {
        console.log(error);
        //console.log("Problem saving expo token", error, params);
        reject(error.error);
        //bugsnag.notify(error.error);
      });
    });
  }

  recibirMensajesPrivados(checked){
    console.log(checked);
    return new Promise((resolve, reject)=>{
      let api = this.post(API_URL + 'alertas/privados', {checked});
      api
      .then((response) =>  response.json() )
      .then((responseJson) => {
        if(responseJson.error){
          reject(responseJson);
        }else{
          resolve(responseJson.status);
        }
      })
      .catch((error) => {
        console.log(error);
        //console.log("Problem saving expo token", error, params);
        reject(error.error);
        //bugsnag.notify(error.error);
      });
    });
  }

  notificacionesStatus(){
    return new Promise((resolve, reject)=>{
      let api = this.get(API_URL + 'alertas/notificaciones');
      api
      //.then(this.handleErrors)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.error){
          //console.log("then", responseJson);
          reject(responseJson);
        }else{
          //console.log("<<<<<<API GET RESPONSE:", responseJson);
          resolve(responseJson);
        }
      })
      .catch((error) => {
        //console.log("catch", error);
        reject(error);
      });
    });
  }

  privadosStatus(){
    return new Promise((resolve, reject)=>{
      let api = this.get(API_URL + 'alertas/privados');
      api
      //.then(this.handleErrors)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.error){
          //console.log("then", responseJson);
          reject(responseJson);
        }else{
          //console.log("<<<<<<API GET RESPONSE:", responseJson);
          resolve(responseJson);
        }
      })
      .catch((error) => {
        //console.log("catch", error);
        reject(error);
      });
    });
  }

};