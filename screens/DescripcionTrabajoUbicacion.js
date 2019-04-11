import React from 'react';
import  LogoTitle  from './LogoTitle';
import layout from '../constants/Layout';
import {IconHeader, OpenDrawerProfesional, GroupTitle, IconText} from '../components';
import { Image, View, Text, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Button  } from 'react-native-material-ui';
import { Constants, MapView, Permissions, Location } from 'expo';
const imageHeight = layout.window.height / 2.5;
const imageWidth = layout.window.width;

export default class DescripcionTrabajoUbicacion extends React.Component {

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


  constructor(props){
    super(props);
  }

  render() {
    return (
            <KeyboardAvoidingView 
                style={{ flex: 1, backgroundColor: '#fff' }} 
                behavior="position" 
                keyboardVerticalOffset={-200}
                enabled>  
                <ScrollView>
                    <View style={{marginTop:20}} >

                        <IconHeader 
                            source={require('../assets/images/icon-user-black.png')}
                            topTitle="Descripcion del Trabajo"
                            title={this.props.navigation.state.params.nombre}
                            style={{marginBottom: 20}} />
                        <GroupTitle label="Area donde se realizara el servicio"/>

                        <MapView
                            style={{ alignSelf: 'stretch', height: 250, width: '100%', marginRight: -20, marginTop: 0, marginBottom: 0 }}
                            provider = { MapView.PROVIDER_GOOGLE }
                            initialRegion={{
                                latitude: parseFloat(this.props.navigation.state.params.coordenadas.split(",")[0]),
                                longitude: parseFloat(this.props.navigation.state.params.coordenadas.split(",")[1]),
                                latitudeDelta: 0.010,
                                longitudeDelta: 0.010
                            }}
                            >
                            
                        </MapView>
                    </View>
                </ScrollView>
                <View style={{flexDirection: 'row',justifyContent: 'center', height: 40}}>
                    <Button raised primary text="POSTULARME" style={{color: 'white',backgroundColor: '#00AAB4', borderRadius: 30}} 
                    onPress={() => { this.props.navigation.navigate('Postular', this.props.navigation.state.params); }}/>
                </View>
            </KeyboardAvoidingView>
    );
  }
}
