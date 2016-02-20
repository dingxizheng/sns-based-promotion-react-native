/* 
* @Author: dingxizheng
* @Date:   2016-02-17 17:31:43
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-19 17:49:23
*/

/* @flow */
'use strict';

var React   = require('react-native');
var Actions = require('react-native-router-flux').Actions;
var Icon    = require('react-native-vector-icons/MaterialIcons');
var theme   = require('../theme');

var {
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    TextInput, 
    Modal
} = React;

var AutoComplete = React.createClass({
    getInitialState: function() {
        return {
            enabled: false ,
            inputText: ''
        };
    },
    _onClose: function() {
        Actions.dismiss();
    },

    _onDone: function() {
        var ondone = this.props.onDone || function() {};
        if (this.inputText && this.inputText.length > 0) {
            Actions.dismiss();
            ondone(this.inputText);
        }
    },

    onChangeText: function(e) {
        this.inputText = e;
        if (e && e.length > 0) {
            this.setState({
                enabled: true,
                inputText: e
            });
        } else {
            this.setState({
                enabled: false,
                inputText: e
            });
        }

        this.props.onChangeText && this.props.onChangeText(e);
    },

    onRowPress: function(rowData) {
        Actions.dismiss();
        this.props.onRowPress && this.props.onRowPress(rowData);
    },

    render: function() {
        var opacity = this.state.enabled ? 1 : 0.5;
        var ContentView = this.props.listview;
        return (
   
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.iconWrapper} onPress={this._onClose}>
                        <Icon name="close" style={styles.leftIcon}/>
                    </TouchableOpacity>
                    
                    <View style={styles.rightHeader}>
                        <TextInput onChangeText={this.onChangeText} 
                            style={styles.contentInput} 
                            multiline={false} 
                            autoFocus={true} 
                            placeholder={ this.props.placeholder || "search.." }/>
                        
                        <TouchableOpacity style={[styles.iconWrapper]} onPress={this._onDone}>
                            <Text style={[styles.rightIcon, {opacity}]}>{ this.props.rightButton || 'Add' }</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.content}>
                    <ContentView text={this.state.inputText} onRowPress={this.onRowPress}/>
                </View>
            </View>
            
        );
    }
});


var styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0
    },
    header: {
        height: 64,
        flexDirection: 'row',
        backgroundColor: theme.colors.MAIN,
        justifyContent: 'center',
    },
    rightHeader: {
        flex: 1,
        flexDirection: 'row',
    },
    iconWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    leftIcon: {
        color: '#FFF',
        fontSize: 22,
        paddingHorizontal: 14,
    },
    rightIcon: {
        color: '#FFF',
        fontSize: 17,
        paddingHorizontal: 14,
    },
    contentInput: {
        marginTop: 23,
        flex: 1,
        height: 40,
        fontSize: 17,
        color: '#efefef',
    },
    content: {
        flex: 1,
        backgroundColor:'#eeeeee88'
    }
});


module.exports = AutoComplete;