/* 
* @Author: dingxizheng
* @Date:   2016-01-25 18:17:47
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-22 19:41:15
*/

'use strict';

var React       = require('react-native');
var Icon        = require('react-native-vector-icons/MaterialIcons');
var Actions     = require('react-native-router-flux').Actions;
var theme   = require('../theme');
var TimerMixin = require('react-timer-mixin');

var {
  View,
  ActivityIndicatorIOS,
  StyleSheet,
  TouchableOpacity,
  Text,
  LayoutAnimation
} = React;


var ToastView = React.createClass({

	mixins: [TimerMixin],

	getInitialState: function() {
		return { 
			view_type: 'info'
		};
	},

	onDismiss: function() {
		this._onClose();
		clearTimeout(this.timeout);
	},

	componentWillMount: function() {
   	  LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
	  var nextProps = this.props;
	  if (nextProps.view_type === 'error') {
			this._showError(nextProps.msg, nextProps.onPress);
		}

		if (nextProps.view_type === 'info') {
			this._showInfo(nextProps.msg, nextProps.onPress);
		}

		if (nextProps.view_type === 'view') {
			this._showView(nextProps.view);
		}
	},

	componentDidMount: function() {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
		this.setTimeout(this._onClose, this.props.time || 3000);
	},

	componentWillUnmount: function() {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
	},

	_onClose: function() {
		Actions.dismiss();
	},

	_showInfo: function(msg, onPress) {
		this.info_msg = msg;
		this.on_press = onPress || this.onDismiss;
		this.setState({
			view_type: 'info',
			isVisible: true
		});
	},

	_renderInfo: function() {
		return (
			<TouchableOpacity onPress={this.on_press} style={styles.msgWrapper}>
		        <Text style={styles.infoToastText}>{this.info_msg}</Text>
		    </TouchableOpacity>
		);
	},

	_showError: function(error_msg, onPress) {
		this.error_msg = error_msg;
		this.on_press = onPress || this.onDismiss;
		this.setState({
			view_type: 'error',
			isVisible: true
		});
	},

	_renderError: function() {
		return (
			<TouchableOpacity onPress={this.on_press} style={styles.msgWrapper}>
		        <Text style={styles.errorToastText}>{this.error_msg}</Text>
		    </TouchableOpacity>
		);
	},

	_showView: function(view) {
		this.custom_view = view;
		this.setState({
			view_type: 'view',
			isVisible: true
		});
	},

	_renderView: function() {
		return this.custom_view || <Text style={styles.infoToastText}>no view component found</Text>
	},

	render: function() {
		// var opacity = this.state.opacity;
		var backgroundColor = this.state.view_type === 'info' ? theme.colors.MAIN : 'pink';
		return (
			<View style={[styles.top, {backgroundColor}]}>
				
				<View style={[styles.content, {backgroundColor}]}>
				{function(){
			        if (this.state.view_type === 'info') {
			            return this._renderInfo();
			        } else if (this.state.view_type === 'error') {
			        	return this._renderError();
			        } else {
			        	return this._renderView();
			        }
			    }.call(this)}
				</View>
				
				{/*<TouchableOpacity onPress={this.onDismiss} style={[styles.dismissWrapper, {backgroundColor}]}>
		            <Icon name="close" style={styles.dismissButton} />
		        </TouchableOpacity>*/}
			</View>
		);
	}
});

var styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 64,
    left: 0,
    right: 0,
    shadowOffset:{
        width: 0,
        height: 0.3,
    },
    shadowColor: 'black',
    shadowOpacity: 0.2,
  },
  content: {
    flex: 1,
  },
  dismissWrapper: {
  	flex: .1,

  },
  dismissButton: {
    height: 30,
    fontSize: 25,
    color: 'white',
    alignSelf: 'stretch',
   	textAlign: 'center',
	justifyContent: 'center',
  },
  msgWrapper: {
  	justifyContent: 'center',
  	alignItems: 'flex-start',
  	padding: 10,
  	paddingVertical: 15
  },
  infoToastText: {
  	alignSelf: 'stretch',
    color: 'white',
    fontSize: 17,
    textAlign: 'left',
  },
  errorToastText: {
    alignSelf: 'stretch',
    color: 'white',
    fontSize: 17,
    textAlign: 'left',

  }
})

module.exports = ToastView;