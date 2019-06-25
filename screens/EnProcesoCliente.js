import React from 'react';
import layout from '../constants/Layout';
import  LogoTitle  from './LogoTitle';
import RestApi from '../common/RestApi';
import { isSignedIn } from '../common/auth';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, RefreshControl  } from 'react-native';
import {IconHeader, OpenDrawerProfesional, EnProcesoClienteItem} from '../components';

const imageHeight = layout.window.height / 2.5;
const imageWidth = layout.window.width;

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
      enprocesocliente : []
    };
  }

  _onRefresh = () => {
    isSignedIn()
    .then(()=>{ 
      this.api = new RestApi();
      this.setState({refreshing: true});
      this.api.enprocesocliente()
        .then((responseJson)=>{
          this.setState({refreshing: false});
          this.setState({enprocesocliente : responseJson.data});
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
    const { navigation } = this.props;
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
        <View style={{marginleft: 10, marginRight:10, marginTop:20}} >
          <IconHeader 
            source={require('../assets/images/icon-user-black.png')}
            topTitle=""
            title="Trabajos en Proceso"
            style={{marginBottom: 20}} />
          
          {
            this.state.enprocesocliente.length == 0 ?
            <View style={{
                flex:1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'  
              }}>
              <Text>No hay trabajos en proceso todavia...</Text>
              
            </View>
            : <Text></Text>  
            }
          

          {this.state.enprocesocliente.map((item, i)=>{
                return (
                  <EnProcesoClienteItem 
                    onCancelTrabajo={()=>{
                      this._onRefresh();
                    }}
                    navigation={navigation} 
                    item={item} 
                    key={i} />
                );
            })}

        </View>

        
      </ScrollView>

    </KeyboardAvoidingView>
    );
  }
}




