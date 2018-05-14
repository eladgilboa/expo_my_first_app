import React, { Component } from 'react';
import { Text, View, StyleSheet, Picker } from 'react-native';
import styleVariables from '../styleVariables';

export default class CustomePicker extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Picker style={[styles.picker]} itemStyle={styles.pickerItem}>
          <Picker.Item label="Country" value="" />
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="js" />
        </Picker>
        <View style={styles.arrowWrapper}>
          <Text style={styles.arrow}>&#9660;</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  picker: {
    width: 200,
    height: 44,
    backgroundColor: '#FFF0E0',
    borderColor: 'red',
    borderBottomWidth: 2,
    flex: 90
  },

  pickerItem: {
    height: 44,
    color: 'red'
  },

  arrowWrapper: {
    backgroundColor: '#FFF0E0',
    flex: 10,
    height: 40,
    marginLeft: -28,
    justifyContent: 'center'
  },

  arrow: {
    textAlign: 'center',
    color: 'red',
  }
});