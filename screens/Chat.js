import React from "react";
import  LogoTitle  from './LogoTitle';
import { GiftedChat } from "react-native-gifted-chat";
import { View, Platform, AsyncStorage, Text } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import RestApi from '../common/RestApi';
import { isSignedIn, getStorageData } from '../common/auth';
import {IconHeader, OpenDrawerProfesional} from '../components';
export default class Chat extends React.Component {

  static navigationOptions = {
    headerTitle: <LogoTitle />,
    headerRight: <OpenDrawerProfesional/>,
    headerStyle: {
      backgroundColor: '#00AAB4',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {flex: 1, textAlign: 'center'}
  };

  interval;

  constructor(props){
    super(props);
    
  }

  state = {
    messages: [],
    user_id: ''
  };

  _onRefresh = () => {

    AsyncStorage.getItem('user_id')
      .then(res => {
        if (res !== null) {
          //console.log('USER ID >>>:', res);
          this.setState({user_id: res});
        } else {
         //console.log('No se pudo recuperar el user_id del localstorage, vino null');
        }
      })
      .catch(err => reject(err));

    isSignedIn()
    .then(()=>{ 
      this.api = new RestApi();
      this.api.getChatMessages(this.props.navigation.state.params.chat_id)
        .then((responseJson)=>{
          //console.log(responseJson);
          this.setState({messages: responseJson});
        })
        .catch((err)=>{
          //console.log(err);
          
          alert(err);
        });
    })
    .catch(()=>{ 
      //console.log("NO ESTA LOGEADO en Chat");
      this.props.navigation.navigate('Auth') 
    });
  }

  componentWillMount(){
    this._onRefresh();
    this.interval = setInterval(this._onRefresh, 5000);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  onSend(messages = []) {
    //console.log(messages);
    this.api = new RestApi();
    this.api.sendChat(
      {
        solicitud_id: this.props.navigation.state.params.chat_id,
        messages: messages
      }
    )
    this.setState(previousState => (
        {
          messages: GiftedChat.append(previousState.messages, messages)
        }
      )
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <IconHeader 
          source={require('../assets/images/icon-user-black.png')}
          topTitle=""
          title="Trabajo en proceso"
          style={{marginBottom: 20}} />
        <Text style={{marginHorizontal: 20 }}>Este chat se cerrara luego de 7 dias de que se finalice el trabajo.</Text>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          placeholder="Escribe un mensaje"
          user={{
            _id: this.state.user_id
          }}
        />
        {Platform.OS === 'android' ? <KeyboardSpacer /> : null }
      </View>
    );
  }
}