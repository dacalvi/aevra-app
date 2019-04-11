import React from 'react';
import styles from '../constants/Styles';
import LogoTitle  from './LogoTitle';
import layout from '../constants/Layout';
import { OpenDrawerProfesional, IconHeader, TrabajoSolicitado} from '../components';
import { View, ScrollView, KeyboardAvoidingView, Text, Alert, RefreshControl } from 'react-native';
import { Button } from 'react-native-material-ui';
import { isSignedIn } from '../common/auth';
import RestApi from '../common/RestApi';

const imageHeight = layout.window.height / 2.5;
const imageWidth = layout.window.width;

export default class TrabajosSolicitados extends React.Component {

  static navigationOptions = {
    headerTitle: <LogoTitle />,
    headerRight: <OpenDrawerProfesional/>,
    headerStyle: {
        backgroundColor: '#00AAB4',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {flex: 1, textAlign: 'center'}
  };

  constructor(props){
    super(props);
    this.state = {
      solicitudes : [],
      refreshing:false
    };
  }

  _onRefresh = () => {
    this.setState({refreshing: true});

    isSignedIn()
    .then(()=>{ 
      this.api = new RestApi();
      this.api.requestedServices()
        .then((responseJson)=>{
          this.setState({solicitudes : responseJson.data, refreshing: false});
        })
        .catch((err)=>{
          this.setState({refreshing: false});
          console.log(err);
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
    isSignedIn()
    .then(()=>{ 
      this.api = new RestApi();
      this.api.requestedServices()
        .then((responseJson)=>{
          this.setState({solicitudes : responseJson.data});
        })
        .catch((err)=>{
          console.log(err);
          alert(err);
        });
    })
    .catch(()=>{ this.props.navigation.navigate('Auth') });
  }



  render() {
    const { navigation } = this.props;
    const {isVisible} = this.state
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
        } >
        <View style={{marginleft: 20, marginRight:20, marginTop:20}} >
          <IconHeader 
            source={require('../assets/images/icon-user-black.png')}
            topTitle=""
            title="Trabajos Solicitados"
            style={{marginBottom: 20}} />
          
            {this.state.solicitudes.map((solicitud, i)=>{
              return (
                <TrabajoSolicitado 
                  navigation={navigation}
                  key={i} 
                  solicitud={solicitud} 
                  onChange={()=>{ this._onRefresh() }} />
              );
            })}
          

        </View>

        
      </ScrollView>

    </KeyboardAvoidingView>
    );
  }
}


