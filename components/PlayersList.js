/**
 * Created by elad.gilboa on 03/09/2017.
 */
import React from 'react';
import {connect} from 'react-redux'
import {StyleSheet, ScrollView} from 'react-native';
import {List, ListItem, Icon, Avatar} from 'react-native-elements';
import styleVariables from '../style/styleVariables';

class PlayersList extends React.Component {
    
    onPress(playerId){
        this.props.onPress(playerId);
    }

    render() {
        const {playersList } = this.props;
        const defaultImg = require('../images/defaultPlayerAvatar.png');

        return (
            <ScrollView>
                <List containerStyle={{marginTop: 8, backgroundColor:'transparent'}}>
                    {
                        //{ wins:0, draw:0, played:0, goals:0, assists:0 }
                        playersList.map((player) => {
                            const {id, name, avatar, wins, draw, played, goals, assists} = player;
                            const loss = played - wins - draw;

                            return (
                                <ListItem
                                    key={id}
                                    title={name}
                                    subtitle={`Played:${played} Wins:${wins} Goals:${goals} Assists:${assists}`}
                                    //subtitle={`Wins:${wins} Draw:${draw} loss:${loss} Played:${played} Goals:${goals} Assists:${assists}`}
                                    chevronColor={styleVariables.primeYellow}
                                    containerStyle={style.containerStyle}
                                    titleStyle={style.titleStyle}
                                    avatar={<Avatar
                                        rounded
                                        source={avatar || defaultImg }
                                        title={name}
                                        imageProps={{resizeMode:'contain'}}
                                        avatarStyle={{backgroundColor:'transparent'}}
                                     />}
                                    onPress={ this.onPress.bind(this, id) }
                                />
                            )
                        })
                    }
                </List>
            </ScrollView>
        );
    }
}

const style = {
    containerStyle : {
        backgroundColor: 'transparent',//styleVariables.nivel2,
    },
    titleStyle : {
        color : styleVariables.primeYellow
    },
}

export default PlayersList