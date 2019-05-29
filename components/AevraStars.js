import React from 'react';
import {View, Image, TextInput, Text, TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
export default class AevraStars extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            rating: 0,
            currentRating: 1
        }
    }

    
    createStars(amount){
        let table = []
        for (let i = 1; i <= this.props.rating; i++) {
            if(this.props.editable){
                table.push(
                    <TouchableHighlight key={i} onPress={ ()=> { 
                        this.setState({currentRating: i});
                        this.props.onChange(i); 
                    }}>
                        {this.state.currentRating >= i? 
                            <Ionicons name="ios-star" size={this.props.size} color="yellow" /> : 
                            <Ionicons name="ios-star" size={this.props.size} color="gray" />
                        }
                    </TouchableHighlight>
                )
            }else{
                table.push(
                    <Ionicons key={i} name="ios-star" size={this.props.size} color="yellow" />
                )
            }
        }
        return table
    }

    render(){
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flex: 1, margin: 5, width: '100%', paddingRight: 10 }} >
                {this.createStars(this.state.rating)} 
            </View>
        );
    }
};