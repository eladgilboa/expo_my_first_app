/**
 * Created by elad.gilboa on 03/09/2017.
 */
import React from 'react';
import {connect} from 'react-redux'
import {StyleSheet, ScrollView} from 'react-native';
import {List, ListItem, Icon, Avatar} from 'react-native-elements';
import styleVariables from '../style/styleVariables';
import PlayersList from '../components/PlayersList';
import _ from 'lodash';


class AllPlayersList extends React.Component {

    static navigationOptions = ({ navigation }) => {
        //const params = navigation.state.params || {};

        return {
            title: 'Players',
            headerRight: <TypeButton
              iconRight={{type:"ionicon",name:'ios-person-add',color:styleVariables.primeBlue}}
              title='New Player'
              onPress={()=> navigation.navigate({ routeName: 'form' })}
            />,
            tabBarIcon: ({focused, tintColor}) => {
                return ( <Icon
                  type="ionicon"
                  name='ios-people'
                  color={ tintColor }
                /> )
            }
        };
    };

    onPlayerPress(id){
        const {playersList, navigation} = this.props;
        navigation.navigate('PlayerView',{
            player:playersList.find( player => player.id === id )
        })
    }

    render() {
        const {playersList} = this.props;

        return (
            <PlayersList onPress={ this.onPlayerPress.bind(this)} playersList={playersList} />
        );
    }
}

function aggregateMatchesByPlayer({matches,playersList}){

    let newPlayersList = playersList.map( player => Object.assign(player,{ wins:0, draw:0, played:0, goals:0, assists:0 }));

    function runOnTeam( team, goalGap ){
        if(!team || !team.players){
            console.log(teamA);
            return;
        }
        for( const playerId of team.players){
            let player = _.find( newPlayersList, {id:playerId} );
            if(goalGap > 0){
                player.wins++;
            } else if(goalGap === 0 ){
                player.draw++;
            }
            player.played++;
        }
        for( const goal of team.goals){
            _.find( newPlayersList, {id:goal.scorer} ).goals++;
            if(goal.assist){
                _.find( newPlayersList, {id:goal.assist} ).assists++;
            }
        }
    }

    for (let match of matches ) {
        const {teamA,teamB} = match;
        if(!teamA || !teamB || !teamA.players || !teamB.players ){
            continue;
        }
        runOnTeam( teamA, teamA.goals.length - teamB.goals.length );
        runOnTeam( teamB, teamB.goals.length - teamA.goals.length );
    }

    return newPlayersList;
}

const mapStateToProps = (state, props) => {
    //const {playersList,matches} = state;
    return {
        playersList: aggregateMatchesByPlayer(state),
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {

}

export default connect(mapStateToProps)(AllPlayersList)