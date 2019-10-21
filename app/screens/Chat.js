
import React from 'react'; 
import { StatusBar, Linking , Picker , ActivityIndicator , AsyncStorage , View, Text, StyleSheet, Alert, Image , TextInput, TouchableHighlight, ScrollView,KeyboardAvoidingView, Dimensions ,Platform , TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import { GiftedChat ,Bubble  } from 'react-native-gifted-chat'
import styles from './Style.js';
import io from 'socket.io-client';
import GLOBALS from '../config/Globals';
import HTML from 'react-native-render-html';
import RNFetchBlob from 'rn-fetch-blob';
const { width , height } = Dimensions.get('window');
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});
type Props = {};

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.state = {
      token:'',
      user_id:null,
      messages:  [],
      assignmentId :  this.props.assignmentId,
      selectedTranslatorId:  this.props.selectedTranslatorId,
      fileName : '' , 
      fileUri : '',
      fileType : '',
      fileError :'',
      no_messages: [] 
    };
    this.socket =  io.connect('http://50.50.255.229:8000',{jsonp:false});
    this.socket.on("message_wip", (data) =>  this.onReceivedMessage(data) );
  }
  async componentDidMount() 
  { 
    this.socket.emit('chat_count',{ user_id:GLOBALS.USER_ID, type:'c', chat_count: 0 });
    this.loadData();
  } 
 
  loadData = async () => {
    var DEMO_TOKEN = await AsyncStorage.getItem("token");
    const setting  = { 
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' +  GLOBALS.TOKEN_KEY,
      },
      body: JSON.stringify({
        token:  GLOBALS.TOKEN_KEY ,
        assignmentId: this.state.assignmentId ,
      })
    };
    const response = await fetch(GLOBALS.BASE_URL+'rest_api/get_chat',setting );
    const json = await response.json();
    this.setState({
      user_id:json.user_id , messages:  json.result_chat  , no_messages: [{ _id: 0, text: '                          No Chat found!                          ', user: {_id: 0 },}]
    })
  };

  onSend(messages = []) 
  {
    let formdata = new FormData();
    if(this.state.fileName != '')
    {
      formdata.append('docFile', {
        uri: this.state.fileUri ,
        type: this.state.fileType , 
        name: this.state.fileName
      }); 
    }

    formdata.append("message", messages[0].text)
    formdata.append("to", this.state.selectedTranslatorId)
    formdata.append("buyer_documents_id", this.state.assignmentId)
    formdata.append("send_from", 'c')

    fetch(GLOBALS.BASE_URL+'rest_api/add_chat',{
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer ' +  GLOBALS.TOKEN_KEY
      },
      body: formdata
      })
      .then((response) => response.json())
      .then(data => {

        messages[0].text = data.msg ;
        if(this.state.fileName != '')
        {
          messages[0].boxFileId = data.boxFileId ;
          messages[0].boxFileName = data.boxFileName ;
          
        }
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, messages),
        }));

        this.socket.emit('message_wip',{
          chat_id:data.id,
          document_file:'',
          msg: data.msg ,
          buyer_documents_id: this.state.assignmentId ,
          date: data.sent ,
          to: this.state.selectedTranslatorId,
          from: data.from
        });

        this.setState({fileName : '' , fileUri : '', fileType: ''});
      }).catch(err => { }) ;
  }   
  onReceivedMessage(mes)
  {
    {
      if( this.state.user_id == mes.to && this.state.assignmentId == GLOBALS.DOC_ID  )
      {
        fetch(GLOBALS.BASE_URL+'rest_api/update_chat_read',{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +  GLOBALS.TOKEN_KEY,
          },
          body: JSON.stringify({
              assignmentId: this.state.assignmentId ,
              chat_id: mes.chat_id ,
              user_type:'c'
            })
          })
          .then((response) => response.json())
          .then(data => {
            console.warn( response.msg );
          }).catch(err => {
        })  ;
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, 
            {
            _id: mes.chat_id, 
            text: mes.msg  , 
            createdAt: new Date(), 
            user: {
              _id: mes.to
            },
          }),
        }));
      }
      else
      {
        null ;
      }
    }
  }

  browseFile() {
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

renderSend(props) {
  return (
      <View style={[ {  marginTop:5, marginBottom:5 , marginLeft:35 }]}> 
        <TouchableOpacity onPress={() => props.onSend({text: props.text} , true)} style={{ padding:10}}>
          <Icon name="send" size={24} color="#666666" />
        </TouchableOpacity>
      </View>
  );
}

renderBubble(props) 
{
  return (
    <Bubble
    wrapperStyle={{
      right: { backgroundColor: '#FFF' }
    }}
    {...props}
  />
  );
}

renderMessageText(props) 
{
  return (
    <View style={{ margin:10 }}  >
      <HTML html={props.currentMessage.text}  onLinkPress={(event, href)=>{
        RNFetchBlob
        .config({
          fileCache : true,
          addAndroidDownloads : {
              useDownloadManager : true, // <-- this is the only thing required
              // Optional, override notification setting (default to true)
              notification : true,
              description : 'File downloaded.'
          }  
        })
        .fetch('GET', href, {
          'Cache-Control': 'no-store',
          'Authorization': 'Bearer ' +  GLOBALS.TOKEN_KEY ,
        })
        .catch((error) => {});
        }} 
      />  
    </View>
  
  );
}

  render() {

    var noRecord = [];
    noRecord['_id'] = 0 ;
    noRecord['text'] = 'No Record' ;
    noRecord['createdAt'] = new Date() ;
    //noRecord['user'] =['_id': GLOBALS.USER_ID];
  
      return ( 
        <GiftedChat
          messages={ this.state.messages.length > 0 ? this.state.messages :  this.state.no_messages }
          onSend={messages => this.onSend(messages)}
          renderSend={this.renderSend}
          renderMessageText ={this.renderMessageText}
          renderBubble  ={this.renderBubble  }
          renderInputToolbar={ this.props.disableChat ? () => null : undefined}
          renderActions={() => {
              return (
                <View style={{ position:'absolute', right:45, bottom:15 , borderRightWidth: 1,  borderRightColor: '#DDD' , padding:5 ,paddingTop:2 , paddingBottom:2 }}  >
                <Icon  name="link" size={24} color={"#34C8FD"}
                  onPress={() => this.browseFile() }
                /></View>);
            }}
          user={{
            _id: this.state.userId ,
          }}
        /> 
      );
  }
}
export default Chat;



