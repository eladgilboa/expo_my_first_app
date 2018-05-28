import React from 'react';
import { Font } from 'expo';
import { Provider } from 'react-redux'
import 'react-native-vector-icons';
import createReduxStore from './store/createReduxStore'
import { View, Dimensions, StyleSheet,AsyncStorage,Text } from 'react-native';

import { persistStore } from 'redux-persist'
import styleVariables from './style/styleVariables';
import MainScreenNavigator from './screensNavigator';

var initialState ={
    playersList:[],
    matches:[],
    tempMatch: {
        date : Date.now(),
        duration:{
            value:0,
            isPaused:true,
            lastUpdate:0
        },
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

export default class App extends React.Component {

    state = {
        fontLoaded: false,
    };

    async componentDidMount() {
        await Font.loadAsync({
            'custom': require('./fonts/custom/font/custom.ttf')
        });
        this.setState({ fontLoaded: true });
    }

    render() {
        if(!this.state.fontLoaded){
            return <Text>Loading...</Text>;
        }
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
