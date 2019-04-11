import React from 'react';
import {View, Image, TextInput, Text } from 'react-native';
import AevraStars from './AevraStars';
export default AevraRating = (props) => {
    
    return (
        <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'flex-start', 
            flex: 1, 
            margin: 5,
            marginLeft: 10,
            width: '100%', 
            }} >
            <View style={{width: '50%', marginTop: 5}}>
                <Text>{props.label}</Text>
            </View>
            <View style={{width: '50%', justifyContent: "flex-end"}}>
                <AevraStars rating={props.rating} size={25}/>
            </View>
        </View>                   
    )};