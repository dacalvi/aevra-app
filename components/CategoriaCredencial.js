import React from 'react';
import { View } from 'react-native';
import Tilde from './Tilde';
import ACamera from './ACamera';
import { Avatar } from 'react-native-paper';

export default class CategoriaCredencial extends React.Component{
    
    state = {};

    constructor(props){
        super(props);
        this.state = {
            image: null,
            checked: false,
            id: props.id
        }
    }

    onChange(){
        this.props.onChange(this.state);
    }

    removeImage(){
        this.setState({image: null},  ()=> this.onChange() );
    }

    addImage(image){
        this.setState( {image},  ()=> this.onChange() );
    }

    render(){
        let { checked, image } = this.state;
        return (
            <View 
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start', 
                    marginBottom: 5,
                    marginLeft: 10,
                    paddingTop: 10,
                    
                    }}>
                <Tilde 
                    label={this.props.nombre} 
                    checked={checked} 
                    onPress={(checked)=>{
                    this.setState({checked}, ()=>{ this.onChange() });
                }} />

                
                


                { this.state.checked? 
                    <ACamera onPictureTaken={(image)=>{ this.addImage(image) }}/> :
                    <View></View>
                }
                
            </View>
        )
    }
};

