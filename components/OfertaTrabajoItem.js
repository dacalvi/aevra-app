import React from 'react';
import {View, Text, TouchableOpacity } from 'react-native';
import moment from 'moment';
export default OfertaTrabajoItem = (props) => {
    
    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={{
                flexDirection: `row`,
                justifyContent: `flex-start`, 
                marginBottom: 5,
                marginLeft: 10,
                paddingTop: 10,
                }}> 
                <Text style={{width: '30%', fontWeight: 'bold'}}>{props.categoria}</Text>
                
                <View style={{width: '70%', flex: 1, flexDirection: 'column'}}>
                    <Text>{props.descripcion}</Text>
                    <Text style={{fontStyle: 'italic', fontSize: 8}}>Publicado: {moment(props.oferta.fecha_publicado).format("DD/MM/YYYY h:mm:ss")}</Text>
                    <Text style={{fontStyle: 'italic', fontSize: 8}}>a {props.oferta.distancia} metros</Text>
                    
                </View>
                
            </View>
        </TouchableOpacity>
)};