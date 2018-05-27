/**
 * Created by elad.gilboa on 10/05/2018.
 */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import { Text, Button} from 'react-native-elements';
import styleVariables from '../style/styleVariables';
import PlayersList from './PlayersList';
import TypeButton from './TypeButton'

const OnScoreEvent = ({ chose, playersList, onSave, onClear, onSelect }) => {

  const Who = ({ chose, playersList, onSelect }) => {
    const title = `Who ${chose ==='scorer' ? ' Scored' : 'Assisted'}?`;
    return (
      <View style={style.playersContainer}>
        <View style={{alignItems:'center',paddingTop:8}}>
          <Text style={{color:styleVariables.primeBlue,fontSize:22}}>{title}</Text>
        </View>
        <PlayersList playersList={playersList} onPress={onSelect}/>
      </View>
    );
  };

  return (
    <View style={style.container}>
      <Who chose={chose} playersList={playersList} onSelect={onSelect} />
      <View style={{flexDirection:'row',marginVertical:3}}>
        <TypeButton
          disabled={ chose ==='scorer' }
          icon={ chose ==='scorer' ? {name: 'done',color:styleVariables.lineColor} : {name: 'done',color:styleVariables.lightGreen} }
          type="success"
          title='SKIP'
          onPress={ onSave }
        />
        <TypeButton
          type="error"
          title='CANCEL'
          onPress={ onClear }
        />
      </View>
    </View>
  )
};

const style = {
  container:{
    flex:1,
  },
  playersContainer : {
    flex:1,
    backgroundColor: styleVariables.nivel1,
    opacity:0.8,
    borderRadius:3,
    margin:0,
  },
  buttonCancel:{
    backgroundColor: styleVariables.primeRed + '99'
  },
  buttonSkip:{
    backgroundColor: styleVariables.primeGreen + '99'
  },
  button:{
    borderRadius:3,
    borderWidth:1,
    borderColor:styleVariables.lineColor,
  }
};

export default OnScoreEvent;