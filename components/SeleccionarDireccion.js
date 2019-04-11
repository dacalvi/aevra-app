import React from 'react';
import {View, Text, StyleSheet } from 'react-native';
import { MapView } from 'expo';
import DireccionTexto from '../components/DireccionTexto';
import Tilde from '../components/Tilde';


export default SeleccionarDireccion = (props) => {
    return (
        <View style={{ flex: 1, flexDirection: `column`, margin: 10}}>
            <View style={{flexDirection: `row`, flex: 1, width: `100%`, maxHeight: 35 }} >
                <View style={{width: `20%`}}>
                    <Text style={{ marginTop: 5 }} childrenString={props.label}>{props.label}</Text>
                </View>
                <View style={{ width: `80%` }}>
                    <DireccionTexto value="" placeholder="Ingrese la direccion" onPress={ () => {}}/>
                </View>
            </View>
            <Tilde label="Establecer esta direccion como permanente" checked={true} />
            <View>
                <MapView style={{ alignSelf: 'stretch', height: 200 }} initialRegion={{ latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421, }} />
            </View>
        </View>
    )

};


    