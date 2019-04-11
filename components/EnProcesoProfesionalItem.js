import React from 'react';
import { View, Text } from 'react-native';
import GroupTitle from './GroupTitle';
import TextoDosColumnas from './TextoDosColumnas';
export default class EnProcesoProfesionalItem extends React.Component{
    
    state = {

    }

    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={{marginLeft:10}}>
                <GroupTitle label={this.props.item.categoria} />
                <Text style={{marginLeft:10}}>{this.props.item.descripcion}</Text>
                <TextoDosColumnas columna1="Cliente" columna2={this.props.item.user_id} />
                <TextoDosColumnas columna1="Direccion" columna2={this.props.item.direccion} />
                <View style={{flex: 1, flexDirection: 'row', marginLeft: 10}}>
                    <View style={{width: '30%'}}>
                        <Text>???Monto????</Text>
                    </View>
                    <View style={{width: '70%', flex: 1, flexDirection: 'column'}}>
                       <Text>Botones</Text>
                    </View>
                </View>
               
               
            </View>
        )
    }
};

