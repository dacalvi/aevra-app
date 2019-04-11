import React from 'react';
import {View, Image, TextInput, Text } from 'react-native';

export default Comentario = (props) => {
    
    return (
        <View style={{ flexDirection: 'column', justifyContent: 'flex-start', flex: 1, margin: 5, marginLeft: 10, minHeight: 50, width: '100%', paddingRight: 10 }} >
            <Text style={{}}>{props.titulo}</Text>
            <Text style={{fontStyle: 'italic'}}>{props.texto}</Text>
            
        </View>                   
    )};