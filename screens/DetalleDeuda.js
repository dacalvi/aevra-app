import React from 'react';
import  LogoTitle  from './LogoTitle';
import layout from '../constants/Layout';
import moment from 'moment';
import {
  IconHeader, 
  OpenDrawerProfesional, 
  GroupTitle, 
  MultilineText,
  ATextinputNumberWithIcon
} from '../components';
import validate from '../constants/validate_wrapper';
import { 
  View, 
  Text, 
  KeyboardAvoidingView, 
  ScrollView, 
  RefreshControl, 
  Image,
  Alert,
  Linking
} from 'react-native';
import { Button  } from 'react-native-material-ui';
import RestApi from '../common/RestApi';
import { isSignedIn } from '../common/auth';
import ADeudaItem from '../components/ADeudaItem';
const imageHeight = layout.window.height / 2.5;
const imageWidth = layout.window.width;

export default class DetalleDeuda extends React.Component {

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

  state = {};

  constructor(){
    super();
    this.state = {
        refreshing: false,
        listadocomisiones : [],
        a_pagar: 0.0,
        solicitudes_a_pagar: []
    }
  }

  pagar(){
    isSignedIn()
    .then(()=>{ 
      this.api = new RestApi();
      this.api.pagar(this.state.solicitudes_a_pagar)
        .then((responseJson)=>{
          Linking.openURL(responseJson.payment_link);
          //Alert.alert("Aviso", "Sera redirigido al sitio de Mercado Pago para realizar el pago alli");
          this.props.navigation.navigate('PerfilProfesional123');
        })
        .catch((err)=>{
          alert(err);
        });
    })
    .catch(()=>{ 
      this.props.navigation.navigate('Auth') 
    });
  }

  _onRefresh = () => {
    isSignedIn()
    .then(()=>{ 
      this.api = new RestApi();
      this.setState({refreshing: true});
      this.api.comisiones()
        .then((responseJson)=>{
          this.setState({refreshing: false});
          this.setState({listadocomisiones : responseJson.data});
        })
        .catch((err)=>{
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
  
  componentDidMount(){
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
                    <View style={{marginTop:20, marginLeft: 20, marginRight: 20}} >

                        <IconHeader 
                            source={require('../assets/images/icon-user-black.png')}
                            topTitle="Detalle de Deuda"
                            title="Mi Perfil"
                            style={{marginBottom: 20}} />
                        
                        <View style={{flex: 1, flexDirection: 'row', marginBottom: 20}}>
                          <Image style={{   width: 20,   height: 20 }} source={require('../assets/images/icon-wallet.png')}  />
                          <Text style={{fontSize: 18, fontWeight: 'bold'}}> A pagar a Aevra </Text>
                          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'red'}}> ${this.state.a_pagar}</Text>
                        </View>

                        { this.state.listadocomisiones.map((comision, i)=>{
                          return (
                            <ADeudaItem key={i} item={comision} onPress={(monto, checked, solicitud_id)=>{
                              let a_pagar;
                              let { solicitudes_a_pagar } = this.state;
                              if(checked){
                                if(this.state.solicitudes_a_pagar.indexOf(solicitud_id) == -1){
                                  solicitudes_a_pagar.push(solicitud_id);
                                }
                                a_pagar = this.state.a_pagar + parseFloat(monto);
                              }else{
                                let pos = this.state.solicitudes_a_pagar.indexOf(solicitud_id);
                                if(pos > -1){
                                  solicitudes_a_pagar.splice(pos, 1);
                                }
                                a_pagar = this.state.a_pagar - parseFloat(monto);
                              }
                              this.setState({a_pagar, solicitudes_a_pagar});
                              
                              
                            }} />
                          );
                        })}
                        
                        
                <View style={{flexDirection: 'row',justifyContent: 'center', height: 50, marginBottom: 50}}>
                    <Button disabled={this.state.buttondisabled} raised primary text="PAGAR" style={{color: 'white',backgroundColor: '#00AAB4', borderRadius: 30}} 
                    onPress={ () => { this.pagar() } }/>
                </View>
                    </View>
                </ScrollView>

            </KeyboardAvoidingView>
    );
  }
}
