import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, TouchableOpacity, View, Alert, Image} from 'react-native';
import { Camera, Permissions } from 'expo';
import { Ionicons } from '@expo/vector-icons';

export default class ACamera extends Component {
  
    state = {
        modalVisible: false,
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
        image: ''
    };

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    snap = async () => {
        
        if (this.camera) {
            let image = await this.camera.takePictureAsync();
            this.setState({
                image: image.uri
            });
            if(this.props.onPictureTaken){
                this.props.onPictureTaken(image);
            }
            this.setModalVisible(false);
        }
    };

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    render() {
        return (
            <View style={{ marginRight: 10}}>
                <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    //Alert.alert('Modal has been closed.');
                }}>
                <View style={{flex: 1}}>

                    <Camera 
                        style={{ flex: 1 }} type={this.state.type}
                        ref={ref => { this.camera = ref; }} 
                        
                        >
                        
                        <View
                        style={{
                            flex: 1,
                            backgroundColor: 'transparent',
                            flexDirection: 'column',
                            justifyContent: `flex-end`
                        }}>
                            <TouchableHighlight
                                onPress={() => {
                                this.setModalVisible(!this.state.modalVisible);
                                }}>
                                <Ionicons name="ios-close" size={50} color="white" />
                            </TouchableHighlight>
                            
                            <TouchableOpacity
                                onPress={() => {
                                this.setState({
                                    type: this.state.type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back,
                                });
                                }}>
                                    <Ionicons name="ios-reverse-camera" size={50} color="white" />
                            </TouchableOpacity>
                                
                            <TouchableOpacity onPress={() => { this.snap();}}>
                                <Ionicons name="ios-camera" size={50} color="white" />
                            </TouchableOpacity>

                            </View>
                    </Camera>
                </View>
                </Modal>

                <TouchableHighlight onPress={() => { this.setModalVisible(true); }}>
                    { this.state.image == '' ?
                        <Image  style={{ width: 50, height: 50 }} source={require('../assets/images/camera.png')}/> : 
                        <TouchableHighlight onPress={
                            () => { Alert.alert(
                                'Imagen',
                                'Que desea hacer con la imagen?',
                                [
                                    /*
                                  {
                                    text: 'Tomar nuevamente',
                                    onPress: () => {
                                        this.setModalVisible(true);
                                        this.snap()
                                    }
                                  },*/
                                  {
                                      text: 'Borrar imagen', 
                                      onPress: () => {
                                        this.setState({image: ''}, ()=>{
                                            this.props.onPictureTaken(null);
                                        });
                                      },
                                      style: 'cancel'
                                    },
                                ],
                                {cancelable: true},
                              ) }
                        }>
                            <Image  style={{ width: 50, height: 50 }} source={{uri: this.state.image, isStatic:true}}/> 
                        </TouchableHighlight>
                    }
                </TouchableHighlight>
            </View>
        );
    }
}
