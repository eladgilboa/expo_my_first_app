import React from 'react';
import {Button} from 'react-native-elements';
import styleVariables from '../styleVariables';

export default TypeButton = ({ type, ...rest}) => {
  
  const props = {...(types[type] || types.default), ...rest };
  return (
    <Button {...props }/>
  )
};

const types = {
  default : {
    containerViewStyle:{
      backgroundColor:'transparent'
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
  }
};