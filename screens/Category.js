import React, {useState, useEffect} from 'react';
import * as WebBrowser from 'expo-web-browser';
import { Text,View, FlatList,ProgressBarAndroid, TouchableOpacity, Alert,Button } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { MonoText } from '../components/StyledText';
export default function CategoryScreen(props) {
    const [finishLoading, setFinishLoading] = useState(false)
    const [errorInConnection, setError] = useState(false)
    const [keys, setKeys] = useState([])
    const [categories, setCategories] = useState([])
    const [data, setData] = useState([])
    useEffect( () => {
    fetchMessages().then(result=>{
      if(result){
          const obj = new Object()
        for(let i in result.messages){
           obj[result.messages[i].category]= true
           
        }
      const categories=  Object.keys(obj)
        setData(categories)
  
        setFinishLoading(true)
      }
      
    })
    }, [finishLoading])
  
    async function fetchMessages() {
      const messages= await fetch('https://generalsapi.netlify.com/.netlify/functions/index/messageapi/listmessages').then(res=> res.json()).then(messag=>messag).catch(err => {if(err) setError(true)})
      return messages
    
   
    }

    
    function renderItem({item}){
        return (
            
            <TouchableHighlight activeOpacity={1} underlayColor="rgba(0,0,0,0.2)" onPress={()=> props.navigation.navigate('SortedScreen',{category:item})} key={item} style={{flex:1,paddingHorizontal:20, flexDirection:'row', alignItems:'center'}}>
                <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                <View style={{marginVertical:10,paddingVertical:12, width:233, paddingRight:10}}>
                    <Text style={{fontSize:16,textTransform:'capitalize',
                       fontFamily:'Raleway-SemiBold'}}>{item}
                    </Text>
                </View>
                <View style={{width:90, paddingRight:20}}>
                <Button color="royalblue"   title="View"/>
                </View>
                </View>
               
            </TouchableHighlight>
       
        )
    }
  
  return  (
  <View style={{flex:1,paddingVertical:10, paddingHorizontal:12}}>

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
          Total number of categories ({data.length})
      </Text>
  <FlatList
   data= {data}
   showsVerticalScrollIndicator={false}
   renderItem = {renderItem}
   ItemSeparatorComponent={ ()=> <View style={{height:0.7, backgroundColor:'rgba(0,0,0,0.2)'}}></View>}
   keyExtractor= {(item , index)=> index.toString()}
   />
     </View>     
   

    
  }
  </View>)

}
CategoryScreen.navigationOptions = {
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
       fontSize:19,
     
       fontFamily:'Raleway-Black',
       marginLeft:20,
       color:'white'
    }}
   >Message categories</Text></View> 
};
