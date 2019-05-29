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
import { View, Text, KeyboardAvoidingView, ScrollView, RefreshControl, Image } from 'react-native';
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
        a_pagar: 0.0
    }
  }

  pagar(){
   
  }

  _onRefresh = () => {
    isSignedIn()
    .then(()=>{ 
      this.api = new RestApi();
      this.setState({refreshing: true});
      this.api.comisiones()
        .then((responseJson)=>{
          //console.log(responseJson);
          this.setState({refreshing: false});
          this.setState({listadocomisiones : responseJson.data});
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
                            <ADeudaItem key={i} item={comision} onPress={(monto, checked)=>{
                              let a_pagar;
                              if(checked){
                                a_pagar = this.state.a_pagar + parseFloat(monto);
                              }else{
                                a_pagar = this.state.a_pagar - parseFloat(monto);
                              }

                              this.setState({a_pagar});
                            }} />
                          );
                        })}
                        
                        
                    </View>
                </ScrollView>
                <View style={{flexDirection: 'row',justifyContent: 'center', height: 40}}>
                    <Button disabled={this.state.buttondisabled} raised primary text="PAGAR" style={{color: 'white',backgroundColor: '#00AAB4', borderRadius: 30}} 
                    onPress={ () => { this.pagar() } }/>
                </View>

            </KeyboardAvoidingView>
    );
  }
}
