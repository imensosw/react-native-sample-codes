/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, {Component} from 'react';
import {  StatusBar ,Image , TouchableOpacity , View, Text, StyleSheet, Alert ,Platform  } from "react-native";
import { Router, Scene , Actions , ActionConst , Route, TabBar     } from 'react-native-router-flux';

import SplashScreen from 'react-native-splash-screen';

import Login from './screens/Login';
import Home from './screens/Home';
import Docs from './screens/Docs';
import NewAssignment from './screens/NewAssignment';
import Assignment from './screens/Assignment'; 
import Started from './screens/Started'; 
import Completed from './screens/Completed';
import Profile from './screens/Profile';
import ProfileEdit from './screens/ProfileEdit';
import ProfilePassword from './screens/ProfilePassword'; 

import Notification from './screens/Notification';
import Chat from './screens/Chat';
import Chats from './screens/Chats';
import StartedDetail from './screens/StartedDetail';
import CompletedDetail from './screens/CompletedDetail';
import Signup from './screens/Signup';
import Thanks from './screens/Thanks';
import GLOBALS from './config/Globals';
import Testredux from './screens/Testredux';
import Testreduxdemo from './screens/Testreduxdemo'; 
import Slide from './screens/Slide';
import Landing from './screens/Landing';
import RightButton from './RightButton'; 
import styles from './screens/Style'; 
import Icon from 'react-native-vector-icons/FontAwesome';

upload_icon = ()=> { 
  return( <Icon  name='folder-o' size={25} />   ) 
}
start_icon = ()=> { 
  return( <Icon  name='comment-o' size={25}  />   )
}
complite_icon = ()=> { 
  return( <Icon  name='bell-o' size={25} /> ) 
}

renderLeftButtonPop = ()=> { 
  return( 
    <View style={[styles.arrange_horizontal,{ } ]} >
        <TouchableOpacity style={{paddingLeft:10}} onPress={ () => {  Actions.pop() } } > 
          <Icon color="#FFF" name='arrow-left' size={20} />  
        </TouchableOpacity>
    </View>  
  );
}

renderLeftButton = ()=> { 
  return( 
    <View style={[styles.arrange_horizontal,{ } ]} >
        <TouchableOpacity style={{paddingLeft:10}} onPress={ () => { GLOBALS.BOX_ID = 0 ,  GLOBALS.DOC_ID = 0 ,  Actions.pop() } } > 
          <Icon color="#FFF" name='arrow-left' size={20} />  
        </TouchableOpacity>
    </View>  
  );
}

class App extends Component {
  constructor(props) {
    super(props); 
  }
  
  async componentDidMount() 
  {
    this.timeoutHandle = setTimeout(()=>{
      SplashScreen.hide();
    }, 2000);
  }

  render() 
  {
    return (
      <Router  navigationBarStyle={[,{ backgroundColor:"#34C8FD"}]}>
        <Scene key="root" barButtonIconStyle={{ tintColor: 'green' }} >
          
          <Scene initial key="landing" component={Landing} title="Landing" hideNavBar={true} />
          <Scene key="login" component={Login} title="Login" hideNavBar={true} />
          <Scene key="signup" component={Signup} title="Signup" hideNavBar={true} />
          <Scene key="profile" type={ ActionConst.RESET } refresh={true} component={Profile} title="Account" titleStyle={styles.header_title}  renderLeftButton={ false } renderRightButton={ false } back={false}  />  
          <Scene key="profile_edit"  component={ProfileEdit} title="Edit Profile" titleStyle={styles.header_title}  renderRightButton={ false } renderLeftButton={ renderLeftButtonPop }   />  
          <Scene key="profile_password"  component={ProfilePassword} title="Change Password" titleStyle={styles.header_title}   renderRightButton={ false } renderLeftButton={ renderLeftButtonPop } />  
          <Scene key="thanks" component={Thanks} title="Thanks" hideNavBar={true} />
          <Scene key="docs" component={Docs} title="Docs"   renderRightButton={ <RightButton /> } titleStyle={styles.header_title} renderLeftButton={ renderLeftButton } />
        
          <Scene key="home" type={ ActionConst.RESET } refresh={true}   component={Home} title="Assignment"  icon={upload_icon} renderRightButton={ false } titleStyle={styles.header_title } renderLeftButton={ false } back={false} />
          <Scene key="assignment" component={Assignment} title="Assignment" back={false} renderRightButton={ <RightButton /> } titleStyle={styles.header_title} renderLeftButton={ renderLeftButton }  /> 
          
          <Scene key="started" type={ ActionConst.RESET } component={Started} title="Assignment" icon={start_icon} renderRightButton={ false }  titleStyle={styles.header_title} renderLeftButton={ false } back={false} />
          <Scene key="started_detail" component={StartedDetail} title="Started Detail" back={false} renderRightButton={ <RightButton tet={ this.props  } /> } titleStyle={styles.header_title} renderLeftButton={ renderLeftButton }  /> 

          <Scene key="completed"  type={ ActionConst.RESET } component={Completed} back={true}   title="Assignment" icon={complite_icon} renderRightButton={ false } titleStyle={styles.header_title} renderLeftButton={ false } back={false} />

          <Scene key="new_assignment"component={NewAssignment} title="Uploaded"    titleStyle={styles.header_title} renderLeftButton={ renderLeftButton } style={{ color:"#FF0" }} hideNavBar={true} />

          <Scene key="notification" type={ ActionConst.RESET } refresh={true} component={Notification} title="Notification" back={true} renderRightButton={ false } titleStyle={styles.header_title} renderLeftButton={ false } back={false} />   
          
          <Scene key="chat" component={Chat} title="Chat" back={false}  titleStyle={styles.header_title} renderLeftButton={ renderLeftButton } />  
          <Scene key="chat_pop" component={Chat} title="Chat" back={false}  titleStyle={styles.header_title} renderLeftButton={ renderLeftButtonPop } />  
          <Scene key="chats" type={ ActionConst.RESET } refresh={true} component={Chats} title="Chats"   titleStyle={styles.header_title} renderLeftButton={ false } back={false} />  
          
          {/*        TEST Scene          */}
          <Scene   key="testredux" component={Testredux} title="Testredux" hideNavBar={true} />
          <Scene key="testreduxdemo" component={Testreduxdemo} title="Testreduxdemo" hideNavBar={true} />
          <Scene back={false} key="slide"component={Slide} title="Slide"    titleStyle={styles.header_title} renderLeftButton={ renderLeftButtonPop } />  
          <Scene key="completed_detail" component={CompletedDetail} title="Completed Detail" back={true} renderRightButton={ <RightButton tet={222} /> } titleStyle={styles.header_title} renderLeftButton={ renderLeftButton }  /> 
        </Scene>
      </Router>
    )
  }
}

export default App 


