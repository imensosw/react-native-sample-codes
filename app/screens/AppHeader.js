import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Actions } from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';
import GLOBALS from '../config/Globals';
import styles from './Style'; 
const styleLocal = StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? 64 : 54,
  },
  navBarItem: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default class AppHeader extends React.Component {
  // constructor(props) {
  //   super(props)
  // }

  _renderLeft() {
    if (Actions.currentScene === 'assignment' || Actions.currentScene === 'started_detail' || Actions.currentScene === 'chat' || Actions.currentScene === 'profile_edit' || Actions.currentScene === 'profile_password' ) 
    {

      return (
        <TouchableOpacity onPress={() => { Actions.pop }}  style={[styleLocal.navBarItem, { paddingLeft: 10 }]}>
        <Image style={{ width: 30, height: 50 }} resizeMode="contain" source={{ uri: 'https://image.flaticon.com/icons/png/512/0/340.png' }} />
      </TouchableOpacity>
      );
    }
    return (
      <View></View>
    );
  }

  _renderMiddle() {
    return (
        <Text  style={[styleLocal.navBarItem , styles.header_title , styles.plr_20]}  >{this.props.title}</Text>
    );
  }

  _renderRight() {
    if (Actions.currentScene === 'assignment' || Actions.currentScene === 'started_detail' ) 
    {
      return (
        <TouchableOpacity onPress={Actions.pop} style={[styleLocal.navBarItem, { paddingLeft: 10 }]}>
         <Text> :::: </Text>
      </TouchableOpacity>
      );
    }
    return (
      <View></View>
    );
  }

  render() {
    return (
        <View style={[styleLocal.container   ]}>
          <LinearGradient start={{ x: 0, y: 0 }} 
          end={{ x: 1, y: 1 }} 
          style={[styleLocal.container, { alignItems:'center' , flexDirection: 'row',  }]} 
          colors={['#34C8FD',  '#34C8FD']} >
            {this._renderLeft()}
            {this._renderMiddle()}
            {this._renderRight()}
          </LinearGradient>
        </View>
    );
  }
}