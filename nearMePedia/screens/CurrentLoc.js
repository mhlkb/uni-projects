import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet,TouchableOpacity, TextInput, Button ,ScrollView } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default class CurrentLoc extends React.Component {
state = {
     where: {},
  };

componentDidMount(){

 
 let geoOptions = {

            enableHighAccuracy: true,

            timeOut: 20000,

            maximumAge: 60 * 60 * 24

        };

        this.setState({ready:false, error: null });

        navigator.geolocation.getCurrentPosition( this.geoSuccess, 

                                                this.geoFailure,

                                                geoOptions);

}

geoSuccess = (position) => {

        this.setState({

            ready:true,

            where: {latitude: position.coords.latitude,longitude:position.coords.longitude }

        })
        this._LocationCurrent();

    }

    geoFailure = (err) => {

        this.setState({error: err.message});

    }
_LocationCurrent = async()=>{
let { status } = await Permissions.askAsync(Permissions.LOCATION);
   
    let where = await Location.reverseGeocodeAsync(this.state.where);
    this.setState({where: where });
  
}
  render(){
     let current = JSON.stringify(this.state.where);
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>current position</Text>
        <TouchableOpacity>
        <Text style={styles.paragraph}>{current} </Text>
        </TouchableOpacity>
      </View>
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