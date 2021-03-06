import React from 'react';
import {View, Image, TextInput, Text, Alert } from 'react-native';
import { Button } from 'react-native-material-ui';
import GroupTitle from './GroupTitle';
import Postulantes from './Postulantes';
import styles from '../constants/Styles';
import RestApi from '../common/RestApi';
import { isSignedIn } from '../common/auth';
export default class TrabajoSolicitado extends React.Component{ 
    
    cancelarTrabajo(id){
        return new Promise((resolve, reject)=>{
            isSignedIn()
            .then(()=>{ 
            this.api = new RestApi();
            this.api.cancelServiceRequest(id)
                .then((responseJson)=>{
                    resolve();
                })
                .catch((err)=>{
                    reject();
                    //console.log(err);
                    alert(err);
                });
            })
            .catch(()=>{ this.props.navigation.navigate('Auth') });
        });
    }

    seleccionarPrestador(solicitud_id, prestador, postulacion_id, monto){
        return new Promise((resolve, reject)=>{
            isSignedIn()
            .then(()=>{ 
            this.api = new RestApi();
            this.api.aceptarPostulacion(solicitud_id, prestador, postulacion_id, monto)
                .then((responseJson)=>{
                    resolve();
                })
                .catch((err)=>{
                    reject();
                    //console.log(err);
                    alert(err);
                });
            })
            .catch(()=>{ this.props.navigation.navigate('Auth') });
        });
    }

    render(){
        const { navigation } = this.props;
        return (
            <View style={{marginLeft: 10, marginTop: 20, borderTopWidth: 1, borderColor: `rgba(133, 133, 133, 1)`}}>
                
                <Text style={{fontWeight: 'bold', marginLeft: 10, marginTop: 10}}>{this.props.solicitud.categoria_nombre}</Text>
                <Text style={{padding: 10}}>{this.props.solicitud.descripcion}</Text>

                <View>
                    
                    <View style={{
                        flexDirection: 'row',justifyContent: 'flex-end', marginBottom: 10}}>      
                        <Button raised text="CANCELAR TRABAJO"  
                            style={
                                {
                                    container: { backgroundColor: '#888888'},
                                    text: {color: 'white'},
                                }
                            }
                            onPress={() => { 
                            Alert.alert(
                                'Cancelar Trabajo',
                                'Realmente desea cancelar la solicitud de trabajo?',
                                [
                                    {text: 'Si, Cancelar', onPress: () => {
                                        //console.log('Cancelando');
                                        this.cancelarTrabajo(this.props.solicitud.id)
                                        .then(()=>{
                                            this.props.onChange();
                                        });
                                    }},
                                ],
                                {cancelable: true},
                            );
                            }}/>
                    </View>
                </View>

                
                    
                

                <View style={{marginLeft: 20, borderTopWidth: 0, borderColor: `rgba(216, 216, 216, 1)`}}>
                    <Postulantes 
                        navigation={navigation}
                        solicitud_status={this.props.solicitud.status} 
                        postulantes={this.props.solicitud.postulaciones} 
                        onAcceptCandidate={ (candidate_id, postulacion_id, monto)=> {
                            this.seleccionarPrestador(this.props.solicitud.id, candidate_id, postulacion_id, monto)
                            .then(()=>{
                                this.props.onChange();
                            });
                        }} />
                </View> 
            </View>                 
        )

    }

};