import React from 'react';
import  LogoTitle  from './LogoTitle';
import layout from '../constants/Layout';
import {IconHeader, OpenDrawerProfesional, GroupTitle, IconText} from '../components';
import { Image, View, Text, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Button  } from 'react-native-material-ui';
import { Constants, MapView, Permissions, Location } from 'expo';
const imageHeight = layout.window.height / 2.5;
const imageWidth = layout.window.width;

export default class DescripcionTrabajoUbicacionReadOnly extends React.Component {

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
                            style={{ alignSelf: 'stretch', height: 200 }}
                            provider = { MapView.PROVIDER_GOOGLE }
                            initialRegion={{
                                latitude: parseFloat(this.props.navigation.state.params.coordenadas.split(",")[0]),
                                longitude: parseFloat(this.props.navigation.state.params.coordenadas.split(",")[1]),
                                latitudeDelta: 0.010,
                                longitudeDelta: 0.010
                            }}
                            >
                            <MapView.Marker
                                image={require('../assets/images/marker.png')}
                                style={{width: 100}}
                                title=""
                                coordinate={{
                                    latitude: parseFloat(this.props.navigation.state.params.coordenadas.split(",")[0]),
                                    longitude: parseFloat(this.props.navigation.state.params.coordenadas.split(",")[1])
                                }}
                            />

                    <MapView.Marker
                        coordinate={{
                                    latitude: parseFloat(this.props.navigation.state.params.coordenadas.split(",")[0]),
                                    longitude: parseFloat(this.props.navigation.state.params.coordenadas.split(",")[1])
                                }}
                        title={''}
                        image={require('../assets/images/marker.png')}
                        style={{width: 100}}
                        
                        description={"Ubicacion de la direccion indicada"}
                    />

                        </MapView>
                    </View>
                </ScrollView>
                
            </KeyboardAvoidingView>
    );
  }
}
