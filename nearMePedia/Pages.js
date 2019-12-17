import React, {Component} from 'react';
import { Text, View, Image, StyleSheet, ActivityIndicator,TouchableOpacity, FlatList,Button, ScrollView, Alert, Linking} from 'react-native';


import styles from './style'





export default class Pages extends Component{
	constructor(props){
	super(props);
	this.state ={ load: this.props.navigation.state.load, 
  pages:[],
  coords:"37.7891838|-122.4033522", }
}


componentDidMount(){


var url = "https://en.wikipedia.org/w/api.php"; 

var params = {
    action: "query",
    list: "geosearch",
    gscoord: this.state.coords,
    gsradius: "10000",
    gslimit: "10",
    format: "json"
};

url = url + "?origin=*";
Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

fetch(url)
    .then(function(response){return response.json();})
    .then((responseJson) => {
                    this.setState({
                        isLoading: false,
                        pages: responseJson.query.geosearch,
                }, function(){

                });
            })
    .then(function(response){
	      var pages = response.query.geosearch;
        for (var place in pages) {
          
            console.log(pages[place].title);
        }
    })
    .catch(function(error){console.log(error);});




}
toUrl = (item) => {
  var url = "https://en.wikipedia.org/wiki/"+`${item.title}`;
       Linking.openURL(url);
   }
render(){



        return (
          
            <ScrollView >
            {
               this.state.pages.map((item, index) => (
                 <ScrollView >
                  <TouchableOpacity
                     key = {item.id}
                     
                     onPress = {() => this.toUrl(item)}>
                     <Text style={styles.pages}>
                        {item.title}
                     </Text>
                    
                  </TouchableOpacity>
                  <Button title = 'fav'       />
                </ScrollView>
               ))
            }
                

            
</ScrollView>


        );
    }
}


Pages.navigationOptions = ({navigation }) => (

    {coords: navigation.getParam("coord"), title:"Pages"})