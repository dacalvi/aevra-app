import React from 'react';
import { TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from 'react-navigation';
import { View } from 'react-native'

class OpenDrawerProfesional extends React.Component {
    render() {
      return (
        <View style={{ justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
            <Ionicons name="md-menu" size={32} color="white" style={{marginRight: 15}} />
          </TouchableOpacity>
        </View>
      );
    }
  }
export default withNavigation(OpenDrawerProfesional);