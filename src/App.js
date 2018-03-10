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


import itemService from './services/item.service'
import styles from './styles/app.style'
import Toolbar from './components/Toolbar/toolbar.component'
import ListDetails from './components/ListDetails/listDetails.component'
import AddButton from './components/AddButton/addButton.component'
import InputBox from './components/InputBox/inputBox.component' 

const items = [
    {
        title: '',
        _key: ''
    }
];

class App extends Component {
    static navigationOptions = {
        title: 'Home',
        headerStyle: {
            backgroundColor: '#212121'
        },
        headerTitleStyle: {
            color: '#ffffff'
        }
    };
    
    constructor(){
        super();
        let ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 != r2});

        this.state = {
            data:"",
            itemDataSource: ds.cloneWithRows(items),
        };

        this.renderRow = this.renderRow.bind(this);
        this.pressRow = this.pressRow.bind(this);
        this.fromChild1 = this.fromChild1.bind(this);
    };

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
    };

    fromChild1(params) {
        console.log('param',params)
        this.setState({
            data: params
        })
    };

    componentWillMount(){
        console.log("componentWillMount called");
        this.getDataFromServer();
    };

    componentDidMount(){
        itemService.itemsRef.on('child_added', (child) => {
            console.log("child_added called");
            this.getDataFromServer();
        });
    };

    pressRow(item){
        console.log(item)
    };

    renderRow(item){
        console.log(item);
        const {navigate} = this.props.navigation;        
        return(
            <TouchableHighlight onPress={() => navigate('ListDetails',{ name: item.title })}>
                <View style={styles.li}>
                    <Text style={styles.liText}>
                        {item.title}
                    </Text>
                </View>
            </TouchableHighlight>
        )
    };

    render() {
        return (
            <View style={styles.container}>
                <Toolbar title="ItemLister"/>
                <InputBox callback={this.fromChild1}/>
                <AddButton data={this.state.data}/>
                <ListView
                    dataSource={this.state.itemDataSource}
                    renderRow={this.renderRow}
                />                
            </View>
        );
    };
}

export const screens = StackNavigator({
    Home: {
        screen: App
    },
    ListDetails:{
        screen: ListDetails
    }
});

export default screens;


