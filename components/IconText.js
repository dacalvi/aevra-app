import React from 'react';
import {View, Text } from 'react-native';
import { Avatar } from 'react-native-paper';

export default IconText = (props) => {
    
    return (
        <View
          style={{
            paddingLeft: 5,
            flex: 1,
            flexDirection: `row`,
            maxHeight: 50,
            
          }}
        >
          <View
            style={{
              width: `10%`
            }}
          >
            <Avatar.Icon size={32} style={{ 
              backgroundColor: '#00AAB4'
              }} color='white' icon={props.icon} />
          </View>
          <View
            style={{
              width: `90%`
            }}
          >
            <Text
              style={{
                marginBottom: 10,
                marginLeft: 10
              }}
              numberOfLines={4}
              childrenString={props.text}
              
            >
              {props.text}
            </Text>
          </View>
        </View>
)};