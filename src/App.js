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
import * as firebase from 'firebase';
import Toolbar from './components/Toolbar/toolbar.component';
import styles from './styles/app.style'

const firebaseConfig = { 
    apiKey: "AIzaSyBDLQscuvIL7ZxP6wPqEPd32rdX0ZgQ2CQ",
    authDomain: "fir-appdatabase-9e1bb.firebaseapp.com",
    databaseURL: "https://fir-appdatabase-9e1bb.firebaseio.com",
    storageBucket: "fir-appdatabase-9e1bb.appspot.com",
}

const fbApp = null;
if (!firebase.apps.length) {
    fbApp = firebase.initializeApp(firebaseConfig);
}

export default class App extends Component {
    constructor(){
        super();
        let ds = new ListView.DataSource({
            rowHasChanged:(r1,r2) => r1 !== r2
        });

        this.state = {
            itemDataSource: ds
        }

        this.itemsRef = this.getRef().child('items');        
        this.renderRow = this.renderRow.bind(this);
        this.pressRow = this.pressRow.bind(this);
    }

    getRef(){
        return fbApp.database().ref();
    }

    componentWillMount(){
        this.getItems(this.itemsRef);
    }

    componentDidMount(){
        this.getItems(this.itemsRef);
    }

    getItems(itemsRef){
        console.log('itemRefIn_getItems',itemsRef);
        
        /* let items = [
            {
                title:'itemOne',
            },
            {
                title:'itemTwo',
            }
        ];
        this.setState({
            itemDataSource: this.state.itemDataSource.cloneWithRows(items)
        }) */

            
        itemsRef.on("value", function(snap) {
            var items = [];
            snap.forEach((child) => {
                items.push({
                    title: child.val().title,
                    _key: child.key
                });
            });
    
            this.setState({
                dataSource: this.state.itemDataSource.cloneWithRows(items)
            });
        })        
    }

    pressRow(item){
        console.log(item)
    }

    renderRow(item){
        console.log(item)
        return(
            <TouchableHighlight onPress={()=>{
                this.pressRow(item);
            }}>
                <View style={styles.li}>
                    <Text style={styles.liText}>
                        {item.title}
                    </Text>
                </View>
            </TouchableHighlight>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <Toolbar title="ItemLister"/>
                <ListView
                    dataSource={this.state.itemDataSource}
                    renderRow={this.renderRow}
                />                
            </View>
        );
    }
}


