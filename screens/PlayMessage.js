import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  ImageBackground,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
  View,
} from 'react-native';

import { MonoText } from '../components/StyledText';
import { SafeAreaView } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import {Audio} from 'expo-av'
export default function PlayComponent(props) {
  async function play(set){
    const playbackObject = await Audio.Sound.createAsync(
        require(
            '../assets/pretence.mp3'
        ),
        { shouldPlay: true }
      );
      
   return playbackObject
  }
  play('play').then((playbackObject)=>{
      
      console.log(playbackObject.pauseAsync())
  })
  .catch(err=>{
      console.log(err)
  })
  
      
  return (
    
       <ImageBackground source={require('../assets/images/beauty.png')} style={styles.container}>
       
          
       <View>
           <Ionicons name="md-disc" size={280} color="white"/>
             
          
       </View>

       <View style={{paddingHorizontal:30}}>
          
             
           <Text style={{fontSize:20,textAlign:'center',fontStyle:'italic', fontWeight:'bold',color:'white', marginTop:40}}>Playing {props.navigation.state.params.item.title} by {props.navigation.state.params.speaker}</Text>
       </View>

       <TouchableOpacity onPress={()=>play('pause')} >
           <Ionicons name="md-pause" size={80} color="white"/>
             
          
       </TouchableOpacity>
       </ImageBackground>

   
  );
}

PlayComponent.navigationOptions=(props)=>{
    return {
        title:`${props.navigation.state.params.item.title}`
    }
}




const styles = StyleSheet.create({
 container:{
     flex:1,
     alignItems:'center'
 }
  
});
