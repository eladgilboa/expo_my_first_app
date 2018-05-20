/**
 * Created by elad.gilboa on 03/09/2017.
 */
import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {StyleSheet, View, Picker, ScrollView} from 'react-native';
import {Icon, Avatar, FormLabel, Text, Card, Divider, Badge, Button} from 'react-native-elements';
import TypeButton from '../components/TypeButton'
import styleVariables from '../styleVariables';
import BackgroundImage from '../components/BackgroundImage'

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
        const {teamA,teamB} = props.tempMatch;

        this.state = {
            freePlayers: this.getFreePlayers(props),
            teamA:teamA.players,
            teamB:teamB.players,
        };
        this.removeFromTeam = this.removeFromTeam.bind(this);
    }

    getFreePlayers(props=this.props){
        const { playersList, tempMatch } = props;
        return playersList.filter( player => (
            !tempMatch.teamA.players.find( teamPlayerId => teamPlayerId === player.id  )
            &&
            !tempMatch.teamB.players.find( teamPlayerId => teamPlayerId === player.id  )
        )).map( player => player.id )
    }

    getPlayer(id){
        return this.props.playersList.find( player => player.id === id  )
    }

    componentWillReceiveProps(nextProps) {
        //console.log('form',nextProps.tempMatch)
        this.setState({
            freePlayers: this.getFreePlayers(nextProps),
            teamA:nextProps.tempMatch.teamA.players,
            teamB:nextProps.tempMatch.teamB.players,
        });
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
        const { navigation, setTempMatch, tempMatch } = this.props;
        const newTempMatch = {...tempMatch};

        newTempMatch.teamA.players = this.state.teamA;
        newTempMatch.teamB.players = this.state.teamB;

        setTempMatch(newTempMatch);
        navigation.push('matchView');
    }

    removeFromTeam(team, index) {
        let newTeam = [...this.state[team]];
        let playerArray = newTeam.splice(index, 1);
        let freePlayers = this.state.freePlayers.concat(playerArray);
        this.setState({[team]: newTeam, freePlayers});
    };

    renderTeam(team) {
        return this.state[team].map((playerId, index) => {
            const player = this.getPlayer(playerId)
            return (
                <View key={playerId} style={{flex:-1,flexDirection:'row',alignItems:'center',margin:1}}>
                    <Avatar
                        small
                        rounded
                        icon={{name: 'clear', color:styleVariables.primeBlue}}
                        onPress={ () => this.removeFromTeam( team, index ) }
                        activeOpacity={0.9}
                        containerStyle={{
                            marginRight:-20,zIndex:1,
                            backgroundColor: styleVariables.darkblue,
                            borderWidth:1,
                            borderColor:styleVariables.primeBlue
                        }}
                    />
                    <View style={{
                        backgroundColor:styleVariables.nivel1+99,
                        borderColor:styleVariables.lineColor,
                        paddingVertical:3,
                        paddingLeft:22,
                        paddingRight:6,
                        borderRadius:3,
                    }}>
                        <Text style={{ color:styleVariables.primeYellow}}>{player.name}</Text>
                    </View>
                </View>
            )
        })
    }

    pickPlayers(){
        return(
            <View style={{flex:1}}>
                <Card
                  title={`TEAM A (${this.state.teamA.length})`}
                  titleStyle={{color:styleVariables.primeYellow,fontFamily:styleVariables.font_thin}}
                  containerStyle={style.cardContainer}
                  dividerStyle={{backgroundColor:'transparent'}}
                >
                    <View style={style.pickerContainer}>
                        <Picker
                          onValueChange={ this.insertIntoTeam.bind(this,'teamA') }
                          style={style.picker}
                        >
                            <Picker.Item label="Add A Player" value={false}/>
                            {
                                this.state.freePlayers.map((playerId) => (
                                    <Picker.Item key={playerId} label={this.getPlayer(playerId).name} value={playerId}/>
                                ))
                            }
                        </Picker>
                    </View>
                    <View
                        style={{flex:-1,flexDirection:'row',marginTop:8,flexWrap:'wrap',alignItems: 'flex-start'}}>
                        { this.renderTeam('teamA') }
                    </View>
                </Card>
                <Card
                  containerStyle={style.cardContainer}
                  title={`TEAM B (${this.state.teamB.length})`}
                  titleStyle={{color:styleVariables.primeYellow,fontFamily:styleVariables.font_thin}}
                  dividerStyle={{backgroundColor:'transparent'}}
                >
                    <View style={style.pickerContainer}>
                        <Picker onValueChange={ this.insertIntoTeam.bind(this,'teamB') }>
                            <Picker.Item label="Add A Player " value={false}/>
                            {
                                this.state.freePlayers.map((playerId) => (
                                  <Picker.Item key={playerId} label={this.getPlayer(playerId).name} value={playerId}/>
                                ))
                            }
                        </Picker>
                    </View>
                    <View
                        style={{flex:-1,flexDirection:'row',marginTop:8,flexWrap:'wrap',alignItems: 'flex-start'}}>
                        { this.renderTeam('teamB') }
                    </View>
                </Card>
            </View>
        );
    }

    render() {

        const {navigation} = this.props;

        if (this.props.playersList.length === 0) {
            return (
                <TypeButton
                  containerViewStyle={{ marginVertical:3}}
                  large
                  iconRight={{type:"ionicon",name:'ios-person-add',color:styleVariables.primeBlue}}
                  title='Creat Players'
                  onPress={()=> navigation.navigate('FormPlayer')}
                />
            );
        }

        return (
            <View style={{flex:1}}>
                <BackgroundImage/>
                <ScrollView>
                    {this.pickPlayers()}
                </ScrollView>
                <View>
                    <TypeButton
                      containerViewStyle={{ marginVertical:3}}
                      large
                      disabled={ this.state.teamA.length === 0 || this.state.teamB.length === 0 }
                      iconRight={{name: 'done',color:styleVariables.primeBlue}}
                      title='Start Match'
                      onPress={this.onStartMatch.bind(this)}
                    />
                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    cardContainer:{
        backgroundColor:styleVariables.nivel2 + '99',
        borderColor:styleVariables.lineColor,
        borderRadius:3,
        flex:1
    },
    pickerContainer:{
        borderRadius:3,
        borderColor:styleVariables.lineColor,
        borderWidth:1,
        backgroundColor:styleVariables.primeBlue,
    },
    picker: {
        color:styleVariables.lineColor,
    }
});

const mapStateToProps = (state, props) => {
    return {
        playersList: state.playersList,
        tempMatch  : state.tempMatch
    }
}

const mapDispatchToProps = {
    ...actions
};

export default connect(mapStateToProps,mapDispatchToProps)(FormMatch)