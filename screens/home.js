 import React from 'react';
 import {  StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
 
 export default function Home({navigation}){
   const people = [
     {club: 'Chess', imageSource: require('../assets/icons/chess.png'), fees: '300', key: '0'},
     {club: 'Cricket', imageSource: require('../assets/icons/cricket.png'), fees: '500', key: '1'}, 
     {club: 'Dance', imageSource: require('../assets/icons/dance.png'), fees: '500', key: '2'}, 
     {club: 'Football', imageSource: require('../assets/icons/football.png'), fees: '200', key: '3'},
     {club: 'Singing', imageSource: require('../assets/icons/singing.png'), fees: '400', key: '4'},
     {club: 'Speed-skating', imageSource: require('../assets/icons/speed-skating.png'), fees: '300', key: '5'},
     {club: 'iOS', imageSource: require('../assets/icons/ios.png'), fees: '200', key: '6'}, 
     {club: 'Android', imageSource: require('../assets/icons/android.png'), fees: '200', key: '7'},
     {club: 'problem-solvig', imageSource: require('../assets/icons/problem-solving.png'), fees: '200', key: '8'},
   ]
 
   const pressHandler = (key) => {
      navigation.navigate('JoinClub',{name:people[key]['club']});
   }

   // functions for item
 
   return(
     <View style={styles.container}>
       <Text style={styles.head}>Clubs</Text>
       <FlatList
         showsVerticalScrollIndicator={false}
         keyExtractor={(item)=>item.key}
         data = {people}
         renderItem={({item})=>(
           <TouchableOpacity onPress={() => pressHandler(item.key)}>
             <View style={styles.item}>
               <Image style={styles.itemImage} source={item.imageSource}/>
               <View>
                 <Text style={styles.name}>{item.club}</Text>
                 <Text style={styles.fees}>{"Joining fees: "+item.fees+" rs"}</Text>
               </View>
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
     flex:1,
     flexDirection: 'row',
     marginTop: 24,
     padding: 20,
     backgroundColor: '#212738',
     fontFamily: 'RobotoMono-Light',
     borderRadius: 10, 
   },
   itemImage:{
     width: 60,
     height: 60,
     backgroundColor: '#fff',
     borderRadius: 6
   },
   name:{
     fontSize: 24,
     marginLeft: 20,
     color: '#edf2ef',
     textTransform: 'capitalize'
   },
   fees:{
     marginLeft: 20,
     color: '#edf2ef',
     fontSize: 18,
   },
 })
 