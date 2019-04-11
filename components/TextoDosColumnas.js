import React from 'react';
import {View, Text } from 'react-native';

export default GroupTitle = (props) => {
    
    return (
        <View style={{
            flexDirection: `row`,
            justifyContent: `flex-start`, 
            marginBottom: 5,
            marginLeft: 10,
            paddingTop: 10,
            }}> 
            <Text style={{width: '33%', fontWeight: 'bold'}}>{props.columna1}</Text>
            <Text style={{width: '67%'}}>{props.columna2}</Text>
        </View>
)};