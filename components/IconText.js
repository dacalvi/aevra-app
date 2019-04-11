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
            <Avatar.Icon size={24} icon={props.icon} />
          </View>
          <View
            style={{
              width: `90%`
            }}
          >
            <Text
              style={{
                marginBottom: 10
              }}
              numberOfLines={4}
              childrenString={props.text}
              
            >
              {props.text}
            </Text>
          </View>
        </View>
)};