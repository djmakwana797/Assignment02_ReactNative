/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {  StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

export default function App(){
  const [people, setPeople] = useState([
    {fname: 'komal', lname: 'papaniya', prof: 'Data Scientist', key: '1'},
    {fname: 'riya',lname: 'chauhan', prof: 'Designer', key: '2'},
    {fname: 'jiya',lname: 'badrakiya', prof: 'Designer', key: '3'},
    {fname: 'riddhi',lname: 'odedra', prof: '.Net Developer', key: '4'},
    {fname: 'disha',lname: 'patel', prof: 'iOS Developer', key: '5'},
    {fname: 'nilesh',lname: 'raiyani', prof: 'Android Developer', key: '6'},
    {fname: 'mayur',lname: 'parmar', prof: 'React Native Developer', key: '7'},
    {fname: 'manish',lname: 'tervadiya', prof: 'Android Developer', key: '8'}
  ])

  const pressHandler = (key) => {
    // console.log(key);
    setPeople((prevPeople)=>{
      return prevPeople.filter(person=>person.key!=key)
    })
  }

  return(
    <View style={styles.container}>
      {/* <ScrollView>
        {people.map((item)=> {
          return(
            <View key={item.key}>
              <Text style={styles.item}>{item.name}</Text>
            </View>
          )
        })}
      </ScrollView> */}
      <Text style={styles.head}>Users</Text>
      <FlatList
        keyExtractor={(item)=>item.key}
        data = {people}
        renderItem={({item})=>(
          <TouchableOpacity onPress={() => pressHandler(item.key)}>
            <View style={styles.item}>
              <Text style={styles.name}>{item.fname+" "+item.lname}</Text>
              <Text style={styles.proffesion}>{item.prof}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 20
  },
  head:{
    fontSize: 28,
    margin: 10,
    color: '#212738',
    fontFamily: 'RobotoMono-Bold',
    alignSelf:'center',
  },
  item:{
    marginTop: 24,
    padding: 24,
    backgroundColor: '#212738',
    fontFamily: 'RobotoMono-Light',
    borderRadius: 10, 
  },
  name:{
    fontSize: 28,
    color: '#edf2ef',
    textTransform: 'capitalize'
  },
  proffesion:{
    color: '#edf2ef',
    fontSize: 20,
  }
})
