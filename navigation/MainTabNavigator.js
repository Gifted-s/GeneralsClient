import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ListMessages from '../screens/ListMessage';
import PlayComponent from '../screens/PlayMessage';
import Preload from '../screens/Preload';
import Share from '../screens/Share';
import CategoryScreen from '../screens/Category';
import SortedMessage from '../screens/SortedMessage';
import Test from '../screens/Test';
const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    
    ListMessages:ListMessages,
    PlayComponent:PlayComponent
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Ministers',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-folder'
      }
    />
  ),
};

HomeStack.path = '';

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);


LinksStack.navigationOptions = {
  tabBarLabel: 'All Messages',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-list'} />
  ),
};


const CategoryStack = createStackNavigator(
  {
    
     CategoryScreen: CategoryScreen,
   
    SortedScreen:SortedMessage
  },
  config
);


CategoryStack.navigationOptions = {
  tabBarLabel: 'Categories',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-grid'} />
  ),
};







const ShareStack = createStackNavigator(
  {
    Share: Share,
  },
  config
);

ShareStack.navigationOptions = {
  tabBarLabel: 'Share a message',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-share'} />
  ),
};

LinksStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'About Generals',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-information'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createMaterialTopTabNavigator({
  HomeStack,
  CategoryStack,
  LinksStack,
  ShareStack,
  SettingsStack
  
},
{
  swipeEnabled:true,
  animationEnabled:true,
  tabBarPosition:'bottom',
  tabBarOptions:{
    
    showIcon:true,
    style:{
       backgroundColor:'rgba(0,0,0,0.02)',
       height:77,
       
       paddingHorizontal:0,
       paddingVertical:6,
       borderTopColor:'rgba(0,0,0,0.01)',
      //  elevation:30
  
    },
    activeTintColor:'black',
    inactiveTintColor:'grey',
    labelStyle:{
      fontSize:6,
      fontFamily:'Raleway-Medium'
    }
  }
  
});

tabNavigator.path = '';

export default tabNavigator;
