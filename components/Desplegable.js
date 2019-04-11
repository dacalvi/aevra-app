import React from 'react';
import {View, Text, Image, TextInput, TouchableHighlight, DatePickerAndroid, Picker } from 'react-native';
import country_list  from '../constants/countries';

export default class Desplegable extends React.Component{
    
    render(){
        return (
            <View>
                <View>
                    <View style={{ flexDirection: 'row', flex: 1, maxHeight: 70, margin: 10}}>
                        <View style={{ width: '10%' }}>
                            <Image style={{ width: 20, height: 20 }} source={ require('../assets/images/icon-user.png') }/>
                        </View>
                        <View style={{ width: '90%', height: 40, justifyContent: 'flex-end', paddingLeft: 10, paddingRight: 10 }}>                
                            <Picker 
                                mode="dropdown" 
                                selectedValue={this.props.selected}
                                onValueChange={(country) =>{
                                    if(this.props.onCountryChange){
                                        this.props.onCountryChange(country);
                                    }
                                }
                                }
                                >
                                {Object.keys(country_list).map((key) => {
                                    return (<Picker.Item label={country_list[key]} value={country_list[key]} key={key}/>) //if you have a bunch of keys value pair
                                })}
                            </Picker>
                        </View>
                    </View>
                </View>
                <View>
                    { this.props.error ? <Text style={{color: 'red'}}>{this.props.error}</Text> : <Text> </Text> }
                </View>
            </View>
        )
    }
};

