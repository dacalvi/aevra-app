import React from 'react';
import  LogoTitle  from './LogoTitle';
import layout from '../constants/Layout';
import {IconHeader, OpenDrawerProfesional, GroupTitle, IconText} from '../components';
import { Image, View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, TouchableHighlight } from 'react-native';
import { Button  } from 'react-native-material-ui';
import  ImageView   from 'react-native-image-view';
import { API_URL } from '../common/config';
import { Constants, MapView, Permissions, Location } from 'expo';

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

  images = [];

  constructor(props){
    super(props);

    props.navigation.state.params.imagenes.map((imagen, i)=>{
        this.images.push({
            source: {
                uri: API_URL + imagen.imagen,
            },
            title: 'Imagen',
            width: 500,
            height: 500,
        });
    });

    this.state = {
        isImageViewVisible : false
    }
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
            { 
                //ni profes ni mascotas
                (this.props.navigation.state.params.categoria !== "11")&&(this.props.navigation.state.params.categoria !== "18") ? 
                <View>
                    <ImageView
                        images={this.images}
                        imageIndex={0}
                        isVisible={this.state.isImageViewVisible}  
                    />
                    <TouchableHighlight onPress={()=>{ this.setState({isImageViewVisible: true})}} >
                        <View style={{marginLeft: 20, flex: 1, flexDirection: 'row'}}>
                            {this.images.map((imagen, i)=>{
                                return (
                                    <Image key={i} source={{uri: imagen.source.uri}} style={{width: 40, height: 40, margin: 5}}/>
                                );
                            })}
                        </View>
                    </TouchableHighlight>

                     {
                         //No aplica a fletes
                         (this.props.navigation.state.params.categoria !== "16") ? <View>
                            <GroupTitle label="Materiales"/>
                            <View style={{flex:1, flexDirection: 'row', marginLeft: 20, marginRight: 10, marginBottom: 10}}>
                                <Text style={{width: '80%'}}>Dispone Materiales?</Text>
                                <Text style={{width: '20%'}}>{this.props.navigation.state.params.dispone_materiales == "1" ? 'SI': 'NO'}</Text>
                            </View>
                            
                            <View style={{flex:1, flexDirection: 'row', marginLeft: 20, marginRight: 10, marginBottom: 10}}>
                                <Text style={{width: '80%'}}>Llevar materiales</Text>
                                <Text style={{width: '20%'}}>{this.props.navigation.state.params.traer_materiales == "1" ? 'SI': 'NO'}</Text>
                            </View>
                            
                            <View style={{flex:1, flexDirection: 'row', marginLeft: 20, marginRight: 10, marginBottom: 10}}>
                                <Text style={{width: '80%'}}>Observaciones sobre los materiales</Text>
                                <Text style={{width: '20%'}}>{this.props.navigation.state.params.obs_materiales == "" ? 'NO': 'SI'}</Text>
                            </View>

                            {this.props.navigation.state.params.obs_materiales !== ""? 
                            <View style={{flex:1, flexDirection: 'row', marginLeft: 20, marginRight: 10}}>
                                <Text style={{width: '100%'}}>{this.props.navigation.state.params.obs_materiales}</Text>
                            </View> :
                            <View></View>
                            }
                         </View>: null
                    }
                    

                </View>: <Text style={{marginLeft: 20, marginBottom: 10}}>Esta categoría no presenta imágenes.</Text>
            }

            { 
                //Mascotas
                this.props.navigation.state.params.categoria == "11" ? 
                <View>
                    <GroupTitle label="Consideraciones de la mascota"/>
                    <View style={{flex:1, flexDirection: 'row', marginLeft: 20, marginRight: 10, marginBottom: 10}}>
                        <Text style={{width: '60%'}}>Tamaño de la mascota</Text>
                        <Text style={{width: '40%'}}>{this.props.navigation.state.params.mascota_tamanio}</Text>
                    </View>

                    <View style={{flex:1, flexDirection: 'row', marginLeft: 20, marginRight: 10, marginBottom: 10}}>
                        <Text style={{width: '60%'}}>Lugar del servicio</Text>
                        <Text style={{width: '40%'}}>{this.props.navigation.state.params.mascota_buscar_mascota}</Text>
                    </View>
                </View> : null 
            }

            { 
                //Fletes
                this.props.navigation.state.params.categoria == "16" ? 
                <View>
                    <GroupTitle label="Informacion del Flete"/>
                    

                    <View style={{flex:1, flexDirection: 'column', marginLeft: 20, marginRight: 10, marginBottom: 10}}>
                        <Text style={{width: '60%'}}>Ubicacion</Text>
                        <MapView
                            style={{ alignSelf: 'stretch', height: 200, width: '100%', marginRight: -20, marginTop: 10, marginBottom: 10 }}
                            provider = { MapView.PROVIDER_GOOGLE }
                            initialRegion={{
                                latitude: parseFloat(this.props.navigation.state.params.flete_location.split(",")[0]),
                                longitude: parseFloat(this.props.navigation.state.params.flete_location.split(",")[1]),
                                latitudeDelta: 0.010,
                                longitudeDelta: 0.010
                            }}
                            >
                        </MapView>
                    </View>
                </View> : null 
            }

            { 
                //Profesor
                this.props.navigation.state.params.categoria == "18" ? 
                <View>
                    <GroupTitle label="Lugar para enseñar y contenido"/>
                    <View style={{flex:1, flexDirection: 'row', marginLeft: 20, marginRight: 10, marginBottom: 10}}>
                        <Text style={{width: '60%'}}>A domicilio</Text>
                        <Text style={{width: '40%'}}>{this.props.navigation.state.params.profesor_a_domicilio == "1" ? 'SI': 'NO'}</Text>
                    </View>

                    <View style={{flex:1, flexDirection: 'row', marginLeft: 20, marginRight: 10, marginBottom: 10}}>
                        <Text style={{width: '60%'}}>Nivel</Text>
                        <Text style={{width: '40%'}}>{this.props.navigation.state.params.profesor_nivel}</Text>
                    </View>

                    <View style={{flex:1, flexDirection: 'row', marginLeft: 20, marginRight: 10, marginBottom: 10}}>
                        <Text style={{width: '60%'}}>Materia</Text>
                        <Text style={{width: '40%'}}>{this.props.navigation.state.params.profesor_categoria}</Text>
                    </View>

                    <View style={{flex:1, flexDirection: 'row', marginLeft: 20, marginRight: 10, marginBottom: 10}}>
                        <Text style={{width: '60%'}}>Cantidad de Horas</Text>
                        <Text style={{width: '40%'}}>{this.props.navigation.state.params.profesor_horas}</Text>
                    </View>
                </View> : null 
            }





            
            <View style={{flex:1, flexDirection: 'row', marginLeft: 20, marginRight: 10, marginBottom: 10}}>
                <Text style={{width: '80%'}}>Es una urgencia?</Text>
                <Text style={{width: '20%'}}>{this.props.navigation.state.params.urgencia == 1 ? 'SI': 'NO'}</Text>
            </View>

            <View style={{flex:1, flexDirection: 'row', marginLeft: 10, marginRight: 10, marginBottom: 10, marginTop: 20}}>
                <IconText icon="perm-contact-calendar" text="Dias en los que puede realizar el trabajo" />
            </View>

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
