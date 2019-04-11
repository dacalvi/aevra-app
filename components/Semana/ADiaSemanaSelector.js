import React from 'react';
import {View, Text } from 'react-native';
import Dia from './Dia';
class ADiaSemanaSelector extends React.Component {
  
  

  render(){
    
    return (
      <View style={{flex: 1,flexDirection: 'row',  justifyContent: 'flex-start', border: 1}}>
        <Text style={{width: '30%'}}>Dias disponibles: </Text>
        <View style={{width: '70%', flex: 1,flexDirection: 'row',  justifyContent: 'flex-start', border: 1}}>
            <Dia label="D" onPress={(status)=> this.props.onDayChange(0, status)}/>
            <Dia label="L" onPress={(status)=> this.props.onDayChange(1, status)}/>
            <Dia label="M" onPress={(status)=> this.props.onDayChange(2, status)}/>
            <Dia label="M" onPress={(status)=> this.props.onDayChange(3, status)}/>
            <Dia label="J" onPress={(status)=> this.props.onDayChange(4, status)}/>
            <Dia label="V" onPress={(status)=> this.props.onDayChange(5, status)}/>
            <Dia label="S" onPress={(status)=> this.props.onDayChange(6, status)}/>
        </View>
      </View>
    )
  }
};
export default ADiaSemanaSelector