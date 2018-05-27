import React from 'react';
import {StyleSheet, View, TouchableHighlight, ScrollView} from 'react-native';
import {Icon, Avatar, FormLabel, Text, Card, Divider, Badge, Button} from 'react-native-elements';
import styleVariables from '../style/styleVariables';

const ScoreBord = ({score, onGoalScored}) => {

  const Score = () => (
    <View style={{flex:0,paddingVertical:0}}>
      <View style={style.score}>
        <View style={style.scoreBox}>
          <Text style={{color:styleVariables.primeYellow, fontSize: 18, fontWeight:'100', fontFamily:styleVariables.font_light}}>{score.teamA}</Text>
        </View>
        <View style={style.scoreBox}>
          <Text style={{color:styleVariables.primeYellow, fontSize: 18, fontWeight:'100', fontFamily:styleVariables.font_light}}>{score.teamB}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={style.scoreBordContainer}>
      <View style={[style.team, style.teamA]}>
        <Icon
          type="custom"
          name='shield-BFC'
          color={styleVariables.primeYellow}
          size={20}
          iconStyle={{margin:5}}
        />
      </View>

      <Score/>
      
      <View style={[style.team, style.teamB]}>
        <Icon
          type="custom"
          name='shield-RMC'
          color={styleVariables.primeYellow}
          iconStyle={{margin:5}}
          size={20}
        />
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  scoreBordContainer:{
    flex:0,
    flexDirection:'row',
    paddingVertical:3,
    justifyContent:'center',
    alignItems: 'center',
    //backgroundColor:styleVariables.nivel2,
    borderRadius:3,
    opacity:0.8
  },
  score: {
    //flex: 1,
    flexDirection: 'row',
    //justifyContent: 'space-between',
    //paddingHorizontal: 8,
    //marginVertical:-8
  },
  scoreBox: {
    //flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    borderColor: styleVariables.primeYellow,
    backgroundColor: styleVariables.nivel2 + '88',
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 3,
    marginHorizontal: 1,
  },
  teamA:{
    //borderTopLeftRadius: 3,
    //borderBottomLeftRadius: 3,
  },
  teamB:{
    //borderTopRightRadius: 3,
    //borderBottomRightRadius: 3
  },
  team: {
    //backgroundColor:styleVariables.nivel2,
    //flexDirection: 'row',
    //alignItems: 'center'
  }
});

export default ScoreBord;