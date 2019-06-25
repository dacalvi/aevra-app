import React from 'react';
import layout from '../constants/Layout';
import  LogoTitle  from './LogoTitle';
import { GroupTitle, AvatarProfesional, AevraRating, MultilineText } from '../components';
import RestApi from '../common/RestApi';
import { isSignedIn } from '../common/auth';
import { 
  View, 
  Text, 
  StyleSheet, 
  KeyboardAvoidingView, 
  ScrollView, 
  Dimensions, 
  Alert,
  Platform
} from 'react-native';
import { Button } from 'react-native-material-ui';
import {IconHeader, OpenDrawerProfesional, EnProcesoClienteItem} from '../components';
import styles from '../constants/Styles';
import validate from '../constants/validate_wrapper';
import KeyboardSpacer from 'react-native-keyboard-spacer';
const imageHeight = layout.window.height / 2.5;
const imageWidth = layout.window.width;
const dimensions = Dimensions.get('window');

export default class EnprocesoCliente extends React.Component {

  static navigationOptions = {
    headerTitle: <LogoTitle />,
    headerRight: <OpenDrawerProfesional/>,
    headerStyle: {
      backgroundColor: '#00AAB4',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {flex: 1, textAlign: 'center'}
  };
  
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      puntualidad: 1,
      amabilidad: 1,
      calidad: 1,
      orden: 1,
      comentarios: '',
      confirmaMalaCalificacion: false,
      comentariosError: ''
    };
  }

  btnTerminarTrabajoClick(){
      if(
          this.state.puntualidad == 1 &&
          this.state.amabilidad == 1 &&
          this.state.calidad == 1 &&
          this.state.orden == 1 &&
          this.state.confirmaMalaCalificacion == false
        ){
            Alert.alert(
                'Atencion!',
                'Esta calificando al profesional con un puntaje muy bajo en todos los aspectos. Para calificarlo toque las estrellas grises hasta lograr el puntaje deseado. Recuerde que siempre hay algo bueno que rescatar.',
                [
                    {text: 'Ups!, modificar calificacion', onPress: () => {
                        //console.log('Cancelando');
                    }},
                    {text: 'Calificar con 1 todo', onPress: () => {
                        //console.log('Prestador pesimo!');
                        this.setState({confirmaMalaCalificacion: true});
                    }},
                ],
                {cancelable: true},
            );
        }else{
            const comentariosError= validate('comentarios', this.state.comentarios);

            this.setState({
                comentariosError: comentariosError
            });

            if (!comentariosError) {
                let finalizarTrabajoData = {
                    "solicitud_id":this.props.navigation.state.params.solicitud.id,
                    "comentarios": this.state.comentarios,
                    "puntualidad":this.state.puntualidad,
                    "amabilidad":this.state.amabilidad,
                    "calidad":this.state.calidad,
                    "orden":this.state.orden
                }



                isSignedIn()
                .then(()=>{ 
                this.api = new RestApi();
                this.api.terminartrabajo(finalizarTrabajoData)
                    .then((responseJson)=>{
                    //console.log(responseJson);
                    Alert.alert("Gracias", "Ha finalizado el trabajo correctamente, gracias por usar AEVRA");
                    
                    this.props.navigation.push('EnProcesoCliente');
                    //this.props.navigation.navigate('EnProcesoCliente');
                    //this.setState({refreshing: false});
                    //this.setState({postulaciones : responseJson.data});
                    })
                    .catch((err)=>{
                    //console.log(err);
                    //this.setState({refreshing: false});
                    alert(err);
                    });
                })
                .catch(()=>{ this.props.navigation.navigate('Auth') });

                
              }


        }
  }

  render() {
    const { navigation } = this.props;
    const { solicitud } = this.props.navigation.state.params;
    return (

      <ScrollView>
        <View style={{marginleft: 10, marginRight:10, marginTop:20}} >
            <IconHeader 
            source={require('../assets/images/icon-user-black.png')}
            topTitle=""
            title="Terminar Trabajo"
            style={{marginBottom: 20}} />

            <GroupTitle label={solicitud.categoria_nombre}/>
            <Text style={{marginLeft: 10}}>{solicitud.descripcion}</Text>

            <AvatarProfesional
                    editable={false}
                    avatar={solicitud.avatar}
                    nombre={solicitud.nombre_profesional + ' ' + solicitud.apellido_profesional}
                    cantidadTrabajosFinalizados={solicitud.trabajos_finalizados}
                    estrellas={solicitud.rating_promedio}/>

            <AevraRating label="Puntualidad" rating={5} editable={true} onChange={(puntualidad) => {this.setState({puntualidad})}} />
            <AevraRating label="Amabilidad" rating={5} editable={true} onChange={(amabilidad) => {this.setState({amabilidad})}} />
            <AevraRating label="Calidad de Servicio" rating={5} editable={true} onChange={(calidad) => {this.setState({calidad})}} />
            <AevraRating label="Orden Limpieza" rating={5} editable={true} onChange={(orden) => {this.setState({orden})}} />
            <MultilineText 
                label="Comentarios" 
                onChangeText={(comentarios)=> {this.setState({comentarios})}}
                error={this.state.comentariosError}
                />
        </View>
      <View style={{flexDirection: 'row',justifyContent: 'center', marginBottom: 40}}>      
          <Button 
            raised 
            primary text="TERMINAR TRABAJO" style={styles.botonAevra} 
            //disabled={this.state.selectedCategorias.length == 0}
            onPress={() => { 
              this.btnTerminarTrabajoClick();
              
            }}/>
        </View>
        {Platform.OS === 'android' ? <KeyboardSpacer /> : null }
      </ScrollView>
        

    );
  }
}




