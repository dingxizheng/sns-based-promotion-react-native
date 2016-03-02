/* 
* @Author: dingxizheng
* @Date:   2016-02-17 17:31:43
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-03-01 18:40:01
*/

/* @flow */
'use strict';

var React              = require('react-native');
var Actions            = require('react-native-router-flux').Actions;
var Icon               = require('react-native-vector-icons/MaterialIcons');
var CustomButtonsMixin = require('../CustomButtonsMixin');
var TimerMixin         = require('react-timer-mixin');
var theme              = require('../theme');

var {
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    TextInput
} = React;

var AutoComplete = React.createClass({

    mixins: [CustomButtonsMixin, TimerMixin],

    getInitialState: function() {
        return {
            enabled: false ,
            inputText: '',
            paddingRight: 0,
        };
    },

    titleViewDidMount: function() {
        this.setTitleView(
                <TextInput onChangeText={this.onChangeText} 
                    style={[styles.textInput, {
                        marginRight: this.rightPadding,
                        marginLeft: this.leftPadding
                    }]} 
                    value={this.props.initialValue || ''}
                    multiline={false} 
                    autoFocus={true}
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder={ this.props.placeholder || "search ..." }/>
        );
    },

    rightButtonsDidMount: function() {
        this.setRightButtons([
            {
                text: this.props.rightButton || 'Go',
                onPress: this._onDone
            }
        ]);
    },

    onRightButtonLayout: function(e) {
        this.rightPadding = e.nativeEvent.layout.width;
        this.titleViewDidMount();
    },

    onLeftButtonLayout: function(e) {
        this.leftPadding = e.nativeEvent.layout.width;
        this.titleViewDidMount();
    },

    leftButtonsDidMount: function() {
        this.setLeftButtons([
            {
                icon: 'close',
                onPress: Actions.pop
            }
        ]);
    },

    _onClose: function() {
        Actions.pop();
    },

    _onDone: function() {
        var ondone = this.props.onDone || function() {};
        if (this.inputText && this.inputText.length > 0) {
            Actions.pop();
            this.onSubmit && this.onSubmit(this.inputText);
            ondone(this.inputText);
        }
    },

    onChangeText: function(e) {
        this.inputText = e;
        
        if (!this.lastTimeTyped) {
            this.lastTimeTyped = new Date().getTime();
        }
        
        if(this.lastTimeTyped && (new Date().getTime() - this.lastTimeTyped) > 400){
            this.lastTimeTyped = new Date().getTime();
         
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
            this.contentOnChangeText && this.contentOnChangeText(e);
            clearTimeout(this.toPerformQuery);
        } else {
            clearTimeout(this.toPerformQuery);
            this.toPerformQuery = this.setTimeout(function() {
                this.onChangeText(e);
            }.bind(this), 800);
        }
    },

    submitCallback: function(callback) {
        this.onSubmit = callback;
    },

    textChangeCallback: function(callback) {
        this.contentOnChangeText = callback;
    },

    render: function() {
        var Content = this.props.content || null;
        if (Content)
            return (
                <View style={styles.container}>
                    <Content textChangeCallback={this.textChangeCallback} {...this.props.contentProps} submitCallback={this.submitCallback}/>
                </View>   
            );
        else 
            return null;
    }
});


var styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 64,
    },
    textInput: {
        height: 26,
        fontSize: 13,
        padding: 0,
        paddingLeft: 10,
        paddingRight: 10,
        color: '#555555',
        backgroundColor: '#f5f5f5',
        borderRadius: 5,
    }
});


module.exports = AutoComplete;