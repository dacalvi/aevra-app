import React from 'react';
import {View, Text, Picker } from 'react-native';
import PropTypes from 'prop-types';
import Tilde from './Tilde';

export default class Horario extends React.Component {
    
    constructor(){
        super();
        this.state = {
            horario: ''
        }
    }

    componentWillReceiveProps(props) {
        this.setState({checked: props.checked});
    }

    addHorario(horario){
        if(this.state.horario == ''){
            this.setState({horario}, ()=>{
                this.props.onChangeValue(this.state.horario);
            });
        }else{
            let array_horarios = this.state.horario.split(',');
            if(array_horarios.indexOf(horario) == -1){
                array_horarios.push(horario)
            }
            this.setState({horario: array_horarios.join(',')}, ()=>{
                this.props.onChangeValue(this.state.horario);
            })
        }
    }

    removeHorario(horario){
        if(this.state.horario != ''){
            let array_horarios = this.state.horario.split(',');
            if(array_horarios.indexOf(horario) > -1){
                array_horarios.splice(array_horarios.indexOf(horario), 1);
            }
            this.setState({horario: array_horarios.join(',')}, ()=>{
                this.props.onChangeValue(this.state.horario);
            })
        }
    }


    render(){
        return (
            <View style={{
                alignItems: 'flex-start',
                backgroundColor: 'rgba(255, 255, 255, 1)',
                flex: 1,
                justifyContent: 'flex-start',
                flexDirection: 'row',
                
                padding: 10,
                }}>
                <Text style={{ marginRight: 10, width: '25%' }}>{this.props.label}</Text>
                
                {
                    !this.props.multiple? 
                        <Picker
                        selectedValue={this.state.horario}
                        style={{height: 50, width: 200}}
                        onValueChange={(itemValue, itemIndex) =>
                            this.setState({horario: itemValue}, ()=>{
                                this.props.onChangeValue(this.state.horario);
                            })
                        }>
                        
                        {this.props.items.map(((item, i)=>{
                            return (
                                <Picker.Item key={i} label={item.label} value={item.value} />
                            );
                        }))}

                        </Picker>:
                        <View style={{flex:1, flexDirection:'column'}}>
                            {this.props.items.map(((item, i)=>{
                                return (
                                    <View key={i} style={{height: 30}}>
                                        <Tilde key={i} label={item.label} onPress={(chequeado)=>{
                                            if(chequeado){
                                                this.addHorario(item.value);
                                            }else{
                                                this.removeHorario(item.value);
                                            }
                                        }}/>
                                    </View>
                                );
                            }))}
                        </View>
                        
                    
                    
                }

            </View>
        )
    }
};

Horario.propTypes = {
    label: PropTypes.string,
    selectedValue: PropTypes.string,
    items: PropTypes.array,
    onValueChange: PropTypes.func
}
  
Horario.defaultProps = {
    label: 'Horarios',
    selectedValue: '8a12',
    items: [
    {label: '00:00 a 04:00', value: '0a4'}, 
    {label: '04:00 a 08:00', value: '4a8'}, 
    {label: '08:00 a 12:00', value: '8a12'}, 
    {label: '12:00 a 16:00', value: '12a16'}, 
    {label: '16:00 a 20:00', value: '16a20'}, 
    {label: '20:00 a 24:00', value: '20a24'}
    ]
};