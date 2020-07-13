import React, {useState, useEffect} from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Text,View, FlatList,ProgressBarAndroid, TouchableOpacity, Button } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { MonoText } from '../components/StyledText';
export default function LinksScreen() {
    const [finishLoading, setFinishLoading] = useState(false)
    const [errorInConnection, setError] = useState(false)
    const [keys, setKeys] = useState([])
    const [data, setData] = useState([])
    useEffect( () => {
    fetchMessages().then(result=>{
      if(result){
        
       
        setData(result.messages)
  
        setFinishLoading(true)
      }
      
    })
    }, [finishLoading])
  
    async function fetchMessages() {
      const messages= await fetch('https://generalsapi.netlify.com/.netlify/functions/index/messageapi/listmessages').then(res=> res.json()).then(messag=>messag).catch(err => {if(err) setError(true)})
      return messages
    
   
    }
    function renderItem({item}){
      const {id} = item
      // let play = false
      // const downloadUrl=  `http://192.168.43.164:3000/messageapi/download/${id}/${play}`
      // let play = true
      // const playUrl=  `http://192.168.43.164:3000/messageapi/download/${id}/${play}`
        return (
            <View style={{flex1:1, flexDirection:'row', alignItems:'center'}}>
                <View style={{marginVertical:16, width:233, paddingRight:10}}>
                    <Text style={{fontSize:16,
                       fontFamily:'Raleway-SemiBold'}}>{item.name}
                       <Text style={{fontSize:16,
                       fontFamily:'Raleway-SemiBold',
                        color:'orange'}}> by {item.speaker}</Text></Text>
                    <Text style={{fontSize:12,
                       color:'rgba(0,0,0,0.6)',
                       marginTop:4,
                       fontFamily:'Raleway-Medium'}}>Category: {item.category} - Added on: {item.dateAdded}</Text>
                  
                </View>
                 <View style={{
                   justifyContent:"space-between",
                   flexDirection:'row',
                   paddingHorizontal:5,
                   flex:1
                 }}>
                 
                <TouchableOpacity
               onPress={()=> {
                 let play = true
                WebBrowser.openBrowserAsync(`https://generalsapi.netlify.com/.netlify/functions/index/messageapi/download/${id}/${play}`)
                 }
              }
                 style={{
                
                  justifyContent:'center',
                  alignItems:'center',
                  backgroundColor:'white',
                  borderRadius:5,
                  height:23
                 }}
                 >
                  <Ionicons name="md-play" size={23} color="royalblue" />
                </TouchableOpacity>

                <TouchableOpacity 
                //  onPress={()=> WebBrowser.openBrowserAsync(downloadUrl)}
                onPress={()=> {
                  let play = false
                 WebBrowser.openBrowserAsync(`https://generalsapi.netlify.com/.netlify/functions/index/messageapi/download/${id}/${play}`)
                  }
               }
                style={{
                  
                  paddingHorizontal:5,
                  justifyContent:'center',
                  alignItems:'center',
                  backgroundColor:'royalblue',
                  borderRadius:5,
                  height:23
                }}>
                  <Text style={{color:'white',
                   fontSize:10,
                   fontFamily:'Raleway-SemiBold'}}>Download</Text>
                </TouchableOpacity>
                
                 </View>
               
            </View>
       
        )
    }
  
  return  (
  <View style={{flex:1,paddingVertical:10, paddingHorizontal:20}}>

      {!finishLoading ?<View style={{alignItems:'center', justifyContent:'center'}}>
          <View style={{marginVertical:90}}>
            <ProgressBarAndroid/>
          </View>
          <View style={{marginVertical:10}}>
          <Text style={{fontFamily:'Raleway-Medium', fontSize:14, color:'rgba(0,0,0,0.5)'}} >Loading messages</Text>
          </View>
          <View style={{marginVertical:10}}>
          <Text style={{fontFamily:'Raleway-Medium', fontSize:14, color:'rgba(0,0,0,0.5)'}} >Make sure internet connection is on</Text>
          </View>
        
          </View>:
     <View>
      <Text style={{fontFamily:'Raleway-Regular',fontSize:14,marginVertical:1, textAlign:'center', color:'rgba(0,0,0,0.5)'}}>
          Total number of messages ({data.length})
      </Text>
  <FlatList
   data= {data.reverse()}
   showsVerticalScrollIndicator={false}
   renderItem = {renderItem}
   ItemSeparatorComponent={ ()=> <View style={{height:1, backgroundColor:'rgba(0,0,0,0.1)'}}></View>}
   keyExtractor= {(item , index)=> index.toString()}
   />
     </View>     
   

    
  }
  </View>)

}
LinksScreen.navigationOptions = {
  headerStyle:{
    backgroundColor:'royalblue',
    color:'white'
    
   },
   headerColor:'white',
   color:'white',
   headerLeft :<View style={{
       alignItems:'center',
       paddingLeft:15,
       flexDirection:"row",
       flex:1
   }}><Ionicons name="md-list-box" size={30} color="white" /><Text
    style={{
       fontSize:21,
     
       fontFamily:'Raleway-Black',
       marginLeft:20,
       color:'white'
    }}
   >All Messages</Text></View> 
};
