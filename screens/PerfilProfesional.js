import React from 'react';
import  LogoTitle  from './LogoTitle';
import layout from '../constants/Layout';
import IconHeader from '../components/IconHeader';
import OpenDrawerProfesional from '../components/OpenDrawerProfesional';
import { Image, View, Text, StyleSheet, KeyboardAvoidingView, Button, ScrollView } from 'react-native';
import { GroupTitle, AvatarProfesional, AevraRating } from '../components';


const imageHeight = layout.window.height / 2.5;
const imageWidth = layout.window.width;

export default class PerfilProfesional extends React.Component {

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
    //this.props.navigation.state.params.user_id
  }

  render() {
    return (
      <KeyboardAvoidingView 
            style={{ flex: 1, backgroundColor: '#fff' }} 
            behavior="position" 
            keyboardVerticalOffset={-200}
            enabled>  
        <ScrollView>
          <View style={{marginleft: 20, marginRight:20, marginTop:20, paddingLeft: 10, paddingRight: 10}} >
            <AvatarProfesional 
              avatar={require('../assets/images/avatar.png')}
              nombre="Daniel Calvi"
              cantidadTrabajosFinalizados={215} 
              estrellas={5}/>
            <AevraRating label="Puntualidad" rating={5}/>
            <AevraRating label="Amabilidad" rating={5}/>
            <AevraRating label="Calidad de Servicio" rating={4}/>
            <AevraRating label="Orden Limpieza" rating={4}/>
            <GroupTitle label="Comentarios de Clientes"/>
            
            <Comentario titulo="Titulo comentario" texto="texto"/>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}




