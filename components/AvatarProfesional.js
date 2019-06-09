import React from 'react';
import {View, Image, TextInput, Text, TouchableHighlight, Permissions, ImageEditor, ImageStore } from 'react-native';
import { Avatar, Checkbox } from 'react-native-paper';
import AevraStars from './AevraStars';``
import { ImagePicker } from 'expo';
import  ACamera  from './ACamera';
import { API_URL } from '../common/config';


/*
Props 
*/
export default class AvatarProfesional extends React.Component{
    
    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flex: 1, margin: 5, minHeight: 50, width: '100%', paddingRight: 10 }} >
                <View style={{ width: `25%`}}>
                    {this.props.editable ? 
                        <ACamera
                            initialImage={this.props.avatar}
                            roundImage={true}
                            onPictureTaken={(avatar)=>{
                                if(this.props.onChangeAvatar){
                                    this.props.onChangeAvatar(avatar)
                                }
                            }}
                        /> :
                        this.props.avatar == ''? 
                            <Avatar.Image style={{backgroundColor: 'white'}} size={64} source={require('../assets/images/icon-user-black.png')} />: 
                            <Avatar.Image size={64} source={{uri: API_URL + this.props.avatar}} />
                        
                    
                }
                    
                </View>
                <View style={{ width: `65%` }}>
                    <Text style={{ fontWeight: `bold`, marginTop: 0}}>
                    {this.props.nombre}
                    </Text>
                    <Text style={{ marginTop: 10}}>
                    {this.props.cantidadTrabajosFinalizados} trabajos finalizados.
                    </Text>
                    <AevraStars rating={this.props.estrellas} size={30}/>
                </View>
            </View>                   
        )
    }
};