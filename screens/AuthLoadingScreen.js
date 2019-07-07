import React from 'react';
import RestApi from '../common/RestApi';
import { Permissions, Notifications } from 'expo';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
  Alert
} from 'react-native';


export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }


  async registerForPushNotificationsAsync() {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
  
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
  
    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }
  
    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    // POST the token to your backend server from where you can retrieve it to send push notifications.

    this.api = new RestApi();
    return this.api.saveexpotoken({expotoken: token})
    .then((responseJson)=>{
      //this.setState({categorias : responseJson.data});
    })
    .catch((err)=>{
      Alert.alert(err);
    });
  }

  
  
  _bootstrapAsync = async () => {
    const token = await AsyncStorage.getItem('token');
    const usertype = await AsyncStorage.getItem('type');
    if(token && usertype){
      this.registerForPushNotificationsAsync();
      this.props.navigation.navigate(usertype == 'profesional' ? 'ProfesionalApp' : 'ClienteApp');
    }else{
      this.props.navigation.navigate('Auth');
    }
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}