/* 
* @Author: dingxizheng
* @Date:   2016-02-22 20:49:57
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-22 22:10:37
*/

'use strict';

var HeadView   = require('./Head');
var Lightbox   = require('react-native-lightbox');
var React      = require('react-native');

var {
	View,
	Text,
} = React;

var AutoCompleteWrapper = React.createClass({

	getInitialState: function() {
		return {
			text: ""
		};
	},
	
	_renderAutoCompleteContent: function() {
		var Content = this._autoCompleteContentView;
		return <Content text={this.state.text} {...this.props.contentProps}/>;
	},

	_renderAutoCompleteHead: function(close) {
		this.closeAutoCompleteFunc = close;
		return <HeadView 
					onClose={this._toCloseAutoComplete} 
					onDone={this._onAutoCompleteDoneFunc}
					onChangeText={this._onAutoCompleteChangeTextFunc} 
					placeholder={this._autoCompletePlaceholder}/>;
	},

	_toCloseAutoComplete: function(text) {
		this.closeAutoCompleteFunc();
		this.closeAutoComplete && this.closeAutoComplete(text);
	},

	_onAutoCompleteDoneFunc: function(text) {
		this.onAutoCompleteDone && this.onAutoCompleteDone(text, this.closeAutoCompleteFunc);
	},

	_onAutoCompleteChangeTextFunc: function(text) {
		this.setState({
			text: text
		});
		this.autoCompleteText = text;
		this.onAutoCompleteChangeText && this.onAutoCompleteChangeText(text);
	},

	componentWillMount: function() {
		this._autoCompletePlaceholder = this.props.placeholder;
		this._autoCompleteContentView = this.props.contentView;
		this.closeAutoComplete = this.props.close;
		this.onAutoCompleteDone = this.props.onDone;
		this.onAutoCompleteChangeText = this.props.onChangeText;
	},

	render: function() {
		return (
		  	<Lightbox
		  		navigator={this.props.navigator} 
		  		swipeToDismiss={false}
		  		underlayColor={"#eeeeee"}
		  		renderContent={this._renderAutoCompleteContent}
		  		renderHeader={this._renderAutoCompleteHead}>
		  		{this.props.children}
			</Lightbox>
		);
	}
});

module.exports = AutoCompleteWrapper;