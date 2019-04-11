import React from 'react';
import {View, Text, TouchableOpacity, Alert } from 'react-native';
import { Button } from 'react-native-material-ui';
import styles from '../constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import RestApi from '../common/RestApi';
import { isSignedIn } from '../common/auth';




export default class Postulacion  extends React.Component{
    
    constructor(props) {
        super(props);
    }

    cancelarPostulacion(id){
        console.log("CANCELANDO POSTULACION:" + id);
        isSignedIn()
        .then(()=>{ 
        this.api = new RestApi();
        this.api.cancelarPostulacion(id)
            .then((responseJson)=>{
            console.log(responseJson);
            this.props.onCancel();
                //this.setState({postulaciones : responseJson.data});
            })
            .catch((err)=>{
                console.log(err);
                this.setState({refreshing: false});
                alert(err);
            });
        })
        .catch(()=>{ this.props.navigation.navigate('Auth') });
    }

    render(){
        return (
            <View>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-start', 
                    marginBottom: 5,
                    marginLeft: 10,
                    paddingTop: 10,
                }}> 
                    <Text style={{width: '30%', fontWeight: 'bold'}}>{this.props.categoria}</Text>
                    <View style={{width: '70%', flex: 1,flexDirection: 'column'}}>
                        <TouchableOpacity onPress={()=>{
                            this.props.navigation.navigate("DescripcionTrabajoProfesional", this.props.postulacion);
                        }}>
                            <View style={{flex:1, flexDirection: 'row'}}>
                                <Ionicons name="ios-eye" size={18} color="lightgray" />
                                <Text style={{width: '60%'}}>Descripcion del trabajo</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flex:1, flexDirection: "row", justifyContent: "center", marginBottom: 30}}>
                    <Button raised primary text="CANCELAR POSTULACION" 
                            style={{
                                    color: 'white',
                                    backgroundColor: '#00AAB4', 
                                    borderRadius: 30,
                                    fontSize: 12
                                    }} 
                            onPress={() => { 
                                Alert.alert(
                                    'Cancelar Postulacion',
                                    'Al al cancelar la postulacion no podra ser seleccionado para el trabajo.',
                                    [
                                        {text: 'Si, cancelar', onPress: () => {
                                            this.cancelarPostulacion(this.props.postulacion.postulacion_id);
                                        }}
                                    ],
                                    {cancelable: true},
                                    );
                                }}/>
                </View>
            </View>
        )
    }
    
};