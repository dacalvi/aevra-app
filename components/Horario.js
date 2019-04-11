import React from 'react';
import {View, Text, Picker } from 'react-native';
import PropTypes from 'prop-types';

export default class Horario extends React.Component {
    
    constructor(){
        super();
    }

    createItems(itemsArray){
        let items = [];
        itemsArray.forEach((el,key) => {
            items.push(<Picker.Item key={key} label={el.label} value={el.value} />);
        });

        return items;
    }

    render(){
        return (
            <View style={{
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 1)',
                flex: 1,
                justifyContent: 'flex-start',
                flexDirection: 'row',
                width: '100%',
                padding: 10,
                maxHeight: 100 }}>
                <Text style={{ marginRight: 10 }}>{this.props.label}</Text>
                <Picker
                    selectedValue={this.props.selectedValue}
                    style={{height: 50, width: 300}}
                    onValueChange={(itemValue, itemIndex) =>
                        this.props.onValueChange(itemValue, itemIndex)
                    }>
                    {this.createItems(this.props.items)}
                </Picker>
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
    selectedValue: '9a12',
    items: [{label: '9 a 12', value: '9a12'}, {label: '13 a 18', value: '13a18'}]
};