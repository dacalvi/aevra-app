import React from 'react';
import {View, Text } from 'react-native';
import Dia from './Dia';
import PropTypes from 'prop-types';

export default class ADiaSemanaSelector extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    
    return (
      <View style={{flex: 1,flexDirection: 'row',  justifyContent: 'flex-start', border: 1}}>
        <Text style={{width: '30%'}}>Dias disponibles: </Text>
        <View style={{width: '70%', flex: 1,flexDirection: 'row',  justifyContent: 'flex-start', border: 1}}>
            <Dia label="D" checked={this.props.selectedDays[0]} onPress={(status)=> this.props.onDayChange(0, status)}/>
            <Dia label="L" checked={this.props.selectedDays[1]} onPress={(status)=> this.props.onDayChange(1, status)}/>
            <Dia label="M" checked={this.props.selectedDays[2]} onPress={(status)=> this.props.onDayChange(2, status)}/>
            <Dia label="M" checked={this.props.selectedDays[3]} onPress={(status)=> this.props.onDayChange(3, status)}/>
            <Dia label="J" checked={this.props.selectedDays[4]} onPress={(status)=> this.props.onDayChange(4, status)}/>
            <Dia label="V" checked={this.props.selectedDays[5]} onPress={(status)=> this.props.onDayChange(5, status)}/>
            <Dia label="S" checked={this.props.selectedDays[6]} onPress={(status)=> this.props.onDayChange(6, status)}/>
        </View>
      </View>
    )
  }
};


ADiaSemanaSelector.propTypes = {
  onDayChange: PropTypes.func,
  selectedDays: PropTypes.array
}

ADiaSemanaSelector.defaultProps = {
  selectedDays: []
};
