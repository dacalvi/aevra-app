import React from 'react';
import {View, Text } from 'react-native';
import { Checkbox } from 'react-native-paper';

export default class Tilde extends React.Component {

  state = {
    checked: this.props.checked
  };

  


  render(){
    let { checked }  = this.state;
    return (
      <View style={{flex: 1,flexDirection: 'row',maxHeight: 50,height: 50}}>
        <View style={{ 
          //width: '15%'
          marginRight: 10 
        }}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => { 
              this.setState({ checked: !checked });
              if(this.props.onPress){
                this.props.onPress(!checked); 
              }
            }} 
          />
        </View>
        <View style={{ 
          //width: '85%' 
          }} >
          <Text
            style={{ marginBottom: 10, marginTop: 10  }}
            numberOfLines={4}
            childrenString={this.props.label} >
            {this.props.label}
          </Text>
          { this.props.error ? <Text style={{color: 'red'}}>{this.props.error}</Text> : <Text> </Text> }
        </View>
      </View>
    )
  }
};