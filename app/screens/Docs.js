import React from 'react'; 
import { Image, Text, View, FlatList , ActivityIndicator, Dimensions , Platform , Alert , TouchableOpacity  } from "react-native";
import { Actions } from 'react-native-router-flux'; 
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './Style.js';
import Spinner from 'react-native-loading-spinner-overlay';
import GLOBALS from '../config/Globals';
import { connect } from 'react-redux';
import {  upadteUploaded , upadteDataAfter } from './actions/uploadedActions';

const { width , height } = Dimensions.get('window');
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});
type Props = {};

class Docs extends React.Component {

  constructor(props) {
    super(props);
    this.fetchMore = this._fetchMore.bind(this);
    this.state = {
      isLoading: true,
      isLoadingMore: false,
      spinner: false ,
      _dataAfter: 0,
      _noMoreRecord: false,
    };
  }

   _fetchMore() {
     
      this.setState({
        spinner: true
      });
      
      let dataAfter = this.props.dataAfter + 1 ; 
     
      fetch(`${GLOBALS.BASE_URL}rest_api/get_upload_documents/${dataAfter}`, {
        method: "GET",
        headers: {'Authorization': 'Bearer ' + GLOBALS.TOKEN_KEY }
      })
      .then(response => response.json())
      .then(response => {
        if(response.resultsUploaded.length > 0  )
        {
          const data = this.props._data.concat(response.resultsUploaded);
          this.props.upadteUploaded(data);
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
        this.props.upadteDataAfter(  dataAfter ) ;
        this.setState({
          isLoading: false
        });
      })
      .catch(error => {
        console.error(error);
      }); 
  }
  
  async componentWillMount() {
    this.setState({ isLoading: true });
    try 
    {
       this.fetchMore();
    } 
    catch (error) 
    {
      Alert.alert("Error retrieving data" + error) ;
    }  
  }
  render() {
      return ( 
         <FlatList 
           data={this.props._data} //Remove this reference to dataSource
           renderItem={({item: rowData}) => { //Replaces renderRow={rowData => { 
            if(rowData.id > 0)
            {
              return (
                <TouchableOpacity  onPress={() => { Actions.assignment( { myMethod : ()=> this.myMethod() , assignmentId: rowData.id , title : rowData.title });}}>
                  <View style={[styles.p_0, styles.p_relative,{marginBottom:5}]}>
                    <View style={[styles.list_item, styles.p_relative,{zIndex:10}]}>
                      <View style={[styles.arrange_horizontal,{ margin:10}]}>
                        <View style={{ flex:9}}>
                          <Text style={styles.item_title}>
                          {rowData.id} => {rowData.title}
                          </Text>
                          <Text style={[styles.theme_black6_txt, styles.font_small]}>
                             <Text style={styles.OpenSans_Bold, styles.theme_black_txt}>{rowData.from_lang} </Text> To <Text style={styles.OpenSans_Bold, styles.theme_black_txt}> {rowData.to_lang} </Text>
                          </Text>
                        </View>
                        <View style={{ flex:2, textAlign:'right'}}>
                          <Text style={[styles.list_next, { }]}> <Icon name="angle-right" size={28} color="#fff" /> </Text>
                        </View>
                      </View>
                    </View>

                    <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, textAlign:'center', justifyContent: 'center', alignItems: 'center',zIndex:0}}>
                      <Image source={require('../images/glow.png')} style={{ height:110, width:(width+10), alignSelf:'center'}} /> 
                    </View> 
                  </View>
                </TouchableOpacity>
              );
            }
          }}
          onEndReached={() => {
           
              if( ! this.state._noMoreRecord  &&  ! this.state.isLoadingMore )
              {
                console.warn(this.state._dataAfter);
                this.setState({ isLoadingMore: true }, () => this.fetchMore())
              }
            }
          }
          onEndReachedThreshold={0.2}
          refreshing={true}
          keyExtractor={ ( item , index ) => index.toString()}
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
export default connect(mapStateToProps,mapDispatchToProps)(Docs);



