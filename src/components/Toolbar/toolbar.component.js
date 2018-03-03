/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet,StatusBar, Text, View} from 'react-native';
import styles from './toolbar.style'

export default class Toolbar extends Component {
    render() {
        return (
            <View>
                <StatusBar
                    backgroundColor = "blue"
                    barStyle = "light-content"
                />
                <View style={styles.navbar}>
                    <Text style={styles.navbarTitle}>
                        {this.props.title}
                    </Text>
                </View>
            </View>
        );
    }
}


