
import React, {useState, useEffect} from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView,ProgressBarAndroid, StyleSheet,Text,View,TouchableOpacity, FlatList, Button,StatusBar } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import * as FileSystem from 'expo-file-system'

import * as WebBrowser from 'expo-web-browser'

export default function ListMessages(props) {
  
  // const callback = downloadProgress => {
  //   const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
  //  console.log(progress)
  // };
  
  // const downloadResumable = FileSystem.createDownloadResumable(
  //   'http://techslides.com/demos/sample-videos/small.mp4',
  //    FileSystem.documentDirectory+'small.mp4',
  //   {},
  //   callback
  // );
  // async  function download (){
  //   const { uri } = await downloadResumable.downloadAsync();
  //   console.log('Finished downloading to ', uri);
  // }
  //  download()

  
    // const { uri } = await downloadResumable.downloadAsync();
    // console.log('Finished downloading to ', uri);
 
 const {speaker, messages}= props.navigation.state.params.messagebody
 const [data , setData] = useState([])
 const [finishLoading, setFinishLoading] = useState(false)
 useEffect(()=>{
   if(messages){
  setFinishLoading(true)
   setData(messages)
   }

 })
  const renderFunction=({item})=>{
    const {id , dateAdded, messageUri, speaker, name } = item
    let play = false
  const url=  `https://generalsapi.netlify.com/.netlify/functions/index/messageapi/download/${id}/${play}`
  return (
    <View style={{paddingHorizontal:30, flex:1,marginLeft:-30, flexDirection:'row'}}>
      
      <View style={{paddingVertical:34, paddingRight:10}}>
              <View style={{width:40,borderRadius:30, height:40,marginTop:-30,marginLeft:10, backgroundColor:`rgb(${Math.floor(Math.random() + Math.random() * 100)+100},${Math.floor(Math.random() + Math.random() * 110)+100},${Math.floor(Math.random() + Math.random() * 180)+100})` ,alignItems:'center', justifyContent:'center'}}>
              <Text style={{color:'white', fontWeight:'bold', textTransform:'capitalize'}}>{item.name.charAt(0)}</Text>
              </View>
              <View style={{paddingHorizontal:12}}>
              <Text style={{ fontSize:17,color:'rgba(0,0,0,0.9)',marginTop:4, fontFamily:'Raleway-SemiBold' }}> {item.name} by {speaker} </Text>
              <Text style={{ fontSize:12,marginTop:7,marginLeft:8, color:'rgba(0,0,0,0.7)', fontFamily:'Raleway-Regular' }}>Category: {item.category}  - Added on: {item.dateAdded}</Text>
            </View>
             
              
      </View>
     
        <TouchableOpacity style={{backgroundColor:'rgba(17, 85, 204, 0.8)',width:49,padding:0, position:'absolute', right:0}} onPress={()=>WebBrowser.openBrowserAsync(url)}>
        <View style={{marginTop:10, alignItems:'center'}}>
        <Ionicons name="md-download" size={22} color="white"  style={{}}/>
       
       <Text style={{ fontSize:9, color:'white', fontFamily:'Raleway-Regular'}}>Download</Text>
       </View>
        </TouchableOpacity>



        <TouchableOpacity style={{backgroundColor:'rgba(0,0,0,0.1)',width:49,padding:0, position:'absolute', right:0, top:50}} onPress={ ()=>{
           let play = true
           const url=  `https://generalsapi.netlify.com/.netlify/functions/index/messageapi/download/${id}/${play}`
         WebBrowser.openBrowserAsync(url)
        }
          
          }>
        <View style={{marginTop:10, alignItems:'center'}}>
        
       <Ionicons name="md-play" size={22} color="rgba(17, 85, 204, 0.9)"  style={{marginTop:0}}/>
       <Text style={{ fontSize:9, fontFamily:'Raleway-Regular'}}>Play</Text>
       </View>
        </TouchableOpacity>
      
       
    </View>
  )
  }
  return (
    <ScrollView style={styles.container}>
      {/**
       * Go ahead and delete ExpoLinksView and replace it with your content;
       * we just wanted to provide you with some helpful links.
       */}
        {!finishLoading ?<View style={{alignItems:'center', justifyContent:'center'}}>
          <View style={{marginVertical:90}}>
            <ProgressBarAndroid/>
          </View>
          <View style={{marginVertical:10}}>
          <Text style={{fontWeight:'bold', fontSize:14, color:'rgba(0,0,0,0.5)'}} >Loading messages</Text>
          </View>
          <View style={{marginVertical:10}}>
          <Text style={{fontWeight:'bold', fontSize:14, color:'rgba(0,0,0,0.5)'}} >Make sure internet connection is on</Text>
          </View>
        
          </View>:
          <View>
        <Text style={{fontFamily:'Raleway-Regular',fontSize:14,marginTop:1,marginBottom:7, textAlign:'center', color:'rgba(0,0,0,0.5)'}}>
          Total ({data.length})
      </Text>
       <FlatList 
       data={data.reverse()}
       renderItem={renderFunction}
       keyExtractor={(item, index)=> index.toString()}
       ItemSeparatorComponent={()=><View style={{backgroundColor:'rgba(0,0,0,0.05)', height:1}}></View>}

       
       />

     
     <View style={{marginVertical:50, paddingHorizontal:20}}>
     <Button onPress={()=>props.navigation.navigate('ShareStack')}  title="Share a message You Listened to"  />
     </View>
     </View>
}
    </ScrollView>
  );
}

ListMessages.navigationOptions = (props)=>{
    
 return {
     headerLeft: <View style={{flex:1, flexDirection:'row',
      alignItems:'center', 
      paddingLeft:12,
      justifyContent:'center'}}>
        <TouchableOpacity onPress={()=>props.navigation.navigate('Home')}>
        <Ionicons name="md-arrow-back" style={{fontWeight:'bold'}} size={33} color="white"/>
        </TouchableOpacity>
      
     <Text style={{fontSize:20,color:'rgba(0,0,0,0.6)',fontFamily:'Raleway-Black', color:'white', marginLeft:20}}>{props.navigation.state.params.messagebody.speaker}</Text>
     </View>,
     headerStyle:{
       backgroundColor:'royalblue'
     }
     
    
 }
 
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    paddingVertical:140,
    
  },
});
