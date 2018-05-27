/**
 * Created by elad.gilboa on 03/09/2017.
 */
import React from 'react';
import {connect} from 'react-redux'
import {StyleSheet, ScrollView} from 'react-native';
import {List, ListItem, Icon, Avatar} from 'react-native-elements';
import styleVariables from '../style/styleVariables';
import moment from 'moment';
import SlimeScorebord from './SlimScorebord'


class PlayersList extends React.Component {
    
    onPress(playerId){
        this.props.onPress(playerId);
    }

    render() {
        const {matchesList } = this.props;
        const defaultImg = require('../images/defaultPlayerAvatar.png');

        return (
            <ScrollView>
                <List containerStyle={{marginTop: 8, backgroundColor:'transparent'}}>
                    {
                        matchesList.map((item) => (
                            <ListItem
                                key={item.date}
                                subtitle={moment(item.date).format("DD.MM.YY HH:mm")}
                                title={
                                    item.teamA.goals && item.teamB.goals &&
                                    <SlimeScorebord
                                        score={{ teamA : item.teamA.goals.length, teamB : item.teamB.goals.length }}
                                        onGoalScored={false}
                                    />
                                }
                                chevronColor={styleVariables.primeYellow}
                                containerStyle={style.containerStyle}
                                subtitleStyle={style.subtitleStyle}
                                onPress={ this.onPress.bind(this, item.date) }
                                titleContainerStyle={style.titleContainerStyle}
                                subtitleContainerStyle={style.subtitleContainerStyle}
                            />
                        ))
                    }
                </List>
            </ScrollView>
        );
    }
}

const style = {
    containerStyle : {
        backgroundColor: styleVariables.nivel2+'88',
    },
    subtitleStyle : {
        color : styleVariables.primeYellow,
        fontWeight:'100',
        fontFamily:styleVariables.font_light
    },
    titleContainerStyle:{
        flexDirection:'row',
    },
    subtitleContainerStyle:{
        flexDirection:'row',
    }
}

export default PlayersList