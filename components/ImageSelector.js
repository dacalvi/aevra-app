import React from 'react';
import { Text, View, Image } from 'react-native';

export default ImageSelector = (props) => {
    
    return (
        <View style={{ padding: 10, flex: 1, flexDirection: 'column', maxHeight: 100 }} >
          <Text style={{marginBottom: 10}} numberOfLines={4}> {props.label} </Text>
          <View style={{ flexDirection: 'row' }} >
          <Image
            style={{
              backgroundColor: 'rgba(163, 163, 163, 1)',
              height: 40,
              width: 40,
              margin: 5
            }}
          />
          <Image
            style={{
              backgroundColor: 'rgba(163, 163, 163, 1)',
              height: 40,
              width: 40,
              margin: 5
            }}
          />
          <Image
            style={{
              backgroundColor: 'rgba(163, 163, 163, 1)',
              height: 40,
              width: 40,
              margin: 5
            }}
          />
          <Image
            style={{
              backgroundColor: 'rgba(163, 163, 163, 1)',
              height: 40,
              width: 40,
              margin: 5
            }}
          />
          <Image
            source={{
              uri:
                "https://storage.googleapis.com/laska-a5b9d.appspot.com/users/RNzUef7xc9bY1UuqX2q4O3f6Srh1/apps/-L_xrvRrJwh1bCRJvWvS/56eb06ba-4d66-4d06-b798-9a3a8b8b5aa2",
              fileId: "56eb06ba-4d66-4d06-b798-9a3a8b8b5aa2"
            }}
            style={{
              backgroundColor: 'rgba(163, 163, 163, 1)',
              height: 40,
              width: 40,
              margin: 5
            }}
          />
        </View>
      </View>
)};