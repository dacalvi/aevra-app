import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  View,
} from 'react-native';


export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _bootstrapAsync = async () => {
    const token = await AsyncStorage.getItem('token');
    const usertype = await AsyncStorage.getItem('type');
    if(token && usertype){
      console.log("TOKEN: " + token);
      console.log("USERTYPE: " + usertype);
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