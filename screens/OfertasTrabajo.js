import React from 'react';
import styles from '../constants/Styles';
import  LogoTitle  from './LogoTitle';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, RefreshControl} from 'react-native';
import { Button } from 'react-native-material-ui';
import layout from '../constants/Layout';
import IconHeader from '../components/IconHeader';
import OpenDrawerProfesional from '../components/OpenDrawerProfesional';
import OfertaTrabajoItem from '../components/OfertaTrabajoItem';
import RestApi from '../common/RestApi';
import { isSignedIn } from '../common/auth';


const imageHeight = layout.window.height / 2.5;
const imageWidth = layout.window.width;

export default class OfertasTrabajo extends React.Component {

  static navigationOptions = {
    headerTitle: <LogoTitle />,
    headerRight: <OpenDrawerProfesional/>,
    headerStyle: {
      backgroundColor: '#00AAB4',
    },

    headerTintColor: '#fff',
    headerTitleStyle: {flex: 1, textAlign: 'center'}
  };

  state = {
    ofertas : []
  };

  api;
  
  constructor(){
    super();
    this.state = {
      refreshing: false,
      ofertas : []
    };
  }

  _onRefresh = () => {
    isSignedIn()
    .then(()=>{
      this.setState({refreshing: true});
      this.api = new RestApi();
      this.api.miscategorias()
        .then((response) => { 
          if(response.data.length == 0){
            this.setState({refreshing: false});
            this.props.navigation.navigate("AdherirCategoriaProfesional");
          }else{

            this.api.ofertas()
            .then((responseJson)=>{
              this.setState({refreshing: false});
              this.setState({ofertas : responseJson.data});
            })
            .catch((err)=>{
              console.log(err);
              this.setState({refreshing: false});
              alert(err);
            });

          }
        });





    })
    .catch(()=>{ this.props.navigation.navigate('Auth') });
  }

  componentWillMount(){
    this._onRefresh();
  }
  
  componentDidMount () {
    this._onFocusListener = this.props.navigation.addListener('didFocus', (payload) => {
      this._onRefresh();
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
        <View style={{marginleft: 20, marginRight:20, marginTop:20}} >
          <IconHeader 
            source={require('../assets/images/icon-user-black.png')}
            topTitle=""
            title="Ofertas de Trabajo"
            style={{marginBottom: 20}} />
          
          <View style={{
              flexDirection: `row`,
              justifyContent: `flex-start`, 
              marginBottom: 5,
              marginLeft: 10,
              paddingTop: 10,
              paddingBottom: 30,
              borderBottomWidth: 1,
              borderBottomColor: `rgba(136, 136, 136, 1)`
              }}> 
              <Text style={{width: '40%'}}>Servicio</Text>
              <Text style={{width: '60%'}}>Detalle</Text>
          </View>
          

          {this.state.ofertas.map((oferta, i)=>{
                return (
                  <OfertaTrabajoItem
                    onPress={()=>{
                      this.props.navigation.navigate("DescripcionTrabajoProfesional", oferta);
                    }}
                    key={i}
                    categoria={oferta.nombre} 
                    descripcion={oferta.descripcion} />
                );
            })}

          <View style={{flexDirection: 'row',justifyContent: 'center', marginBottom: 40}}>      
              <Button raised primary text="INSCRIBIRSE A UN SERVICIO" style={styles.botonAevra} 
                onPress={() => { 
                  this.props.navigation.navigate('AdherirCategoriaProfesional');

                }}/>
            </View>



        </View>

        
      </ScrollView>

    </KeyboardAvoidingView>
    );
  }
}




