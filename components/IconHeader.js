import React from 'react';
import { Text, View, Image } from 'react-native';

const IconHeader = (props) => {
    
    return (
      <View
      style={{
        alignItems: `flex-start`,
        backgroundColor: `rgba(255, 255, 255, 1)`,
        flex: 1,
        justifyContent: `flex-start`,
        flexDirection: `row`,
        padding: 10,
        maxHeight: 100,
        marginBottom: 20
      }}
    >
      <View style={{ flex: 1, alignItems: `center`, maxHeight: 60, maxWidth: 60, padding: 5, flexDirection: 'column', justifyContent: 'center'}}>
        <View style={{position: 'absolute', height: 60, width: 60 }}>
            <Image
                style={{ height: 60,  width: 60, flex: 0, resizeMode: 'cover', }}
                source={ require('../assets/images/porta_icono.png') }    
            />
        </View>      
        <Image
            style={{
                height: 40, 
                width: 40,
            }}
            source={props.source}

        />
      </View>
      <View
        style={{
          alignItems: `flex-start`,
          flex: 1,
          marginLeft: 10,
          minWidth: 80,
          paddingTop: 10
        }}
      >
        <Text
          style={{
            fontSize: 12
          }}
          childrenString={props.topTitle}
        >
          {props.topTitle}
        </Text>
        <Text
          style={{
            fontSize: 18
          }}
          childrenString={props.title}
        >
          {props.title}
        </Text>
      </View>
    </View>
)};

export default IconHeader;