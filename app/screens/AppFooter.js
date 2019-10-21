import React, {Component} from 'react';
import {Image, StyleSheet} from 'react-native';
import {Badge , Footer, FooterTab, Button, Text} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import GLOBALS from '../config/Globals';
import styles from './Style.js';
import {  upadteNotificationCount } from './actions/notificationActions';
import {  upadteUploaded , upadteDataAfter } from './actions/uploadedActions';
import {  upadteStarted , upadteDataAfterStarted } from './actions/startedActions';
import {  upadteCompleted , upadteDataAfterCompleted } from './actions/completedActions';
class AppFooter extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      chatCount: 0,
    }
    this.onNotificationCount = this.onNotificationCount.bind(this);
    this.onTotalChatCount = this.onTotalChatCount.bind(this);
    this.onChatCount = this.onChatCount.bind(this);
    this.socket =  io.connect('http://54.87.255.229:8000',{jsonp:false});
    this.socket.on("notification_count", (data) =>  this.onNotificationCount(data) );
    this.socket.on("message_wip", (data) =>  this.onTotalChatCount(data) );
    this.socket.on("chat_count", (data) =>  this.onChatCount(data) );
  }
  componentDidMount() 
  {
    this.getChatCount();
  }
  onNotificationCount(data)
  {
    
    if(data.user_id == GLOBALS.USER_ID )
    {
      this.props.upadteNotificationCount(data.noti_count);
      //console.warn(data);
    }
  }

  getChatCount()
  {
    fetch(GLOBALS.BASE_URL+'rest_api/get_unread_chat_count', {
      method: "GET",
      headers: {'Authorization': 'Bearer ' + GLOBALS.TOKEN_KEY }
    })
    .then(response => response.json())
    .then(response => {
      this.setState({ chatCount: response.chatCounts });
    })
    .catch(error => { 
    });
  }

  onTotalChatCount(data)
  {
    if(data.to == GLOBALS.USER_ID &&  data.buyer_documents_id != GLOBALS.DOC_ID  )
    {
      this.getChatCount();
    }
  }

  onChatCount(data)
  {
    if(data.user_id == GLOBALS.USER_ID &&  data.type == 'c'  )
    {
      this.getChatCount();
    }
  }
  render() {
    return (
      <Footer tabActiveBgColor="#F00" >
        <FooterTab tabActiveBgColor="#F00" style={{backgroundColor:"#FFF"}}>
          <Button style={[styles.theme_white]} active={this.props.currentIndex == '0'} onPress={() => this.setState({ currentIndex: 0 } , Actions.home({currentIndex: 0}) )} >
            <Icon name='folder-o' size={25} style={this.props.currentIndex=='0'?[styles.theme_blue_txt]:[styles.theme_black6_txt]} />
          </Button>
          <Button badge style={[styles.theme_white]} active={this.props.currentIndex == '1'} onPress={() => this.setState({ currentIndex: 1 } , Actions.chats({currentIndex: 1}) )} >
            { this.state.chatCount > 0 &&
              <Badge style={{ position:"absolute", left:40 , top:4 }} ><Text>{this.state.chatCount}</Text></Badge> 
            }
            <Icon name='comment-o' size={25} style={this.props.currentIndex=='1'?[styles.theme_blue_txt]:[styles.theme_black6_txt]} />
          </Button>
          <Button style={[styles.theme_white]}  active={this.props.currentIndex == '2'} onPress={() => this.setState({ currentIndex: 2 } , Actions.new_assignment({currentIndex: 2}) )} >
            <Icon color="#0793DB"  name='plus-circle' size={50}  /> 
          </Button>
          <Button badge  style={[styles.theme_white]} active={this.props.currentIndex == '3'} onPress={() => this.setState({ currentIndex: 3 } , Actions.notification({currentIndex: 3}) )} >
          { this.props.notificationCount > 0 &&
            <Badge style={{ position:"absolute", left:40 , top:4 }} ><Text>{this.props.notificationCount}</Text></Badge> 
          }
          <Icon  name='bell-o' size={25} style={this.props.currentIndex=='3'?[styles.theme_blue_txt]:[styles.theme_black6_txt]} />
          </Button>
          <Button style={[styles.theme_white]} active={this.props.currentIndex == '4'} onPress={() => this.setState({ currentIndex: 4 } , Actions.profile({currentIndex: 4}) )} >
            <Icon  name='user-o' size={25} style={this.props.currentIndex=='4'?[styles.theme_blue_txt]:[styles.theme_black6_txt]} />
          </Button>
          {/* <Button style={[styles.theme_white]}  onPress={() =>  this.onTotalChatCount(5) } >
            <Icon  name='user-o' size={25} style={this.props.currentIndex=='4'?[styles.theme_blue_txt]:[styles.theme_black6_txt]} />
          </Button> */}
        </FooterTab>
      </Footer>
    );
  }
}
const mapStateToProps = state => {
  return {
    notificationCount: state.notificationReducer.notificationCount,
    _data: state.documentReducer._data,
    dataAfter: state.documentReducer.dataAfter
  }
}
const mapDispatchToProps = dispatch => {
  return {
    upadteNotificationCount: (count) => {
      dispatch(upadteNotificationCount(count))
    },
    upadteUploaded : (_data ) => {
      dispatch( upadteUploaded(_data))
    },
    upadteDataAfter : (dataAfter ) => {
      dispatch( upadteDataAfter(dataAfter))
    },
    upadteStarted : (_dataStarted) => {
      dispatch( upadteStarted(_dataStarted))
    },
    upadteDataAfterStarted : (dataAfterStarted ) => {
      dispatch( upadteDataAfterStarted(dataAfterStarted))
    },
    upadteCompleted : (_dataCompleted) => {
      dispatch( upadteCompleted(_dataCompleted))
    },
    upadteDataAfterCompleted : (dataAfterCompleted ) => {
      dispatch( upadteDataAfterCompleted(dataAfterCompleted))
    },
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(AppFooter)