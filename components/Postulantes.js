import React from 'react';
import {View, Image, TextInput, Text, Alert } from 'react-native';
import TextoDosColumnas from './TextoDosColumnas';
import GroupTitle from './GroupTitle';
import { Button } from 'react-native-material-ui';
import styles from '../constants/Styles';
import { API_URL } from '../common/config';
import { Avatar } from 'react-native-paper';
export default class Postulantes extends React.Component {

    render(){
        return (
                <View>
                    <GroupTitle label="Postulantes" />

                    { this.props.postulantes.length == 0 ? 
                    <View style={{
                        flex:1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'  
                    }}>
                    <Text>Todavia no se ha postulado nadie para este trabajo...</Text>
                    
                    </View>
                    : <Text></Text>  
                    }

                    { this.props.postulantes.map((postulante, i)=>{
                        return (
                            <View key={i}>
                                <Avatar.Image size={64} source={{uri: API_URL + postulante.avatar}} /> 
                                
                                <TextoDosColumnas columna1="Prestador" columna2={postulante.first_name} />
                                <TextoDosColumnas columna1="Presupuesto" columna2={'$' + postulante.monto} />
                                <TextoDosColumnas columna1="Comentario" columna2={postulante.comentario} />
                                <View style={{flexDirection: 'row',justifyContent: 'flex-end'}}>      
                                    <Button raised primary text="VER PERFIL" style={styles.botonAevra} 
                                            onPress={() => { 
                                                this.props.navigation.navigate("PerfilProfesionalPublico", {'user_id': postulante.user_id});
                                            }}/>
                                        </View>
                                        <View style={{flexDirection: 'row',justifyContent: 'flex-end'}}> 
                                        {this.props.solicitud_status == 'pendiente'?
                                            <Button raised primary text="SELECCIONAR PRESTADOR" style={styles.botonAevra} 
                                            onPress={() => { 
                                            Alert.alert(
                                                'Seleccionar prestador',
                                                'Al seleccionar el prestador acepta que el candidato parece ser apto para el trabajo',
                                                [
                                                    {text: 'Seleccionar prestador', onPress: () => {
                                                        this.props.onAcceptCandidate(postulante.user_id, postulante.id, postulante.monto);
                                                    }}
                                                ],
                                                {cancelable: true},
                                                );
                                            }}/>: <View></View>
                                        }

                                        
                                </View>
                            </View>
                        );
                    })}
                </View>                   
            )
    }
    
};