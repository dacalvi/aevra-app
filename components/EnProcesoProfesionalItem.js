import React from 'react';
import { View, Text, Alert } from 'react-native';
import GroupTitle from './GroupTitle';
import TextoDosColumnas from './TextoDosColumnas';
import { Button } from 'react-native-material-ui';
import styles from '../constants/Styles';
import RestApi from '../common/RestApi';


export default class EnProcesoProfesionalItem extends React.Component{
    
    state = {

    }

    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={{marginLeft:10}}>
                <GroupTitle label={this.props.item.nombre} />
                <Text style={{marginLeft:10}}>{this.props.item.descripcion}</Text>
                <TextoDosColumnas columna1="Cliente" columna2={this.props.item.first_name + ' ' + this.props.item.last_name} />
                <TextoDosColumnas columna1="Direccion" columna2={this.props.item.direccion} />
                <View style={{flex: 1, flexDirection: 'row', marginLeft: 10}}>
                    <View style={{width: '20%'}}>
                        <Text>$ {this.props.item.monto}</Text>
                    </View>
                    <View style={{width: '80%', flex: 1, flexDirection: 'column'}}>
                            
                            {this.props.item.monto_anterior == ''? 
                                <Button raised primary text="EDITAR PRESUPUESTO" style={styles.botonAevra} 
                                    onPress={() => { 
                                        this.props.navigation.navigate("EstimarTrabajoProfesional", {"item": this.props.item});
                                    }}/>:
                                    null
                            }

                            <Button raised primary text="VER DETALLE" style={styles.botonAevra} 
                                onPress={() => { 
                                    this.props.navigation.navigate("DescripcionTrabajoProfesionalReadOnly", this.props.item);
                                }}/>

                            <Button raised primary text="MENSAJES" style={styles.botonAevra} 
                                onPress={() => { 
                                    this.props.navigation.navigate("Chat", 
                                        {
                                            chat_id: this.props.item.solicitud_id});
                                }}/>

                            <Button raised primary text="CANCELAR TRABAJO" style={styles.botonAevra} 
                                onPress={() => {

                                    Alert.alert(
                                        'Cancelar trabajo',
                                        'Esta seguro que desea cancelar este trabajo?',
                                        [
                                            {text: 'Si, cancelar', onPress: () => {
                                                
                                                this.api = new RestApi();
                                                this.api.cancelarTrabajoProfesional(this.props.item.solicitud_id)
                                                  .then((responseJson)=>{
                                                      this.props.onCancelTrabajo();
                                                  })
                                                  .catch((err)=>{
                                                    //console.log(err);
                                                    alert(err);
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

