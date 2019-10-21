
import React from 'react'; 
import {StatusBar, Animated, Keyboard , ActivityIndicator , AsyncStorage , View, Text, StyleSheet, Alert, Image , TextInput, TouchableHighlight, ScrollView,KeyboardAvoidingView,  Dimensions ,Platform } from "react-native";
import { Actions , ActionConst } from 'react-native-router-flux'; 
import LinearGradient from 'react-native-linear-gradient';
import { Avatar ,Icon, FormLabel, FormInput, FormValidationMessage } from "react-native-elements";
import Validator from 'validator';
import styles , { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL} from './Style.js';
import GLOBALS from '../config/Globals';
import { connect } from 'react-redux';
import {  upadteNotificationCount } from './actions/notificationActions';
import {  upadteUploaded , upadteDataAfter } from './actions/uploadedActions';
import {  upadteCompleted } from './actions/completedActions';
import {  upadteStarted } from './actions/startedActions';
const { width , height } = Dimensions.get('window');

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});
type Props = {};

class Login extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      username: 'mohit.imenso@gmail.com',
      password: '123456',
      showPassword:true,
      errorForm: '',
      errorUsername: false,
      errorPassword: false
    };
    this.keyboardHeight = new Animated.Value(0);
    this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
  }

  
  async componentDidMount() 
  {
    await AsyncStorage.getItem("token").then((token) => {

    const setting_model  = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: token,
      })
    };
    this.props.upadteDataAfter(0); 
    fetch( GLOBALS.BASE_URL+'rest_api/validate_token',setting_model)
      .then((response) => response.json())
      .then((data) => {
        if(data.isLogedIn)
        {
          this.saveKey(data.token , data.fname , data.lname , data.email, data.profile_image  );
          GLOBALS.TOKEN_KEY = data.token ; 
          GLOBALS.USER_ID = data.id ; 
          this.props.upadteNotificationCount(data.notiCount);
          this.setState({ loading: false }); 
          Actions.home({currentIndex: 0});
        }
      })
      .catch((error) => {
        console.error(error);
      });
    });
  }

  validatForm()
  {
    this.setState({ errorForm: '' }); 
    this.setState({ errorUsername: false }); 
    this.setState({ errorPassword: false }); 
    var formError = false ;
    if(!Validator.isEmail( this.state.username ))
    {
      this.setState({ errorUsername: true }); 
      formError = true ;
    }
    if( this.state.password == "")
    {
      this.setState({ errorPassword: true }); 
      formError = true ;
    }
    return formError ;
  }

  onLogin() 
  {
    if( this.validatForm() )
    {
      return false ;
    }
    

    this.setState({ loading: true });  
    const { username, password } = this.state
    const setting_model  = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password: password  ,
          user_type: 'frontend' 
        })
      };
    this.props.upadteDataAfter(0);  
   
    return fetch( GLOBALS.BASE_URL+'rest_api/client_login',setting_model)
    .then((response) => response.json())
    .then((data) => {
      if(data.token)
      {
        GLOBALS.TOKEN_KEY = data.token ; 
        GLOBALS.USER_ID = data.id ; 
        this.props.upadteNotificationCount(data.notiCount);
        AsyncStorage.multiSet([['token', data.token], ['fname', data.fname ], ['lname', data.lname], ['email', data.email] , ['profile_image', data.profile_image]], 
        Actions.home({currentIndex: 0})
        );
      }
      else
      {
       
        this.setState({ errorForm: data.msg }); 
        this.setState({ loading: false }); 
      }
    })
    .catch((error) => {
    
      console.error(error);
    });
  }
  async saveKey( token , fname , lname , email, profile_image ) {
    try {
      await AsyncStorage.multiSet([['token', token], ['fname', fname ], ['lname', lname], ['email', email] , ['profile_image', profile_image] ]);
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }

  render() {
      return ( 
        
        <KeyboardAwareScrollView  extraScrollHeight={120} enableOnAndroid={true} scrollEnabled={true} 
>         
        <LinearGradient style={{flex: 1 ,  height:height - 25    }} colors={['#34C8FD', '#ED7D31']} >
        <StatusBar backgroundColor="#54CFFE"/>
          <View style={{ flex: 1,  flexDirection: 'column',justifyContent: 'space-between',  alignItems: 'center'  }} > 
          
            <View style={{ marginTop  : 30,  alignItems: 'center'}}>
              <Image source={require('../images/logo.png')} style={[{width:90, height:90}]} />
            </View>
        
            <View>  
              <View style={[styles.login_area,{width : width - 40, marginTop:0  }]}> 
                <View style={[styles.arrange_horizontal,{ marginBottom: 60    }]}>
                  <Text style={[,{height: 30, fontSize:20, fontWeight:'600', marginLeft:-5}]} > Sign In  </Text>
                  
                  <Text style={[,{ color:"#0793DB",height: 20, paddingTop:5, textAlign:'right'}]} >  
                  {/* FORGOT PASSWORD  */}
                  </Text>              
                </View>

                <View>
                  <Text style={styles.error_text} >{ this.state.errorForm }</Text> 
                  <View style={[styles.mb_30,{}]}>
                    <Text>Email</Text>
                    <TextInput style={[ styles.input,{ }]} value={this.state.username}    onChangeText={(username) => this.setState({ username })}  placeholder={'Enter Email'} /> 
                    <LinearGradient style={[styles.gradient,{}]} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={[ '#E3B35E','#7CC2F0']} >
                      <Text style={[{ height:2}]}>&nbsp;</Text>
                    </LinearGradient>
                    { (this.state.errorUsername )? <Text style={styles.error_text} >Enter a valid Email !</Text> : null }
                  </View>
                  <View style={[styles.mb_30 , styles.p_relative ,{}]}>
                    <Text>Password</Text>
                    <Text  onPress={(e) => this.setState({showPassword: !this.state.showPassword})} style={[styles.show_password,{}]}  >SHOW</Text>
                    <TextInput style={[ styles.input,{ }]} value={this.state.password} onChangeText={(password) => this.setState({ password })} placeholder={'Enter Password'} secureTextEntry={ this.state.showPassword } />
                    <LinearGradient style={[styles.gradient,{}]} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={[ '#E3B35E','#7CC2F0']} >
                      <Text style={[{ height:2}]}>&nbsp;</Text>
                    </LinearGradient>
                    { (this.state.errorPassword )? <Text style={styles.error_text} >Password is mandatory  !</Text> : null }
                  </View>
                  <View style={[{}]}>
                    <TouchableHighlight onPress={this.onLogin.bind(this)}>  
                      <LinearGradient style={[styles.gradient,{borderRadius:5}]} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={[ '#E3B35E','#7CC2F0']} >
                        <Text style={[ styles.btn,{}]}>Submit</Text>
                      </LinearGradient>
                    </TouchableHighlight> 
                  </View>
                  <View style={{ height: 15 }} />
                </View>
              </View>
            </View>

            <View  style={{  marginBottom:30 , width:width - 40 }} >  
              <TouchableHighlight style={[,{ borderColor:'#FFF' , borderWidth:1 ,  borderRadius:5}]} onPress={() => { Actions.signup();}} >  
                  <Text style={[ styles.btn,{color:'#FFF'}]}>New To Arab Easy? Register Now</Text>
              </TouchableHighlight>  
            </View> 

          </View >  

        </LinearGradient> 
        </KeyboardAwareScrollView>
      );
  }
}

const mapStateToProps = state => {
  return {
    noti: state.notificationReducer.noti ,
    _data: state.documentReducer._data,
    _dataCompleted: state.documentReducer._dataCompleted,
    _dataStarted: state.documentReducer._dataStarted,
    dataAfter: state.documentReducer.dataAfter
  }
}
const mapDispatchToProps = dispatch => {
  return {
    upadteNotificationCount: (count) => {
      dispatch(upadteNotificationCount(count))
    },
    upadteUploaded : (_data) => {
      dispatch( upadteUploaded(_data))
    },
    upadteCompleted : (_dataCompleted) => {
      dispatch( upadteCompleted(_dataCompleted))
    },
    upadteStarted : (_dataStarted) => {
      dispatch( upadteStarted(_dataStarted))
    },
    upadteDataAfter : (dataAfter ) => {
      dispatch( upadteDataAfter(dataAfter))
    },
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login)







 