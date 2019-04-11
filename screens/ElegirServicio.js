import React from 'react';
import  LogoTitle  from './LogoTitle';
import { Image, View, ScrollView, Text } from 'react-native';
import styles from '../constants/Styles';
import layout from '../constants/Layout';
import { connect } from 'react-redux';
import CategoriaButton from '../components/CategoriaButton';
import OpenDrawerProfesional from '../components/OpenDrawerProfesional';
import RestApi from '../common/RestApi';
import { isSignedIn } from '../common/auth';

const imageHeight = layout.window.height / 2.5;
const imageWidth = layout.window.width;

class ElegirServicio extends React.Component {
  
  static navigationOptions = {
    headerTitle: <LogoTitle />,
    headerRight: <OpenDrawerProfesional/>,
    headerLeft: <Text></Text>,
    headerStyle: {
      backgroundColor: '#00AAB4',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {flex: 1, textAlign: 'center'}
  };

  state = {
    username: '',
    password: '',
    categorias : []
  };

  api;
  
  constructor(){
    super();
  
    isSignedIn()
    .then(()=>{ 
      this.api = new RestApi();
      this.api.categorias()
        .then((responseJson)=>{
          this.setState({categorias : responseJson.data});
        })
        .catch((err)=>{
          console.log(err);
          alert(err);
        });
    })
    .catch(()=>{ this.props.navigation.navigate('Auth') });
  }

  render() {
    return (
    	<ScrollView style={styles.container}>
        <Image style={{ flex:1, width: null, height: 60 }} resizeMode='cover' source={require('../assets/images/seleccione_servicio.png')} />
        <View style={{flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap'}}>
            {this.state.categorias.map((categoria, i)=>{
                return (
                    <CategoriaButton 
                    texto={categoria.nombre} 
                    key={i} 
                    imagen={categoria.imagen} 
                    onPress={()=>{
                      this.props.navigation.navigate('SolicitarServicio', categoria)
                    }}/>
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