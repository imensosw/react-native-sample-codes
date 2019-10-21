
import React from 'react'; 
import { StatusBar, Picker , ActivityIndicator , AsyncStorage , View, Text, StyleSheet, Alert, Image , TextInput, TouchableHighlight, ScrollView,KeyboardAvoidingView, Dimensions ,Platform , TouchableOpacity } from "react-native";
import { Actions , ActionConst } from 'react-native-router-flux'; 
import LinearGradient from 'react-native-linear-gradient';
import { Avatar , FormLabel, FormInput, FormValidationMessage } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import styles from './Style.js';
import Spinner from 'react-native-loading-spinner-overlay';
import GLOBALS from '../config/Globals';
import { connect } from 'react-redux';
import {  upadteUploaded , upadteDataAfter  } from './actions/uploadedActions';
const { width , height } = Dimensions.get('window');
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});
type Props = {};

class NewAssignment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token : '',
      assignment_title: '',
      loading: false,
      wordCountOption:[],
      languagesFrom:[],
      languagesFromSelected:0,
      languagesTo:[],
      languagesToSelected:0,
      translationExpertise:[],
      translationExpertiseSelected:0,
      wordCounts:[],
      wordCountsSelected:0,
      fileName : '' , 
      fileUri : '',
      fileType : '',
      fileError :'',
      wordCountsError:'',
      languagesFromError:'',
      languagesToError:'',
      translationExpertiseError:'',
      titleError:'',
      spinner: false ,
    };
  }
  async componentDidMount() {
    try 
    {
      AsyncStorage.getItem("token").then((value) => {
        this.setState({ token: value });
      })
      .then(
        this.onLoad()
      );
    } 
    catch (error) 
    {
    }
  }
  async onLoad() 
  {
    const setting_model  = { 
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + GLOBALS.TOKEN_KEY ,
        },
        body: JSON.stringify({
        })
      };
    return fetch(GLOBALS.BASE_URL+'rest_api/get_dropdown_option',setting_model)
    .then((response) => response.json())
    .then((data) => {

      let wordCounts = [] ;
      for ( let j = 1;  j <= 100 ; j++ ) {
        let k = 100 * j ;
        wordCounts.push({id:k,name:k}) 
      }
      this.setState({
         languagesFrom : data.languages , 
         languagesTo : data.languages,
         translationExpertise:data.translation_expertise,
         wordCounts:wordCounts
      });
    })
    .catch((error) => {

    });
  }

  formValidate() 
  {
      var isError = false ;
      this.setState({
        fileError :'',
        wordCountsError:'',
        languagesFromError:'',
        languagesToError:'',
        translationExpertiseError:'',
        titleError:''
      });
      if(this.state.fileName == '') 
      {
        this.setState({ fileError : 'Please Select A File!' });
        isError = true ;
      }
      if(this.state.wordCountsSelected  == 0 ) 
      {
        this.setState({ wordCountsError : 'Word Count is required!' });
        isError = true ;
      }
      if(this.state.assignment_title == '') 
      {
        this.setState({ titleError : 'Assignment Title is required!' });
        isError = true ;
      }
      if(this.state.languagesFromSelected == 0) 
      {
        this.setState({ languagesFromError : 'Translate from is required!' });
        isError = true ;
      }
      if(this.state.languagesToSelected == 0) 
      {
        this.setState({ languagesToError : 'Translate To is required!' });
        isError = true ;
      }
      else if( this.state.languagesFromSelected > 0 &&  this.state.languagesToSelected > 0 && (this.state.languagesFromSelected ==  this.state.languagesToSelected ) ) 
      {
        this.setState({ languagesToError : 'First language and Second language must be different!' });
        isError = true ;
      }
      else if( this.state.languagesFromSelected != 1 &&  this.state.languagesToSelected != 1 ) 
      {
        this.setState({ languagesToError : 'One language must be Arabic!' });
        isError = true ;
      }

      if(this.state.translationExpertiseSelected == '') 
      {
        this.setState({ translationExpertiseError : 'Type of Document is required!' });
        isError = true ;
      }
    return isError ;
  }

  onSaveAssignment() {
        this.setState({ spinner: true });  
        if( this.formValidate() )
        {
          this.setState({ spinner: false });  
          return false ;
        }

        const data = new FormData();
        data.append('title', this.state.assignment_title );
        data.append('languagesFrom',this.state.languagesFromSelected );
        data.append('languagesTo',this.state.languagesToSelected );
        data.append('translationExpertise',this.state.translationExpertiseSelected );
        data.append('wordCounts',this.state.wordCountsSelected );
        data.append('_token','ABCD' ); 
        data.append('docFile', {
          uri: this.state.fileUri ,
          type: this.state.fileType , 
          name: this.state.fileName
        });
        fetch(GLOBALS.BASE_URL+'rest_api/store_assignment', {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': 'Bearer ' +  GLOBALS.TOKEN_KEY ,
          },
          method: 'post',
          body: data
        })
        .then((response) => response.json())
        .then((data) => {
          this.setState({ spinner: false });  
          this.props.upadteDataAfter(0); 
          this.props.upadteUploaded([]);
          Actions.home({showFlash:true, flashMessage:'Added Successfully.'});
  
        })
        .catch((error) => {
          this.setState({ spinner: false });  
        });
  }

  updateLanguagesFrom = (languagesFrom) => {
    this.setState({ languagesFromSelected: languagesFrom })
  }
  updateLanguagesTo = (languagesTo) => {
    this.setState({ languagesToSelected: languagesTo })
   }

  updateTranslationExpertise = (translationExpertise) => {
    this.setState({ translationExpertiseSelected: translationExpertise })
   }

  updateWordCount = (wordCount) => {
    this.setState({ wordCountsSelected : wordCount })
   }

   createTable = () => {
    let table = [] ;
    for ( let j = 1;  j <= 100 ; j++ ) {
      let k = 100 * j ;
      table.push(<Picker.Item label={ k+'' } value={ k } key={j} />) 
    }
    return table ;
  }

  
  selectPhotoTapped() {
    DocumentPicker.show({
      filetype: [DocumentPickerUtil.allFiles()],
    },(error,res) => {
      if( ! error )
      {
         this.setState({
          fileName : res.fileName , 
          fileUri : res.uri,
          fileType: res.type
        });
      }
      else
      {
        this.setState({
          fileName : '' , 
          fileUri : '' ,
          fileType: ''
        });
      }
    });
  }
 

  render() {
      return ( 
        <View style={ [styles.container,  styles.theme_white ]}> 
        <StatusBar backgroundColor="#54CFFE"/>
          <Spinner
            visible={this.state.spinner}
            textContent={'Adding New Assignment...'}
            textStyle={styles.spinnerTextStyle}
          /> 
          <View style={[{backgroundColor:'#34C8FD'}]}>
            <View style={[styles.arrange_horizontal_justify,{ marginBottom:50}]}>
              <View>
                <Text style={[{ color:'#fff', fontWeight:'600' , fontSize:18, lineHeight:30, padding:10, paddingLeft:15}]}>NEW ASSIGNMENT</Text>
              </View>
              <View>
                <Text onPress={ () => Actions.pop()  } style={{paddingRight:15}}> <Icon name='close' size={25} color="#fff" style={[{ color:'#fff', fontSize:20, lineHeight:50}]}  /> </Text>
                {/* <Icon name='folder-o' size={25}  /> */}
              </View>
            </View>
          </View> 
          <ScrollView>
           <View style={{ flex: 1,  flexDirection: 'column',justifyContent: 'space-between',  alignItems: 'center'}} > 
              <View>  
                <View style={[{width : width - 30, marginTop:20  }]}> 
                  <View>

                    <View style={[styles.mb_30,styles.p_relative,{}]}>
                      <Text>Upload Document</Text>
                      <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                        <View style={[styles.avatar, styles.avatarContainer, {}]}>
                          <Text style={[ styles.input,{ color:'#999' }]} > { this.state.fileName }</Text> 
                          <Image  source={require('../images/upload.png')} style={[ styles.upload_file,{width:24, height:18}]} />
                        </View>
                      </TouchableOpacity>
                      
                      <LinearGradient style={[styles.gradient,{}]} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={[ '#E3B35E','#7CC2F0']} >
                        <Text style={[{ height:2}]}>&nbsp;</Text>
                      </LinearGradient>
                      <Text style={styles.error_text} >{ this.state.fileError  }</Text>
                    </View>


                    

                    <View style={[styles.mb_30,{}]}>
                      <Text>Word Count</Text>                      
                      <Picker mode="dropdown" style={{ borderWidth:0 }} selectedValue = {this.state.wordCountsSelected} onValueChange = {this.updateWordCount}>
                      <Picker.Item label = "Select approximate number of words" value="" />
                        { this.state.wordCounts.map((wordCount, index) => (
                          <Picker.Item label={wordCount.name+''} value={wordCount.id} key={index} />
                        ))} 
                      </Picker>
                      <LinearGradient style={[styles.gradient,{}]} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={[ '#E3B35E','#7CC2F0']} >
                        <Text style={[{ height:2}]}>&nbsp;</Text>
                      </LinearGradient>
                      <Text style={styles.error_text} >{ this.state.wordCountsError  }</Text>
                    </View>

                    <View style={[styles.mb_30,{}]}>
                      <Text>Assignment Title</Text>
                      <TextInput style={[ styles.input,{ borderWidth:0 }]} value={this.state.assignment_title} onChangeText={(assignment_title) => this.setState({ assignment_title })} placeholder={'Title'} /> 
                      <LinearGradient style={[styles.gradient,{}]} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={[ '#E3B35E','#7CC2F0']} >
                        <Text style={[{ height:2}]}>&nbsp;</Text>
                      </LinearGradient>
                      <Text style={styles.error_text} >{ this.state.titleError  }</Text>
                    </View>

                    <View style={[styles.arrange_horizontal_justify,{ marginBottom:10}]}>
                      <View style={[styles.mb_30,{height:73, width: (width/2) -30
                      }]}>
                        <Text>From</Text>                      
                        <Picker mode="dropdown" selectedValue={ this.state.languagesFromSelected } onValueChange = {this.updateLanguagesFrom} style={{ borderWidth:0, padding:0}}>
                          <Picker.Item label = "First Language" value="" />
                           { this.state.languagesFrom.map((language, index) => (
                              <Picker.Item label={language.name} value={language.id} key={index} />
                          ))}
                        </Picker>
                        <LinearGradient style={[styles.gradient,{}]} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={[ '#E3B35E','#7CC2F0']} >
                          <Text style={[{ height:2}]}>&nbsp;</Text>
                        </LinearGradient>
                        <Text style={styles.error_text} >{ this.state.languagesFromError  }</Text>
                      </View>

                      <View style={[styles.mb_30,{height:73, width:(width/2) - 30 }]}>
                        <Text>To</Text>                      
                        <Picker mode="dropdown" selectedValue={ this.state.languagesToSelected } onValueChange={this.updateLanguagesTo} style={{ borderWidth:0 , padding:0}}>
                         <Picker.Item label="Second Language" value="" />
                          { this.state.languagesTo.map((language, index) => (
                              <Picker.Item label={language.name} value={language.id} key={index} />
                          ))}
                        </Picker>
                        <LinearGradient style={[styles.gradient,{}]} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={[ '#E3B35E','#7CC2F0']} >
                          <Text style={[{ height:2}]}>&nbsp;</Text>
                        </LinearGradient>
                        <Text style={styles.error_text} >{ this.state.languagesToError  }</Text>
                      </View>
                    </View>

                    <View style={[styles.mb_30,{}]}>
                      <Text>Type of document language</Text>                      
                      <Picker style={{ borderWidth:0 }} mode="dropdown" selectedValue = {this.state.translationExpertiseSelected  } onValueChange = {this.updateTranslationExpertise}>
                       <Picker.Item label = "Select Context" value="" />
                        { this.state.translationExpertise.map((expertise, index) => (
                          <Picker.Item label={expertise.name} value={expertise.id} key={index} />
                        ))}
                      </Picker>
                      <LinearGradient style={[styles.gradient,{}]} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={[ '#E3B35E','#7CC2F0']} >
                        <Text style={[{ height:2}]}>&nbsp;</Text>
                      </LinearGradient>
                      <Text style={styles.error_text} >{ this.state.translationExpertiseError  }</Text>
                    </View>

                    
                    <View style={[{ marginBottom:50}]}>
                      <TouchableHighlight  onPress={this.onSaveAssignment.bind(this)}>  
                        <LinearGradient style={[styles.gradient,{borderRadius:5}]} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={[ '#E3B35E','#7CC2F0']} >
                          <Text style={[ styles.btn,{}]}>Lets find you a few translators</Text>
                        </LinearGradient>
                      </TouchableHighlight> 
                    </View>
                    
                  </View>
                </View>
              </View>
            </View > 
            </ScrollView> 
          </View >  

      );
  }
}
const mapStateToProps = state => {  
  return {
    _data: state.documentReducer._data,
    dataAfter: state.documentReducer.dataAfter
  }
}
const mapDispatchToProps = dispatch => {
  return {
    upadteUploaded : (_data ) => {
      dispatch( upadteUploaded(_data))
    },
    upadteDataAfter : (dataAfter ) => {
      dispatch( upadteDataAfter(dataAfter))
    },
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(NewAssignment);




