/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {View,Button} from 'react-native';

import { StackNavigator } from 'react-navigation';

import styles from './addButton.style'

export default class AddButton extends Component {

    constructor(props) {
        console.log(props);        

        super(props);
    };

    onPressAdd(data){
        console.log("pressed",data);
    }  


    render() {        
        return (           
            <View style={styles.addbutton}>
                <Button
                    onPress={()=>this.onPressAdd(this.props)}
                    title="Add button"
                    color="#841584"
                    accessibilityLabel="Learn more about this purple button"
                />
            </View>
        );
    };
}
