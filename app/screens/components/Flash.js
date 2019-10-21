import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import styles from '../Style.js';


class Flash extends Component {
  constructor(props) {
    super(props);
    this.showFlashMy = this.showFlashMy.bind(this);
  }

  showFlashMy()
  {
    this.setState({ flashMessage:'Success' , showFlash:true }) ;
    setTimeout(() => {
      this.setState({ flashMessage:'' , showFlash:false }) ;
    }, 5000);
  }
  render() {
    
    return (
      this.props.showFlash ?
      <View style={ [styles.flashMessage , styles.arrange_horizontal_justify ,] } >
        <Text style={{ margin : 7 , textAlign: "center" , fontSize: 16 }} > { this.props.flashMessage } </Text>
      </View> :
      <View />
    );
  }
}
export default Flash;
