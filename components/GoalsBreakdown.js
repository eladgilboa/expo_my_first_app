/**
 * Created by elad.gilboa on 10/05/2018.
 */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, Avatar, FormLabel, Text, Card, Divider, Badge, Button} from 'react-native-elements';
import styleVariables from '../styleVariables';

const GoalsBreakdown = ({goals, teams, playersList}) => {

  const { teamA, teamB } = teams;
  let teamAGoals = goals.filter( ({scorer}) => teamA.find(p => p.id === scorer) );
  let teamBGoals = goals.filter( ({scorer}) => teamB.find(p => p.id === scorer) );

  const Goal = ({scorer,style}) => (
    <View style={style}>
      <Icon
        type="ionicon"
        name='ios-football'
        color={styleVariables.primeYellow}
        size={12}
        iconStyle={{marginHorizontal:3}}
      />
      <Text style={{color:styleVariables.primeYellow}}>
        { playersList.find( p => p.id === scorer ).name.toUpperCase() }
      </Text>
    </View>
  )

  return (
    <View style={style.container}>
      <View style={style.team}>
        { teamAGoals.map( (goal,i) => <Goal {...goal} key={i} style={[style.goal,style.goalLeftTeam]} /> )}
      </View>
      <View style={style.emptySpace}></View>
      <View style={style.team}>
        { teamBGoals.map( (goal,i) => <Goal {...goal} key={i} style={[style.goal,style.goalRightTeam]} /> )}
      </View>
    </View>
  )
}

const style = {
  container:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 1
  },
  emptySpace:{
    flex:1,
    paddingHorizontal: 8,
    marginHorizontal: 1,
  },
  team: {
    flex:1,
    flexDirection: 'column',
    justifyContent:'flex-end',
    //paddingHorizontal:1,
    //alignItems: 'center',
    //height: 100,
  },
  goalLeftTeam:{
    flexDirection: 'row-reverse',
  },
  goalRightTeam:{
    flexDirection: 'row',
  },
  goal:{
    backgroundColor: styleVariables.nivel2,
    borderRadius:3,
    opacity:0.8,
    padding: 3,
    marginTop: 1,
  }
}

export default GoalsBreakdown;