import React from 'react';
import { View, Text, Alert } from 'react-native';
import { Button } from 'react-native-material-ui';
import GroupTitle from './GroupTitle';
import AvatarProfesional from './AvatarProfesional';
import styles from '../constants/Styles';
import RestApi from '../common/RestApi';

export default class EnProcesoClienteItem extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={{marginLeft:10}}>
                <GroupTitle label={this.props.item.categoria_nombre} />
                <Text style={{marginLeft:10}}>{this.props.item.descripcion}</Text>
                

                <AvatarProfesional
                    editable={false}
                    avatar={this.props.item.avatar}
                    nombre={this.props.item.nombre_profesional + ' ' + this.props.item.apellido_profesional}
                    cantidadTrabajosFinalizados={this.props.item.trabajos_finalizados}
                    estrellas={this.props.item.rating_promedio}/>
            
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <View style={{width: '30%'}}>
                        <Text>$ {this.props.item.monto}</Text>
                    </View>
                    <View style={{width: '100%', flex: 1, flexDirection: 'column'}}>

                        <View style={{ flex: 1, flexDirection: 'row'}}>
                            <View style={{width: '50%'}}>
                                <Button raised primary text="VER DETALLE" style={styles.botonAevra} 
                                    onPress={() => { 
                                        this.props.navigation.navigate("DescripcionTrabajoProfesionalReadOnly", this.props.item);
                                    }}/>
                            </View>
                            
                            <View style={{width: '50%'}}>
                                <Button raised primary text="MENSAJES" style={{
                                        container: { backgroundColor: 'red'},
                                        text: {color: 'white'},
                                    }} 
                                    onPress={() => { 
                                        this.props.navigation.navigate("Chat", {'chat_id': this.props.item.id});
                                    }}/>
                            </View>
                        </View>

                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={{width: '50%'}}>
                                <Button raised primary text="CANCELAR TRABAJO" style={{
                                        container: { backgroundColor: '#888888'},
                                        text: {color: 'white', textAlign: 'center'},
                                    }} 
                                    onPress={() => { 
                                        Alert.alert(
                                            'Cancelar trabajo',
                                            'Esta seguro que desea cancelar este trabajo?',
                                            [
                                                {text: 'Si, cancelar', onPress: () => {
                                                    
                                                    this.api = new RestApi();
                                                    this.api.cancelarTrabajoCliente(this.props.item.id)
                                                    .then((responseJson)=>{
                                                        this.props.onCancelTrabajo();
                                                    })
                                                    .catch((err)=>{
                                                        alert(err);
                                                    });
                                                }},
                                            ],
                                            {cancelable: true},
                                        );
                                    }}/>
                            </View>  
                            <View style={{width: '50%'}}>  
                                <Button raised primary text="TRABAJO TERMINADO" style={{
                                        container: { backgroundColor: '#000000'},
                                        text: {color: 'white', textAlign: 'center'},
                                    }} 
                                    onPress={() => {
                                        this.props.navigation.navigate('FinalizarTrabajo', {'solicitud': this.props.item});
                                    }}/>
                            </View>
                        </View>            
                            
                    </View>
                </View>
               
               
            </View>
        )
    }
};

