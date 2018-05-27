/**
 * Created by elad.gilboa on 03/09/2017.
 */
import React from 'react';
import {connect} from 'react-redux'
import {StyleSheet, ScrollView, View} from 'react-native';
import {List, ListItem, Icon, Avatar} from 'react-native-elements';
import styleVariables from '../../style/styleVariables';
import MatchesList from '../../components/MatchesList';
import BackgroundImage from '../../components/BackgroundImage';

class MatchesHistoryList extends React.Component {

    static navigationOptions = ({ navigation }) => {
        //const params = navigation.state.params || {};

        return {
            title: 'Matches Hisrory',
            headerRight: <TypeButton
              iconRight={{type:"ionicon",name:'ios-person-add',color:styleVariables.primeBlue}}
              title='New Matche'
              onPress={()=> navigation.navigate({ routeName: 'FormMatch' })}
            />,
            tabBarIcon: ({focused, tintColor}) => {
                return ( <Icon
                  type="custom"
                  name='schedule'
                  color={ tintColor }
                /> )
            }
        };
    };

    onMatchPress(date){
        const {matches, navigation} = this.props;
        navigation.navigate('single',{
            matchId : date
        })
    }

    render() {
        const {matches} = this.props;

        return (
            <View style={{flex:1}}>
                <BackgroundImage/>
                <MatchesList onPress={ this.onMatchPress.bind(this)} matchesList={matches} />
            </View>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        matches: state.matches,
        playersList : state.playersList
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {

}

export default connect(mapStateToProps)(MatchesHistoryList)