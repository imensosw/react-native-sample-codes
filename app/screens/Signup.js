
import React from 'react'; 
import { StatusBar, ActivityIndicator , AsyncStorage , View, Text, StyleSheet, Alert, Image , TextInput, TouchableHighlight, ScrollView, KeyboardAvoidingView,  Dimensions ,Platform, Picker} from "react-native";
import { Actions } from 'react-native-router-flux'; 
import LinearGradient from 'react-native-linear-gradient';
import { Avatar , FormLabel, FormInput, FormValidationMessage } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './Style.js';
import { CheckBox } from 'react-native-elements';
import Validator from 'validator';
import CountryPicker, {getAllCountries} from 'react-native-country-picker-modal';
import GLOBALS from '../config/Globals';
import NodeEmoji from 'node-emoji';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const { width , height } = Dimensions.get('window');
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});
type Props = {};

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: '',
      fname: '',
      lname: '',
      dial_code: '297',
      phone: '',
      password: '',
      password_confirm: '',
      i_agree: false,

      errorForm: '',
      errorEmail: false,
      errorFname: false,
      errorLname: false,
      errorPhone: false,
      errorPassword: false,
      errorPasswordLULN: false,
      errorPasswordConfirm: false,
      errorIAgree: false,
      cca2: 'AW'
    };
  }

  async componentDidMount() 
  {
    this.onLoad()
  }
  onLoad() 
  {
    const setting_model  = { 
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        })
      };
    return fetch(GLOBALS.BASE_URL+'rest_api/get_countries_option',setting_model)
    .then((response) => response.json())
    .then((data) => {
      this.setState({
        dialCodes : data.countries , 
      });
      
    })
    .catch((error) => {
      //  console.warn(error);
    });
  }
      
 

  onSignup() 
  {
    if( this.validatForm() )
    {
      return false ;
    }
    this.setState({ loading: true });  
    const { email, fname , lname , dial_code ,phone , password  } = this.state
    const setting_model  = { 
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          fname: fname  ,
          lname: lname ,
          dial_code: dial_code ,
          phone: phone ,
          password: password 
        })
      };
    return fetch(GLOBALS.BASE_URL+'rest_api/client_signup',setting_model)
    .then((response) => response.json())
    .then((data) => {
      if(data.status == 'susccess')
      {
        this.setState({ loading: false }); 
        Actions.thanks() ;
      }
      else
      {
        Alert.alert(data.msg);
        this.setState({ loading: false }); 
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }
  
  validatForm()
  {
    this.setState({
      errorForm: '',
      errorEmail: false,
      errorFname: false,
      errorLname: false,
      errorPhone: false,
      errorPassword: false,
      errorPasswordLULN: false,
      errorPasswordConfirm: false,
      errorIAgree: false,
    });

    var formError = false ;
    if(!Validator.isEmail( this.state.email ))
    {
      this.setState({ errorEmail: true }); 
      formError = true ;
    }
    if( this.state.fname == "")
    {
      this.setState({ errorFname: true }); 
      formError = true ;
    }
    if( this.state.lname == "")
    {
      this.setState({ errorLname: true }); 
      formError = true ;
    }
    if( this.state.phone == "")
    {
      this.setState({ errorPhone: true }); 
      formError = true ;
    }
    if( this.state.password == "")
    {
      this.setState({ errorPassword: true }); 
      formError = true ;
    }
    if( this.state.password == "")
    {
      this.setState({ errorPassword: true }); 
      formError = true ;
    }
    else if (this.state.password.length < 8) 
    {
      this.setState({ errorPasswordLULN: true }); 
      formError = true ;
    }
    else if ( ! /([A-Z]+)/g.test(this.state.password )) 
    {
      this.setState({ errorPasswordLULN: true }); 
      formError = true ;
    }
    else if ( ! /([a-z]+)/g.test(this.state.password )) 
    {
      this.setState({ errorPasswordLULN: true }); 
      formError = true ;
    }
    else if ( !  /\d/.test(this.state.password )) 
    {
      this.setState({ errorPasswordLULN: true }); 
      formError = true ;
    }

    if( this.state.password_confirm == "")
    {
      this.setState({ errorPasswordConfirm: true }); 
      formError = true ;
    }
    else if(this.state.password != this.state.password_confirm )
    {
      this.setState({ errorPasswordConfirm: true }); 
      formError = true ;
    }
    if(  this.state.i_agree == false )
    {
      this.setState({ errorIAgree: true }); 
      formError = true ;
    }
    return formError ;
  }


  render() {
      return ( 
        <KeyboardAwareScrollView extraScrollHeight={120} enableOnAndroid={true} scrollEnabled={true} >
        <StatusBar backgroundColor="#54CFFE"/>
          <View style={[{backgroundColor:'#34C8FD'}]}>
            <View style={[styles.arrange_horizontal_justify,{ marginBottom:0}]}>
              <View>
                <Text style={[{ color:'#fff', fontWeight:'600' , fontSize:18, lineHeight:30, padding:10, paddingLeft:15}]}>SIGNUP</Text>
              </View>
              <View>
                <Text onPress={ () => Actions.pop()  } style={{paddingRight:15}}> <Icon name='close' size={25} color="#fff" style={[{ color:'#fff', fontSize:20, lineHeight:50}]}  /> </Text>
              </View>
            </View>
          </View>
    
        <View style={ [styles.container,{ backgroundColor:"#FFF" } ]}> 
            
          <ScrollView>
            <View style={{ flex: 1,  flexDirection: 'column',justifyContent: 'space-between',  alignItems: 'center'}} > 
                <View>  
                  <View style={[{width : width - 30, marginTop:0  }]}> 
                    <View>
                      <View style={[styles.mb_30, styles.mt_20, styles.p_relative,{}]}>
                        <Text>Email</Text>
                        <TextInput value={this.state.email} onChangeText={(email) => this.setState({ email })} style={[ styles.input,{ }]} placeholder={'Enter Email Id'} /> 
                        <LinearGradient style={[styles.gradient,{}]} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={[ '#E3B35E','#7CC2F0']} >
                          <Text style={[{ height:2}]}>&nbsp;</Text>
                        </LinearGradient>
                        { (this.state.errorEmail )? <Text style={styles.error_text} >Enter a valid Email !</Text> : null }
                      </View>


                      <View style={[styles.mb_30, styles.p_relative,{}]}>
                        <Text>First Name</Text>
                        <TextInput  value={this.state.fname} onChangeText={(fname) => this.setState({ fname })}  style={[ styles.input,{ }]} placeholder={'Enter First Name'} /> 
                        <LinearGradient style={[styles.gradient,{}]} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={[ '#E3B35E','#7CC2F0']} >
                          <Text style={[{ height:2}]}>&nbsp;</Text>
                        </LinearGradient>
                        { (this.state.errorFname )? <Text style={styles.error_text} >First Name is mandatory !</Text> : null }
                      </View>


                      <View style={[styles.mb_30, styles.p_relative,{}]}>
                        <Text>Last Name</Text>
                        <TextInput value={this.state.lname} onChangeText={(lname) => this.setState({ lname })}  style={[ styles.input,{ }]} placeholder={'Enter Last Name'} /> 
                        <LinearGradient style={[styles.gradient,{}]} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={[ '#E3B35E','#7CC2F0']} >
                          <Text style={[{ height:2}]}>&nbsp;</Text>
                        </LinearGradient>
                        { (this.state.errorLname )? <Text style={styles.error_text} >Last Name is mandatory !</Text> : null }
                      </View>

                      <View style={[styles.mb_30,{}]}>
                        <Text>Mobile</Text>
                        <View style={[styles.arrange_horizontal_justify,{}]}>


                          <View style={{ flex:3, paddingRight:20 }}>
                            <View style={[styles.p_relative, {  paddingTop:15, paddingLeft:0  }]}>
                              <CountryPicker
                                onChange={(value)=> this.setState({cca2: value.cca2, dial_code : value.callingCode})}
                                cca2={this.state.cca2}
                                translation='eng'
                              />
                              <LinearGradient style={[styles.gradient,{ marginTop:10  }]} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={[ '#E3B35E','#7CC2F0']} >
                                <Text style={[{ height:2}]}>&nbsp;</Text>
                              </LinearGradient> 
                            </View>
                          </View>

                          <View style={[styles.p_relative, { flex:9 }]}>
                            <TextInput  value={this.state.phone} onChangeText={(phone) => this.setState({ phone })}  placeholder={'0000000000'} /> 
                            <LinearGradient style={[styles.gradient,{}]} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={[ '#E3B35E','#7CC2F0']} >
                              <Text style={[{ height:2}]}>&nbsp;</Text>
                            </LinearGradient>
                            { (this.state.errorPhone )? <Text style={styles.error_text} >Phone No is mandatory !</Text> : null }
                          </View>
                        </View>
                      </View>

                      <View style={[{ marginBottom:10}]}>
                        <Text>Password</Text>   
                        <Text style={{ fontSize:11 , color:"#999" }} >Enter at least 8 characters (lower, upper case and a number)</Text>   
                        <View style={[styles.arrange_horizontal_justify,{}]}>
                          <View style={[{ marginBottom:20 ,  width: (width/2) -30 }]}>                   
                            <TextInput  value={this.state.password} onChangeText={(password) => this.setState({ password })}   style={[ styles.input,{ }]} placeholder={'Enter Password'} secureTextEntry={true } /> 
                            <LinearGradient style={[styles.gradient,{}]} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={[ '#E3B35E','#7CC2F0']} >
                              <Text style={[{ height:2}]}>&nbsp;</Text>
                            </LinearGradient>
                            { (this.state.errorPassword )? <Text style={styles.error_text} >Password is mandatory!</Text> : null }
                            { (this.state.errorPasswordLULN )? <Text style={styles.error_text} >Weak Password!</Text> : null }             
                          </View>

                          <View style={[{ marginBottom:20 ,  width:(width/2) - 30 }]}>                     
                            <TextInput  value={this.state.password_confirm} onChangeText={(password_confirm) => this.setState({ password_confirm })}   style={[ styles.input,{ }]} placeholder={'Confirm Password'} /> 
                            <LinearGradient style={[styles.gradient,{}]} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={[ '#E3B35E','#7CC2F0']} >
                              <Text style={[{ height:2}]}>&nbsp;</Text>
                            </LinearGradient>
                            { (this.state.errorPasswordConfirm )? <Text style={styles.error_text} >Password Does Not Match !</Text> : null }
                          </View>
                        </View>
                      </View>

                      <View style={[{marginBottom:30}]}>
                        <CheckBox  onPress={()=> this.setState({i_agree: !this.state.i_agree})}   title='I agree to the Terms & Conditions of ArabEasy.' checked={this.state.i_agree} containerStyle={{ backgroundColor:'rgba(255,255,255,0)', borderWidth:0, padding:0, margin:0, marginLeft:0}} />
                        { (this.state.errorIAgree )? <Text style={styles.error_text} >Please agree to the Terms & Conditions! </Text> : null }
                      </View>

                      <View style={[{ marginBottom:50}]}>

                      <Text > { this.state.country }  </Text> 
                        <TouchableHighlight onPress={this.onSignup.bind(this)}>  
                          <LinearGradient style={[styles.gradient,{borderRadius:5}]} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={[ '#E3B35E','#7CC2F0']} >
                            <Text style={[ styles.btn,{}]}>Signup</Text>
                          </LinearGradient>
                        </TouchableHighlight> 
                      </View>

                      <View style={[{ marginBottom:50, textAlign:'center'}]}>
                        <TouchableHighlight onPress={() => { Actions.login();}} >  
                          <Text >Already Signed  Up? <Text style={[styles.link, styles.theme_blue_txt]}> Login</Text></Text>
                        </TouchableHighlight> 
                      </View>
                    </View>
                  </View>
                </View>  
            </View>
          </ScrollView>
        </View >
        </KeyboardAwareScrollView>  
      );  
  }
}
export default Signup;



