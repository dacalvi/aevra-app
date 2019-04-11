import React from 'react';
import {View, Text } from 'react-native';
import { Avatar, Checkbox } from 'react-native-paper';

export default AvatarCheck = (props) => {
    
    return (
        <View style={{flexDirection: `row`,flex: 1,maxHeight: 50,margin: 10}}>
            <View style={{ width: `25%`}}>
                <Avatar.Image size={64} source={props.avatar} />
            </View>
            <View style={{ width: `65%` }}>
            <Text style={{ fontWeight: `bold`, marginTop: 25}}>
              {props.label}
            </Text>
            </View> 
            <View style={{ width: `10%`, marginTop: 20 }}>
                <Checkbox/>
            </View>
        </View>
)};