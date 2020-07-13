import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  View,
} from 'react-native';

import { MonoText } from '../components/StyledText';
import { SafeAreaView } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
export default function Ministry(props) {
 const ministry= props.ministry;
 const speaker= props.speaker;
 
  return (
    <TouchableOpacity activeOpacity={0.8} style={{zIndex:0, elevation:10}} onPress={()=>props.navigation.navigate('ListMessages', {messagebody : {ministry, speaker, messages:props.messages}})}>
       <View style={styles.card}>
        {/* <View style={[styles.cardhead, { backgroundColor:`rgb(${Math.floor(Math.random() + Math.random() * 100)+100},${Math.floor(Math.random() + Math.random() * 10)+100},${Math.floor(Math.random() + Math.random() * 180)+10})`}]}> */}
        <View style={styles.cardhead}>
          
        <Text style={styles.ministry}>{props.speaker}</Text>
        {/* <View   style={{position:'absolute',paddingHorizontal:3, right:5, bottom:6, backgroundColor:'white'}}>
        <Ionicons name="md-arrow-forward" color={`rgb(${Math.floor(Math.random() + Math.random() * 100)+100},${Math.floor(Math.random() + Math.random() * 10)+100},${Math.floor(Math.random() + Math.random() * 180)+10})`} size={14}/>
        </View> */}
         
        </View>
        <View style={styles.Body}>
        <Text style={styles.speaker}>{props.speaker}</Text>
        </View>
       </View>
       </TouchableOpacity>
    



      
    
       
        
     
    
   
  );
}





const styles = StyleSheet.create({
 
  card:{
    marginTop:30,
    height:120,
    width:160,
    padding:1,
    
   
   
  },
  cardhead:{
   height:90,
   alignItems:'center',
   justifyContent:'center',
   paddingLeft:5,
  borderTopLeftRadius:6,
  borderTopRightRadius:6,
 backgroundColor:'rgba(50,80,200,0.89)'
 
  },
  ministry:{
   color:'white',
   fontSize:14,
   fontFamily:'Raleway-Black'
  },
  Body:{
    paddingLeft:10,
    height:40,
    paddingVertical:5,
    elevation:5,
    borderWidth:1,
    backgroundColor:'white',
    borderColor:'rgba(0,0,0,0.02)'
    
  },
  speaker:{
    color:'rgba(0,0,0,0.7)',
    fontSize:12,
    // fontWeight:'600',
    fontFamily:'Raleway-Medium'
  
  }
  
  
});
