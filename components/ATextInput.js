import React from 'react';
import {View, Text, Image, TextInput } from 'react-native';
import { Avatar, Checkbox } from 'react-native-paper';

export default ATextInput = (props) => {
    
    return (
        <View style={{ flexDirection: 'row', flex: 1, height: 40, maxHeight: 40, margin: 10, marginBottom: 20}}>
            <View style={{width: '10%'}}>
                <Image style={{ height: 25, width: 25}} source={props.source} />
            </View>
            <View style={{ width: '90%', justifyContent: 'flex-end' }} >
                <TextInput 
                    placeholderTextColor={'rgba(114, 114, 114, 0.32)'}
                    placeholder={props.placeholder}
                    value={props.value}
                    style={{borderBottomWidth: 1, width: '100%', borderBottomColor: 'rgba(124, 124, 124, 1)'}}
                    keyboardType={props.keyboardType}
                    textContentType={props.textContentType}
                    secureTextEntry={props.secureTextEntry}
                    onChangeText={ (text) => props.onChangeText(text) }/>
                    { props.error ? <Text style={{color: 'red'}}>{props.error}</Text> : <Text> </Text> }
            </View>
        </View>
    )};