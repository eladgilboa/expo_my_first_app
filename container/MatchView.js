/**
 * Created by elad.gilboa on 03/09/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {StyleSheet, View, Picker, ScrollView} from 'react-native';
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
        this.state = {
            scoredTeam : false,
            choseScorer: false,
            choseAssist: false,
            duration : props.duration,
            isPaused : true,
        };
        this.goal = {
            scorer : null,
            assist : null,
        }
    }

    componentWillUnmount(){
        this.pauseClock()
    }

    startClock(){
        this.lastUpdateDoration = Date.now();
        this.interval = setInterval( this.updateDuration.bind(this),1000);
        this.setState({isPaused:false})
    }

    pauseClock(){
        clearInterval(this.interval);
        this.saveDuration();
        this.setState({isPaused:true})
    }

    updateDuration(){
        //console.log(this.lastUpdateDoration);
        const now = Date.now();
        const addedTime = now - this.lastUpdateDoration;
        this.lastUpdateDoration = now;
        const duration = this.state.duration + addedTime;
        this.setState({duration});
    }

    saveDuration(){
        const { setTempMatchDuration, tempMatch } = this.props;
        //const newTempMatch = {...tempMatch };
        //newTempMatch.duration = this.state.duration;
        const duration = this.state.duration;
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
                    <View style={{flexDirection:'row',flex:1}}>
                        <TypeButton type="error" title='Cancel Match' onPress={ this.clearMatch.bind(this) }/>
                        {
                            isPaused ?
                                <TypeButton title='Start' onPress={ this.startClock.bind(this) }/>
                            :
                                <TypeButton title='Pause' onPress={ this.pauseClock.bind(this) }/>
                        }
                        <TypeButton type="success" title='End Match' onPress={ this.endMatch.bind(this) }/>
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



const style = {}

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