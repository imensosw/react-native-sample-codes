
import React from 'react'; 
import { StatusBar, Picker , ActivityIndicator , AsyncStorage , View, Text, StyleSheet, Alert, Image , TextInput, TouchableHighlight, ScrollView,KeyboardAvoidingView, Dimensions ,Platform , TouchableOpacity } from "react-native";
import { Actions } from 'react-native-router-flux'; 
import LinearGradient from 'react-native-linear-gradient';
import { Avatar ,Icon, FormLabel, FormInput, FormValidationMessage } from "react-native-elements";
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './Style.js';
import GLOBALS from '../config/Globals';
import AppFooter from './AppFooter';

const { width , height } = Dimensions.get('window');
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});
type Props = {};

class ProfileEdit extends React.Component {
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

  onUpdate() 
  {
    const { fname , lname , password } = this.state;
    const data = new FormData();
    data.append('fname', this.state.fname );
    data.append('lname', this.state.lname );
    data.append('password', this.state.password );
    if( this.state.fileName != '')
    {
      data.append('docFile', {
        uri: this.state.fileUri ,
        type: this.state.fileType , 
        name: this.state.fileName
      });
    }
    
    fetch(GLOBALS.BASE_URL+'rest_api/client_update', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' +  GLOBALS.TOKEN_KEY,
      },
      method: 'post',
      body: data
    })  
    .then((response) => response.json())
    .then((data) => {
      if(data.status)
      {
        this.setState({ loading: false }); 
        try 
        {
        if(data.status)
         AsyncStorage.multiSet([ ['fname',fname ], ['lname', lname], ['profile_image',data.profile_image] ]);
        
         
        } catch (error) {
        }
        Actions.profile() ;
      }
      else
      { 
        this.setState({ loading: false }); 
      }
    })
    .catch((error) => {
      this.setState({ loading: false }); 
    });
  }

  selectPhotoTapped() {
    DocumentPicker.show({
      filetype: [DocumentPickerUtil.allFiles()],
    },(error,res) => {
      this.setState({
        fileName : res.fileName , 
        fileUri : res.uri,
        fileType: res.type
      });
    });
  }
 

  render() {
      return ( 
        <KeyboardAwareScrollView extraScrollHeight={120} enableOnAndroid={true} scrollEnabled={true} >
       <StatusBar backgroundColor="#54CFFE"/>
        <View style={ styles.container}> 
          <ScrollView>
            <View style={styles.plr_15}>  
              <View style={styles.mt_30}>
                <View style={[styles.text_center,styles.p_relative, {alignSelf:'center'}]}>
                  <View style={[styles.profile_img,{backgroundColor:'#f1f1f1'}]}>
                    <Image  source={{uri: GLOBALS.BASE_URL+"public/translators/" + this.state.profile_image }}   style={[styles.profile_img,{ position:'relative', top:10, left:3, width:100, height:100}]} />
                  </View>
                  <TouchableHighlight onPress={this.selectPhotoTapped.bind(this)}  style={[styles.circle ,styles.profile_edit,{ padding:5}]}>
                    <Icon name="edit" size={17} color="#fff" />
                  </TouchableHighlight>
                </View>
                <View style={styles.mb_20}>
                    <Text style={[ styles.text_center,  styles.boldText]}> {this.state.fname}  {this.state.lname}</Text>
                  </View>
              </View>

              <View>
                <View style={[ styles.p_relative, {marginBottom:20}]}>
                 
                  <TextInput value={this.state.fname} onChangeText={(fname) => this.setState({ fname })} placeholder={'First Name'} style={[ styles.input_gray,{}]} />                 
                </View>
                <View style={[ styles.p_relative, {marginBottom:20}]}>
                  
                  <TextInput value={this.state.lname} onChangeText={(lname) => this.setState({ lname })} placeholder={'Last name'} style={[ styles.input_gray,{}]} />                 
                </View>
                <View style={styles.mt_20}>
                  <TouchableHighlight onPress={this.onUpdate.bind(this)} >
                    <LinearGradient style={[styles.gradient,{borderRadius:5}]} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={[ '#E3B35E','#00BFFF']} >
                      <Text style={[ styles.btn,{}]}>Submit</Text>
                    </LinearGradient>
                  </TouchableHighlight>
                </View>
              </View>
            </View>  
          </ScrollView>
        </View>  
        </KeyboardAwareScrollView>
      );
  }
}
export default ProfileEdit;



