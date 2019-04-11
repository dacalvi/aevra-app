import React from 'react';
import {View, Image, TextInput, Text } from 'react-native';
import { Avatar, Checkbox } from 'react-native-paper';
import AevraStars from './AevraStars';
export default AvatarProfesional = (props) => {
    
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flex: 1, margin: 5, minHeight: 50, width: '100%', paddingRight: 10 }} >
            <View style={{ width: `25%`}}>
                <Avatar.Image size={64} source={props.avatar} />
            </View>
            <View style={{ width: `65%` }}>
                <Text style={{ fontWeight: `bold`, marginTop: 0}}>
                {props.nombre}
                </Text>
                <Text style={{ marginTop: 10}}>
                {props.cantidadTrabajosFinalizados} trabajos finalizados.
                </Text>
                <AevraStars rating={props.estrellas} size={30}/>
            </View>
        </View>                   
    )};