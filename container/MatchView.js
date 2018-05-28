/**
 * Created by elad.gilboa on 03/09/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {StyleSheet, View, Picker, ScrollView, AppState} from 'react-native';
import {Icon, Avatar, ButtonGroup, Text, Card, Divider, Badge, Button, registerCustomIconType} from 'react-native-elements';
import styleVariables from '../style/styleVariables';
import ScoreBord       from '../components/ScoreBord';
import BackgroundImage from '../components/BackgroundImage';
import GoalsBreakdown  from '../components/GoalsBreakdown';
import OnScoreEvent    from '../components/OnScoreEvent';
import TypeButton      from '../components/TypeButton';
import Clock           from '../components/Clock';

import { NavigationActions } from 'react-navigation';

const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'form' })],
});


import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../fonts/custom/config.json';
registerCustomIconType('custom', createIconSetFromFontello(fontelloConfig));



class MatchView extends React.Component {
    static navigationOptions = {
        title: 'Live Match',
        tabBarIcon: ({focused, tintColor}) => {
            return ( <Icon
                type="material-community"
                name='soccer-field'
                color={tintColor}
            /> )
        }
    };

    constructor(props) {
        super(props);
        const {value,isPaused,lastUpdate} = props.duration;
        this.state = {
            scoredTeam : false,
            choseScorer: false,
            choseAssist: false,
            duration : value,
            isPaused,
            lastUpdateDuration : lastUpdate,
        };
        this.goal = {
            scorer : null,
            assist : null,
        }
        this.ignoreUpdateClock = false;
    }

    componentDidMount() {
        AppState.addEventListener('change', this.handleAppStateChange);
        if(!this.state.isPaused){
            this.startClock(this.state.lastUpdateDuration);
        }
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    handleAppStateChange = (nextAppState) => {
        if (nextAppState.match(/inactive|background/)) {
            console.log('App has come to the background!')
            this.saveDuration();
        }
        //this.setState({appState: nextAppState});
    }

    startClock(lastUpdateDuration=null){
        //this.lastUpdateDoration = Date.now();
        this.setState({ isPaused : false, lastUpdateDuration : lastUpdateDuration || Date.now() }, () => {
            this.interval = setInterval( this.updateDuration.bind(this),1000);
        });
    }

    pauseClock(){
        clearInterval(this.interval);
        this.setState({isPaused:true},()=>{
            this.saveDuration();
        })
    }

    updateDuration(){
        if(this.ignoreUpdateClock){
            return;
        }
        const now = Date.now();
        const addedTime = now - this.state.lastUpdateDuration;
        const lastUpdateDuration = now;
        const duration = this.state.duration + addedTime;
        this.setState({duration,lastUpdateDuration});
    }

    saveDuration(){
        const { setTempMatchDuration, tempMatch } = this.props;
        //const newTempMatch = {...tempMatch };
        //newTempMatch.duration = this.state.duration;
        const duration = {
            value : this.state.duration,
            isPaused : this.state.isPaused,
            lastUpdate : this.state.lastUpdateDuration
        };
        setTempMatchDuration(duration);
    }
    
    saveMatch(){
        const match = {...this.props.tempMatch};
        this.props.addMatch(match);
    }

    endMatch(){
        this.saveMatch();
        this.clearMatch()
    }

    clearMatch(){
        this.clearTempMatch();
        //this.props.navigation.dispatch(resetAction);
    }
    
    clearTempMatch(){
        this.pauseClock();
        this.setState({duration:0});
        this.clearGoal();
        this.props.clearTempMatch()
        this.props.navigation.dispatch(resetAction);
    }

    onGoalScored(team){
        this.ignoreUpdateClock = true;
        this.setState({ scoredTeam : team, chose : 'scorer' })
    }

    onScorerSelected(playerId){
        this.goal.scorer = playerId;
        this.setState({ chose: 'assist' })
    }

    onAssistSelected(playerId){
        this.goal.assist = playerId;
        this.saveGoal();
    }

    saveGoal(){
        this.ignoreUpdateClock = false;
        this.updateDuration();
        const { setTempMatch, tempMatch } = this.props;
        const goal = {...this.goal};
        const newTempMatch = {...tempMatch };

        newTempMatch[this.state.scoredTeam].goals.push(goal);
        setTempMatch(newTempMatch);
        this.clearGoal();
    }

    clearGoal(){
        this.goal = {};
        this.setState({
            chose : false,
            scoredTeam : false,
        })
    }

    render() {
        const { playersList, tempMatch } = this.props;
        const { scoredTeam, chose, duration, isPaused } = this.state;

        return (
            <View style={{flex:1,padding:10, justifyContent:'flex-end'}}>
                <BackgroundImage/>
                {
                    !scoredTeam &&
                    <View style={style.actionContainer}>
                        <TypeButton type="error" title='Cancel' onPress={ this.clearMatch.bind(this) }/>
                        {
                            isPaused ?
                                <TypeButton
                                    icon={{type:'entypo',name:'stopwatch'}}
                                    //iconRight={{type:'entypo',name:'controller-play'}}
                                    title='Start'
                                    onPress={ this.startClock.bind(this) }
                                />
                            :
                                <TypeButton
                                    icon={{type:'entypo',name:'stopwatch'}}
                                    //iconRight={{type:'entypo',name:'controller-paus'}}
                                    title='Pause'
                                    onPress={ this.pauseClock.bind(this) }
                                />
                        }
                        <TypeButton
                            type="success"
                            icon={{type:'custom',name:'whistle'}}
                            title='End'
                            onPress={ this.endMatch.bind(this) }
                        />
                    </View>
                }
                {
                    !scoredTeam &&
                    <Clock date={tempMatch.date} duration={duration} />
                }
                {
                    scoredTeam &&
                    <OnScoreEvent
                        chose    = {chose}
                        onSelect = { chose === 'scorer' ? this.onScorerSelected.bind(this) : this.onAssistSelected.bind(this) }
                        onSave   = {this.saveGoal.bind(this)}
                        onClear  = {this.clearGoal.bind(this)}
                        playersList = {this.props[scoredTeam].players.filter( ({id}) => this.goal.scorer !== id )}
                    />
                }
                {
                    !scoredTeam &&
                    <GoalsBreakdown teamAGoals={tempMatch.teamA.goals} teamBGoals={tempMatch.teamB.goals} playersList={playersList}/>
                }
                <ScoreBord score={{ teamA : tempMatch.teamA.goals.length, teamB : tempMatch.teamB.goals.length }} onGoalScored={this.onGoalScored.bind(this)}/>
            </View>
        );
    }
}



const style = {
    actionContainer:{
        flexDirection:'row',
        flex:0,
        paddingVertical:8,
        backgroundColor:styleVariables.nivel2+'bb',
        borderRadius:3,
    }
}

const getPlayersFromCollection = (collection, playersId) => (
    collection.filter( ({id}) => (
      playersId.indexOf(id) > -1
    ))
);

const mapStateToProps = (state, props) => {
    const { playersList, tempMatch } = state;
    return {
        playersList,
        tempMatch,
        duration:tempMatch.duration,
        teamA:{
            players : getPlayersFromCollection(playersList,tempMatch.teamA.players),
            goals : tempMatch.teamA.goals
        },
        teamB:{
            players : getPlayersFromCollection(playersList,tempMatch.teamB.players),
            goals : tempMatch.teamB.goals
        }
    }
};

const mapDispatchToProps = {...actions};

export default connect(mapStateToProps,mapDispatchToProps)(MatchView)