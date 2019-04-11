import React from 'react';
import {View, Text, TouchableOpacity } from 'react-native';

export default OfertaTrabajoItem = (props) => {
    
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={{
                flexDirection: `row`,
                justifyContent: `flex-start`, 
                marginBottom: 5,
                marginLeft: 10,
                paddingTop: 10,
                }}> 
                <Text style={{width: '40%', fontWeight: 'bold'}}>{props.categoria}</Text>
                <Text style={{width: '60%'}}>{props.descripcion}</Text>
            </View>
        </TouchableOpacity>
)};