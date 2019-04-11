import React from 'react';
import { Text, View, TextInput } from 'react-native';

export default MultilineText = (props) => {
    return (
        <View style={{ padding: 10, flex: 1, flexDirection: 'column',}}>
          <Text style={{ marginBottom: 10 }} numberOfLines={4}> {props.label} </Text>
        
          <TextInput
              value={props.value}
              multiline={true}
              onChangeText={props.onChangeText}
              placeholderTextColor={'rgba(139, 139, 139, 0.32)'}
              value={props.value}
              placeholder={props.placeholder}
              style={{
                fontSize: 14,
                flexWrap: 'wrap',
                width: '100%',
                minHeight: 100,
                flex: 1,
                borderWidth: 1,
                borderColor: 'rgba(129, 129, 129, 1)',
                textAlignVertical: 'top',
                padding: 10
              }}
          />
          { props.error ? <Text style={{color: 'red'}}>{props.error}</Text> : <Text> </Text> }
        </View>
    )};