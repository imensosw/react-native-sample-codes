
import React from 'react';  
import {StatusBar,  Linking , Picker , ActivityIndicator , AsyncStorage , View, Text, StyleSheet, Alert, Image , TextInput, TouchableHighlight, ScrollView,KeyboardAvoidingView, Dimensions ,Platform , TouchableOpacity } from "react-native";
import { Actions } from 'react-native-router-flux'; 
import LinearGradient from 'react-native-linear-gradient';
import { Avatar ,Icon, FormLabel, FormInput, FormValidationMessage } from "react-native-elements";
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import styles from './Style.js';
import GLOBALS from '../config/Globals';
import AppFooter from './AppFooter';

const { width , height } = Dimensions.get('window');
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});
type Props = {};

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token : '',
      email : '',
      fname : '',
      lname : '',
      password : '',
      fileName : '' , 
      fileUri : '',
      fileType : '',
      fileError :'',
    };
  }
  async componentDidMount() {
    try 
    {
      AsyncStorage.multiGet(["token", "email", "fname", "lname","profile_image"]).then(response => {
        var profile_image = "avatar.png";
        if( response[4][1] != '')
        {
          profile_image = response[4][1] ;
        }
        this.setState({ token: response[0][1] , email: response[1][1] ,fname: response[2][1] ,lname: response[3][1]  , profile_image: profile_image });
      });
    } 
    catch (error) 
    {
    }
  }


  onLogout()
  {
    GLOBALS.TOKEN_KEY = '' ; 
    AsyncStorage.multiSet([['token', '']],  Actions.landing({ }));  
  }
  render() { 
      return ( 
        
        <View style={ styles.container}> 
        
          <ScrollView>
          <StatusBar backgroundColor="#54CFFE"/>
            <View style={styles.plr_15}> 
              <View style={styles.mt_20} >
                <View style={[styles.text_center,styles.p_relative, {alignSelf:'center'}]}>
                  <View style={[styles.profile_img,{backgroundColor:'#f1f1f1'}]}>
                    <Image  source={{uri: GLOBALS.BASE_URL+"public/translators/" + this.state.profile_image }}   style={[styles.profile_img,{ position:'relative', top:10, left:3, width:100, height:100}]} />
                  </View>
                  <View>
                    <Text style={[styles.boldText]}> {this.state.fname}  {this.state.lname}</Text>
                  </View>
                </View>
              </View>

              <View style={[styles.mt_30]}>
                <View style={[ styles.p_relative , {marginBottom:20}]}>
                  <Text> Personal Detail</Text>
                  <TouchableHighlight onPress={() => {Actions.profile_edit()}} style={[styles.detail_edit,{ padding:5}]}>
                    <Icon name="edit" size={17} color="#333" /> 
                  </TouchableHighlight>
                </View>
                <View style={[ styles.p_relative, {marginBottom:20}]}>
                  <Text> Change Password</Text>
                  <TouchableHighlight onPress={() => { Actions.profile_password()}} style={[styles.detail_edit,{ padding:5}]}>
                    <Icon name="edit" size={17} color="#333" /> 
                  </TouchableHighlight>
                </View>
                <View style={[ styles.p_relative, {marginBottom:20}]}>
                  <TouchableHighlight onPress={ ()=>{ Linking.openURL('https://arabeasy.com/privacy-policy')}} style={[,{ padding:5}]}>
                  <Text style={[ styles.OpenSans_SemiBold , styles.theme_blue_txt, styles.font_small]}> Privacy Policy</Text>
                  </TouchableHighlight>
                </View>
                <View style={[ styles.p_relative, {marginBottom:20}]}>
                  <TouchableHighlight onPress={ ()=>{ Linking.openURL('https://arabeasy.com/terms-conditions')}} style={[  ,{ padding:5}]}>
                    <Text style={[ styles.OpenSans_SemiBold , styles.theme_blue_txt, styles.font_small]}> Terms & Conditions</Text>
                  </TouchableHighlight>
                </View>
                <View style={[ styles.p_relative, {marginBottom:20}]}>
                  <TouchableHighlight onPress={this.onLogout.bind(this)} style={[  ,{ padding:5}]}>
                    <Text style={[ styles.OpenSans_SemiBold , styles.theme_blue_txt, styles.font_small]}> Logout</Text>
                  </TouchableHighlight>
                </View>
              </View>
              

            </View>  
          </ScrollView>
          <AppFooter currentIndex={this.props.currentIndex}/> 
        </View>  
      );
  }
}
export default Profile;



