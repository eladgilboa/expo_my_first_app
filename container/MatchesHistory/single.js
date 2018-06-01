/**
 * Created by elad.gilboa on 03/09/2017.
 */
import React from 'react';
import {connect} from 'react-redux'
import {StyleSheet, Text, Image,View} from 'react-native';
import {Card, Button, Icon, Avatar} from 'react-native-elements';
import * as actions from '../../actions';
import cardStyle from '../../style/card';
import styleVariables from '../../style/styleVariables'
import moment from 'moment'

import TypeButton from '../../components/TypeButton'
import Clock from '../../components/Clock'
import ScoreBord from '../../components/ScoreBord'
import GoalsBreakdown from '../../components/GoalsBreakdown'
import OnScoreEvent from '../../components/OnScoreEvent'
import BackgroundImage from '../../components/BackgroundImage'

class MatchesHistorySingle extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;
        const title = params.matchId  ? moment(params.matchId).format('ddd, DD.MM.YY HH:mm') : 'loading';
        return {
            title,
            tabBarVisible : true,
            tabBarIcon: ({focused, tintColor}) => {
                return ( <Icon
                  type="custom"
                  name='time'
                  color={ tintColor }
                /> )
            }
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            scoredTeam : false,
            choseScorer: false,
            choseAssist: false,
        };
        this.goal = {
            scorer : null,
            assist : null,
        }
    }

    onDelete(){
        const { deleteMatch, match, navigation } = this.props;
        this.setState({loading:true}, ()=>{
            navigation.goBack(null);
            deleteMatch(match.date);
        });
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
        const { updateMatch, match } = this.props;
        const goal = {...this.goal};
        const newMatch = {...match };

        newMatch[this.state.scoredTeam].goals.push(goal);
        updateMatch(newMatch);
        this.clearGoal();
    }

    clearGoal(){
        this.goal = {};
        this.setState({
            chose : false,
            scoredTeam : false,
        })
    }

    onGoalDelete(team,goalIndex){
        const { updateMatch, match } = this.props;
        const newMatch = {...match };

        //console.log('goal delete',newMatch);
        newMatch[team].goals.splice(goalIndex, 1);
        updateMatch(newMatch);
    }

    render() {
        const { match, playersList } = this.props;
        const { scoredTeam, chose } = this.state;

        if(!match){
            return null;
        }



        return (
            <View style={{flex:1,padding:10,paddingTop:0, justifyContent:'flex-end'}}>
                <BackgroundImage/>
                {
                    !scoredTeam &&
                    <Clock date={match.date} duration={match.duration}/>
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
                    <GoalsBreakdown
                        teamAGoals={match.teamA.goals}
                        teamBGoals={match.teamB.goals}
                        playersList={playersList}
                        onGoalDelete={this.onGoalDelete.bind(this)}
                    />
                }
                <ScoreBord
                    score={{ teamA : match.teamA.goals.length, teamB : match.teamB.goals.length }}
                    onGoalScored={this.onGoalScored.bind(this)}
                />
                {
                    !scoredTeam &&
                    <View style={style.actionContainer}>
                        <TypeButton
                            icon={{type:'entypo',name:'trash'}}
                            type="error"
                            title='Delete'
                            onPress={ this.onDelete.bind(this) }
                        />
                    </View>
                }
            </View>
        );
    }
}

const style = {
    actionContainer:{
        flexDirection:'row',
        flex:0,
        marginTop:3,
    }
}

const getPlayersFromCollection = (collection, playersId) => (
    collection.filter( ({id}) => (
        playersId.indexOf(id) > -1
    ))
);

const mapStateToProps = (state, props) => {
    const { playersList, matches } = state;
    const matchId = props.navigation.state.params && props.navigation.state.params.matchId;
    const match = matches.find( ({date}) => date === matchId );

    if(!match){
        //console.error('no match was found in history match single : ', matchId );
        return {};
    }

    return {
        playersList,
        match,
        teamA:{
            players : getPlayersFromCollection(playersList,match.teamA.players),
            goals : match.teamA.goals
        },
        teamB:{
            players : getPlayersFromCollection(playersList,match.teamB.players),
            goals : match.teamB.goals
        }
    }
}

const mapDispatchToProps = {
    ...actions
};

export default connect(mapStateToProps,mapDispatchToProps)(MatchesHistorySingle)