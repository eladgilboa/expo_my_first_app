/**
 * Created by elad.gilboa on 03/09/2017.
 */
import React from 'react';
//import { ActionsContainer, Button, FieldsContainer, Fieldset, Form, FormGroup, Input, Label } from 'react-native-clean-form';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { Icon, Button, FormLabel, FormInput, Divider, Card, FormValidationMessage, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';
import playersAvatar from '../utils/playersAvatar';

const validationMessageConfig = {
    name : 'player name already exist'
};



class FormPlayer extends React.Component {
    static navigationOptions = {
        title: 'Form Player',
        tabBarIcon: ( { focused, tintColor } ) => {
            return( <Icon
                type="ionicon"
                name='ios-person-add'
                color={ tintColor }
            /> )
        }
    };

    constructor(props){
        super(props);
        this.state = {
            submitting : false,
            saved : false,
            player : {
                name : '',
                avatar: playersAvatar[ Math.floor( Math.random() * playersAvatar.length ) ],
            },
            validationMessage: {
                name : null
            }
        };
        //this.setRendomAvatar();
    }

    onChange(label,value){
        let player = Object.assign( {}, this.state.player, { [label] : value } );
        let validationMessage = Object.assign( {}, this.state.validationMessage, { [label] : this[`validate_${label}`](value) } );

        this.setState({
            player,
            validationMessage
        })
    }

    validate_name(value){
        if( this.props.playersList.find( player => player.name === value ) ){
            return validationMessageConfig.name;
        }
        return null;
    }

    setRendomAvatar(){
        const avatar = playersAvatar[ Math.floor( Math.random() * playersAvatar.length ) ];
        this.setState({ player : Object.assign( {}, this.state.player, { avatar } )});
    }

    save(){
        this.setState({saved : true});
        const { createPlayer, navigation } = this.props;
        createPlayer({ ...this.state.player });
        navigation.navigate('PlayersList');
        this.setState({saved : false, player:{} });
    }

    componentWillReceiveProps(nextProps) {
        if(this.state.saved){
            setTimeout(()=>{
                this.setState({saved : false});
            },2000);
        }
    }

    render() {
        const { } = this.props;
        const { validationMessage, player } = this.state;
        const defaultImg = require('../images/defaultPlayerAvatar.png');

        return (
            <View>
                <Card
                  title="Creat New Player"
                  image={ player.avatar || defaultImg }
                  imageProps={{resizeMode:'contain'}}
                >
                    <Button
                      onPress={this.setRendomAvatar.bind(this)}
                      buttonStyle={{backgroundColor:'blue'}}
                      title="Change Avatar"
                      small
                    />

                    <FormLabel labelStyle={{color : '#45A29E'}}>Name</FormLabel>
                    <FormInput value={player.name} onChangeText={this.onChange.bind(this,'name')} />
                    <FormValidationMessage>{validationMessage.name}</FormValidationMessage>

                </Card>
                <Button
                  onPress={this.save.bind(this)}
                  title="Creat New Player"

                  raised
                  buttonStyle={{backgroundColor:'#45A29E'}}
                  large
                  disabled={ !Boolean( player.name && !Object.values(validationMessage).find( Boolean ) ) }
                  iconRight={{name: 'done'}}
                />
            </View>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        playersList: state.playersList
    }
}

const mapDispatchToProps = {
    ...actions
};

export default connect(mapStateToProps, mapDispatchToProps)(FormPlayer)