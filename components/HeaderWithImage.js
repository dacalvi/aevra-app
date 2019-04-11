import React from 'react';
import { Text, View, Image } from 'react-native';

const HeaderWithImage = (props) => {
    
    return (
        <View style={styles.sbf9e8383}>
            <Image style={styles.s4e99e6cc} source={this.props.soruce}/>
            <Text style={styles.sa489a7fe}>{this.props.label}</Text>
        </View>
)};

export default HeaderWithImage;


const styles = StyleSheet.create({
    s4e99e6cc: {
      width: 70,
      height: 70,
      marginRight: 10
    },
    sa489a7fe: {
      marginRight: 10,
      fontSize: 18,
      fontWeight: `bold`
    },
    sbf9e8383: {
      alignItems: `center`,
      backgroundColor: `rgba(255, 255, 255, 1)`,
      flex: 1,
      justifyContent: `flex-start`,
      flexDirection: `row`,
      width: `100%`,
      padding: 10,
      maxHeight: 100
    }
  });