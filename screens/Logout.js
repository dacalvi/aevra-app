import React from "react";
import { connect } from 'react-redux';
import { AsyncStorage, Text } from 'react-native';

class RegistroProfesional1 extends React.Component {

    constructor(props){
        super(props);
        this.props.logoutUser(()=>{
            this.props.navigation.navigate('HomeScreen');
        });
    }
    
    render() {
        return (<Text>Saliendo...</Text>);
    }
    
}

function mapStateToProps(state){
    return {
        register : state.register
    } 
}

function mapDispatchToProps(dispatch){
    return {
        logoutUser : (cb) => {
            dispatch({type: 'LOGOUT'})
            AsyncStorage.multiRemove(['token','type'], ()=> {
                cb();
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistroProfesional1);
