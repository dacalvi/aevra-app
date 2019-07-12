import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GroupTitle from './GroupTitle';
import AevraRating from './AevraRating';
import { Avatar } from 'react-native-paper';
import { Checkbox } from 'react-native-paper';
import moment from 'moment';
export default class TrabajoFinalizado extends React.Component{
    
    constructor(props){
        super(props);
        let finalizado = moment(this.props.trabajo.finalizado_fecha);
        let hoy = moment();
        
        this.state = {
            dias_de_finalizado : hoy.diff(finalizado, 'days')
        }
    }

    render(){
        return (
            <View style={{borderBottomWidth: 1,   borderBottomColor: 'rgba(111, 111, 111, 1)'}}>
                <View style={{flex:1, flexDirection: 'row'}}>
                    <GroupTitle label={ this.props.trabajo.status + ': ' + this.props.trabajo.descripcion} />
                    
                    {this.state.dias_de_finalizado <= 7?
                        <TouchableOpacity onPress={()=>{ this.props.navigation.navigate('Chat', {'chat_id': this.props.trabajo.id})}}>
                            <Avatar.Icon size={32} style={{backgroundColor: '#00AAB4'}} color='white' icon={'chat-bubble'} />
                        </TouchableOpacity>:
                        null
                    }
                </View>
            
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

