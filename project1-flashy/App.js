import React from 'react';
import { Button, Image, View, Text, FlatList, ListView, SectionList, ListItem, ScrollView, TouchableOpacity,TouchableHighlight, TextInput, CustomKeyboardAvoidingView, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import deckss from './flashcards';
import TodoItem from './TodoItem';
import DeckItem from './DeckItem';

const styles = StyleSheet.create ({
   input: {
      marginTop: 10,
      textAlign: 'center',
      color: 'black',
      lineHeight:30,
      fontSize: 17
   }
})
class HomeScreen extends React.Component {
  static navigationOptions = {
    
    headerRight: () => (
      <Button
        onPress={() => alert('For renaming the deck, just click on the name of the deck, you will be able to change it.')}
        title="Info"
        color="black"
      />
    ),
  };
  constructor(props) {
    super(props);
    
    this.state = {
      text: '',
      decks: [],
      deckss: deckss,
      name:'',
     
    };
    
  }
    onSubmit = () => {
      if (this.state.text) {
        this.setState(prevState => ({
          text: '',
          decks: [...prevState.decks,
            { name: prevState.text}]
        }));
        this.textInput.setNativeProps({ text: '' });
      }
    }
    onPressRemove = (index) => {
      this.setState(prevState => ({
        decks: prevState.decks.filter((_, i) => i !== index)
      }));
      }
      
    keyExtractor = (item, index) => index;

    separator = () => <View  />;

 renderItem = ({ item, index }) => (
      <TodoItem
        item={item}
        index={index}
        onPressRemove={this.onPressRemove}
        changeEvent = {this.props.navigation.navigate('AddD',{decks: this.state.decks.name})}
      />
    );

    handleDelete = (index) => {
       deckss.splice(index, 1);
  }
  render() {
    
    /* 2. Read the params from the navigation state */
       return (
        <ScrollView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }, styles.input}>
        
         <TextInput
       
            placeholder="add deck"
            onChangeText={text => this.setState({ text })}
            ref={(component) => { this.textInput = component; }}
            autoFocus
          />
          <TouchableOpacity onPress={() => this.props.navigation.navigate('AddD',{decks: this.state.decks.name})}>
          <Button          
                            title='add deck'
                    onPress={this.onSubmit}/>
          
          <View  >
           <FlatList
            style={styles.input}
            ItemSeparatorComponent={this.separator}
            data={this.state.decks}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
          />
           
          </View>
          
          </TouchableOpacity>
            {
                 Object.values(deckss).map((deck, index) => {
                        return  (
         <div>
                                    <DeckItem
                                    delEvent={this.handleDelete.bind(this,index)} 
                                    name={deck.name}
                                    clickEvent={() => this.props.navigation.navigate('Decks', { 
                                     deck: deck })}
                > </DeckItem>    
                               </div> 
                             
                                 
                          )
                      
                 }) 
          }
         
        </ScrollView>
    );
  }
}

class DecksScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      title: ' deck',
      /* These values are used instead of the shared configuration! */
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor,
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor,
    };
  };

  render() {
     const navigation = this.props.navigation
        const deck = navigation.getParam('deck')
        
    /* 2. Read the params from the navigation state */
       return (
        <View styles={{flex:1, textAlign:'center', alignItems:'center', marginTop: 30, justifyContent:'center'}} >
        <View style={[{ width: "70%", margin: 45,  justifyContent:'center', marginDown: 10 }]}>
             
            

 </View>
   <View style={[{ width: "70%", margin: 45, justifyContent: 'center', marginTop: 1}]}>
                <Button
                    title = 'Start'
                    onPress={() => navigation.navigate('Cards', { deck, })}
                >
                   
                </Button>
                 </View>
          </View>
   
    );
  }
}

class CardsScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;
 
        const deck = navigation.getParam('deck')
        const right = []
    return {
      title: 'Flash Cards',
      /* These values are used instead of the shared configuration! */
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor,
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor,
    };
  };
  state = {
        currentQuestion: 0,
        correctCount: 0,
        faceUp: true,
        deckss: deckss.cards,
        deckList: [],
        isWrongFirst: true,
        rights: [],
        wrongs: [],
        
    }

    static getDerivedStateFromProps(props) {
        const { deck } = props.navigation.state.params
        return { deck }
    }

    handleCorrect = (item) => {
    const cards = this.state.deck.cards;
    
        this.setState((prevState) => ({
            correctCount: ++prevState.correctCount,
            currentQuestion: ++prevState.currentQuestion, 
            rights: [{...prevState.front, ...prevState.back},]
            
        }))
    }

    handleIncorrect = () => {
    const cards = this.state.deck.cards;
        this.setState((prevState) => ({
            currentQuestion: ++prevState.currentQuestion,
            wrongs: [{...prevState.front, ...prevState.back},]
        }))
    }
   
    toggleFace = () => {
        this.setState((prevState) => ({
            faceUp: !prevState.faceUp
        }))
    }
    handleCardDelete = (index) =>{
      deckss.splice(index,1);
    }

    
   toggleSort = () =>{
  const {deckList} = this.state
    let newDeck = deckList
    
      newDeck = deckList.sort((a, b) => a.wrongs - b.rights)
    this.setState({
      
      deckList: newDeck,
      currentQuestion: 0,
      correctQuestion: 0,
      faceUp: true,
    })
    }
  render() {
    /* 2. Read the params from the navigation state */
   const { currentQuestion } = this.state
        const totalQuestions = this.state.deck.cards.length
        const { front, back } = (totalQuestions) && (currentQuestion < totalQuestions)
            ? this.state.deck.cards[currentQuestion]
            : { front: null, back: null }
    
    
    return(
              (currentQuestion >= totalQuestions) ? 
                
                <Button style={{marginTop: 40 }} title='re-start'
                      color='blue'
                       onPress={()=>this.toggleSort()}
                      />
            
            
                :                
                    <ScrollView style={[{ width: "70%", margin: 45,  justifyContent:'center', marginDown: 10 }]}>
                        <View >
                            <Text >
                                {
                                    `${currentQuestion + 1} / ${totalQuestions}`
                                }
                            </Text>
                            <Text style={{justifyContent:'center', fontSize:20}}>
                                {
                                    (this.state.faceUp) ? front : back
                                }
                            </Text>
                            <TouchableOpacity
                                onPress={this.toggleFace}
                            >
                                <Text >
                                    {
                                        `SHOW ${(this.state.faceUp) ? 'ANSWER' : 'QUESTION'}`
                                    }
                                </Text>
                            </TouchableOpacity>
                            <View style={{
                                alignItems: 'center',
                                flexDirection: 'row',   justifyContent:'center', marginTop: 20, marginBottom:20 

                            }}>
                                <View style ={{width:'50%'}}>
                                    <Button
                                        title='RIGHT'
                                        color= 'green'
                                        onPress={this.handleCorrect}
                                    >
                                       
                                    </Button>
                                </View>
                                <View style ={{width:'50%'}}>
                                    <Button
                                        title='WRONG'
                                        color='red'
                                        onPress={this.handleIncorrect}
                                    >
                                      
                                    </Button>
                                </View>
                               
                            </View>
                                
                        </View >
                    </ScrollView>
     
    );
  }
}
class AddCScreen extends React.Component {
  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      title: 'Add Cards',
      /* These values are used instead of the shared configuration! */
      headerStyle: {
        backgroundColor: navigationOptions.headerTintColor,
      },
      headerTintColor: navigationOptions.headerStyle.backgroundColor,
    };
  };

  constructor(props) {
    super(props);
    this.state = { front: "", back: "" }
  }
  handleFrontChange = front => {
        this.setState({front: front}, this.validateForm)
    }

    handleBackChange = back => {
        
            this.setState({back: back}, this.validateForm)
    }
     handleSubmit = () => {
        this.props.onSubmit({front: this.state.front, back: this.state.back})
     }
  render() {
    /* 2. Read the params from the navigation state */
    
    return (
    <View>
                <Text>Front</Text>
                <TextInput 
                value={this.state.front}
                        onChangeText={this.handleFrontChange}
                      
                        />
                <Text>Back</Text>
                <TextInput 
                         value={this.state.back}
                        onChangeText={this.handleBackChange} /> />
               <Button 
                        title="Add Card"
                        onPress={() =>this.handleSubmit}
                       
                     />
            </View>
           
           
    );
  }
}



const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Decks: {
      screen: DecksScreen,
    },
    Cards: {
      screen: CardsScreen,
    },
     AddC: {
      screen: AddCScreen,
    },
    
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'blue',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
    }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

