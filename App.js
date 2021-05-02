import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createAppContainer} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import ReadStoryScreen from './screens/ReadStory'
import WriteStoryScreen from './screens/WriteStory'

export default class App extends React.Component {
  render(){
  return(
<AppContainer/>
  )
}
}
const TabNavigator = createBottomTabNavigator({
  ReadStory: {screen: ReadStoryScreen},
  WriteStory: {screen: WriteStoryScreen},
})
const AppContainer=createAppContainer(TabNavigator)