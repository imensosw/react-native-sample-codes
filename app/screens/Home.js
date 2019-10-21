import React from 'react'; 
import {StatusBar , Image, Text, View, FlatList , ListEmptyComponent , ActivityIndicator, Dimensions , Platform , Alert , TouchableOpacity  } from "react-native";
import { Actions , ActionConst } from 'react-native-router-flux'; 
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './Style.js';
import Spinner from 'react-native-loading-spinner-overlay';
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";
import GLOBALS from '../config/Globals';
import HTML from 'react-native-render-html';
import { connect } from 'react-redux';
import { ButtonGroup } from "react-native-elements";
import AppFooter from './AppFooter';
import LinearGradient from 'react-native-linear-gradient';
import Flash  from './components/Flash';
import {  upadteUploaded , upadteDataAfter  } from './actions/uploadedActions';

const { width , height } = Dimensions.get('window');
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});
type Props = {};

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.fetchMore = this._fetchMore.bind(this);
    this.updateIndex = this.updateIndex.bind(this)
    this.state = {
      showFlash:false,
      flashMessage:'' ,
      isLoading: true,
      isLoadingMore: false,
      spinner: false ,
      _dataAfter: -1,
      _noMoreRecord: false,
      selectedIndex: 0
    };

  }
  updateIndex (selectedIndex1) {
    if(selectedIndex1 == 1)
    {
      Actions.started();
    }
    else if(selectedIndex1 == 2)
    {
      Actions.completed();
    }
    this.setState({
      selectedIndex: selectedIndex1
    });
    
  }

  showFlash(flashMessage)
  {
    this.setState({ flashMessage:flashMessage , showFlash:true }) ;
    setTimeout(() => {
      this.setState({ flashMessage:'' , showFlash:false }) ;
    }, 5000);
  }


   _fetchMore() {
      let dataAfter = this.props.dataAfter  ; 
      fetch(`${GLOBALS.BASE_URL}rest_api/get_upload_documents/${dataAfter}`, {
        method: "GET",
        headers: {'Authorization': 'Bearer ' + GLOBALS.TOKEN_KEY }
      })
      .then(response => response.json())
      .then(response => {
        if(response.resultsUploaded.length > 0  )
        {
          for (var i=0; i<response.resultsUploaded.length; i++) 
          {
            var result = this.props._data.find( fruit => fruit.id == response.resultsUploaded[i]['id'] );
            if(! result)
            {
              const data = this.props._data.concat(response.resultsUploaded[i]);
              this.props.upadteUploaded(data);
            }
          }
          this.setState({
            spinner: false,
            _dataAfter: dataAfter ,
            isLoadingMore: false,
          });
        }
        else
        {
          this.setState({
            spinner: false,
            _dataAfter: dataAfter ,
            _noMoreRecord: true,
            isLoadingMore: false,
          });
        }
        this.props.upadteDataAfter(  (dataAfter + 1) ) ;
        this.setState({
          isLoading: false
        });
      })
      .catch(error => {
        console.error(error);
      }); 
  }

  async componentDidMount() {

    if( this.props.showFlash ) 
    {
      this.showFlash(this.props.flashMessage);
    }

    this.props.upadteDataAfter(0); 
    try 
    {
       this.fetchMore();
    } 
    catch (error) 
    {
      Alert.alert("Error retrieving data" + error) ;
    }  

    
  }

  refreshList() 
  {
    var afterId = 0 ;
    if(this.props._data[0])
    {
      afterId = this.props._data[0]['id'] ;
    }
    var ids = '0';
    for (var i=0; i<this.props._data.length; i++) 
    {
      ids = ids+','+this.props._data[i]['id'];
    }
    fetch(`${GLOBALS.BASE_URL}rest_api/get_document_after_id/${afterId}}/${ids}}`, {
      method: "GET",
      headers: {'Authorization': 'Bearer ' + GLOBALS.TOKEN_KEY }
    })
    .then(response => response.json())
    .then(response => {

      if(response.documentBidCount.length > 0  )
      {
        for (var i=0; i<this.props._data.length; i++) {
          var result = response.documentBidCount.find( fruit => fruit.id == this.props._data[i]['id'] );
          if(result)
          {
            this.props._data[i]['bidsCount'] = result['bidsCount']  ;
          }
        }
        const  listData = this.props._data ;
        this.props.upadteUploaded([]);
        this.props.upadteUploaded(listData);
      }
      if(response.resultsUploaded.length > 0  )
      {
        response.resultsUploaded.map((docData) => {
          var result = this.props._data.find( fruit => fruit.id == docData.id );
          if(!result)
          {
            const data = [docData].concat(this.props._data);
            this.props.upadteUploaded(data);
          }
        });
      }
      if(response.documentToHide.length > 0  )
      {
        var listData = this.props._data ;
        for (var i=0; i<this.props._data.length; i++) 
        {
          var result = response.documentToHide.find( fruit => fruit.id == this.props._data[i]['id'] );
          if(result)
          {
            listData.splice(i, 1);
          }
        }
        this.props.upadteUploaded(listData); 
      }
    })
    .catch(error => { 
      console.warn(error);
    }); 
  }
  render() {
    const buttons = ['Uploaded', 'Started', 'Completed'] ;
    const { selectedIndex } = this.state ;
    const htmlContent = `
    <h1>This HTML snippet is now rendered with native components !</h1>
    <h2>Enjoy a webview-free and blazing fast application</h2>
    <img src="https://i.imgur.com/dHLmxfO.jpg?2" />
    <em style="textAlign: center;">Look at how happy this native cat is</em>
    `;
      return (  
        <View style={[styles.default_font, styles.container]}>
        <StatusBar backgroundColor="#54CFFE"/>
        <View >
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}  colors={['#34C8FD',  '#34C8FD']} > 
        <ButtonGroup
          onPress={ this.updateIndex } 
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{ marginBottom:0 ,  marginLeft:-20, marginRight:-20, backgroundColor:'transparent', marginTop:-1, borderWidth:0 }}
          buttonStyle={{ borderWidth:0  }}
          innerBorderStyle={{ borderWidth:0 , color:"#34C8FD" }}
          selectedTextStyle={{  color:"#FFF" , fontWeight:'500' , opacity:1  }}
          textStyle={{  color:"#FFF" , fontWeight:'500' , opacity:0.8 }}
          selectedButtonStyle={{  backgroundColor:'#34C8FD', borderBottomColor:'#ED7D31' , borderBottomWidth:4 }}
        />
        </LinearGradient>
          <TouchableOpacity style={ styles.addAssignment }  onPress={() => {  this.showFlash() }}>
            <Image source={require('../images/plus_blue.png')} style={[{width:40, height:40}]} />
          </TouchableOpacity> 
          {
            1 == 2 ?
            <View style={ styles.addAssignment } >
              <Text > Payment Success </Text>
            </View>
            : <View /> 
          }

         <Flash  flashMessage={ this.state.flashMessage } showFlash={ this.state.showFlash  } />
         <View  style={{ paddingBottom:1, marginTop:1 ,  height:(height-175) }} >
         
         <FlatList 
           data={this.props._data} //Remove this reference to dataSource
           renderItem={({item: rowData}) => { //Replaces renderRow={rowData => { 
            if(rowData.id > 0)
            {
              return (
                <TouchableOpacity onPress={() => {  GLOBALS.DOC_ID = rowData.id , GLOBALS.BOX_ID = rowData.boxFileId ,  Actions.assignment( { myMethod : ()=> this.myMethod() , assignmentId: rowData.id , title : rowData.title , bidsCount:rowData.bidsCount , boxFileId: rowData.boxFileId });}}>
                  <View style={[styles.p_0, styles.p_relative,{marginBottom:5}]}>
                    <View style={[styles.list_item, styles.p_relative,{zIndex:10}]}>
                      <View style={[  styles.arrange_horizontal,{ margin:10 , marginBottom:5}]}>
                        <View style={{ flex:8}}>
                          <Text style={styles.item_title}>
                          {rowData.title}
                          </Text>
                          <Text style={[ styles.mb_05 , styles.OpenSans_SemiBold , styles.theme_blue_txt, styles.font_small]}>
                             {rowData.from_lang} - {rowData.to_lang}
                          </Text>
                          <Text style={[ styles.OpenSans_SemiBold , styles.theme_blue_txt, styles.font_small]}>
                            <Text style={[styles.list_date, { }]}> {rowData.created_at_dmy}  </Text>
                          </Text>
                        </View>
                        <View style={{ alignItems: 'center' , justifyContent: 'center', flex:2, textAlign:'right', }}>
                          <Text style={{ fontWeight:'bold', fontSize:30 , textAlign:'center' }}> {rowData.bidsCount} </Text>
                          <Text style={{ fontSize:11 , textAlign:'center' }}> bids </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }
            else
            {
              console.warn("Norecord") 
            }
          }}
          onEndReached={() => {
              if( ! this.state._noMoreRecord  &&  ! this.state.isLoadingMore )
              {
                this.setState({ isLoadingMore: true }, () => this.fetchMore())
              }
            }
          }
          onEndReachedThreshold={0.2}
          ListEmptyComponent={() => { 
            return (
                ! this.state.isLoading &&
                <View style={{ height: (height-180) , flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign:'center'}} >
                  <Image source={require('../images/no-record.png')} style={[{width:250, height:250}]} />
                  <Text > No Assignment Found! </Text>
                </View>
             
            );
          }}
          
          refreshing={this.state.isLoading}
          onRefresh={() => { this.refreshList() }}
          extraData={this.props}
          keyExtractor={ ( item , index ) => index.toString() }
          //keyExtractor={(item, index) => index}
          ListFooterComponent={() => { // replaces renderFooter={() => {
            return (
              this.state.isLoadingMore &&
              <View style={{ flex: 1, padding: 10 }}>
                <ActivityIndicator size="small" />
              </View>
            );
          }}
        />
        </View>
        
          </View>
          <FlashMessage floating={true} duration={5000} position={{ bottom : 70, left: 110, right: 110 }} />
          <AppFooter currentIndex={0} />
          
        </View>
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
export default connect(mapStateToProps,mapDispatchToProps)(Home);



