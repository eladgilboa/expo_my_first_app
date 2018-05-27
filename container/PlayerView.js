/**
 * Created by elad.gilboa on 03/09/2017.
 */
import React from 'react';
import {connect} from 'react-redux'
import {StyleSheet, Text, Image} from 'react-native';
import {Card, Button, Icon, Avatar} from 'react-native-elements';
import * as actions from '../actions';
import styleVariables from '../style/styleVariables';

class PlayerView extends React.Component {

    static navigationOptions = ({ navigation }) => {
        const { params } = navigation.state;

        return {
            title: params.player.name,
            tabBarVisible : true,
            tabBarIcon: ({focused, tintColor}) => {
                return ( <Icon
                  type="ionicon"
                  name='ios-person'
                  color={ tintColor }
                /> )
            }
        }
    };

    constructor(props){
        super(props);
        this.state = {
            loading:false
        }
    }

    onDelete(){
        const { deletePlayer, navigation, player } = this.props;
        this.setState({loading:true}, ()=>{
            deletePlayer( player );
            navigation.goBack(null);
        });
    }

    render() {
        const { player } = this.props;
        const defaultImg = require('../images/defaultPlayerAvatar.png');

        if(!player){
            return null;
        }

        return (
            <Card
                image={ player.avatar || defaultImg }
                imageProps={{resizeMode:'contain'}}
            >
                <Text style={{marginBottom: 10}}>
                    The idea with React Native Elements is more about component structure than actual design.
                </Text>
                <Button
                    icon={ this.state.loading ? {} : {name: 'remove-user',type: 'entypo'}}
                    loading={this.state.loading}
                    backgroundColor={styleVariables.primeRed}
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    title={ this.state.loading ? '' : 'Delete' }
                    onPress={ this.onDelete.bind(this)  }
                    raised
                    rounded
                />
            </Card>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        player: props.navigation.state.params && props.navigation.state.params.player
    }
}

const mapDispatchToProps = {
    ...actions
};

export default connect(mapStateToProps,mapDispatchToProps)(PlayerView)