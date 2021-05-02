import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MyHeader from '../components/Header'
import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { SearchBar } from 'react-native-elements'
import db from '../config'
import { FlatList } from 'react-native';

export default class ReadStoryScreen extends React.Component {
  constructor(){
    super()
    this.state={
      allStories:[],
      search:'',
      dataSource:[]
    }
  }
  componentDidMount(){
    this.retrieveStories()
  }
  retrieveStories=()=>{
    try{
      var allStories=[]
      db.collection('stories').get()
      .then((snapshot)=>{
        snapshot.forEach((doc)=>{
          allStories.push(doc.data())
        })
        this.setState({
          allStories:allStories
        })
      })
    }
    catch(error){
    console.error(error)  
    }
  }
  SearchTitle=(text)=>{
    const newData=this.state.allStories.filter((item)=>{
      const itemData=item.title?item.title.toUpperCase():''
      const textData=text.toUpperCase()
      const i=itemData.indexOf(textData)
      const t = i!==-1?this.state.allStories[i]:'Story Does Not Exist Yet'
      return(t)
    })
    this.setState({
      dataSource:newData
    })
  }
    render(){
  return (
    <SafeAreaProvider>
    <View>
      <MyHeader
      title='Read Story'
      />
      <View style={style.ViewStyles}>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={(text)=>{
          this.setState({
            search:text
          })
          this.SearchTitle(text)
        }}
        value={this.state.search}
      />
      <FlatList
      data={this.state.search===''?this.state.allStories:this.state.dataSource}
      renderItem={({item})=>{
        <View>
          <Text>
            {item.title}
          </Text>
          </View>
      }}
      keyExtractor={(item,index)=>{
        index.toString()
      }}
      ></FlatList>
    </View>
    </View>
    </SafeAreaProvider>
  );
}
}
const style=StyleSheet.create({
  styles:{
    width:100,
    allignItem:'center',
    justifyContent:'center'
  },
  ViewStyles:{
    allignItem:'center',
    justifyContent:'center'
  }
})