//import bugsnag from '@bugsnag/expo';
//const bugsnagClient = bugsnag();

import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon, Linking, Notifications } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { COLOR, ThemeContext, getTheme } from 'react-native-material-ui';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import { LocalStore } from './common/localstore';
import throttle from 'lodash.throttle';
import { AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation';
import NavigationService from './NavigationService';

let store;


AsyncStorage.getItem('state', (err, persistedState)=>{
  if(persistedState == null){
    store = createStore(
      rootReducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      );
    //console.log('crating empty store');
  }else{
    
    store = createStore(
      rootReducer, 
      JSON.parse(persistedState),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      );
    //console.log("loading previous state into store", JSON.parse(persistedState));
  }


  store.subscribe(throttle(() => {
    AsyncStorage.setItem('state', JSON.stringify(store.getState()), ()=> {
      //console.log('Store saved', store.getState());
    });
  }, 1));
});

export default class App extends React.Component {

  _handleNotification = (notification) => {

    if(typeof notification !== 'undefined'){
      console.log(notification);
      /*if(notification.origin == 'received'){
        return;
      }
      */
      if(typeof notification.data !== 'undefined' && notification.data !== null){
        if(typeof notification.data.page !== 'undefined' && notification.data.page !== null ){
          if(notification.data.page !== ''){
            
            if(typeof notification.data.payload !== 'undefined' && notification.data.payload !== null){
              payload = notification.data.payload;
            }else{
              payload = {};
            }

            switch (notification.data.page) {
              
              case 'solicitar_servicio':
                NavigationService.navigate({
                  routeName: 'ClienteApp',
                  action: NavigationActions.navigate({routeName: 'TrabajosSolicitados'})
                });
                break;
            
              case 'pro_ver_ofertas':
                  NavigationService.navigate({
                    routeName: 'ProfesionalApp',
                    action: NavigationActions.navigate({
                      routeName: 'ProfesionalAppStack',
                      action: NavigationActions.navigate({
                        routeName: 'OfertasTrabajo'
                      })
                    })
                  });
                break;

              case 'pro_estimar_trabajo':
                  NavigationService.navigate({
                    routeName: 'ProfesionalApp',
                    action: NavigationActions.navigate({
                      routeName: 'EnProceso'
                    })
                  });
                break;
              
              case 'cli_en_proceso':
                  NavigationService.navigate({
                    routeName: 'ClienteApp',
                    action: NavigationActions.navigate({
                      routeName: 'EnProceso'
                    })
                  });
                break;

              default:
                break;
            }
          }
        }
      }  
    }
  };


  constructor(props){
    super(props);
    Notifications.addListener(this._handleNotification);
  }

  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          <ThemeContext.Provider value={getTheme(uiTheme)}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <Provider store={store}>
              <AppNavigator 
                ref={navigatorRef => {
                  NavigationService.setTopLevelNavigator(navigatorRef);
                }}
              />

            </Provider>
          </ThemeContext.Provider>
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const uiTheme = {
  palette: {
    primaryColor: '#00AAB4',
    
  },
  toolbar: {
    container: {
      height: 50,
    },
  },
  button: {
    container: {
      marginTop: 20,
      width: '80%',
      borderRadius: 30,
      padding: 30
    }
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
