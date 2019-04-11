import React from 'react';
import { Checkbox } from 'react-native-paper';
import PropTypes from 'prop-types';
import {View, Text } from 'react-native';
class Dia extends React.Component {

    constructor(){
        super();
    }

    
    state = {
        checked: false
    };


    render(){
        const { checked } = this.state;
        return (
            <View style={{inlineFlex: 1,flexDirection: 'column', alignItems: 'center', border: 1}}>
                <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => { 
                    this.setState({ checked: !checked }, ()=> { 
                        if(this.props.onPress){
                            this.props.onPress(!checked); 
                        }
                    });
                    }} 
                />
                <Text>{this.props.label}</Text>
            </View>
        )
    }
}

Dia.propTypes = {
    checked: PropTypes.bool,
    onPress: PropTypes.func,
    label: PropTypes.string
}
  
Dia.defaultProps = {
    checked: true,
    label: ''
};


export default Dia;