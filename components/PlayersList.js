/**
 * Created by elad.gilboa on 03/09/2017.
 */
import React from 'react';
import {connect} from 'react-redux'
import {StyleSheet, ScrollView} from 'react-native';
import {List, ListItem, Icon, Avatar} from 'react-native-elements';
import styleVariables from '../styleVariables';

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
                        playersList.map((item) => (
                            <ListItem
                                key={item.id}
                                title={item.name}
                                chevronColor={styleVariables.primeYellow}
                                containerStyle={style.containerStyle}
                                titleStyle={style.titleStyle}
                                avatar={<Avatar
                                    rounded
                                    source={item.avatar || defaultImg }
                                    title={item.name}
                                    imageProps={{resizeMode:'contain'}}
                                    avatarStyle={{backgroundColor:'transparent'}}
                                 />}
                                onPress={ this.onPress.bind(this, item.id) }
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
        backgroundColor: 'transparent',//styleVariables.nivel2,
    },
    titleStyle : {
        color : styleVariables.primeYellow
    },
}

export default PlayersList