import React from 'react';
import {View, Image, TextInput, Text } from 'react-native';

export default ATextinputWithIcon = (props) => {
    
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flex: 1, margin: 5, minHeight: 50, width: '100%', paddingRight: 10 }} >
            <Image style={{   width: 20,   height: 20 }} source={props.iconSource}  />
            <View style={{flexDirection: 'column', width: '100%'}}>
                <TextInput placeholderTextColor={'rgba(134, 134, 134, 0.32)'} 
                value={props.value} placeholder={props.placeholder}
                onChangeText={(text)=>{props.onChangeText(text)}}
                style={{ 
                    marginLeft: 5, borderBottomWidth: 1,   borderBottomColor: 'rgba(111, 111, 111, 1)',   height: 40,   
                    width: '100%' }} />
                { props.error ? <Text style={{color: 'red', marginLeft: 5}}>{props.error}</Text> : <Text> </Text> }
            </View>
        </View>                   
    )};