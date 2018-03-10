/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform, 
    StyleSheet, 
    Text, 
    View,
    ListView,
    TouchableHighlight
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import styles from './listDetails.style'
import Toolbar from '../Toolbar/toolbar.component'


export default class ListDetails extends Component {
    static navigationOptions = {
        title: 'Details',
        headerStyle: {
            backgroundColor: '#212121'
        },
        headerTitleStyle: {
            color: '#ffffff'
        }
    };
    
    constructor(props){
        console.log(props);
        super(props);
        
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>{this.props.navigation.state.params.name}</Text>             
            </View>
        );
    };
}




