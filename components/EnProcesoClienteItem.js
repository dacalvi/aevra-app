import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-material-ui';
import GroupTitle from './GroupTitle';
import AvatarProfesional from './AvatarProfesional';
import styles from '../constants/Styles';
export default class EnProcesoClienteItem extends React.Component{
    
    state = {

    }

    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={{marginLeft:10}}>
                <GroupTitle label={this.props.item.categoria_nombre} />
                <Text style={{marginLeft:10}}>{this.props.item.descripcion}</Text>
                
                    <AvatarProfesional 
                        avatar={require('../assets/images/avatar.png')}
                        nombre={this.props.item.nombre_profesional + ' ' + this.props.item.apellido_profesional}
                        cantidadTrabajosFinalizados={1}
                        estrellas={5}/>
                
                <View style={{flex: 1, flexDirection: 'row', marginLeft: 10}}>
                    <View style={{width: '30%'}}>
                        <Text>$ {this.props.item.monto}</Text>
                    </View>
                    <View style={{width: '70%', flex: 1, flexDirection: 'column'}}>
                            <Button raised primary text="VER DETALLE" style={styles.botonAevra} 
                                onPress={() => { 
                                Alert.alert(
                                    'Cancelar Trabajo',
                                    'Realmente desea cancelar la solicitud de trabajo?',
                                    [
                                        {text: 'Si, Cancelar', onPress: () => {
                                            console.log('Cancelando');
                                            this.cancelarTrabajo(this.props.solicitud.id)
                                            .then(()=>{
                                                this.props.onChange();
                                            });
                                        }},
                                    ],
                                    {cancelable: true},
                                );
                                }}/>

                            <Button raised primary text="MENSAJES" style={styles.botonAevra} 
                                onPress={() => { 
                                Alert.alert(
                                    'Cancelar Trabajo',
                                    'Realmente desea cancelar la solicitud de trabajo?',
                                    [
                                        {text: 'Si, Cancelar', onPress: () => {
                                            console.log('Cancelando');
                                            this.cancelarTrabajo(this.props.solicitud.id)
                                            .then(()=>{
                                                this.props.onChange();
                                            });
                                        }},
                                    ],
                                    {cancelable: true},
                                );
                                }}/>

                            <Button raised primary text="CANCELAR TRABAJO" style={styles.botonAevra} 
                                onPress={() => { 
                                Alert.alert(
                                    'Cancelar Trabajo',
                                    'Realmente desea cancelar la solicitud de trabajo?',
                                    [
                                        {text: 'Si, Cancelar', onPress: () => {
                                            console.log('Cancelando');
                                            this.cancelarTrabajo(this.props.solicitud.id)
                                            .then(()=>{
                                                this.props.onChange();
                                            });
                                        }},
                                    ],
                                    {cancelable: true},
                                );
                                }}/>
                            
                            <Button raised primary text="TRABAJO TERMINADO" style={styles.botonAevra} 
                                onPress={() => { 
                                Alert.alert(
                                    'Cancelar Trabajo',
                                    'Realmente desea cancelar la solicitud de trabajo?',
                                    [
                                        {text: 'Si, Cancelar', onPress: () => {
                                            console.log('Cancelando');
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
               
               
            </View>
        )
    }
};

