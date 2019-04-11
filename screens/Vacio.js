/*
const styles = StyleSheet.create({
  botonAevra: {
    color: 'white',
    backgroundColor: '#00AAB4', 
    borderRadius: 30
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 0
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 10,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: -10,
    marginBottom: 20,
  }
  
});
*/

import React from 'react';
import  LogoTitle  from './LogoTitle';
import { Button } from 'react-native-material-ui';
import { Image, View, Text, ScrollView, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { TextInput, Colors } from 'react-native-paper';
import styles from '../constants/Styles';
import layout from '../constants/Layout';
import { connect } from 'react-redux';
import FullWidthImage from 'react-native-fullwidth-image';
import CategoriaButton from '../components/CategoriaButton';

const imageHeight = layout.window.height / 2.5;
const imageWidth = layout.window.width;


function BotonCategoria(props){
    return <div>Hello {props.name}</div>
}


class Vacio extends React.Component {
  
  static navigationOptions = {
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#00AAB4',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {flex: 1, textAlign: 'center'}
  };

  state = {
    username: '',
    password: '',
    categorias : [
        {key:'1','nombre': 'Electricidad'},
        {key:'2','nombre': 'Plomeria'}
    ]
  };

  render() {
    return (
    	<ScrollView style={styles.container}>
            <Image style={{ flex:1, width: null, height: 60 }} resizeMode='cover' source={require('../assets/images/seleccione_servicio.png')} />
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                
                {this.state.categorias.map((categoria, i)=>{
                    return (
                        <CategoriaButton texto={categoria.nombre} key={i}/>
                    );
                })}




            </View>
            

                            
			    
        
            
            <View style={{ height: 150 }} />
  

      </ScrollView>
      
    );
  }
}


function mapStateToProps(state){
    return {} 
}

function mapDispatchToProps(dispatch){
    return {
        login : (token) => dispatch({type: 'LOGIN', payload: token})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ElegirServicio);


  
