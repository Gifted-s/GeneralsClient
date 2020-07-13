import * as WebBrowser from 'expo-web-browser';
import React , {useState, useEffect} from 'react';
import * as FileSystem from 'expo-file-system'
import {Audio} from 'expo-av'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Button,
  ProgressBarAndroid,
  Text,
  Alert,
  Modal,
  TextInput,
  Dimensions,
  TouchableOpacity,
  View,
} from 'react-native';
import * as ExpoDocumentPicker from 'expo-document-picker'
import firebase from 'firebase';
import { MonoText } from '../components/StyledText';
import { SafeAreaView } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
// import Ministry from './Ministry';
import HomeScreen from './HomeScreen';

 const selector = false


export default function Share(props) {


 
  // FileSystem.downloadAsync(
  //   'http://techslides.com/demos/sample-videos/small.mp4',
  //   FileSystem.documentDirectory + 'small.mp4'
  // )
  //   .then(({ uri }) => {
  //     console.log('Finished downloading to ', uri);
  //   })
  //   .catch(error => {
  //     console.error(error);
  //   });
  const [name, SetName] = useState('')
  const [progress , setProgress] = useState(0)
  const [messageUri, setMessageUri] = useState('')
  const [speaker, setSpeaker] = useState('')
  const [sharing, setSharing] = useState(false)
  const [category, setCategory]= useState('')
  const [changeScreen , setChangeScreen] = useState(false)
  const [uploadingFile, setUploadingFile] = useState(false)


  
 
    const onPressUpload =async ()=>{
        
        const message = await ExpoDocumentPicker.getDocumentAsync()
        if(message.type !== "cancel"){
          setTimeout( ()=> setUploadingFile(true),2000) 
          await uploadFile(message).then(()=>{
            //  console.log('upload done')
             
           })
           .catch(err=>{
             console.log("thats it")
           })
            
        }
       
      }
      async function uploadFile(message){
        console.log(message)
        SetName(message.name)
        const response = await fetch(message.uri)
        const blob = await response.blob()
      
        const uploadTask = firebase.storage().ref().child("images/" + message.name + ".mp3").put(blob)
        uploadTask.on('state_changed' , (snapshot)=>{
          const pr = (snapshot.bytesTransferred / snapshot.totalBytes)  * 100
          setProgress(pr)
          console.log(pr)
        }, function(err){
          console.log(err)
        },  function(){
         uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);
         



            setMessageUri(downloadURL)
            setChangeScreen(true)
          })
        }
       
        )
    
      } 

  const share =async ()=>{
    setSharing(true)
    const messageAdded = await fetch('https://generalsapi.netlify.com/.netlify/functions/index/messageapi/addmessage', {
      method:'POST',
      headers:{
        "Content-Type" : 'application/json',
      },
      body: JSON.stringify({
        name,
        speaker,
        category,
        messageUri
      })
    })
    .then(res=> res.json()).then(resJSON=>resJSON)
 

     console.log(messageAdded)

    if(messageAdded.error){
      Alert.alert("Error" , 
      `${messageAdded.error}`, 
      {cancelable:false})
    }
    if(messageAdded.addMessage){
   
      setChangeScreen(false)
      setUploadingFile(false)
      setSharing(false)
      Alert.alert("Congratulations" , 
      `The message "${messageAdded.addMessage.name}" by ${messageAdded.addMessage.speaker} has been added to our global playlist, now christians around the world can also download, hear, and share this message. Reload app to see the message`)
    }
  }
  

    return (
       <View style={styles.container}>
         {
           !changeScreen ?
           <View>

             {uploadingFile ? 
              <View style={{justifyContent:'center',
              paddingHorizontal:38,
              alignItems:'center', 
              marginTop: -40}}>
                <ProgressBarAndroid
                styleAttr="Large"
                // indeterminate={false}
                progress={progress}
              />
               <Text style={{fontSize:40, 
                color:'rgba(0,0,0,0.6)'}}>
                 {Math.floor(progress)} %
               </Text>
              <Text style={{
                  color:'rgba(0,0,0,0.4)',
                  fontSize:17,
                  fontFamily:'Raleway-Medium',
                  marginTop:12
              }}>Uploading {name}, Please wait......</Text>
              </View>
             :
             <TouchableOpacity onPress={onPressUpload} style={{
              alignItems:'center',
              justifyContent:'center',
              
              
          }}>
              <View style={{
              alignItems:'center',
              justifyContent:'center',
              
              
          }}>
              <Ionicons color="springgreen" size={120} name="md-folder"/>
              <Text style={{
                  color:'rgba(0,0,0,0.4)',
                  fontSize:17,
                  textAlign:'center',
                  fontFamily:'Raleway-SemiBold',
                  marginTop:12
              }}> Click icon to select message from your device</Text>
              </View>
              
              
          </TouchableOpacity>
            }
             
         
       </View>:

       <View style={{flex:1,
        alignItems:'center',
        justifyContent:'center'}}>
     <Modal
     style={{
       height:200,
       width:300,
       backgroundColor:'white'
      

     }}
     transparent={true}
     animationType="slide"
     visible={changeScreen}
     
     
     >
       <View style={{
         alignItems:"center",
         justifyContent:'center',
         flex:1,
         paddingHorizontal:30,
         backgroundColor:'transparent'
         
       }}>
        
         <View style={{
          paddingHorizontal:14,
          borderWidth:1,
          borderRadius:0,
          borderColor:'rgba(0,0,0,0.03)',
          paddingVertical:30,
          
         }}>


        <TouchableOpacity onPress={()=> {
           setUploadingFile(false)
           setChangeScreen(false)
        
        }} style={{
             alignItems:"center",
             justifyContent:'flex-end',
             flexDirection:'row',
             backgroundColor:'royalblue',
             position:'absolute',
             left:0,
             top:0,
             right:0
           }}>
             {!sharing && <View style={{
               paddingHorizontal:12,
               paddingVertical:13
               
             }}>
              <Text style={{
               textAlign:'center',
               color:'white',
               fontSize:14,
               fontFamily:'Raleway-Medium',
               marginLeft:10
             }}>
               File upload complete, please fill the form below to complete the proccess

             </Text>
             </View> }
            
           <Ionicons style={{paddingHorizontal:2}} name="md-close" size={39} color="white"/>
           </TouchableOpacity>
           {
           sharing ?
           <View>
             <ProgressBarAndroid
             styleAttr="Horizontal"
             color="white"

             />
             <Text style={{
               color:'rgba(0,0,0,0.6)',
               fontFamily:'Raleway-Medium',
               textAlign:'center',
               fontSize:17
             }}>
               Please wait while your message is being shared.
             </Text>
             <Text style={{
               color:'red',
               marginTop:60,
               fontFamily:'Raleway-Medium',
               textAlign:'center',
               fontSize:14,
               opacity:0.6
             }}>
              Be noted that if this message does not fufill its purpose (to bring 
              souls to God) it would be removed
             </Text>
           </View>
           :

           <View>
           <View style={{
            marginTop:50
          }}>
          <Text style={{fontFamily:'Raleway-Medium',
         color:'rgba(0,0,0,0.6)',
          fontSize:17}}>
            Enter minister's name :
          </Text>

          <TextInput autoFocus style={{
            marginVertical:10,
            borderBottomColor:'royalblue',
           
            borderBottomWidth:2,
            
            paddingHorizontal:8,
            paddingVertical:7,
            

          }} 
          onChangeText={(val)=> setSpeaker(val)}
          placeholder="Enter message minister, e.g Joshua Selman"/>

          </View>
        
          <View style={{
            marginVertical:14
          }}>
          <Text style={{fontFamily:'Raleway-Medium',
         color:'rgba(0,0,0,0.6)',
          fontSize:17}}>
            Enter message category :
          </Text>

          <TextInput  style={{
          marginVertical:10,
          borderBottomColor:'royalblue',
         
          borderBottomWidth:2,
          
          paddingHorizontal:8,
          paddingVertical:7,
            

          }}
          onChangeText={(val)=> setCategory(val)}
           placeholder="Enter message  category, e.g Spiritual Growth"/>

          </View>
        
        <Button style={{
          paddingHorizontal:100
        }} 
        onPress={share}
        color="royalblue"   title="Submit"/>
           </View>
         }
        
         </View>
        
       </View>

     </Modal>
       </View>
         }
      
       </View>
    )
      
  
}
Share.navigationOptions = {
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
    }}><Ionicons name="md-share" size={30} color="white" /><Text
     style={{
        fontSize:21,
      
        fontFamily:'Raleway-Black',
        marginLeft:20,
        color:'white'
     }}
    >Share a message</Text></View> 
}



  




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems:'center',
    justifyContent:'center'
  },
  head:{
    paddingLeft:15,
    flexDirection:"row",
    flex:1
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
