import React from 'react';
import {Button} from 'react-native-elements';
import styleVariables from '../style/styleVariables';
import merge from 'deepmerge';

export default TypeButton = ({ type, ...rest}) => {

  const props = merge.all([ types.default, types[type] || {}, rest ]);
  //console.log(props);
  return (
    <Button {...props }/>
  )
};

const types = {
  default : {
    containerViewStyle:{
      backgroundColor:'transparent',
      flex:1,
      margin:0,
      padding:0
    },
    buttonStyle: {
      backgroundColor: styleVariables.darkblue,
      borderWidth: 1,
      borderColor: styleVariables.primeBlue,
      borderRadius: styleVariables.borderRadius,
    },
    textStyle :{
      color: styleVariables.primeBlue,
      fontFamily: styleVariables.font_light,
      fontWeight:'100'
    },
    disabledStyle:{
      backgroundColor: styleVariables.darkblue + '55',
      borderColor: styleVariables.lineColor,
    },
    disabledTextStyle:{
      color:styleVariables.lineColor
    },
    icon:{
      color:styleVariables.primeBlue
    },
    iconRight:{
      color:styleVariables.primeBlue
    }
  },
  success : {
    buttonStyle:{
      backgroundColor: styleVariables.darkblue,
      borderWidth: 1,
      borderColor: styleVariables.lightGreen,
      borderRadius: styleVariables.borderRadius,
    },
    textStyle :{
      color: styleVariables.lightGreen,
    },
    icon:{
      name: 'done',
      color:styleVariables.lightGreen
    }
  },
  error : {
    buttonStyle:{
      backgroundColor: styleVariables.darkblue,
      borderWidth: 1,
      borderColor: styleVariables.primeRed,
      borderRadius: styleVariables.borderRadius,
    },
    textStyle :{
      color: styleVariables.primeRed,
    },
    icon:{
      name: 'close',
      color:styleVariables.primeRed
    }
  }
};