


import * as WebBrowser from 'expo-web-browser';
import React , {useState, useEffect} from 'react';
import * as Font from 'expo-font'
import {Audio} from 'expo-av'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  ProgressBarAndroid,
  Text,
  Button,
  Vibration,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';

import { MonoText } from '../components/StyledText';
import { SafeAreaView } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import Ministry from './Ministry';


export default function Menu(){
    const [showMenu, setShowMenu] = useState(false)
    return(
<View style={{
        flex:1,
        paddingLeft:13,
        flexDirection:'row',
        alignItems:'center'
      }}>
        {
            !showMenu ?
            <TouchableOpacity onPress={()=> setShowMenu(!showMenu)}   style={{paddingRight:0, width:50,justifyContent:'center', alignItems:'center'}}>
       <View>
       <View style={{width:5,marginTop:2, height:5, backgroundColor:'rgba(0,0,0,0.7)', borderRadius:20}}>
        </View>
        <View style={{width:5,marginTop:2, height:5, backgroundColor:'rgba(0,0,0,0.7)', borderRadius:20}}>
        </View>
        <View style={{width:5,marginTop:2, height:5, backgroundColor:'rgba(0,0,0,0.7)', borderRadius:20}}>
        </View>
       </View>
        </TouchableOpacity>
          : 
          <View  style={{width:180, height:120,zIndex:3,marginTop:-30, borderWidth:1, borderColor:'rgba(0,0,0,0.04)',elevation:10, backgroundColor:'white'}}>
            <TouchableOpacity style={{position:'absolute', right:4, top:4}} onPress={()=> setShowMenu(!showMenu)} >
             <Ionicons name="md-close" size={32} color="rgba(0,0,0,0.65)"/>

            </TouchableOpacity>
            <View style={{marginTop:35}}>
            <TouchableOpacity style={{paddingHorizontal:10,zIndex:3, marginVertical:5}} onPress={()=> Alert.alert('Thats it')}><Text
            style={{fontFamily:'Raleway-Medium', fontSize:15}}
            >Contact Us</Text></TouchableOpacity>
            <TouchableOpacity style={{paddingHorizontal:10,zIndex:3, marginVertical:5}} onPress={()=> Alert.alert('Thats it')}><Text
            style={{fontFamily:'Raleway-Medium', fontSize:15}}
            >Report a problem</Text></TouchableOpacity>


            <TouchableOpacity style={{paddingVertical:40,zIndex:3, marginVertical:5}} onPress={()=> Alert.alert('Thats it')}><Text
            style={{fontFamily:'Raleway-Medium', fontSize:15}}
            >About Generals</Text></TouchableOpacity>
            </View>
          
         </View>
        }
         
         
        
        </View>
    )
}

 
    