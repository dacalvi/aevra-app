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
        for (let i = 1; i <= 5; i++) {
            if(this.props.editable){
                table.push(
                    <TouchableHighlight key={i} onPress={ ()=> { 
                        this.setState({currentRating: i});
                        this.props.onChange(i); 
                    }}>
                        {this.props.rating >= i? 
                            <Image  style={{ width: 20, height: 20 }} source={require('../assets/images/on.png')}/> : 
                            <Image  style={{ width: 20, height: 20 }} source={require('../assets/images/off.png')}/>
                        }
                    </TouchableHighlight>
                )
            }else{
                table.push(
                    <View key={i}>
                        {i <= this.props.rating ? 
                            <Image style={{ width: 20, height: 20 }} source={require('../assets/images/on.png')}/>: 
                            <Image style={{ width: 20, height: 20 }} source={require('../assets/images/off.png')}/>
                        }
                    </View>
                    

                    
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