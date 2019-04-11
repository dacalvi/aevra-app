import React from 'react';
import {View, Text, Picker } from 'react-native';

export default Horarios = (props) => {
    
    return (
      <View
      style={{
        flex: 1,
        justifyContent: `flex-start`,
        alignItems: `flex-start`,
        overflow: `visible`,
        flexWrap: `nowrap`,
        maxHeight: 50,
        zIndex: 0
      }}
    >
      <View
        style={{
          flexDirection: `row`,
          justifyContent: `space-around`,
          width: `100%`
        }}
      >
        <View
          style={{
            width: `50%`
          }}
        >
          <Text childrenString={props.label}>{props.label}</Text>
        </View>
        <View
          style={{
            width: `50%`
          }}
        >
          <Picker
            items={[
              {
                label: "9 a 12",
                value: "9-12"
              },
              {
                label: "13 a 18",
                value: "13-18"
              }
            ]}
          />
        </View>
      </View>
    </View>
)};


