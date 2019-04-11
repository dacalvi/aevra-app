import React from 'react';
import { Text, View } from 'react-native';
import ACamera from './ACamera';
import PropTypes from 'prop-types';

export class MultiImagePicker extends React.Component {

  constructor(){
    super();
  }

  createCameras(num){
    let cameras = [];
    for (let i = 1; i <= num; i++) {
      cameras.push(<ACamera key={i} onPictureTaken={(image) => this.props.onPictureTaken(i, image)} />);
    }
    return cameras;
  }

  render() {
    
    return (
      <View style={{ padding: 10, flex: 1, flexDirection: 'column' }} >
      
            <Text>{this.props.label}</Text>
            <View style={{flex: 1, flexDirection: 'row', marginTop: 5}}>
              {this.createCameras(this.props.ImageAmount)}
            </View>
        </View>

    );
  }
}


MultiImagePicker.propTypes = {
  ImageAmount: PropTypes.number
}

MultiImagePicker.defaultProps = {
  ImageAmount: 1
};