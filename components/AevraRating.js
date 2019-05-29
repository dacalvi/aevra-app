import React from 'react';
import {View, Image, TextInput, Text } from 'react-native';
import AevraStars from './AevraStars';
export default class AevraRating extends React.Component{
    
    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'flex-start', 
                flex: 1, 
                margin: 5,
                marginLeft: 10,
                width: '100%', 
                }} >
                <View style={{width: '50%', marginTop: 5}}>
                    <Text>{this.props.label}</Text>
                </View>
                <View style={{width: '50%', justifyContent: "flex-end"}}>
                    <AevraStars 
                        rating={this.props.rating} 
                        size={30} 
                        editable={this.props.editable} 
                        onChange={(rating) => {this.props.onChange(rating)} }/>
                </View>
            </View>                   
        )
    }
};