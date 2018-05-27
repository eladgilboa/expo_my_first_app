/**
 * Created by elad.gilboa on 03/09/2017.
 */
import React from 'react';
import {connect} from 'react-redux'
import {StyleSheet, View, Image, Dimensions} from 'react-native';
import {List, ListItem, Icon, Avatar} from 'react-native-elements';
import styleVariables from '../style/styleVariables';
import backroungImage from '../images/background.jpg'
import { Constants } from 'expo';

class BackgroundImage extends React.Component {
    render() {
        return (
          <View style={{
            position: 'absolute',
            right:0,
            top: 0,
            bottom:0,
          }}>
              <Image
                style={{
                    flex: 1,
                    resizeMode:'cover',
                }}
                source={backroungImage}
              />
          </View>
        );
    }
}

export default BackgroundImage

