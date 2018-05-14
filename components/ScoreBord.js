import React from 'react';
import {StyleSheet, View, TouchableHighlight, ScrollView} from 'react-native';
import {Icon, Avatar, FormLabel, Text, Card, Divider, Badge, Button} from 'react-native-elements';
import styleVariables from '../styleVariables';

const ScoreBord = ({score, onGoalScored}) => {

  const Score = () => (
    <View style={{flex:1,paddingVertical:8}}>
      <View style={style.score}>
        <View style={style.scoreBox}>
          <Text style={{color:styleVariables.primeYellow, fontSize: 42, fontWeight:'100', fontFamily:styleVariables.font_light}}>{score.teamA}</Text>
        </View>
        <View style={style.scoreBox}>
          <Text style={{color:styleVariables.primeYellow, fontSize: 42, fontWeight:'100', fontFamily:styleVariables.font_light}}>{score.teamB}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={style.scoreBordContainer}>

      <TouchableHighlight onPress={ () => onGoalScored('teamA') }>
        <View style={[style.team, style.teamA]}>
          <Icon
            type="entypo"
            name='sports-club'
            color={styleVariables.primeYellow}
            size={40}
            iconStyle={{margin:5}}
          />
          <View>
            <Text style={{color:styleVariables.primeYellow}}>TEAM A</Text>
            <View style={{ backgroundColor: 'white', height: 2}}></View>
            <Icon
              size={12}
              name='goal'
              type='custom'
              color={styleVariables.primeYellow}
              underlayColor={styleVariables.darkblue}
              containerStyle={style.goalButton}
            />
          </View>
        </View>
      </TouchableHighlight>

      <Score/>

      <TouchableHighlight onPress={ () => onGoalScored('teamB') }>
        <View style={[style.team, style.teamB]}>
          <View >
            <Text style={{color:styleVariables.primeYellow}}>TEAM B</Text>
            <View style={{ backgroundColor: styleVariables.primeBlue, height: 2}}></View>
            <Icon
              //raised
              revers
              name='goal'
              type='custom'
              size={12}
              color={styleVariables.primeYellow}
              underlayColor={styleVariables.darkblue}
              containerStyle={style.goalButton}
            />
          </View>
          <Icon
            type="entypo"
            name='sports-club'
            color={styleVariables.primeYellow}
            iconStyle={{margin:5}}
            size={40}
          />
        </View>
      </TouchableHighlight>
    </View>
  )
}

const style = StyleSheet.create({
  scoreBordContainer:{
    flexDirection:'row',
    paddingVertical:3,
    justifyContent:'space-between',
    backgroundColor:styleVariables.nivel2,
    borderRadius:3,
    opacity:0.8
  },
  goalButton:{
    borderColor: styleVariables.lineColor,
    backgroundColor: styleVariables.nivel2,
    borderWidth: 1,
    borderRadius: 3,
    paddingVertical:1,
    marginTop: 3,
  },
  score: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 8,
    marginVertical:-8
  },
  scoreBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: styleVariables.lineColor,
    backgroundColor: styleVariables.nivel2 + '88',
    borderWidth: 1,
    borderRadius: 3,
    padding: 8,
    marginHorizontal: 1,
  },
  teamA:{
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
  },
  teamB:{
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3
  },
  team: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default ScoreBord;