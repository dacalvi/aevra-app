import React from 'react';
import  LogoTitle  from './LogoTitle';
import layout from '../constants/Layout';
import {IconHeader, OpenDrawerProfesional, GroupTitle, IconText} from '../components';
import { Image, View, Text, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Button  } from 'react-native-material-ui';

const imageHeight = layout.window.height / 2.5;
const imageWidth = layout.window.width;

export default class DescripcionTrabajoProfesional extends React.Component {

  static navigationOptions = {
    headerTitle: <LogoTitle />,
    headerStyle: {
      backgroundColor: '#00AAB4',
    },
    headerRight: <Text></Text>,
    headerRight: <OpenDrawerProfesional/>,
    headerTintColor: '#fff',
    headerTitleStyle: {flex: 1, textAlign: 'center'}
  };


  constructor(){
    super();
  }

  render() {
    return (
<KeyboardAvoidingView 
    style={{ flex: 1, backgroundColor: '#fff' }} 
    behavior="position" 
    keyboardVerticalOffset={-200}
    enabled>  
    <ScrollView>
        <View style={{marginleft: 20, marginRight:20, marginTop:20}} >
            <IconHeader 
                source={require('../assets/images/icon-user-black.png')}
                topTitle="Descripcion del Trabajo"
                title={this.props.navigation.state.params.nombre}
                style={{marginBottom: 20}} />
            <GroupTitle label="Descripcion del trabajo a realizar"/>
            <Text style={{marginLeft: 10, marginRight: 10}}>{this.props.navigation.state.params.descripcion}</Text>
            <GroupTitle label="Imagenes"/>
            <GroupTitle label="Materiales"/>
            <View style={{flex:1, flexDirection: 'row', marginLeft: 20, marginRight: 10}}>
                <Text style={{width: '80%'}}>Dispone Materiales?</Text>
                <Text style={{width: '20%'}}>{this.props.navigation.state.params.dispone_materiales == "1" ? 'SI': 'NO'}</Text>
            </View>
            <View style={{flex:1, flexDirection: 'row', marginLeft: 20, marginRight: 10}}>
                <Text style={{width: '80%'}}>Llevar materiales</Text>
                <Text style={{width: '20%'}}>{this.props.navigation.state.params.traer_materiales == "1" ? 'SI': 'NO'}</Text>
            </View>
            <View style={{flex:1, flexDirection: 'row', marginLeft: 20, marginRight: 10}}>
                <Text style={{width: '80%'}}>Observaciones sobre los materiales</Text>
                <Text style={{width: '20%'}}>{this.props.navigation.state.params.obs_materiales == "" ? 'NO': 'SI'}</Text>
            </View>
            {this.props.navigation.state.params.obs_materiales !== ""? 
            <View style={{flex:1, flexDirection: 'row', marginLeft: 20, marginRight: 10}}>
                <Text style={{width: '100%'}}>{this.props.navigation.state.params.obs_materiales}</Text>
            </View> :
            <View></View>
            }

            
            <View style={{flex:1, flexDirection: 'row', marginLeft: 20, marginRight: 10}}>
                <Text style={{width: '80%'}}>Es una urgencia?</Text>
                <Text style={{width: '20%'}}>{this.props.navigation.state.params.urgencia == 1 ? 'SI': 'NO'}</Text>
            </View>
            <IconText icon="perm-contact-calendar" text="Dias en los que puede realizar el trabajo" />
            <View style={{flex:1, flexDirection: 'row', marginLeft: 20, marginRight: 10}}>
                <Text style={{width: '50%'}}>Horarios Disponibles</Text>
                <Text style={{width: '50%'}}>{this.props.navigation.state.params.horarios}</Text>
            </View>

            <View style={{flexDirection: 'row',justifyContent: 'center'}}>
                <Button raised primary text="VER UBICACION" style={{color: 'white',backgroundColor: '#00AAB4', borderRadius: 30}} 
                onPress={() => { this.props.navigation.navigate('DescripcionTrabajoUbicacion', this.props.navigation.state.params); }}/>
            </View>

        </View>
    </ScrollView>
</KeyboardAvoidingView>
    );
  }
}
