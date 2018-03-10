/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {View,Button,TextInput} from 'react-native';

import { StackNavigator } from 'react-navigation';

import styles from './inputBox.style'

export default class InputBox extends Component {

    constructor(props) {
        console.log(props);
        super(props);
    };

    onPressAdd(){
        console.log("pressed");
    }  

    render() {
        return (           
            <View>
                <TextInput style={styles.inputBox}
                    onChangeText={this.props.callback}
                    >
                </TextInput>
            </View>
        );
    };
}
