import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  Button,
  Dimensions,
  TouchableOpacity,
  View,
  Animated
} from 'react-native';


export default class Test extends React.Component{
    constructor(props){
        super(props)
        this.width = new Animated.Value(0)
    }
    
    static navigationsOptions = ()=>{
        return{
            title:'Test Animation'
        }
          
    }
    componentDidMount(){
    
       
    }
    increseHeight =()=>{
        Animated.timing(this.width,{
            toValue:200,
            duration:500
          }).start()
    }

    stopAnimation =() =>{
        Animated.timing(this.width,{
            toValue:0,
            duration:500
          }).start()
    }
    render(){
      
        return(
            <View>
                <Animated.View style={{height:120, width:this.width, backgroundColor:'red'}}>
               
                </Animated.View>
                <Button onPress={this.increseHeight} title="Start animation"/>
                <Button onPress={this.stopAnimation} title="Stop animation"/>
                <Text style={{fontFamily:'Roboto-Black', fontSize:80}}>
                    Hello world 
                </Text>
            </View>
        )
    }
}