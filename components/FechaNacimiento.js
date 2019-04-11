import React from 'react';
import {View, Text, Image, TextInput, TouchableHighlight, DatePickerAndroid } from 'react-native';
import { Avatar, Checkbox } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';


export default class FechaNacimiento extends React.Component{
    
    state = {
        fechanacimiento: ''
    }

    async pickDate(){
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
              // Use 'new Date()' for current date.
              // May 25 2020. Month 0 is January.
              date: new Date(new Date().setFullYear(new Date().getFullYear() - 18))
            });
            if (action !== DatePickerAndroid.dismissedAction) {
              // Selected year, month (0-11), day
            }
            this.setState({fechanacimiento: day + "/" + month + "/" + year});
            if(this.props.onDateChange){
                this.props.onDateChange(day + "/" + month + "/" + year);
            }
          } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
          }
    }

    render(){
        return (
            <View style={{ flexDirection: 'row', flex: 1, maxHeight: 70, margin: 10}}>
                <View style={{ width: '10%' }}>
                    <Image style={{ width: 20, height: 20 }} source={ require('../assets/images/icon-user.png') }/>
                </View>
                <View style={{ width: '80%', height: 70, justifyContent: 'flex-end', paddingLeft: 10, paddingRight: 10 }}>
                <TextInput 
                        placeholderTextColor={'rgba(114, 114, 114, 0.32)'}
                        placeholder={this.props.placeholder}
                        value={this.state.fechanacimiento}
                        style={{borderBottomWidth: 1, width: '100%', borderBottomColor: 'rgba(124, 124, 124, 1)'}}
                        keyboardType='default'
                        onFocus={()=>{this.pickDate();}}
                        />
                        { this.props.error ? <Text style={{color: 'red'}}>{this.props.error}</Text> : <Text> </Text> }
                
                </View>
                <View style={{ width: '10%', paddingTop: 20 }}>
                    <TouchableHighlight onPress={()=>{this.pickDate();}}>
                        <Ionicons name="ios-calendar" size={30} color="gray" />
                    </TouchableHighlight>
                </View>
                
            </View>
        )
    }
};

