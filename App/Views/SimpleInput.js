/* 
* @Author: dingxizheng
* @Date:   2016-01-31 17:23:24
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-03-03 22:14:30
*/

'use strict';

var React              = require('react-native');
var Actions            = require('react-native-router-flux').Actions;
var Icon               = require('react-native-vector-icons/MaterialIcons');
var theme              = require('../theme');
var CustomButtonsMixin = require('../CustomButtonsMixin');
var TimerMixin         = require('react-timer-mixin');
var KeyboardSpacer     = require('react-native-keyboard-spacer');
var dismissKeyboard    = require('dismissKeyboard');

var {BottomActions, BottomItem} = require('./BottomActionsView');

var {
	View, 
	Text, 
	StyleSheet, 
	TouchableOpacity, 
	TextInput, 
	DeviceEventEmitter,
	InteractionManager
} = React;

var MakePromotion = React.createClass({

	mixins: [CustomButtonsMixin, TimerMixin],

	getInitialState: function() {
		return {
			animated: true,
			transparent: true,
			visible: true,
			keyboard: false,
		};
	},

	titleViewDidMount: function() {
        this.setTitleView(this.props.title);
    },

	rightButtonsDidMount: function() {
        this.setRightButtons([
            {
                text: this.props.buttonName || 'Done',
                onPress: this.onDone
            }
        ]);
    },

    leftButtonsDidMount: function() {
        this.setLeftButtons([
            {
                icon: 'close',
                onPress: Actions.pop
            }
        ]);
    },

	componentDidMount: function() {
        this._keyboardWillShowFunc = DeviceEventEmitter.addListener('keyboardWillShow', this._keyboardWillShow);
        this._keyboardWillHideFunc = DeviceEventEmitter.addListener('keyboardWillHide', this._keyboardWillHide);
        InteractionManager.runAfterInteractions(() => {
            this.refs.contentInput.focus();
        });
    }, 

    componentWillUnmount: function() {
        this._keyboardWillHideFunc.remove();
        this._keyboardWillShowFunc.remove(); 
    },

    _keyboardWillShow: function() {
        this.setState({ keyboard: true });
    },

    _keyboardWillHide: function() {
        this.setState({ keyboard: false });
    },

	onChangeText: function(text) {
		this.inputText = text;
	},

	onDone: function() {
		var ondone = this.props.onDone || function() {};
		if (this.inputText && this.inputText.length > 0) {
			ondone(this.inputText) && this._onClose();
		}
	},

	_onClose: function() {
		Actions.pop();
	},

	render: function() {

		return (
			<View style={[styles.container]} >
					
				<View style={styles.content}>
					<TextInput 
						ref="contentInput"
						value={this.props.initialValue || ''} 
						onChangeText={this.onChangeText} 
						style={[styles.contentInput, { height: this.props.textInputHeight || 100 }]} 
						multiline={true} 
						autoFocus={true}
						autoCorrect={false}
                        autoCapitalize="none" 
						placeholder={this.props.placeholder || "put your comment here..." }/>
				</View>
				<BottomActions style={{ height: 45, backgroundColor: 'white' }} separatorHeight={0}>
	                    <BottomItem
	                        type="icon-only"
	                        icon="close"
	                        onPress={this._onClose}
	                        iconStyle={{ fontSize: 20}}/>
	                    <BottomItem
	                        type="text-only"
	                        text=""
	                        iconStyle={{ fontSize: 20}}/>
	                    <BottomItem
	                        type="text-only"
	                        text=""
	                        iconStyle={{ fontSize: 20}}/>
	                    <BottomItem
	                        type="text-only"
	                        text=""
	                        textStyle={{ fontSize: 17}}/>
	                    <BottomItem
	                        type="icon-only"
	                        iconStyle={{ fontSize: 20}}
	                        onPress={()=>{ dismissKeyboard() }}
	                        icon={ this.state.keyboard ? "keyboard-hide" : "keyboard-arrow-up" }/>
	                </BottomActions>
                <KeyboardSpacer/>
			</View>
		);
	}
});


var styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 64,
		backgroundColor: 'white',
		flexDirection: 'column',
        justifyContent: 'flex-end'
    },
    content: {
    	flex: 1,
    	padding: 10,
    },
    contentInput: {
    	flex: 1,
    	fontSize: 17,
    	color: theme.colors.GREY_FONT,
    },
    floatButton: {

    },
});

module.exports = MakePromotion;