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
  TouchableHighlight,
  Animated,
  Alert,
  Text,
  Button,
  Vibration,
  ImageBackground,
  Modal,
  TextInput,
  Dimensions,
  TouchableOpacity,
  View,
} from 'react-native';

import { MonoText } from '../components/StyledText';
import { SafeAreaView } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import Ministry from './Ministry';

 const selector = false




export default function HomeScreen(props) {
  const [finishLoading, setFinishLoading] = useState(false)
  const [errorInConnection, setError] = useState(false)
  const [header, setHeader] = useState('deumi')
  const [keys, setKeys] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [modoNo, setModeNo] = useState(0)
  
  const [showSearch, setShowSearch] = useState(false)
  const [data, setData] = useState([])
  const [showSide, setShowSide] =useState(false);
  const [firstname, setFirstName] = useState(' ')
  const [email, setEmail] = useState(' ')
  const [message, setMessage] = useState(' ')
  const [dataInArray, setDataInArray] = useState([])
  const [fetchedData, setFetchedData] = useState([])
  const [searchedObject, setSearchObject] = useState([])

 const loadFont= async function(){
 
    await Font.loadAsync({
       'Roboto-Medium' : require('../assets/Roboto/Roboto-Medium.ttf'),
       'Roboto-Regular' : require('../assets/Roboto/Roboto-Regular.ttf'),
       'Roboto-Light' : require('../assets/Roboto/Roboto-Light.ttf'),
       'Roboto-Regular' : require('../assets/Roboto/Roboto-Regular.ttf'),
       'Roboto-Black' : require('../assets/Roboto/Roboto-Black.ttf'),
       'Roboto-Thin' : require('../assets/Roboto/Roboto-Thin.ttf'),
       'Raleway-Black': require('../assets/Raleway/Raleway-Black.ttf'),
       'Raleway-Bold': require('../assets/Raleway/Raleway-Bold.ttf'),
       'Raleway-SemiBold': require('../assets/Raleway/Raleway-SemiBold.ttf'),
       'Raleway-Medium': require('../assets/Raleway/Raleway-Medium.ttf'),
       'Raleway-Regular': require('../assets/Raleway/Raleway-Regular.ttf')

      })
      return true
   }
   
  useEffect( () => {
  
  fetchMessages().then(result=>{
    loadFont().then(()=>{
      if(result){
        setFetchedData(result)
        const messages = result.messages
        setDataInArray(messages)
        const sortedMessages = { }
        for (let i in messages) {
          if (messages[i].speaker in sortedMessages) {
            sortedMessages[messages[i].speaker] = [...sortedMessages[messages[i].speaker], messages[i]]
          } else {
            sortedMessages[messages[i].speaker] = [messages[i]]
          }
        }
        const arr = []
        const key_ = []
        for (let i in sortedMessages) {
          const key = sortedMessages[i][0].speaker
          arr.push({ [key]: sortedMessages[i] })
          key_.push(i)
        }
        setKeys(key_)
        setData(arr)
        
        setFinishLoading(true)
      }
    })
   
    
  })
  }, [finishLoading])

  async function fetchMessages() {
    const messages= await fetch('https://generalsapi.netlify.com/.netlify/functions/index/messageapi/listmessages').then(res=> res.json()).then(messag=>messag).catch(err => {if(err) setError(true)})
    
    return messages
  
 
  }



//sort data by tirle

 function search(value){
let titles =[]
let search_result =[]
let searchObject= {};
const messages = fetchedData.messages
for(let i in messages){
titles.push(messages[i].name.toLowerCase())
}
let msg =[]
for(let i=0; i<titles.length;i++){
  if(titles[i].search(value.toLowerCase()) !== -1){
    searchObject[titles[i]] = titles[i]
     msg=Object.keys(searchObject)
  }
}

setSearchObject(msg)
 }



async function selectPlay(){
  let play = false
  Alert.alert(`${message}`, "Do you want to " , [
 
  {text:"Download  or", 
  onPress:()=>{ play = false} 
  },
  {text: "Play", onPress:()=>{play = true}}

   ])

   return play
}
async function handleFeedBack(){
  if( !firstname ||  !email || !message || message.length<6 ){
    return Alert.alert('Error!!!', "Please enter all fields and make sure your message is more than 6 characters")
  }
  Alert.alert('Sending message....')
  console.log(firstname, email, message)
  setShowModal(false)
  const result = await fetch('https://generalsapi.netlify.com/.netlify/functions/index/messageapi/feedback',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify({
      feedback:` Message from: ${firstname}, 
      Email: ${email} ,
      Message:  ${message} `
    })
  })
  .then((response)=> response.json()).then((responseJson)=> responseJson).catch(err=> err.message)
  if(result.feedBackresult){
  Alert.alert("Message sent!!! , we are happy to here from you")
  }
}


function handlePlay(message){
         for(let msg in dataInArray){
          if(dataInArray[msg].name.toLowerCase()=== message){
            let id = dataInArray[msg].id
            let play = false
            Alert.alert(`${message.toUpperCase()} by ${dataInArray[msg].speaker}`, "Do you want to " , [
          
            {text:`Download    or`, 
            onPress:()=>{ play = false
            WebBrowser.openBrowserAsync(`https://generalsapi.netlify.com/.netlify/functions/index/messageapi/download/${id}/${play}`)
            } 
            },
            {text: "Play", onPress:()=>{
              
              play = true
              WebBrowser.openBrowserAsync( `https://generalsapi.netlify.com/.netlify/functions/index/messageapi/download/${id}/${play}`)
            
            }}

            ])
            
            
          }
       }
}











  return (
    // <ImageBackground style={styles.container} source={require('../assets/dd.png')}>
    <View>
     {/* <ImageBackground style={styles.container} source={{uri:'https://render.fineartamerica.com/images/images-profile-flow/400/images-medium-large-5/celtic-cross-with-swarm-of-bats-johan-swanepoel.jpg'}}>  */}
    <View  style={{width:Dimensions.get('window').width, backgroundColor:'white',elevation:4, height:88}}>
     <View   style={{flex:1,flexDirection:'row', paddingHorizontal:10 ,paddingTop:27, alignItems:'center'}}>
       {
         showSearch?
         <Animated.View style={{flex:1 , flexDirection:'row',alignItems:'center'}}>
           <TextInput onChangeText={(value)=>{
             search(value)
           }} autoFocus placeholder="Enter title of message" style={{backgroundColor:'transparent', borderColor:'rgba(0,0,0,0.4)',flex:0.97, marginRight:7,paddingLeft:10, borderWidth:1, borderRadius:4, paddingVertical:5}}/>
        <TouchableOpacity   style={{position:'absolute',width:30, justifyContent:'center', alignItems:'center', right:32, top:10}}> 
       <Ionicons name="md-search" size={23} color="rgba(0,0,0,0.4)"/>
     </TouchableOpacity> 
         <TouchableOpacity  onPress={()=> setShowSearch(false)}>

         <Ionicons name="md-close"  color="rgba(0,0,0,0.3)" size={24} />
         </TouchableOpacity>
         </Animated.View>
         
         :
         <View style={{flex:1 , flexDirection:'row', alignItems:'center'}}>
              <Ionicons name="md-star-outline" color="royalblue" size={45} />
        
        <Text style={{fontFamily:'Raleway-Bold',fontSize:24,marginLeft:7, color:'rgba(0,0,0,0.7)'}}>
           Generals
        </Text> 
        
         </View>
         
      
       }
      

      
       
     </View>
     {
       !showSearch&&<TouchableOpacity onPress={()=> setShowSearch(!showSearch)}  style={{position:'absolute',width:30, justifyContent:'center', alignItems:'center', right:50, top:40}}> 
       <Ionicons name="md-search" size={32} color="rgba(0,0,0,0.6)"/>
     </TouchableOpacity>
     }
     
     {
       !showSearch?
       <TouchableHighlight underlayColor="rgba(0,0,0,0.3)" activeOpacity={1} onPress={()=> setShowSide(!showSide)} style={{position:'absolute',width:40,height:40, borderRadius:25, justifyContent:'center', alignItems:'center', right:6, top:35}}> 
      <View>
      <View style={{width:4, height:4,marginTop:3, borderRadius:10,backgroundColor:'rgba(0,0,0,0.6)'}}>
       </View>
       <View style={{width:4, height:4,marginTop:3, borderRadius:10,backgroundColor:'rgba(0,0,0,0.6)'}}>
       </View>
       <View style={{width:4, height:4,marginTop:3, borderRadius:10,backgroundColor:'rgba(0,0,0,0.6)'}}>
       </View>
      </View>
      
     </TouchableHighlight>
     :null
     }
    
     
     </View>
    <View>
    {
          showSearch?
   <ScrollView showsVerticalScrollIndicator={false} style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height,zIndex:10,position:'absolute', left:-10,top:-19, backgroundColor:'white',borderWidth:1, borderColor:'white',padding:27}}>
           <Text style={{fontFamily:'Raleway-Regular',fontSize:14,marginVertical:1, textAlign:'center', color:'rbba(0,0,0,0.5)'}}>
             Related search ({searchedObject.length})
           </Text>
           { 
             searchedObject.map((message)=>{
               return(
                 <View>
                 <TouchableOpacity onPress={()=>handlePlay(message)} key={message} style={{
                 borderBottomColor:'rgba(0,0,0,0.1)',marginTop:10,zIndex:3,position:'relative', paddingVertical:10, borderBottomWidth:1}}>
                   <Text style={{fontFamily:'Raleway-Regular', fontSize:18, color:'rgba(0,0,0,0.8)'}}>{message}</Text>
                 </TouchableOpacity>
                 </View>
               
               )
             })
           }
           
           
    </ScrollView>

         
          :
          
      <View>
     
      {!finishLoading ?<View style={{alignItems:'center', justifyContent:'center'}}>
        <View style={{marginVertical:90}}>
          <ProgressBarAndroid color="royalblue"/>
        </View>
        <View style={{marginVertical:10}}>
        <Text style={{fontFamily:'Raleway-Medium', fontSize:16, color:'rgba(0,0,0,0.6)'}} >Loading messages</Text>
        </View>
        <View style={{marginVertical:10}}>
        <Text style={{fontFamily:'Raleway-Medium', fontSize:16, color:'rgba(0,0,0,0.6)'}} >Make sure internet connection is on</Text>
        </View>
      
        </View>:
     
       <ScrollView>
        
       <Modal
       animationType="slide"
       transparent={true}
       visible ={showModal}
       
       >
         <View style={{marginTop:0,flex:1,paddingHorizontal:40,alignItems:'center', justifyContent:'center', backgroundColor:'rgba(0,0,0,0.5)'}}>
         <View style={{width:330,height:356,paddingVertical:25,elevation:5, paddingHorizontal:24,backgroundColor:'white'}}>
          <TouchableOpacity style={{position:'absolute', right:10, top:10}}>
            <Ionicons onPress={()=> setShowModal(false)}  name="md-close" color="rgba(0,0,0,0.6)" size={30}/>
            </TouchableOpacity> 
             <Text style={{fontSize:23,color:'rgba(0,0,0,0.9)' ,fontFamily:"Roboto-Light"}}>{modoNo === 1 ? "Contact us" : "Report a problem"}</Text>
            <View style={{marginVertical:3}}>
            <Text style={{fontSize:17,color:'rgba(0,0,0,0.7)' ,fontFamily:"Roboto-Light"}}> Name: </Text>
            <TextInput onChangeText={(text) => setFirstName(text)} autoFocus autoCorrect={false} underlineColorAndroid="rgba(0,0,0,0.5)" selectionColor='royalblue' style={{height:39,color:'rgba(0,0,0,0.6)', paddingVertical:10,paddingHorizontal:3, fontSize:17}}/>
            
            </View>
            <View style={{marginVertical:3}}>
            <Text style={{fontSize:17,color:'rgba(0,0,0,0.7)' ,fontFamily:"Roboto-Light"}}> Email: </Text>
            <TextInput onChangeText={(text) => setEmail(text)} autoCorrect={false}  underlineColorAndroid="rgba(0,0,0,0.5)" selectionColor='royalblue' style={{height:37, color:'rgba(0,0,0,0.6)',paddingVertical:10,paddingHorizontal:3, fontSize:17}}/>
            <TextInput/>
            </View>

            <View style={{marginVertical:3}}>
            <Text style={{fontSize:17,color:'rgba(0,0,0,0.7)' ,fontFamily:"Roboto-Light"}}> {modoNo === 1 ? "Message" : "Describe the problem"}: </Text>
            <TextInput onChangeText={(text) => setMessage(text)} autoCorrect={false}  underlineColorAndroid="rgba(0,0,0,0.5)" selectionColor='royalblue' style={{height:37, color:'rgba(0,0,0,0.6)',paddingVertical:10,paddingHorizontal:3, fontSize:17}}/>
            <TextInput/>
            </View>


          
           <Button style={{width:90}} title={modoNo === 1 ? "Send message" : "Report"} color="rgba(40,100,200,1)" onPress={()=> handleFeedBack()} />
         </View>
           
         </View>
       </Modal>






         {
           showSide ?
           <View    style={{width:200, borderWidth:1,backgroundColor:'white',zIndex:5,borderRadius:3, paddingHorizontal:10,elevation:3, paddingTop:20, borderColor:'rgba(0,0,0,0.04)', height:215,top:-30, position:'absolute',right:3, backgroundColor:'white'}}>
           <TouchableOpacity onPress={()=> {
             setShowSide(false)
             setShowModal(true)
             setModeNo(1)
            
            }
             } activeOpacity={0.4}>
           <View style={{marginTop:26, marginBottom:6}}>
             <Text style={{fontSize:16, fontFamily:'Raleway-Medium', color:'rgba(0,0,0,0.7)'}}>
               Contact Us
             </Text>
           </View>
           </TouchableOpacity>
           
           <TouchableOpacity  onPress={()=> {
             setShowSide(false)
             setShowModal(true)
             setModeNo(2)
            
            }}>
           <View style={{marginVertical:12}}>
             <Text style={{fontSize:16, fontFamily:'Raleway-Medium', color:'rgba(0,0,0,0.7)'}}>
               Report a problem
             </Text>
           </View>
           </TouchableOpacity>
          <TouchableOpacity  onPress={()=> {
             setShowSide(false)
             props.navigation.navigate('Settings')
            
            }}>
          <View style={{marginVertical:12}}>
             <Text style={{fontSize:16, fontFamily:'Raleway-Medium', color:'rgba(0,0,0,0.7)'}}>
               About Generals
             </Text>
           </View>
          </TouchableOpacity>
          <TouchableOpacity  onPress={()=> {
             setShowSide(false)
             props.navigation.navigate('ShareStack')
            
            }}>
           <View style={{marginVertical:12}}>
             <Text style={{fontSize:16, fontFamily:'Raleway-Medium', color:'rgba(0,0,0,0.7)'}}>
               Share a message
             </Text>
           </View>
           </TouchableOpacity>
        </View>
        :null
         }
        <TouchableHighlight style={{paddingBottom:130}} activeOpacity={1} underlayColor='transparent' onPress={()=> {
          
          setShowSide(false)}}>
        <View style={{paddingBottom:120}}>
        
       <Text style={{textAlign:'center',
       fontFamily:'Raleway-Regular',
        fontSize:13,
        marginVertical:4,
         color:'rgba(0,0,0,0.7)'}}>Select Minister</Text>
         {
           !showSearch&& <View  style={{marginTop:-20,display:'flex',justifyContent:'space-around', flexDirection:'row', width:Dimensions.get('window').width,flexWrap:'wrap'}}>
           {
             data.map((message, index) => {
               return (
                <Ministry messages={message[keys[index]]} navigation={props.navigation} key={message[keys[index]][0].speaker} speaker={message[keys[index]][0].speaker}/>
       
               )
             })
           }
    
        </View>
         }
      
      </View>
      </TouchableHighlight>
       </ScrollView>
       }
   
   
    </View>
        }
      
    
    </View>
    {/* </ImageBackground> */}
    </View>
  );
}

HomeScreen.navigationOptions ={
 header:null
}


  




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  card:{
    marginTop:10,
    height:120,
    width:160,
    padding:1,
    
   
   
  },
  cardhead:{
   height:90,
   backgroundColor:'rgb(51, 103, 214)',
   alignItems:'center',
   justifyContent:'center',
   paddingLeft:10,
  borderTopLeftRadius:8,
  borderTopRightRadius:8
  },
  ministry:{
    color:'white',
    fontWeight:'bold'
  },
  Body:{
    paddingLeft:10,
    height:40,
    paddingVertical:5,
    elevation:30,
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.03)'
    
    

  },
  speaker:{
    color:'rgba(0,0,0,0.5)',
    fontSize:12,
    fontWeight:'600'
  }
  
  
});
