import React from 'react';
import {Button} from 'react-native-elements';
import styleVariables from '../styleVariables';

export default TypeButton = ({ type, ...rest}) => {

  const props = { ...types.default,  ...types[type], ...rest };
  return (
    <Button {...props }/>
  )
};

const types = {
  default : {
    containerViewStyle:{
      backgroundColor:'transparent',
    },
    buttonStyle: {
      backgroundColor: styleVariables.darkblue,
      borderWidth: 1,
      borderColor: styleVariables.primeBlue,
      borderRadius: styleVariables.borderRadius,
    },
    color: styleVariables.primeBlue,
    disabledStyle:{
      opacity:0.8
    }
  },
  success : {
    buttonStyle:{
      backgroundColor: styleVariables.darkblue,
      borderWidth: 1,
      borderColor: styleVariables.lightGreen,
      borderRadius: styleVariables.borderRadius,
    },
    color: styleVariables.lightGreen,
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
    color: styleVariables.primeRed,
    icon:{
      name: 'close',
      color:styleVariables.primeRed
    }
  }
};