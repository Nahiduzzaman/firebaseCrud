import React from 'react';
import {StyleSheet} from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    listview: {
        flex:1
    },
    li: {
        backgroundColor:'#fff',
        borderBottomColor: '#eee',
        borderColor: 'transparent',
        borderWidth: 1,
        paddingLeft: 16,
        paddingTop: 14,
        paddingBottom:16
    },
    liContainer:{
        flex:2
    },
    liText:{
        color:'#333',
        fontSize: 16,
    }

});

export default styles;