import React from 'react'; 
import { StatusBar, Picker , ActivityIndicator , AsyncStorage , View, Text, StyleSheet, Alert, Image , TextInput, TouchableHighlight, ScrollView,KeyboardAvoidingView, Dimensions ,Platform , TouchableOpacity } from "react-native";
import { Actions  } from 'react-native-router-flux'; 
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import {  upadteNotificationCount } from './actions/notificationActions';
import {  upadteUploaded , upadteDataAfter } from './actions/uploadedActions';
import {  upadteCompleted } from './actions/completedActions';
import {  upadteStarted } from './actions/startedActions';
import styles from './Style.js';
import GLOBALS from '../config/Globals';
import Swiper from 'react-native-swiper';

const { width , height } = Dimensions.get('window');
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});
type Props = {};

class Landing extends React.Component {

  constructor(props) {
    super(props);
    this.state = {loading: false};
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
  async saveKey( token , fname , lname , email, profile_image ) {
    try {
      await AsyncStorage.multiSet([['token', token], ['fname', fname ], ['lname', lname], ['email', email] , ['profile_image', profile_image] ]);
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }
  

  
  render() {
    return (  
      
      <View style={[ styles.container]}>
      <LinearGradient style={{flex: 1 ,  height:height - 25    }} colors={['#34C8FD', '#ED7D31']} >
        <StatusBar backgroundColor="#54CFFE"/>
        
          <Swiper style={{ marginTop:15  }} activeDot={ <View style={{backgroundColor: '#34C8FD', width: 30, height: 7, borderRadius: 2, marginLeft: 5, marginRight: 5, marginTop: 3, marginBottom: 3,}} /> }  dot={ <View style={{backgroundColor:'rgba(255,255,255,1)', width: 30, height: 7,borderRadius: 2, marginLeft: 5, marginRight: 5, marginTop: 3, marginBottom: 3,}} /> } showsButtons={false}>
            <View style={{   alignItems: 'center' , paddingLeft:20 , paddingRight:20 }}>
              <Image source={require('../images/landing1.png')}  style={[{width: width * .7 , height: width * .7  }]} />
              <Text style={styles.landing_heading} >Translation</Text>
              <Text style={[ styles.landing_text]} >Good Quality Translation for Internal Use Documents</Text>
            </View>
  
            <View style={{   alignItems: 'center' , paddingLeft:20 , paddingRight:20 }}>
              <Image source={require('../images/landing2.png')}  style={[{width: width * .7 , height: width * .7  }]} />
              <Text style={[  styles.landing_heading]} >Proofreading</Text>
              <Text style={[ styles.landing_text]}>When you need an expert to review your work</Text>
            </View>
          
            <View style={{  alignItems: 'center' , paddingLeft:20 , paddingRight:20 }}>
              <Image source={require('../images/landing3.png')}  style={[{width: width * .7 , height: width * .7  }]} />
              <Text style={[ styles.landing_heading]}  >EZ Assured</Text>
              <Text style={[ styles.landing_text]}>EZ Team will double check to ensure highest quality</Text>
            </View>
        </Swiper>
        <View style={{  alignItems:"center" }}>
        
          <View  style={{  marginBottom:30 , width:width - 40 }} >  
            <TouchableHighlight onPress={() => { Actions.login();}}>  
              <LinearGradient style={[styles.gradient,{borderRadius:5}]} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={[ '#E3B35E','#7CC2F0']} >
                <Text style={[ styles.btn,  { padding:15 }]}>Login</Text>
              </LinearGradient>
            </TouchableHighlight> 



            {/* <TouchableHighlight style={[,{ borderColor:'#FFF' , borderWidth:1 ,  borderRadius:5}]} onPress={() => { Actions.login();}} >  
                <Text style={[ styles.btn,{color:'#FFF'}]}>Login</Text>
            </TouchableHighlight>   */}
          </View>
          <View  style={{  marginBottom:30 , width:width - 40 }} >  
            <TouchableHighlight style={[,{ borderColor:'#FFF' , borderWidth:1 ,  borderRadius:5}]} onPress={() => { Actions.signup();}} >  
                <Text style={[ styles.btn,{color:'#FFF'}]}>New To Arab Easy? Register Now</Text>
            </TouchableHighlight>  
          </View>
        </View>
        </LinearGradient>
      </View>
      
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
export default connect(mapStateToProps,mapDispatchToProps)(Landing);




