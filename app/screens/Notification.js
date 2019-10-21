
import React from 'react'; 
import { StatusBar, FlatList , Picker , ActivityIndicator , AsyncStorage , View, Text, StyleSheet, Alert, Image , TextInput, TouchableHighlight, ScrollView,KeyboardAvoidingView, Dimensions ,Platform , TouchableOpacity } from "react-native";
import { Actions } from 'react-native-router-flux'; 
import LinearGradient from 'react-native-linear-gradient';
import { Avatar ,Icon, FormLabel, FormInput, FormValidationMessage } from "react-native-elements";
import styles from './Style.js';
import GLOBALS from '../config/Globals';
// import { createIconSetFromFontello  } from 'react-native-vector-icons';
// import fontelloConfig from './config.json';
// const CustomIcon = createIconSetFromFontello(fontelloConfig);
import AppFooter from './AppFooter';
import { connect } from 'react-redux';
import {  upadteNotificationCount } from './actions/notificationActions';

import * as Animatable from 'react-native-animatable';

const { width , height } = Dimensions.get('window');
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});
type Props = {};

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinner: true ,
      isLoading: true,
      _data: null,
      _noMoreRecord: false,
    };
  }

  async componentDidMount() {
    fetch(`${GLOBALS.BASE_URL}rest_api/get_client_notification`, {
      method: "GET",
      headers: {
        'Authorization': 'Bearer ' + GLOBALS.TOKEN_KEY
      }
    })
    .then(response => response.json())
    .then((data) => {
      this.setState({
        isLoading: false,
        _data: data.notifications,
        _dataAfter: 1,
        spinner : false
      });
    })
    .catch(error => {
    });
    this.props.upadteNotificationCount(0);
    
  }

  refreshList() 
  {
    fetch(`${GLOBALS.BASE_URL}rest_api/get_notification_after_id/${this.state._data[0]['id']}`, {
      method: "GET",
      headers: {'Authorization': 'Bearer ' + GLOBALS.TOKEN_KEY }
    })
    .then(response => response.json())
    .then(response => {
     
      if(response.resultsNotification.length > 0  )
      {
        response.resultsNotification.map((docData) => {
          var result = this.state._data.find( fruit => fruit.id == docData.id );
          if(!result)
          {
            const data = [docData].concat(this.state._data);
            this.setState({ _data: data,});
            //this.props.upadteCompleted(data);
          }
        });
      }
    })
    .catch(error => { 
      console.error(error);
    }); 
  }

  render() {
      return ( 
        <View style={ [styles.container]}> 
        <StatusBar backgroundColor="#54CFFE"/>
          <FlatList 
           data={this.state._data} 
           renderItem={({item: rowData}) => {
              return (
                <TouchableOpacity >
                  <View style={[styles.list_item, styles.p_20, styles.glow ,  { borderColor:"#DDD" , borderWidth:1    }]}>
                    <Text style={{  lineHeight:20 }}  >{ rowData.message.replace(/\s\s+/g, ' ') }</Text>
                  </View>
                </TouchableOpacity>
              );
          }}
          refreshing={this.state.isLoading}
          onRefresh={() => { this.refreshList() }}
          onEndReached={() => {}}
          keyExtractor={ ( item , index ) => index.toString()}
        />   
         <AppFooter currentIndex={this.props.currentIndex}/> 
        </View >  
      );
  }
}

const mapStateToProps = state => {
  return {
    noti: state.notificationReducer.noti
  }
}
const mapDispatchToProps = dispatch => {
  return {
    upadteNotificationCount: (count) => {
      dispatch(upadteNotificationCount(count))
    },
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Notification)



