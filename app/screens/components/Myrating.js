// Myrating.js

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {  Rating } from 'react-native-elements';  

const rate = (props) => {
    return (
      <Rating
        type="star"
        fractions={1}
        startingValue={ parseFloat( props.rating) }
        readonly
        imageSize={17}
        ratingColor='#ED7D31'
        ratingBackgroundColor='#ED7D31'
        style={{ paddingVertical: 4  }}
      />
    );
}
export default rate;