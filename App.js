import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState , useEffect} from 'react';
import { Platform, StatusBar, StyleSheet, View, YellowBox } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import firebase from 'firebase';
import AppNavigator from './navigation/AppNavigator';
import Preload from './screens/Preload';
export default function App(props) {
// YellowBox.ignoreWarnings(['Require cycle']);
console.disableYellowBox = true;
  const firebaseConfig = {
    apiKey: "AIzaSyAc0zU5ZUW3qiYnO6T0bpgj6m5KxZqkJvo",
    authDomain: "upload-2d878.firebaseapp.com",
    databaseURL: "https://upload-2d878.firebaseio.com",
    projectId: "upload-2d878",
    storageBucket: "upload-2d878.appspot.com",
    messagingSenderId: "656918762064",
    appId: "1:656918762064:web:bfd0013720b64b9ea3b755",
    measurementId: "G-Q76V627KQ2"
  };
   firebase.initializeApp(firebaseConfig);
 



















   
 const loadFont= async function(){
 
  await Font.loadAsync({
     'Roboto-Medium' : require('./assets/Roboto/Roboto-Medium.ttf'),
     'Roboto-Regular' : require('./assets/Roboto/Roboto-Regular.ttf'),
     'Roboto-Light' : require('./assets/Roboto/Roboto-Light.ttf'),
     'Roboto-Regular' : require('./assets/Roboto/Roboto-Regular.ttf'),
     'Roboto-Black' : require('./assets/Roboto/Roboto-Black.ttf'),
     'Roboto-Thin' : require('./assets/Roboto/Roboto-Thin.ttf'),
     'Raleway-Black': require('./assets/Raleway/Raleway-Black.ttf'),
     'Raleway-Bold': require('./assets/Raleway/Raleway-Bold.ttf'),
     'Raleway-SemiBold': require('./assets/Raleway/Raleway-SemiBold.ttf'),
     'Raleway-Medium': require('./assets/Raleway/Raleway-Medium.ttf'),
     'Raleway-Regular': require('./assets/Raleway/Raleway-Regular.ttf')

    })
    return true
 }

  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [loadPreload , setloadPreload] = useState(true)

  useEffect(()=>{
    loadFont().then(()=>{
      setTimeout(() => {
        setloadPreload(false)
      }, 2000);
    })
 
  })
  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  
  } else {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' ?<StatusBar backgroundColor="white"  />:<StatusBar translucent={false} barStyle="dark-content" hidden={loadPreload ? true : false} animated={true} backgroundColor="white" />}
        {/* <Preload/> */}
        {loadPreload ? <Preload/> : <AppNavigator/>}
        
      </View>
    );
  }
}

async function loadResourcesAsync() {
  await Promise.all([
    Asset.loadAsync([
      require('./assets/images/robot-dev.png'),
      require('./assets/images/robot-prod.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Ionicons.font,
      // We include SpaceMono because we use it in HomeScreen.js. Feel free to
      // remove this if you are not using it in your app
      'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
