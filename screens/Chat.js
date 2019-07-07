import React from "react";
import  LogoTitle  from './LogoTitle';
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { View, Platform, AsyncStorage, Text, Image } from 'react-native';
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
          this.setState({user_id: res});
        } else {
        }
      })
      .catch(err => reject(err));

    isSignedIn()
    .then(()=>{ 
      this.api = new RestApi();
      this.api.getChatMessages(this.props.navigation.state.params.chat_id)
        .then((responseJson)=>{
          this.setState({messages: responseJson});
        })
        .catch((err)=>{
          
          alert(err);
        });
    })
    .catch(()=>{ 
      this.props.navigation.navigate('Auth') 
    });
  }

  componentWillMount(){
    this._onRefresh();
    this.interval = setInterval(this._onRefresh, 30000);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  onSend(messages = []) {
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

  renderBubble(props) {
    return <Bubble {...props} wrapperStyle={{
      left: {
        backgroundColor: '#766f6f',
      },
      right: {
        backgroundColor: '#474343'
      }
    }} />;
  }

  render() {
    return (
      <View style={{flex: 1}}>


<View
      style={{
        alignItems: `flex-start`,
        backgroundColor: `rgba(255, 255, 255, 1)`,
        flex: 1,
        justifyContent: `flex-start`,
        flexDirection: `row`,
        padding: 10,
        maxHeight: 100,
        marginBottom: 20
      }}
    >
      <View style={{ flex: 1, alignItems: `center`, maxHeight: 60, maxWidth: 60, padding: 5, flexDirection: 'column', justifyContent: 'center'}}>
        <View style={{position: 'absolute', height: 60, width: 60 }}>
            <Image
                style={{ height: 60,  width: 60, flex: 0, resizeMode: 'cover', }}
                source={ require('../assets/images/porta_icono.png') }    
            />
        </View>      
        <Image
            style={{
                height: 40, 
                width: 40,
            }}
            source={require('../assets/images/icon-user-black.png')}

        />
      </View>
      <View
        style={{
          alignItems: `flex-start`,
          flex: 1,
          marginLeft: 10,
          minWidth: 80,
          paddingTop: 10
        }}
      >
        <Text style={{ fontSize: 18 }}> Trabajo en proceso</Text>
        <Text style={{ fontSize: 12, marginLeft: 5 }} >Este chat se cerrara luego de 7 dias de que se finalice el trabajo.</Text>
      </View>
    </View>


        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          placeholder="Escribe un mensaje"
          renderBubble={this.renderBubble}
          user={{
            _id: this.state.user_id
          }}
        />
        {Platform.OS === 'android' ? <KeyboardSpacer /> : null }
      </View>
    );
  }
}