import React from 'react';
import { View, Text } from 'react-native';
import GroupTitle from './GroupTitle';
import AevraRating from './AevraRating';
export default class TrabajoFinalizado extends React.Component{
    
    constructor(props){
        super(props);
    }

    render(){
        return (
            <View style={{borderBottomWidth: 1,   borderBottomColor: 'rgba(111, 111, 111, 1)'}}>
                <GroupTitle label={ this.props.trabajo.status + ': ' + this.props.trabajo.descripcion} />
                <Text style={{marginLeft: 10}}>{this.props.trabajo.first_name} {this.props.trabajo.last_name}</Text>
                <Text style={{marginLeft: 10, fontWeight: 'bold'}}>
                    $ {this.props.trabajo.monto}  
                </Text>
                <AevraRating 
                    label="Puntualidad" 
                    rating={this.props.trabajo.puntualidad}
                    editable={false} />
                <AevraRating 
                    label="Amabilidad" 
                    rating={this.props.trabajo.amabilidad}
                    editable={false} />
                <AevraRating 
                    label="Calidad" 
                    rating={this.props.trabajo.calidad}
                    editable={false} />
                <AevraRating 
                    label="Orden" 
                    rating={this.props.trabajo.orden}
                    editable={false} />
            </View>
        )
    }
};

