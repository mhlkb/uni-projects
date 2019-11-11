import React from 'react';
import { Button, Image, View, Text, FlatList, ListView, SectionList, ListItem, ScrollView, TouchableOpacity,TouchableHighlight, TextInput, CustomKeyboardAvoidingView, StyleSheet } from 'react-native';

const styles = StyleSheet.create ({
   op: {
      marginTop: 30,
      
      textAlign: 'center',
      color: 'black',
      lineHeight:30,
      fontSize: 17
   }
})

 const DeckItem = (props, index, handleDelete) => {
    let name = props.name
    return (
      <lu>
       <TextInput style={styles.op} onChange={props.changeEvent} placeholder={props.name}/>
        <TouchableOpacity 
                      onPress={props.clickEvent }
                               > Press me  </TouchableOpacity>
      <TouchableOpacity onPress={props.delEvent}>Delete</TouchableOpacity>
      
     </lu>
    )
 }

export default DeckItem;
