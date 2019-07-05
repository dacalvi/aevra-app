import React from 'react';
import {View, Text, Image, TextInput } from 'react-native';
import { Avatar, Checkbox } from 'react-native-paper';
import  ACamera  from './ACamera';
import PropTypes from 'prop-types';

export default IDWithPictures = (props) => {
    
    return (
        <View>
            <View style={{ flexDirection: `row`, flex: 1, margin: 10}}>
                <View style={{ width: `10%` }}>
                    <Image style={{ width: 20, height: 20 }} source={ require('../assets/images/icon-user.png') }/>
                </View>
                <View style={{ width: `60%`, height: 60,
                justifyContent: `flex-end`,
                paddingLeft: 10,
                paddingRight: 10 }}>
                <TextInput 
                        placeholderTextColor={'rgba(114, 114, 114, 0.32)'}
                        placeholder={props.placeholder}
                        value={props.value}
                        style={{borderBottomWidth: 1, width: '100%', borderBottomColor: 'rgba(124, 124, 124, 1)'}}
                        keyboardType={props.keyboardType}
                        textContentType={props.textContentType}
                        secureTextEntry={props.secureTextEntry}

                        onChangeText={ (text) => {
                            if(props.onChangeText){
                                props.onChangeText(text)
                            }
                            }}/>
                
                
                </View>
                <View style={{ width: `15%` }}>
                <Text>Frente</Text>
                    <ACamera 
                        initialImage={props.initialImage1.uri}
                        onPictureTaken={(image)=>{ 
                            if(props.onPictureFrenteTaken){
                                props.onPictureFrenteTaken(image);
                            }
                        }}/>
                </View>
                <View style={{ width: `15%`, flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                <Text>Dorso</Text>
                    <ACamera 
                        initialImage={props.initialImage2.uri}
                        onPictureTaken={(image)=>{ 
                            if(props.onPictureDorsoTaken){
                                props.onPictureDorsoTaken(image);
                            }
                        }}/>
                </View>
            </View>
            <View style={{ marginLeft: `10%`, paddingLeft: 10 }}>
                { props.errorFrente ? <Text style={{color: 'red'}}>{props.errorFrente}</Text> : null }
                { props.errorDorso ? <Text style={{color: 'red'}}>{props.errorDorso}</Text> : null }
                { props.errorDNI ? <Text style={{color: 'red'}}>{props.errorDNI}</Text> : null }
            </View>
            
        </View>
        
    )};

    /*
    IDWithPictures.propTypes = {
        initialImage1: PropTypes.object,
        initialImage2: PropTypes.object
    }
    */
    IDWithPictures.propTypes = {
        initialImage1: PropTypes.object,
        initialImage2: PropTypes.object
    }
      
    IDWithPictures.defaultProps = {
        initialImage1: {uri: ''},
        initialImage2: {uri: ''}
    };