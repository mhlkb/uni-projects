import React from 'react';
import { Button, Image, View, Text, FlatList, ListView, SectionList, ListItem, ScrollView, TouchableOpacity,TouchableHighlight, TextInput, CustomKeyboardAvoidingView, StyleSheet } from 'react-native';

const styles = StyleSheet.create ({
   op: {
      marginTop: 30,
      
      textAlign: 'center',
      color: 'black',
      lineHeight:30,
      fontSize: 30
   }
})
const TodoItem = ({item, index , onPressRemove,changeEvent}) =>
  (
    <View  style={styles.op}>
      <TextInput style={{fontSize: 17, lineHeight: 30, textAlign: 'center' }} placeholder={item.name}/>
      <TouchableOpacity style={{fontSize: 17, lineHeight: 30, textAlign: 'center' }} onPress={()=> changeEvent}
      >Press me 
      </TouchableOpacity>
      <TouchableHighlight 
        onPress={() => onPressRemove(index)}
      >
        <View >
               <Text style={{fontSize: 17, lineHeight: 30, textAlign: 'center' }}>
                       Delete
               </Text>
        </View>
    </TouchableHighlight>
    </View>
  );

export default TodoItem;
