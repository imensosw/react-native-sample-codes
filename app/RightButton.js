/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {  Router, Scene , Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Modal , PermissionsAndroid , TouchableOpacity , Picker , AsyncStorage , View, Text, StyleSheet, Alert ,Platform , Dimensions ,TouchableHighlight , Image  } from "react-native";
import styles from './screens/Style'; 
import GLOBALS from './config/Globals';
import ModalDropdown from 'react-native-modal-dropdown';

import io from 'socket.io-client';
import { CheckBox  } from 'react-native-elements'; 
import Icon from 'react-native-vector-icons/FontAwesome';
import {  upadteNotificationCount } from './screens/actions/notificationActions';
import {  upadteUploaded , upadteDataAfter } from './screens/actions/uploadedActions';
import {  upadteStarted , upadteDataAfterStarted } from './screens/actions/startedActions';
import {  upadteCompleted , upadteDataAfterCompleted } from './screens/actions/completedActions';
import RNFetchBlob from 'rn-fetch-blob';
const { width , height } = Dimensions.get('window');
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});
type Props = {};
class RightButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalCancel: false,
      promoView:[true,false]  ,
      boxFileId : GLOBALS.BOX_ID ,
      assignmentId : GLOBALS.DOC_ID,
      errMsg : ''
    };
    
   
  }
  async componentDidMount() { 
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          'title': 'File Permission',
          'message': 'ArabEasy App needs access to your EXTERNAL STORAGE '
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.warn("You can use the camera")
      } else {
        console.warn("Camera permission denied")
      }
    } catch (err) {
      //this.setState({errMsg : 'IN Permission' });
      console.warn(err)
    }

  }
  onSelect(id) 
  {
    if( id  == 0 )
    {
      this.downloadFile()
    }
    else
    {
      this.setModalCancel(!this.state.modalCancel);
    }
  }

  setModalCancel(visible) {
    this.setState({ modalCancel : visible 
    });
  }
  changePromoView(promoView,cancelReason) {
    this.setState({promoView: promoView , cancelReason : cancelReason }, () => this.togglePromoView());
  }
  togglePromoView() 
  {
  }


async downloadFile() 
{
  const setting_model  = { 
    method: 'POST',
    headers: { 'Accept': 'application/json','Content-Type': 
    'application/json','Authorization': 'Bearer ' +  GLOBALS.TOKEN_KEY,},
    body: JSON.stringify({
      boxFileId : this.state.boxFileId
    })
  }; 

  fetch(GLOBALS.BASE_URL+'rest_api/downloadFromBox',setting_model)
  .then((response) => response.json())
  .then((data) => {
    let path = RNFetchBlob.fs.dirs.DownloadDir + '/'+data.name;
    //let path = RNFetchBlob.fs.dirs.DocumentDir;
      RNFetchBlob
      .config({
        fileCache : true,
        trusty: true,
      
        addAndroidDownloads : {
            useDownloadManager : true, // <-- this is the only thing required
            notification : true,
            //path: path  ,
            description : 'File downloaded.'
        }  
      })
      .fetch('GET', data.download_url, {
        'Cache-Control': 'no-store',
        'Authorization': 'Bearer ' +  GLOBALS.TOKEN_KEY ,
      })
      .then((res) => {
        // remove cached file from storage
        res.flush();
        console.warn('Removed');
      })
      .catch((error) => { 
        this.setState({errMsg : error.message });
       });
  })
  .catch((error) => {  });
}


cancelAssignment() 
{
  const setting_model  = { 
      method: 'POST',
      headers: { 'Accept': 'application/json','Content-Type': 
      'application/json','Authorization': 'Bearer ' +  GLOBALS.TOKEN_KEY,},
      body: JSON.stringify({
        document_id : this.state.assignmentId ,
        reason: this.state.cancelReason ,
        cbid_id: this.state.giveworkBidId , 
        _token:'KqssETM7y28DeeKcIxXLm2dqUZ3XetQqbBGyxVga'
      })
    }; 
  return fetch(GLOBALS.BASE_URL+'rest_api/cancel_assignment',setting_model)
  .then((response) => response.json())
  .then((data) => {
    this.setModalCancel(!this.state.modalCancel);
    Actions.pop() ;
  })
  .catch((error) => {   });
}

  onDropdownWillHide() 
  {
    this.dropDown.select(-1);
    
  }
  onNotificationCount(data)
  {
    if(data.user_id == GLOBALS.USER_ID )
    {
      this.props.upadteNotificationCount(data.noti_count);
    }
    
  }

  renderSeparator()
  {
    
  }

  render() 
  {
    var data = [["C", "Java", "JavaScript", "PHP"]];
    return (
      <View style={[styles.arrange_horizontal, { marginRight:10, marginTop:0 } ]} >
      <Modal animationType="slide" transparent={false} visible={this.state.modalCancel} onRequestClose={() => {Alert.alert('Modal has been closed.'); }}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <View style={[ styles.p_relative,{ backgroundColor:'#fff',borderRadius:8, paddingBottom:10, width:(width-40)}]}>
            
              <TouchableHighlight onPress={() => {this.setModalCancel(!this.state.modalCancel); }} style={[ styles.closemodel, styles.circle,{ width:40, height:40, padding:5}]}>
                <Text style={[styles.circle,{backgroundColor:'#000', width:30, height:30, paddingTop:6, paddingLeft:7}]}>
                  <Image source={require('./images/close.png')} style={[{width:14, height:14, marginTop:10, marginLeft:10}]} />
                </Text>
              </TouchableHighlight>

              <View style={[styles.bdr_bottom,{ padding:20}]}> 
                <Text style={[styles.OpenSans_SemiBold,{fontSize: 20, color:'#333'}]}>Project Cancel</Text>                
              </View>

              <View style={{padding:20}}>
                <View>
                  <View style={[{marginBottom:20}]}>
                    <CheckBox checked={this.state.promoView[0]} onPress={() => this.changePromoView([true,false,false,false,false,false],'Selected bid by mistake') } left title='Selected bid by mistake' uncheckedIcon='circle-o' checkedIcon='dot-circle-o' checkedColor="#34C8FD" containerStyle={styles.checkbox_formate} textStyle={[styles.OpenSans_Light,{ color:'#999'}]} />
                    <CheckBox checked={this.state.promoView[1]} onPress={() => this.changePromoView([false,true,false,false,false,false],'Uploaded incorrect document') } left title='Uploaded incorrect document'  uncheckedIcon='circle-o' checkedIcon='dot-circle-o' checkedColor="#34C8FD" containerStyle={styles.checkbox_formate} textStyle={[styles.OpenSans_Light,{ color:'#999'}]} /> 
                    <CheckBox checked={this.state.promoView[2]} onPress={() => this.changePromoView([false,false,true,false,false,false],'Translator unresponsive') } left title='Translator unresponsive'  uncheckedIcon='circle-o' checkedIcon='dot-circle-o' checkedColor="#34C8FD" containerStyle={styles.checkbox_formate} textStyle={[styles.OpenSans_Light,{ color:'#999'}]} /> 
                    <CheckBox checked={this.state.promoView[3]} onPress={() => this.changePromoView([false,false,false,true,false,false],'Unhappy with quality of initial sample') } left title='Unhappy with quality of initial sample'  uncheckedIcon='circle-o' checkedIcon='dot-circle-o' checkedColor="#34C8FD" containerStyle={styles.checkbox_formate} textStyle={[styles.OpenSans_Light,{ color:'#999'}]} /> 
                    <CheckBox checked={this.state.promoView[4]} onPress={() => this.changePromoView([false,false,false,false,true,false],'Do not need translation any more') } left title='Do not need translation any more'  uncheckedIcon='circle-o' checkedIcon='dot-circle-o' checkedColor="#34C8FD" containerStyle={styles.checkbox_formate} textStyle={[styles.OpenSans_Light,{ color:'#999'}]} /> 
                    <CheckBox checked={this.state.promoView[5]} onPress={() => this.changePromoView([false,false,false,false,false,true],'Other') } left title='Other'  uncheckedIcon='circle-o' checkedIcon='dot-circle-o' checkedColor="#34C8FD" containerStyle={styles.checkbox_formate} textStyle={[styles.OpenSans_Light,{ color:'#999'}]} /> 
                  </View>
                </View>

                <View   >
                  <View > 
                      <View style={{marginTop:20, textAlign:'right',  alignSelf:'flex-end'}}> 
                        <TouchableHighlight onPress={() => {this.cancelAssignment(); }}>
                          <Text style={[styles.custom_btn ,{}]}>Cancel Assignment</Text>
                        </TouchableHighlight>
                      </View>
                  </View>
                </View>

              </View>
            </View>
          </View>
        </Modal>
        {/* <View style={[{position:'relative'}]}>
          <Text style={[ styles.header_icon,{}] } onPress={() => {  Actions.notification(); }} >
              <Icon  name="bell-o" size={24} color="#FFF" />   
            </Text>
          { this.props.notificationCount > 0 &&
            <Text onPress={() => {  Actions.notification(); }} style={[ styles.notification_circle , {}] } > { this.props.notificationCount} </Text>  
          }
        </View> */}

        {/* <Text> { this.state.errMsg  } </Text> */}

        <TouchableOpacity onPress = {()=>{this.dropDown && this.dropDown.show();}}>
          <View style = {{ paddingLeft:30,  alignItems:'center',flexDirection:'row'}}>
              <ModalDropdown ref={(el) => {this.dropDown = el}}
              options={["Download", "Cancel"]}
              defaultValue = {""}  
              style = {{ borderRadius:4 , paddingLeft:10, flex: 1}} 
              textStyle = {{    fontWeight:'bold', textAlign: 'right'}}
              dropdownStyle={{ height: 'auto' , padding:10 }}
              dropdownTextStyle={{ fontSize:14  }}
              onSelect={ (value)=>  this.onSelect(value) }  
              onDropdownWillHide ={ ()=>  this.onDropdownWillHide() }  
              renderSeparator={ ()=>  this.renderSeparator()  }
              />
              <View style={{ position: "absolute", right: 10, top: 0 }}><Text><Icon name="ellipsis-v" size={24} color="#FFF" /></Text></View>
          </View>
        </TouchableOpacity>

        
      </View>
    )
  }
}


export default RightButton



