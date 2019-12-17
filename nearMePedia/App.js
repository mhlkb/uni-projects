import React from 'react';

import {createSwitchNavigator, createAppContainer} from 'react-navigation'

import {createStackNavigator} from 'react-navigation-stack'

import {createBottomTabNavigator} from 'react-navigation-tabs'

import Ionicons from 'react-native-vector-icons/Ionicons'

import Pages from './Pages'

import ReadingListScreen from './screens/ReadingListScreen'

import LocationsScreen from './screens/LocationsScreen'

import StartScreen from './screens/StartScreen'

import CurrentLoc from './screens/CurrentLoc'

import {Provider} from 'unstated'





const stackRoutes = {

	
Pages: Pages,
	ReadingList: ReadingListScreen,
 CurrentLoc: CurrentLoc,
 Location: LocationsScreen,


}

const stackOptions = {

	initialRouteName: 'Pages'

}

const StackNavigator = createStackNavigator(stackRoutes, stackOptions)



const getIcon = (name, focused, tint) => {

	const color = focused?tint:"grey"

	return <Ionicons name={name} size={25} color={color} />

}



const tabRoutes = {

	Pages: StackNavigator,

  ReadingList: ReadingListScreen,
  
	Locations: LocationsScreen,
 


}

StackNavigator.navigationOptions = {

	tabBarIcon: ({focused, tint}) => getIcon("ios-book", focused, tint),

}
ReadingListScreen.navigationOptions = {

	tabBarIcon: ({focused, tint}) => getIcon("ios-folder", focused, tint),

}

LocationsScreen.navigationOptions = {

	tabBarIcon: ({focused, tint}) => getIcon("ios-globe", focused, tint),

}

const TabNavigator = createBottomTabNavigator(tabRoutes)



const switchRoutes = {

	Start: StartScreen,

	Main: TabNavigator

}

const switchOptions = {

	initialRouteName: 'Start'

}

const AppNavigator = createSwitchNavigator(switchRoutes, switchOptions)



const AppContainer = createAppContainer(AppNavigator)



const App = props =>  (

	<Provider>

		<AppContainer/>

	</Provider>

)



export default App;