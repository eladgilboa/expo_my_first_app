import React from 'react';
import moment from 'moment'
import {StyleSheet, View, TouchableHighlight, ScrollView} from 'react-native';
import {Icon, Avatar, FormLabel, Text, Card, Divider, Badge, Button} from 'react-native-elements';
import styleVariables from '../style/styleVariables';

class Clock extends React.Component {

  render(){
    const {date,duration} = this.props;
    const durationObject = moment.duration( duration );

    let minuts = Math.floor(durationObject.as('minutes'));
    minuts = (minuts+'').length < 2 ? '0' + minuts : minuts;

    let seconds = durationObject.get('seconds');
    seconds = (seconds+'').length < 2 ? '0' + seconds : seconds;

    return (
        <View style={style.ClockContainer}>
          <View style={style.clockView}>
            <View style={style.time}>
              <View style={style.timeBox}>
                <Text style={style.timeText}>{minuts}</Text>
              </View>
              <View style={style.timeBox}>
                <Text style={style.timeText}>{seconds}</Text>
              </View>
            </View>
            <View style={style.date}>
              <Text style={{color:styleVariables.primeYellow}}>{moment(date).format('ddd, DD.MM.YY')}</Text>
            </View>
          </View>
        </View>
    )
  }
  
}

const style = StyleSheet.create({
  ClockContainer:{
    flexDirection:'column',
    flex:1,
    justifyContent:'flex-start',
    alignItems: 'center',
    paddingVertical:8,
  },
  clockView:{
    //flex:-1,
    //flexBasis:0,
    //justifyContent:'center',
    //alignItems: 'center',
    backgroundColor:styleVariables.nivel2+'bb',
    borderColor: styleVariables.lineColor,
    borderRadius:3,
    padding:8
  },
  date:{
    borderColor: styleVariables.lineColor,
    backgroundColor:styleVariables.nivel1+'88',
    borderWidth: 1,
    borderRadius: 3,
    padding:3,
    marginTop: 3,
    //flexDirection:'row',
    //justifyContent:'center',
    alignItems: 'center',
  },
  time: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 8,
    //marginVertical:-8
  },
  timeBox: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: styleVariables.lineColor,
    backgroundColor: styleVariables.nivel1,
    borderWidth: 1,
    borderRadius: 3,
    padding: 8,
    marginHorizontal: 1,
  },
  timeText:{
    color:styleVariables.primeBlue,
    fontSize:42,
    fontWeight:'100',
    fontFamily:styleVariables.font_thin
  }
});

export default Clock;