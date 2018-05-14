/**
 * Created by elad.gilboa on 03/09/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {StyleSheet, View, Picker, ScrollView} from 'react-native';
import {Icon, Avatar, FormLabel, Text, Card, Divider, Badge, Button} from 'react-native-elements';
import styleVariables from '../styleVariables';
import BackgroundImage from '../components/BackgroundImage'
import CustomPicker from '../components/CustomePicker'

class FormMatch extends React.Component {
    static navigationOptions = {
        title: 'Form Match',
        tabBarIcon: ({focused, tintColor}) => {
            return ( <Icon
                type="ionicon"
                name='ios-football'
                color={tintColor}
            /> )
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            freePlayers: this.props.playersList || [],
            teamA: [],
            teamB: []
        };
        this.renderTeamA = this.renderTeam.bind(this);
        this.removeFromTeam = this.removeFromTeam.bind(this);
        this.pickerId = 0;
    }

    componentWillReceiveProps(nextProps) {
        this.setState({freePlayers: nextProps.playersList});
    }

    insertIntoTeam(team, value, index) {
        if (!value) {
            return;
        }
        let freePlayers = [...this.state.freePlayers];
        let playerArray = freePlayers.splice(index - 1, 1); // + 1 because of Select Player Picker.Item
        let newTeam = this.state[team].concat(playerArray);
        this.setState({[team]: newTeam, freePlayers});
    };

    onStartMatch(){
        const { navigation } = this.props;
        const teams = {
            teamA:this.state.teamA,
            teamB:this.state.teamB
        };
        navigation.navigate('matchView', { teams } )
    }

    removeFromTeam(team, index) {
        let newTeam = [...this.state[team]];
        let playerArray = newTeam.splice(index, 1);
        let freePlayers = this.state.freePlayers.concat(playerArray);
        this.setState({[team]: newTeam, freePlayers});
    };

    renderTeam(team) {
        return this.state[team].map((player, index) => {
            return (
                <View key={player.id} style={{flex:-1,flexDirection:'row',alignItems:'center',margin:1}}>
                    <Avatar
                        small
                        rounded
                        icon={{name: 'clear', color:'#0b0c10'}}
                        onPress={ () => this.removeFromTeam( team, index ) }
                        activeOpacity={0}
                        containerStyle={{marginRight:-20,zIndex:1,backgroundColor:'#c6c7c8'}}
                    />
                    <Badge containerStyle={{backgroundColor:'#45A29E',paddingLeft:25}}>
                        <Text style={{ color: '#0b0c10'}}>{player.name}</Text>
                    </Badge>
                </View>
            )
        })
    }

    pickPlayers(){
        return(
            <View style={{flex:1}}>
                <View>
                    <Card
                      title={`White Team (${this.state.teamA.length})`}
                      titleStyle={{color:styleVariables.primeYellow,fontFamily:styleVariables.font_thin}}
                      containerStyle={{backgroundColor:styleVariables.nivel2 + '99',borderColor:styleVariables.lineColor,borderRadius:3}}
                      dividerStyle={{backgroundColor:styleVariables.primeYellow}}
                    >
                        <View style={style.pickerContainer}>
                            <Picker
                              onValueChange={ this.insertIntoTeam.bind(this,'teamA') }
                              style={style.picker}
                            >
                                <Picker.Item label="Add A Player" value={false}/>
                                {
                                    this.state.freePlayers.map((player) => (
                                        <Picker.Item key={player.id} label={player.name} value={player.id}/>
                                    ))
                                }
                            </Picker>
                        </View>
                        {/*<Divider style={{ backgroundColor: styleVariables.primeYellow }}/>*/}
                        <View
                            style={{flex:-1,flexDirection:'row',marginTop:8,flexWrap:'wrap',alignItems: 'flex-start'}}>
                            { this.renderTeam('teamA') }
                        </View>
                    </Card>
                </View>
                <View>
                    <Card title={`Black (${this.state.teamB.length})`}>
                        <View style={style.pickerContainer}>
                            <Picker onValueChange={ this.insertIntoTeam.bind(this,'teamB') }>
                                <Picker.Item label="Add A Player " value={false}/>
                                { this.state.freePlayers.map((player) => {
                                    return <Picker.Item key={player.id} label={player.name} value={player.id}/>
                                }) }
                            </Picker>
                        </View>
                        <Divider style={{ backgroundColor: '#45A29E' }}/>
                        <View
                            style={{flex:-1,flexDirection:'row',marginTop:8,flexWrap:'wrap',alignItems: 'flex-start'}}>
                            { this.renderTeam('teamB') }
                        </View>
                    </Card>
                </View>
            </View>
        );
    }

    render() {
        const {navigate} = this.props.navigation;

        if (this.props.playersList.length === 0) {
            return <Text>loading...</Text>;
        }

        return (
            <View style={{flex:1}}>
                <BackgroundImage/>
                <ScrollView>
                    {this.pickPlayers()}
                </ScrollView>
                <View>
                    <Button
                        buttonStyle={{backgroundColor: styleVariables.primeGreen}}
                        containerViewStyle={{ marginVertical:3}}
                        large
                        disabled={ this.state.teamA.length === 0 || this.state.teamB.length === 0 }
                        iconRight={{name: 'done'}}
                        title='Start Match'
                        onPress={this.onStartMatch.bind(this)}
                    />
                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    pickerContainer:{
        borderRadius:3,
        borderColor:styleVariables.lineColor,
        borderWidth:1,
        backgroundColor:styleVariables.primeBlue+'66',
    },
    picker: {
        color:styleVariables.primeYellow,
        backgroundColor:'transparent',
    }
});

const mapStateToProps = (state, props) => {
    return {
        playersList: state.playersList,
        gamse: state.gamse
    }
}

const mapDispatchToProps = {
    ...actions
};

export default connect(mapStateToProps)(FormMatch)