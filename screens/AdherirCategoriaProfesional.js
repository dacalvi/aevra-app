import React from 'react';
import { connect } from 'react-redux';
import styles from '../constants/Styles';
import LogoTitle  from './LogoTitle';
import OpenDrawerProfesional from '../components/OpenDrawerProfesional';
import IconHeader from '../components/IconHeader';
import GroupTitle from '../components/GroupTitle';
import {CategoriaCredencial} from '../components';

import {Dimensions, View, ScrollView, KeyboardAvoidingView, Text, Alert , ActivityIndicator, StyleSheet} from 'react-native';
import { Button } from 'react-native-material-ui';
import RestApi from '../common/RestApi';
import { isSignedIn } from '../common/auth';

class TrabajosSolicitados extends React.Component {

  static navigationOptions = {
    headerTitle: <LogoTitle />,
    headerRight: <OpenDrawerProfesional/>,
    headerStyle: {
        backgroundColor: '#00AAB4',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {flex: 1, textAlign: 'center'}
  };
  
  api;
  categorias = [];

  state = {}
  
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      isVisible: false,
      selectedCategorias: [],
      selectedCategoriasImages: [],
      loading: false
    };

    
  }
  
  componentWillMount(){
    isSignedIn()
    .then(()=>{ 
      this.api = new RestApi();
      this.state.loading = true;
      this.api.categorias()
        .then((responseJson)=>{
          this.categorias = responseJson.data;
          this.setState({loading: false});
        })
        .catch((err)=>{
          console.log(err);
          alert(err);
        });
    })
    .catch(()=>{ this.props.navigation.navigate('Auth') });
  }

  in_array(aguja, pajar){ return pajar.indexOf(aguja)  }
  
  toggleCategoria(categoria){
    let { selectedCategorias } = this.state;
    let i = this.in_array(parseInt(categoria.id), selectedCategorias)
    if(i > -1 ){ //existe
        if(!categoria.checked){ //esta como false, sacar
          selectedCategorias.splice(i,1);
        }
    }else{ //no existe
      if(categoria.checked){ //esta como true, para agregar
        selectedCategorias.push(parseInt(categoria.id));
      }
    }
    this.agregarImagen(categoria);
    this.setState({selectedCategorias});
}

  agregarImagen(categoria){
    let { selectedCategoriasImages } = this.state;
    //Borrar imagen anterior
    selectedCategoriasImages.forEach(function (item, key) {
      if(item.id == categoria.id){
        selectedCategoriasImages.splice(key, 1);
      }
    });
    //Si hay imagen, agregarla
    if(categoria.image !== null){
      selectedCategoriasImages.push({id: categoria.id, image: categoria.image})
    }
    //Setear estado
    this.setState({selectedCategoriasImages});
  }

  btnSiguienteClick(){
    let {selectedCategorias, selectedCategoriasImages} = this.state;
    this.props.saveSolicitudData({selectedCategorias, selectedCategoriasImages});
    this.props.navigation.navigate('RegistroProfesionalValidado');
  }

  render() {
    const {isVisible} = this.state;
    if (this.state.loading) {
      return (
        <ActivityIndicator
          animating={true}
          style={styles.indicator}
          size="large"
        />
      );
    }
    return (
      <KeyboardAvoidingView 
      style={{ flex: 1, backgroundColor: '#fff' }} 
      behavior="position" 
      keyboardVerticalOffset={-200}
      enabled>  
      <ScrollView style={{height: dimensions.height - 180}}>
        <View style={{marginleft: 20, marginRight:20, marginTop:20}} >
          <IconHeader 
            source={require('../assets/images/icon-user-black.png')}
            topTitle="Registro"
            title="Prestador"
            style={{marginBottom: 20}} />
          
          <GroupTitle label="Inscribirse a un servicio" />
          
          <View style={{
              flexDirection: `row`,
              justifyContent: `space-between`,
              marginBottom: 5,
              marginLeft: 10,
              paddingTop: 10,
              paddingBottom: 30,
              borderBottomWidth: 1,
              borderBottomColor: `rgba(136, 136, 136, 1)`
              }}> 
              <Text>ESPECIALIDAD</Text>
              <Text>FOTO MATRÍCULA</Text>
          </View>

          {this.categorias.map((categoria, i)=>{
                return (
                    <CategoriaCredencial
                      key={i}
                      id={categoria.id} 
                      nombre={categoria.nombre} 
                      imagen={categoria.imagen}
                      onChange={(categoria)=>{
                        this.toggleCategoria(categoria);
                      }}
                    />
                );
            })}
        </View>
      </ScrollView>
        <View style={{flexDirection: 'row',justifyContent: 'center', marginBottom: 40}}>      
          <Button 
            raised 
            primary text="SIGUIENTE" style={styles.botonAevra} 
            disabled={this.state.selectedCategorias.length == 0}
            onPress={() => { 
              this.btnSiguienteClick();
              
            }}/>
        </View>
    </KeyboardAvoidingView>
    );
  }
}

const dimensions = Dimensions.get('window');

function mapStateToProps(state){
  return {} 
}

function mapDispatchToProps(dispatch){
  return {
    saveSolicitudData : (selectedCategoriasPayload) => dispatch({type: 'SAVE_SELECTED_CATEGORIAS_PROFESIONAL', payload: selectedCategoriasPayload})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrabajosSolicitados);