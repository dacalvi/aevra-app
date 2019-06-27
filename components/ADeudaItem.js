import React from 'react';
import { View, Text } from 'react-native';
import { Checkbox } from 'react-native-paper';
import moment from 'moment';
export default class ADeudaItem extends React.Component{
    
    state = {
        checked: false
    }

    constructor(props){
        super(props);

        const dateTime = this.props.item.vencimiento;
        let dateTimeParts= dateTime.split(/[- :]/);
        dateTimeParts[1]--; 
        this.obj_vencimiento = new Date(...dateTimeParts);
        this.obj_vencimiento = moment(this.obj_vencimiento).format("DD/MM/YYYY");
    }

    render(){
        let { checked }  = this.state;
        return (
            <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray'}}>
                <View>
                    <Text style={{fontSize:16, fontWeight: 'bold'}}>{this.props.item.categoria}</Text>
                </View>
                <View style={{flex:1, flexDirection: 'row'}}>
                    <Text style={{width: '65%'}}>{this.props.item.descripcion}</Text>
                    <Text style={{fontSize:14, width: '35%', alignContent: 'flex-end', textAlign: 'right'}}>Vence {this.obj_vencimiento}</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{width: '90%', flex: 1, flexDirection: 'row'}}>
                        <Text >A pagar a Aevra </Text>
                        {parseFloat(this.props.item.comision_calculada)>0? 
                            <Text style={{color: 'red', fontWeight: 'bold'}}>${this.props.item.comision_calculada}</Text>: 
                            <Text style={{color: 'green', fontWeight: 'bold', marginBottom: 10}}>Gratis</Text>
                        }
                    </View>
                    {parseFloat(this.props.item.comision_calculada)>0? 
                        <View style={{width: '10%', alignContent: 'flex-end'}}>
                            <Checkbox
                                status={checked ? 'checked' : 'unchecked'}
                                onPress={() => { 
                                if(this.props.onPress){
                                    this.props.onPress(this.props.item.comision_calculada, !checked, this.props.item.id); 
                                }
                                this.setState({ checked: !checked });
                                }} 
                            />
                        </View>
                        :
                        <View style={{width: '10%', alignContent: 'flex-end', marginBottom: 10}}></View>
                        
                    }
                    
                </View>
            </View>
        )
    }
};

