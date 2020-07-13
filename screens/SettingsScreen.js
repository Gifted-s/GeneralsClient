import React, {useEffect} from 'react';
import { ScrollView, StyleSheet,Switch,WebView,Alert, Text,View,TouchableOpacity,Picker,ProgressBarAndroid, FlatList, Image, Button } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

import { Ionicons } from '@expo/vector-icons';
export default function SettingsScreen(props) {

  


 
  
  const registerForPushNotificationsAsync= async ()=> {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      alert('No notification permissions!');
      return;
    }

    let token = await Notifications.getExpoPushTokenAsync();
     console.log(token)
    // POST the token to your backend server from where you can retrieve it to send push notifications.
   
  }




useEffect(() =>{
  register().then(()=>{
    const response = fetch("https://exp.host/--/api/v2/push/send", {
      method:'Post',
      headers:{
        'Content-Types':'application/json'
      },
     
      body: JSON.stringify({
        to: "ExponentPushToken[5z2vvGFXq7lUcHf7xfWaf8]",
        title:"What's new",
        body: "We have new spiritual messages for you",
        sound:"default"
      })
    })
  })
})

async function register(){
  await registerForPushNotificationsAsync()
}

























  return  <ScrollView>
   
  <View style={{flex:1, alignItems:'center',paddingVertical:30, paddingHorizontal:20}}>
  <View style={{ alignItems:'center', justifyContent:'center'}}>
    <Ionicons name="md-star-outline" color="royalblue" size={140}/>
    <Text style={{fontSize:35,fontFamily:'Raleway-Medium', marginVertical:7, textAlign:'center',}}>
    Generals
    </Text>
    <Text style={{fontSize:20,fontFamily:'Raleway-Medium',color:'rgba(0,0,0,0.7)', marginVertical:6, textAlign:'center',}}>
    Version 1.0.0
    </Text>
    <Text style={{fontSize:13,fontFamily:'Raleway-Medium',color:'rgba(0,0,0,0.4)', lineHeight:27,textAlign:'center',}}>
     Copyright 2020 Giftedcooperations Inc
    </Text>
  </View>
   

    <Text style={{fontSize:21 ,color:'rgba(0,0,0,0.8)' ,marginTop:20,marginBottom:20, textAlign:'center', fontFamily:'Raleway-Black'}}>Motivation</Text>
    <View style={{width:100, height:1, backgroundColor:'rgba(0,0,0,0)', paddingHorizontal:20}}></View>
    <Text style={{fontSize:16,fontFamily:'Raleway-Medium', lineHeight:27,textAlign:'center',}}>According to the bible, it was made known that faith commeth by hearing and hearing by the word of God, meaning the only way to improve your spiritual life and build your faith is to 
    hear the word of God.
    And that was why this application was developed to bring you inspirational messages from different apostles, pastors and evangelists.</Text>
    <Text style={{fontSize:16,textAlign:'center',fontFamily:'Raleway-Medium', lineHeight:27}}>Be a blessing by sharing this app with a friend, neighbour, family and so on, remember our major purpose as a christian according to (<Text style={{fontWeight:'bold'}}>Mark 16:15</Text>) is to spread the gosple.  </Text>



    <Text  style={{marginTop:30,textAlign:'center',fontFamily:'Raleway-Black', fontSize:21, marginVertical:5}}>About Developer</Text>
    <View style={{width:100, height:1, backgroundColor:'rgba(0,0,0,0)',marginBottom:40, paddingHorizontal:20}}></View>

    {/* <View> */}
      {/* <Image style={{width:270, height:300,marginBottom:20}} source={require('../assets/images/Sukanmi0.jpg')}/> */}
    {/* </View> */}
    <Text style={{fontSize:16,lineHeight:27,fontFamily:'Raleway-Medium', textAlign:'center'}}>Adewumi Sunkanmi is a member of the Celestial Church Of Christ Students' Parish FUTA. He is the Co-Founder of the Gifted Cooperation.
    An Indigene of Ado Ekiti Ekiti State, Nigeria. He developed this application out of the difficulties he faced while trying to locate spiritual messages by different ministries
    and also to get the latest spiritual messages, he also wanted different christians to share inspiring messages to other christians around the world.</Text>

     <View style={{marginTop:40}}>
     <Button onPress={()=>props.navigation.navigate('ShareStack')}
    title="Share a message You Listened to" />
     </View>

     <View style={{marginTop:30}}>
     <Text style={{fontSize:17,lineHeight:27, marginBottom:20, fontFamily:'Raleway-Medium', textAlign:'center'}}>
       Contact us on
     </Text>
<View style={{flexDirection:'row', marginVertical:8, paddingHorizontal:10}}>
 <Ionicons name="md-phone-portrait" color="royalblue" size={35} />
    <Text style={{fontSize:14,marginLeft:10, lineHeight:27, marginBottom:20, fontFamily:'Raleway-Medium'}}>
       Telephone : +2347031850081
     </Text>
</View>
    
<View style={{flexDirection:'row', marginVertical:8, paddingHorizontal:10}}>
 <Ionicons name="md-mail-open" color="royalblue" size={35} />
    <Text style={{fontSize:14,marginLeft:10, lineHeight:27, marginBottom:20, fontFamily:'Raleway-Medium'}}>
       Gmail : sunkanmiadewumi1@gmail.com
     </Text>
</View>

<View style={{flexDirection:'row', marginVertical:8, paddingHorizontal:10}}>
 <Ionicons name="logo-twitter" color="royalblue" size={35} />
    <Text style={{fontSize:14,marginLeft:10, lineHeight:27, marginBottom:20, fontFamily:'Raleway-Medium'}}>
       Twitter : twitter.com/ADEWUMISUNKANM5
     </Text>
    
</View>

<View style={{flexDirection:'row', marginVertical:8, paddingHorizontal:10}}>
 <Ionicons name="logo-linkedin" color="royalblue" size={35} />
    <Text style={{fontSize:14,marginLeft:10, lineHeight:27, marginBottom:20, fontFamily:'Raleway-Medium'}}>
       Linkedin : linkedin.com/in/adewumi-sunkanmi-ab975817a/
     </Text>
    
</View>
     </View>
   </View>
 
  </ScrollView>
}

SettingsScreen.navigationOptions = {
  headerStyle:{
   backgroundColor:'royalblue'
  },
  headerLeft:<View style={{paddingHorizontal:17, alignItems:'center', flexDirection:'row'}}>
    <Text style={{fontSize:22, fontFamily:'Raleway-Black', color:'white'}}>About Generals</Text>
  </View>
};
