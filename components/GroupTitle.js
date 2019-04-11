import React from 'react';
import {View, Text } from 'react-native';

export default GroupTitle = (props) => {
    
    return (
        <View
          style={{
            padding: 10,
            flex: 1,
            flexDirection: `column`,
            maxHeight: 3,
            marginBottom: 20,
            fontSize: 18

          }}
        >
          <Text
            style={{
              marginBottom: 10,
              fontWeight: `bold`
            }}
            numberOfLines={4}
          >
            {props.label}
          </Text>
        </View>
)};