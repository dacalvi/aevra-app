import React from 'react';
import {View, Text, Image, TextInput } from 'react-native';
import { Avatar, Checkbox } from 'react-native-paper';
import  ACamera  from './ACamera';


export default IDAndPerson = (props) => {
    return (
        <View>
            <View style={{ flexDirection: `row`, flex: 1, maxHeight: 70, margin: 10}}>
                <View style={{ width: `10%` }}>
                    <Image style={{ width: 20, height: 20 }} source={ require('../assets/images/icon-user.png') }/>
                </View>
                <View style={{ width: `15%` }}>
                    <ACamera  
                        onPictureTaken={(image)=>{ 
                            if(props.onPictureTaken){
                                props.onPictureTaken(image);
                            }
                        }}
                    />
                </View>
                <View style={{ width: `30%`, padding: 5 }}>
                    <Image style={{ width: 50, height: 30, marginLeft: 10 }} source={ require('../assets/images/holding-id.png') }/>
                </View>
                <View style={{ width: `45%` }}>
                    <Text style={{ fontWeight: `bold` }}>FOTO DE FRENTE</Text>
                    <Text style={{ fontWeight: `bold` }}>MOSTRANDO EL DNI</Text>
                </View>
            </View>
            <View style={{ marginLeft: `10%`, paddingLeft: 10 }}>
                { props.error ? <Text style={{color: 'red'}}>{props.error}</Text> : <Text> </Text> }
            </View>
        </View>
        
    )};

