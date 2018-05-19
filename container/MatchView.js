/**
 * Created by elad.gilboa on 03/09/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {StyleSheet, View, Picker, ScrollView} from 'react-native';
import {Icon, Avatar, FormLabel, Text, Card, Divider, Badge, Button, registerCustomIconType} from 'react-native-elements';
import styleVariables from '../styleVariables';
import ScoreBord from '../components/ScoreBord';
import PlayerList from '../components/PlayersList';
import BackgroundImage from '../components/BackgroundImage';
import GoalsBreakdown from '../components/GoalsBreakdown';

import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../fonts/custom/config.json';
registerCustomIconType('custom', createIconSetFromFontello(fontelloConfig));

class MatchView extends React.Component {
    static navigationOptions = {
        title: 'Match View',
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
        };
        this.goal = {
            scorer : null,
            assist : null,
        }
    }

    componentWillReceiveProps(nextProps) {
        //console.log('view',nextProps.tempMatch)
    }
    
    saveGame(){
        //const match = {...this.match,...this.props.teams};
        //this.props.addMatch(match);
        //navigation.navigate('PlayerView',{
        //    player:playersList.find( player => player.id === id )
        //})
    }

    onGoalScored(team){
        this.setState({ scoredTeam : team, choseScorer : true })
    }

    onScorerSelected(playerId){
        this.goal.scorer = playerId;
        this.setState({ choseAssist: true, choseScorer : false })
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
            choseAssist : false,
            choseScorer : false,
            scoredTeam  : false,
        })
    }

    render() {
        const { playersList, tempMatch } = this.props;
        const { scoredTeam, choseAssist, choseScorer } = this.state;

        return (
            <View style={{flex:1,padding:10, justifyContent:'flex-end'}}>
                <BackgroundImage/>
                {
                    scoredTeam && choseScorer &&
                    <View style={style.playersContainer}>
                        <View style={{alignItems:'center',paddingTop:8}}>
                            <Text style={{color:styleVariables.primeBlue,fontSize:22}}>Who Scored?</Text>
                        </View>
                        <PlayerList playersList={tempMatch[scoredTeam].players} onPress={this.onScorerSelected.bind(this)}/>
                    </View>
                }
                {
                    scoredTeam && choseAssist &&
                    <View style={style.playersContainer}>
                        <View style={{alignItems:'center',paddingTop:8}}>
                            <Text style={{color:styleVariables.primeBlue,fontSize:22}}>Who Assisted?</Text>
                        </View>
                        <PlayerList playersList={tempMatch[scoredTeam].players} onPress={this.onAssistSelected.bind(this)}/>
                    </View>
                }
                {
                    scoredTeam &&
                    <View style={{flexDirection:'row',marginVertical:3}}>
                        <Button
                          buttonStyle={[style.button,style.buttonSkip]}
                          containerViewStyle={{flex:1,margin:0}}
                          disabled={ !this.goal.scorer }
                          disabledStyle={{backgroundColor:styleVariables.nivel1, opacity:0.4}}
                          iconRight={{name: 'done'}}
                          title='SKIP'
                          onPress={this.saveGoal.bind(this)}
                        />
                        <Button
                          buttonStyle={[style.button,style.buttonCancel]}
                          containerViewStyle={{flex:1, margin:0}}
                          //disabled={ this.state.teamA.length === 0 || this.state.teamB.length === 0 }
                          iconRight={{name: 'close'}}
                          title='CANCEL'
                          onPress={this.clearGoal.bind(this)}
                        />
                    </View>
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
    playersContainer : {
        flex:1,
        backgroundColor: styleVariables.nivel1,
        opacity:0.8,
        borderRadius:3,
        margin:0,
    },
    buttonCancel:{
        backgroundColor: styleVariables.primeRed + '99'
    },
    buttonSkip:{
        backgroundColor: styleVariables.primeGreen + '99'
    },
    button:{
        borderRadius:3,
        borderWidth:1,
        borderColor:styleVariables.lineColor,
    }
}

const mapStateToProps = (state, props) => {
    return {
        playersList: state.playersList,
        tempMatch: state.tempMatch,
    }
};

const mapDispatchToProps = {...actions};

export default connect(mapStateToProps,mapDispatchToProps)(MatchView)