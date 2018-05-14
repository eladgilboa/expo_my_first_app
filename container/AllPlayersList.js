/**
 * Created by elad.gilboa on 03/09/2017.
 */
import React from 'react';
import {connect} from 'react-redux'
import {StyleSheet, ScrollView} from 'react-native';
import {List, ListItem, Icon, Avatar} from 'react-native-elements';
import styleVariables from '../styleVariables';
import PlayersList from '../components/PlayersList';


class AllPlayersList extends React.Component {
    static navigationOptions = {
        title: 'Players',
        tabBarIcon: ({focused, tintColor}) => {
            return ( <Icon
                type="ionicon"
                name='ios-people'
                color={ tintColor }
            /> )
        }
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

const mapStateToProps = (state, props) => {
    return {
        playersList: state.playersList
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            alert('asd')
        }
    }
}

export default connect(mapStateToProps)(AllPlayersList)