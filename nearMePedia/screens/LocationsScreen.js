import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet,TouchableOpacity, TextInput, Button ,ScrollView } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';



class Loc extends React.Component {
  constructor(props){

    super(props);
    this.state = {
    location: {latitude:46.49782636201107, longitude:11.352520870004525
},
    errorMessage: null,
  
  };
  }


componentDidMount(){
  this._Location();
}


_Location = async()=>{
let {status} = await Permissions.askAsync(Permissions.LOCATION);
let location = await Location.reverseGeocodeAsync(this.state.location);
  this.setState({ location });
  
}
  render() {
         
     let text = JSON.stringify(this.state.location);
     return (
      <View style={styles.container}>
      <TouchableOpacity onPress={() => this.props.navigation.navigate("Pages", {coords: '"'+this.state.location.latitude+'|'+this.state.location.longitude+'"'})}>
        <Text style={styles.paragraph}>{text}</Text>
        </TouchableOpacity>
        
      </View>
    );
  }
}



export default class App extends React.Component {          
  render() {
        return (
      <ScrollView style={styles.container}>
      <Text style={{fontSize: 20}}>List of Locations</Text>
        <Loc/> 
        <Button title='Get current location' onPress={() => this.props.navigation.navigate('CurrentLoc')}/>  
        
      </ScrollView>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    
  },
});