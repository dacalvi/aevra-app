import React from 'react';
import { Platform, View, Slider } from 'react-native';
import { Constants, MapView, Permissions, Location } from 'expo';
import { MAPS_KEY } from '../common/config';

export default class MapaRadio extends React.Component{
    
    state = {}

    constructor(props){
        super(props);
        this.state.radius = this.props.radius;
        this.state.latlng = {
            latitude: -34.6036991,
            longitude: -58.383566,
            latitudeDelta: 0.010,
            longitudeDelta: 0.010
        }
        this.state.regionlatlng = {
            latitude: -34.6036991,
            longitude: -58.383566,
            latitudeDelta: 0.010,
            longitudeDelta: 0.010
        }
        this.state.markerLatLng = {
            latitude: -34.6036991,
            longitude: -58.383566,
            latitudeDelta: 0.010,
            longitudeDelta: 0.010
        }
        this._getLocationAsync();
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {            
            
        }
        let position = await Location.getCurrentPositionAsync({});
        let regionlatlng = {
            latitude: position.coords.latitude, 
            longitude: position.coords.longitude, 
            latitudeDelta: this.state.regionlatlng.latitudeDelta, 
            longitudeDelta: this.state.regionlatlng.longitudeDelta}
        this.setState({ regionlatlng, markerLatLng: regionlatlng });
        this.onChange();
    };

    _handleMapRegionChange = markerLatLng => {
        this.setState({ markerLatLng, regionlatlng: markerLatLng });
        this.onChange();
    };

    onChange(){
        this.props.onChange({
            latitude: this.state.markerLatLng.latitude, 
            longitude: this.state.markerLatLng.longitude, 
            radius: this.state.radius});
    }

    render(){
        return (
            <View>
               <MapView
                    style={{ alignSelf: 'stretch', height: 200, width: '100%', marginTop: 10, marginBottom: 10 }}
                    provider = { MapView.PROVIDER_GOOGLE }
                    initialRegion={this.state.latlng}
                    region={this.state.regionlatlng}
                    onRegionChangeComplete={this._handleMapRegionChange}
                    >
                    <MapView.Marker
                        coordinate={this.state.markerLatLng}
                    />
                    <MapView.Circle
                            center = { this.state.markerLatLng }
                            radius = { this.state.radius }
                            strokeWidth = { 1 }
                            strokeColor = { '#1a66ff' }
                            fillColor = { 'rgba(230,238,255,0.5)' }
                            //onRegionChangeComplete = { this.onRegionChangeComplete.bind(this) }
                    />
                    </MapView>
                    <Slider
                        minimumValue={100}
                        maximumValue={10000}
                        minimumTrackTintColor="#1EB1FC"
                        maximumTractTintColor="#1EB1FC"
                        step={100}
                        value={500}
                            onValueChange={radius => { 
                                this.setState({radius})
                                this.onChange();
                            }}
                        style={{
                            
                        }}
                        thumbTintColor="#1EB1FC"
                    />
            </View>
        )
    }
};

