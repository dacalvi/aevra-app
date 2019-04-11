import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';

const CategoriaButton = (props) => {
    
    return (
    
    <TouchableOpacity 
        style={{ margin: 10 }}
        onPress={props.onPress} >
        <View style={{
            position: 'absolute', 
            height: 100, 
            width: 100
        }}>
            <Image
                style={{
                    height: 100, 
                    width: 100,
                    flex: 1,
                    resizeMode: 'cover',
                }}
                source={ require('../assets/images/porta_icono.png') }
                
            />
        </View>      
        <Image
            style={{
                height: 90, 
                width: 90,
                flex: 1,
                resizeMode: 'cover',
            }}
            source={{ uri: props.imagen }}

        />
        <Text style={{
                    marginTop: 10,
                    textAlign: 'center',
                    width: 100
                }}>{props.texto}</Text>
    </TouchableOpacity>
)};

export default CategoriaButton;