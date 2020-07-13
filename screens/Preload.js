import * as WebBrowser from 'expo-web-browser';
import React , {useState, useEffect} from 'react';
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
  Dimensions,
  TouchableOpacity,
  View,
} from 'react-native';

import { MonoText } from '../components/StyledText';
import { SafeAreaView } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
// import Ministry from './Ministry';
import HomeScreen from './HomeScreen';

 const selector = false



 function Loading(){
  return (
      <View style={styles.container}>
      
        <Ionicons name="md-star-outline" style={styles.logo} size={270} color="white"/>
        <Text style={styles.text}>Generals</Text>
        <Text style={styles.sub}>Build yourself with Spiritual messages</Text>
        <View style={styles.progress}>
        <ProgressBarAndroid  styleAttr="Horizontal" size='large' color="white" />
        </View>

         
      </View>
    );
}
export default function Preload(props) {
  const [finishLoading, setFinishLoading] = useState(false)

      return <Loading/>
      
  
}



  




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'royalblue',
    alignItems:'center',
    justifyContent:'center'
  },
  progress:{
    marginTop:30
  },
  logo:{
   marginTop:-80
  },
  text:{
    fontSize:40, 
    fontWeight:"bold",
     color:"white", 
     textAlign:"center", 
     marginTop:40
  },
  sub:{
    fontSize:16, 
    fontWeight:"bold",
     color:"white", 
     textAlign:"center", 
     marginTop:40
  }
  
  
  
});
