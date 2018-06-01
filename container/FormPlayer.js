/**
 * Created by elad.gilboa on 03/09/2017.
 */
import React from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView } from 'react-native';
import { Icon, Button, FormLabel, FormInput, Divider, Card, FormValidationMessage, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import * as actions from '../actions';
import styleVariables from '../style/styleVariables';
import playersAvatar from '../utils/playersAvatar';
import TypeButton from '../components/TypeButton';
import BackgroundImage from '../components/BackgroundImage';

const validationMessageConfig = {
    name : 'player name already exist'
};



class FormPlayer extends React.Component {
    static navigationOptions = {
        title: 'New Player',
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
        navigation.navigate('list');
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
        
        const { validationMessage, player } = this.state;
        const defaultImg = require('../images/defaultPlayerAvatar.png');
        const idDisabled = !Boolean( player.name && !Object.values(validationMessage).find( Boolean ) );

        return (
            <View style={{flex:1}}>
                <BackgroundImage/>
                <ScrollView>
                    <Card
                      //title="Creat New Player"
                      //titleStyle={{color:styleVariables.primeYellow,fontFamily:styleVariables.font_thin}}
                      image={ player.avatar || defaultImg }
                      imageProps={{resizeMode:'contain'}}
                      containerStyle={style.cardContainer}
                      dividerStyle={{backgroundColor:'transparent'}}
                    >
                        <TypeButton
                          onPress={this.setRendomAvatar.bind(this)}
                          title="Change Avatar"
                        />

                        <FormLabel labelStyle={{color : styleVariables.primeBlue}}>Name</FormLabel>
                        <FormInput
                          underlineColorAndroid={styleVariables.primeBlue}
                          inputStyle={{color:styleVariables.primeBlue,textAlign:'left'}}
                          value={player.name}
                          onChangeText={this.onChange.bind(this,'name')}
                          containerStyle={{}}
                        />
                        <FormValidationMessage>{validationMessage.name}</FormValidationMessage>

                    </Card>
                </ScrollView>
                <TypeButton
                  onPress={this.save.bind(this)}
                  large
                  title="Create Player"
                  disabled={ idDisabled }
                  iconRight={ idDisabled ? {name: 'done', color:styleVariables.lineColor} : {name: 'done', color:styleVariables.primeBlue} }
                />
            </View>
        );
    }
}

const style = StyleSheet.create({
    cardContainer: {
        backgroundColor: styleVariables.nivel2 + 'aa',
        borderColor: styleVariables.lineColor,
        borderRadius: 3,
        paddingTop:8
        //flex: 1
    },
})

const mapStateToProps = (state, props) => {
    return {
        playersList: state.playersList
    }
}

const mapDispatchToProps = {
    ...actions
};

export default connect(mapStateToProps, mapDispatchToProps)(FormPlayer)