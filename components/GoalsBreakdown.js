/**
 * Created by elad.gilboa on 10/05/2018.
 */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Icon, Avatar, FormLabel, Text, Card, Divider, Badge, Button} from 'react-native-elements';
import styleVariables from '../style/styleVariables';

const GoalsBreakdown = ({teamAGoals, teamBGoals, playersList, onGoalDelete}) => {

    function shorterName(name){
        let newName = name+'';
        const withSpace = name.split(" ");
        if(withSpace.length > 1){
            newName = withSpace.map( name => name[0] ).join('.');
        }

        return newName.toUpperCase() ;
    }
    

  const Goal = ({ index, team, scorer, goalStyle, goalText }) => (
    <View style={[style.goal,goalStyle]}>
        <Icon
            type="ionicon"
            name='ios-football'
            color={styleVariables.primeYellow}
            size={12}
            iconStyle={{marginHorizontal:3}}
        />
        <View style={{flex:1}}>
            <Text style={[style.goalText,goalText]}>
                { shorterName(playersList.find( p => p.id === scorer ).name) }
            </Text>
        </View>
        <Icon
            type="entypo"
            name='trash'
            color={styleVariables.primeRed}
            size={12}
            iconStyle={{marginHorizontal:3}}
            onPress={()=>{onGoalDelete(team,index)}}
        />
    </View>
  );

  return (
    <View style={style.container}>
      <View style={style.team}>
        { teamAGoals.map( (goal,i) => <Goal {...goal} team="teamA" key={i} index={i} goalStyle={style.goalLeftTeam} goalText={{textAlign:'right'}}/> )}
      </View>
      <View style={style.emptySpace}></View>
      <View style={style.team}>
        { teamBGoals.map( (goal,i) => <Goal {...goal} team="teamB" key={i} goalStyle={style.goalRightTeam} /> )}
      </View>
    </View>
  )
};

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
  },
  goalLeftTeam:{
    flexDirection: 'row-reverse',
  },
  goalRightTeam:{
    flexDirection: 'row',
  },
  goal:{
    backgroundColor: styleVariables.nivel2+'aa',
    borderRadius:3,
    padding: 3,
    marginTop: 1,
  },
  goalText:{
      color:styleVariables.primeYellow,
      fontFamily:styleVariables.font_light,
      fontSize:12,
  }
}

export default GoalsBreakdown;