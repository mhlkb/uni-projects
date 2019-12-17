import React from 'react';

import {View, Button, StyleSheet} from 'react-native';

import Constants from 'expo-constants'



const StartScreen = props => (

    <View style={styles.container}>

        <Button title="press to start" onPress={() => props.navigation.navigate("Pages")} />

    </View>

    )



export default StartScreen

const styles = StyleSheet.create({

	container: {

		paddingTop: Constants.statusBarHeight,

		flex: 1,

		backgroundColor: '#fff',

		justifyContent: 'center',

  }});
