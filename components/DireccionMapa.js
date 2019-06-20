import React from 'react';
import {
    View, 
    Text, 
    TextInput, 
    Platform,
    Button, 
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import PropTypes from 'prop-types';
import Tilde from '../components/Tilde';
import { 
    Constants, 
    MapView, 
    Permissions, 
    Location 
} from 'expo';
import { ErrorRecovery } from 'expo';
import Geocoder from 'react-native-geocoding';
import { Avatar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { MAPS_KEY } from '../common/config';


export default class DireccionMapa extends React.Component {
    
    state = {
        location: null,
        ciudad: null,
        errorMessage: null,
        latitude: -34.6036991,
        longitude: -58.383566,
        address: null
    };

    constructor(props){
        super(props);
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
            //console.log('Oops, this will not work on Sketch in an Android emulator. Try it on your device!');
        } else {
            Geocoder.init(MAPS_KEY); // use a valid API key
            this._getLocationAsync();
            
        }
        //Get saved address

    }

    componentDidMount(){
        this._getSavedAddressAsync();
    }

    _getSavedAddressAsync = async () => {
        const direccion_guardadas = await AsyncStorage.getItem('direccion_guardadas');
        const coordenadas_guardadas = await AsyncStorage.getItem('coordenadas_guardadas');
        const ciudad_guardadas = await AsyncStorage.getItem('ciudad_guardadas');
        

        if(direccion_guardadas){
            let address = direccion_guardadas.split(';')[0];
            let ciudad = direccion_guardadas.split(';')[1];
            if(address !== ''){
                this.setState({address});
            }
            this.props.onChangeAddress(address);
        }
        
        if(coordenadas_guardadas){
            let coordenadas = coordenadas_guardadas.split(',');
            let latitude = parseFloat(coordenadas[0]);
            let longitude = parseFloat(coordenadas[1]);
            this.setState({latitude, longitude});
        }
        
        
        if(ciudad_guardadas){
            let ciudad = ciudad_guardadas;
            this.setState({ciudad});
            this.props.onChangeCiudad(ciudad);
        }

    };

    _addressLookup = async (address) => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          this.setState({
            errorMessage: 'Permission to access location was denied',
          });
        }
        try {
            if(address !== ''){
                let location = await Location.geocodeAsync(address);
                this.setState({ latitude: location.coords.latitude, longitude: location.coords.longitude });
            }
            

        } catch (error) {
            //console.log(error);
        }
    }

    _attemptGeocode = () => {

        //console.log("_attemptGeocode", this.state);
        if(this.state.address === null  || this.state.ciudad === null){ return false; }


        Geocoder.from(this.state.address + '; ' + this.state.ciudad + '; Argentina')
		.then(json => {
            var location = json.results[0].geometry.location;
            this.setState({ latitude: location.lat, longitude: location.lng });
            this.props.onChangeLocation({ latitude: location.lat, longitude: location.lng });
		})
		.catch(error => console.warn(error));

    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          this.setState({
            errorMessage: 'Permission to access location was denied',
          });
        }
    
        let location = await Location.getCurrentPositionAsync({});
        this.setState({ latitude: location.coords.latitude, longitude: location.coords.longitude });
        this.props.onChangeLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude });
      };


    render(){
        return (
            <View>

                
                <View style={{
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                    flex: 1,
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    width: '100%',
                    padding: 10,
                    maxHeight: 100 
                    }}>
                    <Text style={{ marginRight: 10 }}>Ciudad/Localidad</Text>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <TextInput style={{ width: '80%', borderBottomWidth: 1, borderBottomColor: `rgba(143, 143, 143, 1)` }}
                            placeholder=""
                            value={this.state.ciudad}
                            onChangeText={ ciudad => {
                                this.setState({ciudad});
                                this.props.onChangeCiudad(ciudad)
                            }}
                            onBlur={()=> this._attemptGeocode()}
                            />

                    </View>
                </View>
                { this.props.error ? <Text style={{color: 'red', marginLeft: 10}}>{this.props.error}</Text> : <Text> </Text> }

                <View style={{
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 1)',
                    flex: 1,
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    width: '100%',
                    padding: 10,
                    maxHeight: 100 
                    }}>
                    <Text style={{ marginRight: 10 }}>Dirección</Text>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <TextInput
                            value={this.state.address}
                            style={{
                                width: '80%',

                                borderBottomWidth: 1,
                                borderBottomColor: `rgba(143, 143, 143, 1)`
                            }}
                            placeholder="" 
                            onChangeText={ address => {
                                this.setState({address});
                                this.props.onChangeAddress(address)
                            }}
                            onBlur={()=> this._attemptGeocode()}
                            />
                            <TouchableOpacity onPress={()=> this._attemptGeocode() }>
                                <Avatar.Icon 
                                size={32} style={{ 
                                    backgroundColor: '#00AAB4'
                                }} 
                                color='white' 
                                icon="arrow-forward" />
                            </TouchableOpacity>

                    </View>
                </View>
                { this.props.error ? <Text style={{color: 'red', marginLeft: 10}}>{this.props.error}</Text> : <Text> </Text> }

                <Tilde 
                    label="Establecer esta direccion como permanente"
                    checked={this.props.guardar_direccion}
                    onPress={(guardar_direccion) => this.props.onChangeGuardarDireccion(guardar_direccion)}
                />
              <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: Constants.statusBarHeight,
                    backgroundColor: '#ecf0f1',
                }}>
                    <MapView
                        style={{ alignSelf: 'stretch', height: 200 }}
                        provider = { MapView.PROVIDER_GOOGLE }
                        region={{
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                            latitudeDelta: 0.001,
                            longitudeDelta: 0.001,
                    }}>
                    <MapView.Marker
                    coordinate={{latitude: this.state.latitude,
                        longitude: this.state.longitude}}
                    title={this.state.address}
                    image={require('../assets/images/marker.png')}
                    
                    description={"Ubicacion de la direccion indicada"}
                    />
                    </MapView>
                </View>
            </View>
        )
    }
};

DireccionMapa.propTypes = {
    direccion: PropTypes.string,
    onChangeAddress: PropTypes.func,
    onChangeLocation: PropTypes.func,
    guardar_direccion: PropTypes.bool
}
  
DireccionMapa.defaultProps = {
    direccion: '',
    guardar_direccion: true
};