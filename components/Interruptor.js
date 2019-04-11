import React from 'react';
import {View, Text } from 'react-native';
import { Switch } from 'react-native-paper';

export default Interruptor = (props) => {
    
    return (
        <View
          style={{
            padding: 10,
            flex: 1,
            flexDirection: `row`,
            maxHeight: 50,
            margin: 10
          }}
        >
          <View
            style={{
              width: `75%`
            }}
          >
            <Text
              style={{
                marginBottom: 10
              }}
              numberOfLines={4}
              childrenString={props.label}
            >
              {props.label}
            </Text>
          </View>
          <View>
          <Switch
                value={props.switchOn}
            />
          </View>
        </View>
)};