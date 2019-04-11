import React from 'react';
import {View, Image, TextInput, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
export default class AevraStars extends React.Component{
    
    createStars(amount){
        let table = []
        for (let i = 0; i < amount; i++) {
            table.push(<Ionicons key={i} name="ios-star" size={this.props.size} color="yellow" />)
        }
        return table
    }

    render(){
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flex: 1, margin: 5, width: '100%', paddingRight: 10 }} >
                {this.createStars(this.props.rating)}   
            </View>                   
        )
    }
};