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

import itemService from './services/item.service'
import styles from './styles/app.style'
import Toolbar from './components/Toolbar/toolbar.component'

const items = [
    {
        title: '',
        _key: ''
    }
];

export default class App extends Component {
    constructor(){
        super();
        let ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 != r2});

        this.state = {
            itemDataSource: ds.cloneWithRows(items),
        };

        this.renderRow = this.renderRow.bind(this);
        this.pressRow = this.pressRow.bind(this);
    }

    getDataFromServer(){
        console.log("getDataFromServer called");
        itemService.getItemList().then((response)=>{
            if(response.success){
                let items = response.dataList;
                var itemsListDs = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
                var itemList = itemsListDs.cloneWithRows(response.dataList);
                console.log(itemList);
                this.setState({
                    itemDataSource: itemList
                });
            }
        });
        /* let items = [
            {
                title:'itemOne'
            },
            {
                title:'itemTwo'
            }
        ]
        this.setState({
            itemDataSource: this.state.itemDataSource.cloneWithRows(items)
        }); */
    }


    componentWillMount(){
        console.log("componentWillMount called");
        this.getDataFromServer();
    }

    componentDidMount(){
        itemService.itemsRef.on('child_added', (child) => {
            console.log("child_added called");
            this.getDataFromServer();
        });
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


