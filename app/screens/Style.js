import React, {StyleSheet} from 'react-native'
import Center from './components/Center';

export default StyleSheet.create({
/*Open*/
	/*Commen Css Open*/
	
	bdr_top:{ borderTopWidth: 1, borderTopColor:'#DDD'}, 
	bdr_bottom:{ borderBottomWidth: 1, borderBottomColor:'#DDD'},  
	bdr_all:{ borderWidth: 1, borderColor:'#DDD'},
	no_border:{ borderWidth: 0},

	w_80:{ width:80},
	w_100:{ width:100}, 
	w_180: { width: 180,}, 

	input_text: {padding: 12, borderWidth:1, borderColor: '#ddd', backgroundColor: '#fff', margin:10},

	theme_lihgt_blue:{backgroundColor:'#34C8FD'},
	theme_lihgt_blue_txt:{color:'#34C8FD'},

	theme_blue:{backgroundColor:'#0793DB'},
	theme_blue_txt:{color:'#0793DB'},

	theme_orange:{backgroundColor:'#ED7D31'},
	theme_orange_txt:{color:'#ED7D31'},

	theme_white:{backgroundColor:'#fff'},
	theme_white_txt:{color:'#fff'},

	theme_black:{backgroundColor:'#333'},
	theme_black_txt:{color:'#333'},

	theme_black3:{backgroundColor:'#000'},
	theme_black3_txt:{color:'#000'},

	theme_black6:{backgroundColor:'#666'},
	theme_black6_txt:{color:'#666'},

	theme_black9:{backgroundColor:'#999'},
	theme_black9_txt:{color:'#999'},

	theme_blackc:{backgroundColor:'#ccc'},
	theme_blackc_txt:{color:'#ccc'},

	theme_blackd:{backgroundColor:'#ddd'},
	theme_blackd_txt:{color:'#ddd'},

	p_0:{padding:0},
	p_5:{padding:5},
	p_10:{padding:10},
	p_15:{padding:15},
	p_20:{padding:20},

	ptb_5:{paddingTop:5, paddingBottom:5},
	ptb_15:{paddingTop:15, paddingBottom:15},

	pb_10:{paddingBottom:10},
	pb_20:{paddingBottom:20},
	pt_05:{paddingTop:5},
	pt_10:{paddingTop:10},
	pt_20:{paddingTop:20},

	plr_0:{paddingLeft:0, paddingRight:0},
	plr_5:{paddingLeft:5, paddingRight:5},
	plr_10:{paddingLeft:10, paddingRight:10},
	plr_15:{paddingLeft:15, paddingRight:15},
	plr_20:{paddingLeft:20, paddingRight:20},

	m_0:{margin:0},
	m_10:{margin:10},
	m_15:{margin:15},
	m_20:{margin:20},

	mtb_5:{marginTop:5, marginBottom:5},
	mtb_10:{marginTop:10, marginBottom:10},

	mt_0:{ marginTop:0}, 
	mt_10:{ marginTop:10},
	mt_15:{ marginTop:15},
	mt_20:{ marginTop:20},
	mt_30:{ marginTop:30},
	mt_40:{ marginTop:40},
	mt_60:{ marginTop:60},

	mb_0:{marginBottom:0}, 
	mb_05:{marginBottom:5}, 
	mb_10:{marginBottom:10},
	mb_15:{marginBottom:15},
	mb_20:{marginBottom:20},
	mb_30:{marginBottom:30},

	text_center:{textAlign:'center'}, 
	text_left:{ textAlign:'left'},
	text_right:{textAlign:'right'},
	text_justify:{textAlign:'justify'},

	font_9:{fontSize: 9},
	font_10:{fontSize: 10},
	font_11:{fontSize: 11},
	font_12:{fontSize: 12},
	font_14:{fontSize: 14},
	font_20:{fontSize: 20},
	font_22:{fontSize: 22},
	font_24:{fontSize: 24},

	font_small:{fontSize:13},
	font_medium:{fontSize:16},
	font_large:{fontSize:18},

	text_upper:{textTransform: 'uppercase'},
	text_capitalize:{textTransform: 'capitalize'},
	text_lowercase:{textTransform: 'lowercase'},	

	OpenSans_Light:{ fontFamily:'OpenSans-Light'},
	OpenSans_Regular:{ fontFamily:'OpenSans-Regular'},
	OpenSans_SemiBold:{ fontFamily:'OpenSans-SemiBold'},
	OpenSans_Bold:{ fontFamily:'OpenSans-Bold'},
	OpenSans_ExtraBold:{ fontFamily:'OpenSans-ExtraBold'},

	heading_1:{fontSize: 20, fontWeight:'500',justifyContent: 'center'},    

	circle:{borderRadius:100},

	bottom_fix:{ position: 'absolute', left:0, right:0, bottom:0},

	arrange_horizontal_snap:{flex: 1, flexDirection: 'row', justifyContent: 'flex-start'},
	arrange_horizontal:{flex: 1, flexDirection: 'row', justifyContent: 'space-between'},
	arrange_horizontal_justify:{flex: 1, flexDirection: 'row', justifyContent: 'space-between'},
	arrange_vertical:{flex: 1, flexDirection: 'column', justifyContent: 'space-between'},
	arrange_vertical_middle:{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'},

	input:{ paddingLeft:0, paddingTop: 2, paddingBottom:5, borderWidth:0, borderColor:'#DDD', backgroundColor: '#fff', marginTop:2 , fontWeight:'600' , fontSize:15},
	input_gray:{ padding: 10, borderWidth:0, backgroundColor: '#F1F1F1', marginTop:2 , fontWeight:'600' , fontSize:15 ,borderRadius:5},

	btn:{padding: 12, textAlign:'center', fontFamily:'OpenSans-Bold', color:"#fff", fontWeight:'600', fontSize:18, borderRadius:5},
	btn_large:{ padding:20, fontFamily:'OpenSans-Bold', fontSize:20},

	p_relative:{ position:'relative' },
	p_absolute:{ position:'absolute'},

	link:{textTransform: 'uppercase',color:'#34C8FD', fontWeight:"300"},

	shodow:{ shadowColor: "#34C8FD",shadowOffset: { width: 0, height: 0,}, shadowOpacity: 0.50,shadowRadius: 15,elevation: 10},
	glow1:{ shadowColor: '#30C1DD', shadowRadius: 10, elevation:15, shadowOpacity: 0.01, shadowOffset: {width: 0,height: 0}},

	glow:{shadowColor: "#000", shadowOffset: {width: 0, height: 5, }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 5	,},

	default_font:{ fontFamily:'OpenSans-Regular'},

	container: {flex: 1, backgroundColor: '#EFF5F5' }, 
	emptyTerm: { marginLeft: 5, marginRight: 5, paddingLeft:10, width:10},

	custom_btn:{backgroundColor:'#34C8FD', color:'#fff', textAlign:'center', paddingTop:10,paddingBottom:10,paddingLeft:20,paddingRight:20, borderRadius:5, fontFamily:'OpenSans-SemiBold', fontSize:20} ,
	boxed:{backgroundColor:'#EFF5F5', borderRadius:4 , padding:10},
	heading_sml:{color:'#666' ,  letterSpacing:1 , fontSize:12},
	
	/*Commen Css Close*/

	/* Login screen start */
	login_area:{backgroundColor:'#fff',paddingLeft  : 20 , paddingRight:20,paddingTop:25, paddingBottom:25, borderRadius:10},
	newtext:{fontSize: 28, color:'#fff', fontWeight:'300'},
	show_password:{ fontSize:13 , position:'absolute' , right:0 , bottom:13 ,  zIndex:1 , color:'#0793DB' } ,
	/* Login screen end */

	/* header start */
	header_color:{  backgroundColor:'#0793DB' },

	header_title: { flex: 2, textAlign: 'left' , color:"#FFF" , fontWeight:"600" , fontSize:20 , fontFamily:'OpenSans_Bold'  },

	header_icon: {  width:30 , textAlign:'center'  } ,
	/* header end */


	/* Home start */
	list_item: { borderColor:"#E4EDED", borderWidth:1 , backgroundColor:"#fff", borderRadius:4, marginTop:5, marginBottom:5, marginLeft:10 , marginRight:10 , padding:10},
	item_title: { fontSize: 16, textAlign: 'left', marginBottom:5, fontFamily:'OpenSans-SemiBold', color:'#333'},
	list_next:{borderRadius:100, backgroundColor:'#34C8FD', width:40, height:40, textAlign:'center', position:'absolute', right:0, top:5, lineHeight:40},
	list_date:{ fontSize:10 , color:"#777", textAlign:'center', position:'absolute', right:0 , top:0 },
	
	/* Home End */

	new_assignment:{ backgroundColor:'#f00'},
	checkbox_formate:{ marginLeft: 0, marginRight: 7, padding: 0, borderWidth: 0, backgroundColor: 'white'},

	checkbox_unchecked_container:{ marginLeft: 0, alignItems:'center', borderRadius:0, flex:4, marginRight: 0, padding: 0, borderWidth: 0, backgroundColor: 'white'},
	checkbox_checked_container:{ marginLeft: 0, flex:4, alignItems:'center', borderRadius:0,   marginRight: 0, padding: 0, borderWidth: 0, backgroundColor: '#AAA'},
	checkbox_unchecked_text:{ color: '#000', fontSize:12 },
	checkbox_checked_text:{ color: '#FFF', fontSize:12 },
	border_radius_left: {borderTopLeftRadius:40, borderBottomLeftRadius:40},
	border_radius_right: {borderTopRightRadius:40, borderBottomRightRadius:40},


	/*bid area*/
	bid_area:{backgroundColor:'#fff',borderColor:"#E4EDED" , borderWidth:1 , borderRadius:5,      minHeight:100, marginTop:15, marginBottom:5},
	bid_hour:{flex:5, textAlign:'center', backgroundColor:"#E4EDED", borderTopLeftRadius:5, borderBottomLeftRadius:5, flexDirection:'row', alignItems:'center', justifyContent:'center' },
	bid_details:{ flex:8, padding:15},
	bid_status:{ flex:4, justifyContent:'center', paddingRight:10},
	Awaiting_Acceptance:{ textAlign:'center', fontSize:11,  color:'#FFBF00'},
	bid_hour_cnt:{ fontSize: 32, color:'#000', marginTop:-10, textAlign:'center'},

	award_btn:{backgroundColor:'#34C8FD', color:'#fff', textAlign:'center', paddingTop:7,paddingBottom:7,paddingLeft:14,paddingRight:14, borderRadius:40, fontFamily:'OpenSans-SemiBold', fontSize:12 } ,

	sortlist:{ position:'absolute', left:5, top:5},
	upload_file:{position:'absolute', right:5, bottom:10, zIndex:1},

	list_action:{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', textAlign:'center'},
	Chat_notification:{ position:'relative', width:45, height:45, textAlign:'center', backgroundColor:'#34C8FD', color:'#fff', right:0},
	Chat_number:{ position:'absolute', right:-3, top:-3, backgroundColor:'#F2804B', color:'#fff', minWidth:20, height:20, lineHeight:20, textAlign:'center', fontSize:10},

	closemodel:{position:'absolute', right:5, top:15, zIndex:2},

	promotion_code:{ backgroundColor:'#FBD9CA', color:'#F27F4B', fontFamily:'OpenSans-SemiBold', fontSize:16, borderRadius:5, paddingLeft:10, paddingRight:10, textAlign:'center', borderStyle:'dashed' ,borderWidth: 1, borderColor:'#F27F4B', height:42},

	page_heading:{fontFamily:'OpenSans-SemiBold', color:'#333', marginBottom:30, fontSize:24, paddingTop:10, paddingBottom:10, borderBottomWidth: 1, borderBottomColor:'#DDD'},

	profile_img:{ marginRight:5, marginBottom:10, alignSelf:'center',  borderRadius:100, justifyContent: 'center',  overflow:'hidden', width:100, height:100, borderWidth: 1, borderColor:'#DDD'},
	profile_edit:{ position:'absolute', right:0, top:0, backgroundColor:'#333'},
	detail_edit:{ position:'absolute', right:5, top:10, zIndex:2},

	textWrapper: {flexWrap: 'wrap', alignItems: 'flex-start', flexDirection: 'row', }, 
	textBlock: {flexWrap: 'wrap', alignItems: 'flex-start', flexDirection: 'row', position: 'absolute', left: 10 }, 
	boldText: {fontWeight: 'bold', }, 
	bullate:{ position:'absolute', left:0, top:1},
	normalText: { paddingLeft:10}, 
	triangle: {width: 0, height: 0, borderStyle: 'solid', borderTopWidth: 0, borderRightWidth: 10, borderBottomWidth: 16, borderLeftWidth: 10, borderTopColor: 'transparent', borderRightColor: 'transparent', borderBottomColor: '#fff', borderLeftColor: 'transparent', top:-30, left:30 },

	custom_btn1:{backgroundColor:'#34C8FD', color:'#fff', textAlign:'center', paddingTop:10,paddingBottom:10,paddingLeft:10,paddingRight:10, borderRadius:5, fontFamily:'OpenSans-SemiBold', fontSize:16},
	white_btn:{backgroundColor:'#FFF', color:'#000', textAlign:'center', paddingTop:7,paddingBottom:7,paddingLeft:5,paddingRight:5, borderRadius:40, fontFamily:'OpenSans-Bold', fontSize:16  } ,
	notification_circle:{ position:'absolute', left:18, bottom:15, 
	color:'#FFF', textAlign:'center', lineHeight:18 , height:18, minWidth:18 , backgroundColor:'#ED7D31' , borderRadius:100 , fontSize:10 ,
	},

	chat_circle:{ position:'absolute', left:6, bottom:6, 
	color:'#FFF', textAlign:'center', lineHeight:18 , height:18, minWidth:18 , backgroundColor:'#ED7D31' , borderRadius:100 , fontSize:10 ,
	},
	
	error_msg:{ backgroundColor:'#F25F59', padding:10, position:'absolute', top:0, left:0, right:0, zIndex:1111} ,
	error_text:{ color:'#F25F59' , fontSize:12 , position:'absolute' , left:0,  bottom:-18   },

	error_promocode:{ color:'#F25F59' , fontSize:12 , position:'absolute' , left:10,  bottom:-16   },
	success_promocode:{ color:'#04a764' , fontSize:12 , position:'absolute' , left:10,  bottom:-16   },

	addAssignment:{ backgroundColor: "#FFF" , borderRadius:40 , borderWidth:2 , borderColor:"#34C8FD" , position:'absolute', right:10, bottom:10, zIndex:1 , padding:2 },
	filter_by:{ backgroundColor: "#0793DB" ,  borderRadius:40 , position:'absolute', right:10, bottom:10, zIndex:1 , padding:5 , textAlign:'center' , height:40 , width:40 , lineHeight:30  },
	rating_text:{ marginTop:3 , textAlign:'center' , borderRadius:4 , lineHeight:18 , height:18 ,  width:18 , backgroundColor:"#ED7D31" , color:"#FFF" },
	badge_txt:{  textAlign:'center' , borderRadius:4 , backgroundColor:"#FFF" , color:"#666" , borderColor:"#666" , borderWidth:1 , padding:2 },
	tl_name:{},

	flashMessage:{  backgroundColor: "#FFF" , borderRadius:40 , borderWidth:2 , borderColor:"#34C8FD" , position:'absolute', right:10, bottom:10, zIndex:1 , padding:2 },


	landing_heading:{ fontSize:30 , color:"#FFF", fontWeight:'700' , marginBottom:10 },
	landing_text:{ fontSize:20 , color:"#FFF" , textAlign:'center' , paddingLeft:20 , paddingRight:20 }
	/*End code*/ 
});


			