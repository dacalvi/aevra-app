import React from 'react';
import layout from '../constants/Layout';
import  LogoTitle  from './LogoTitle';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, RefreshControl  } from 'react-native';
import IconHeader from '../components/IconHeader';
import OpenDrawerProfesional from '../components/OpenDrawerProfesional';

import  TrabajoFinalizado  from '../components/TrabajoFinalizado';

import RestApi from '../common/RestApi';
import { isSignedIn } from '../common/auth';


const imageHeight = layout.window.height / 2.5;
const imageWidth = layout.window.width;

export default class TrabajosFinalizados extends React.Component {

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
  


  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      trabajos : []
    };
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    isSignedIn()
    .then(()=>{ 
      this.api = new RestApi();
      this.api.trabajosterminados()
        .then((responseJson)=>{
          this.setState({refreshing: false});
          this.setState({trabajos : responseJson.data});
        })
        .catch((err)=>{
          this.setState({refreshing: false});
          alert(err);
        });
    })
    .catch(()=>{ this.props.navigation.navigate('Auth') });
  }

  componentDidMount () {
    this._onFocusListener = this.props.navigation.addListener('didFocus', (payload) => {
      this._onRefresh();
    });
  }

  componentWillMount(){
    this._onRefresh();
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
            title="Trabajos Finalizados"
            style={{marginBottom: 20}} />
          
          { this.state.trabajos.length == 0 ? 
                    <View style={{
                        flex:1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'  
                    }}>
                    <Text>Todavia no tiene trabajos finalizados...</Text>
                    
                    </View>
                    : <Text></Text>  
                    }

          {this.state.trabajos.map((trabajo, i)=>{
                return (
                  <TrabajoFinalizado trabajo={trabajo} key={i} />
                );
            })}

        </View>

        
      </ScrollView>

    </KeyboardAvoidingView>
    );
  }
}




