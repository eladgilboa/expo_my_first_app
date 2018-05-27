import React from 'react';
import moment from 'moment'
import {StyleSheet, View, TouchableHighlight, ScrollView} from 'react-native';
import {Icon, Avatar, FormLabel, Text, Card, Divider, Badge, Button} from 'react-native-elements';
import styleVariables from '../style/styleVariables';

class Clock extends React.Component {

  render(){
    const {date,duration} = this.props;
    const durationObject = moment.duration( duration );
    
    return (
        <View style={style.ClockContainer}>
          <View style={style.clockView}>
            <View style={style.time}>
              <View style={style.timeBox}>
                <Text style={{color:styleVariables.primeYellow}}>{durationObject.get('hours')}</Text>
              </View>
              <View style={style.timeBox}>
                <Text style={{color:styleVariables.primeYellow}}>{durationObject.get('minutes')}</Text>
              </View>
              <View style={style.timeBox}>
                <Text style={{color:styleVariables.primeYellow}}>{durationObject.get('seconds')}</Text>
              </View>
            </View>
            <View style={style.date}>
              <Text style={{color:styleVariables.primeYellow}}>{moment(date).format('ddd, DD.MM.YY HH:mm')}</Text>
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
  },
  clockView:{
    //flex:-1,
    //flexBasis:0,
    //justifyContent:'center',
    //alignItems: 'center',
    backgroundColor:styleVariables.nivel2+'88',
    borderColor: styleVariables.lineColor,
    borderRadius:3,
    padding:3
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
    //alignItems: 'center',
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
    backgroundColor: styleVariables.nivel1 + '88',
    borderWidth: 1,
    borderRadius: 3,
    padding: 8,
    marginHorizontal: 1,
  },
});

export default Clock;