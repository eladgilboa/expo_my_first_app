/**
 * Created by elad.gilboa on 03/09/2017.
 */
import React from 'react';
import {connect} from 'react-redux'
import {StyleSheet, Text, Image,View} from 'react-native';
import {Card, Button, Icon, Avatar} from 'react-native-elements';
import * as actions from '../../actions';
import cardStyle from '../../style/card';
import moment from 'moment'
import ScoreBord from '../../components/ScoreBord'
import GoalsBreakdown from '../../components/GoalsBreakdown'
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

    onDelete(){
        const { deletePlayer, navigation, player } = this.props;
        this.setState({loading:true}, ()=>{
            deletePlayer( player );
            navigation.goBack(null);
        });
    }

    render() {
        const { match, playersList } = this.props;

        if(!match){
            return null;
        }

        return (
            <View style={{flex:1}}>
                <BackgroundImage/>
                <Card
                    containerStyle={{...cardStyle,...{flex:0}}}
                >
                    <GoalsBreakdown teamAGoals={match.teamA.goals} teamBGoals={match.teamB.goals} playersList={playersList}/>
                    <ScoreBord
                        score={{ teamA : match.teamA.goals.length, teamB : match.teamB.goals.length }}
                        onGoalScored={false}
                    />
                </Card>
            </View>
        );
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
        console.error('no match was found in history match single : ', matchId );
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