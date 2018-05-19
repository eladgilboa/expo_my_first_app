import React from 'react';
import { Provider } from 'react-redux'
import 'react-native-vector-icons';
import createReduxStore from './store/createReduxStore'
import { View, Dimensions, StyleSheet,AsyncStorage } from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';
import FormPlayer from './container/FormPlayer.js';
import FormMatch from './container/FormMatch';
import MatchView from './container/MatchView'
import AllPlayersList from './container/AllPlayersList';
import PlayerView from './container/PlayerView';
import { persistStore } from 'redux-persist'
import styleVariables from './styleVariables';
import { Font } from 'expo';

var initialState ={
    playersList:[],
    matches:[
        {
            date : new Date('16/9/2007').getTime(),
            teamA: [1,2,3],
            teamB: [4,5,6],
            scorers : [4,1,3,6]
        }
    ],
    tempMatch: {
        date : Date.now(),
        teamA: {
            players:[],
            goals:[]
        },
        teamB: {
            players:[],
            goals:[]
        },
    }
};

AsyncStorage.getItem('KoHotStore', (err, result) => {
    persistStore(reduxStore)
});

const reduxStore = createReduxStore(initialState);

function handleChange() {
    let state = reduxStore.getState();
    try {
        AsyncStorage.setItem('KoHotStore', JSON.stringify(state));
    } catch (error) {
        console.error(error);
    }
};
let unsubscribe = reduxStore.subscribe(handleChange);

const PlayersStack = StackNavigator(
  {
    list : { screen : AllPlayersList },
    PlayerView  : { screen : PlayerView  },
    form : { screen : FormPlayer }
  },
  {
      headerMode: 'float',
      cardStyle : {
          backgroundColor:styleVariables.darkblue
      },
      navigationOptions: {
          headerStyle: {
              backgroundColor : styleVariables.nivel2+'88',
              borderColor: styleVariables.lineColor,
              borderBottomWidth:1,
          },
          headerTintColor: styleVariables.primeYellow,
          headerTitleStyle: {
              fontWeight: '100',
              fontFamily:styleVariables.font_light,
          }
      }
  }
);

const MatchStack = StackNavigator(
  {
      form : { screen : FormMatch },
      matchView  : { screen : MatchView },
  },
  {
      headerMode: 'float',
      cardStyle : {
          backgroundColor:styleVariables.darkblue,
      },
      navigationOptions: {
          headerStyle: {
              backgroundColor : styleVariables.nivel2+'88',
              borderColor: styleVariables.lineColor,
              borderBottomWidth:1,
          },
          headerTintColor: styleVariables.primeYellow,
          headerTitleStyle: {
              fontWeight: '100',
              fontFamily:styleVariables.font_light,
          }
      }
  }
);

const MainScreenNavigator = TabNavigator({
    FormMatch   : { screen : MatchStack   },
    FormPlayer  : { screen : FormPlayer  },
    PlayersList : { screen : PlayersStack },
},{
    tabBarOptions: {
        style: {
            backgroundColor : styleVariables.darkblue,
        },
        indicatorStyle: {
            backgroundColor: styleVariables.primeBlue,
        },
        activeTintColor : styleVariables.primeBlue,
        inactiveTintColor : styleVariables.primeYellow,
        showIcon : true,
        showLabel : false
    },
});

export default class App extends React.Component {

    componentDidMount() {
        Font.loadAsync({
            'custom': require('./fonts/custom/font/custom.ttf')
        });
    }

    render() {
        return (
            <Provider store={reduxStore}>
                <View style={styles.container}>
                    <MainScreenNavigator/>
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //paddingTop: Constants.statusBarHeight,
        backgroundColor: styleVariables.darkblue,
        borderColor: styleVariables.lineColor
    }
});
