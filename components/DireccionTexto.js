import React from 'react';
import {View, Text, TextInput, Button } from 'react-native';

export default DireccionTexo = (props) => {
    
    return (
      <View style={{ flexDirection: `row`,justifyContent: `space-around`,width: `100%`,maxHeight: 40,height: 40}}>
          <View style={{ width: `90%` }} >
            <TextInput
              value={props.value}
              placeholder={props.placeholder}
              style={{
                borderBottomColor: `rgba(119, 119, 119, 1)`,
                height: 30,
                borderBottomWidth: 1,
                marginRight: 5,
                marginLeft: 5
              }}
            />
          </View>
          <View style={{ width: `10%`, maxHeight: 20}}>
            <Button style={{height: 20, margin: 5}} title={`>`} onPress={props.onPress} />
          </View>
        </View>
    )};