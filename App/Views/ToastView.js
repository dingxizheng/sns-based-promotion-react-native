/* 
* @Author: dingxizheng
* @Date:   2016-01-25 18:17:47
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-01-27 17:59:46
*/

'use strict';

var React       = require('react-native');
var Icon        = require('react-native-vector-icons/FontAwesome');
var Overlay     = require('react-native-overlay');
var BlurView    = require('react-native-blur').BlurView;
var GlobalEvent = require('../GlobalEvent');

var {
  View,
  ActivityIndicatorIOS,
  StyleSheet,
  TouchableOpacity,
  Text,
} = React;

// make sure only the last ToastView will be triggered
GlobalEvent.on('info_toast', function(msg, onPress) {
	ToastView.info_renders[ToastView.info_renders.length - 1](msg, onPress);
});
GlobalEvent.on('error_toast', function(msg, onPress) {
	ToastView.error_renders[ToastView.error_renders.length - 1](msg, onPress);
});
GlobalEvent.on('custom_toast', function(view) {
	ToastView.view_renders[ToastView.view_renders.length - 1](view);
});

var ToastView = React.createClass({

	statics: {
		info_renders: [],
		error_renders: [],
		view_renders: []
	},

	getInitialState: function() {
		return { 
			view_type: 'info',
			isVisible: false
		};
	},

	onDismiss: function() {
		this.setState({
			isVisible: false
		});
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
			<TouchableOpacity onPress={this.on_press}>
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
			<TouchableOpacity onPress={this.on_press}>
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

	componentDidMount: function() {
		ToastView.info_renders.push(this._showInfo);
		ToastView.error_renders.push(this._showError);
		ToastView.view_renders.push(this._showView);
	},

	componentWillUnmount: function() {
		ToastView.info_renders.pop();
		ToastView.error_renders.pop();
		ToastView.view_renders.pop();
	},

	render: function() {
		return (
			<Overlay 
				isVisible={this.state.isVisible}
				aboveStatusBar={ false }>
				<BlurView style={styles.top} blurType="dark">
					
					<View style={styles.content}>
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
					
					<TouchableOpacity onPress={this.onDismiss} style={styles.dismissWrapper}>
			            <Icon name="times" style={styles.dismissButton} />
			        </TouchableOpacity>
				</BlurView>
			</Overlay>
		);
	}
});

var styles = StyleSheet.create({
  top: {
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: .9,
  },
  dismissWrapper: {
  	flex: .1,
  },
  dismissButton: {
    height: 30,
    fontSize: 25,
    color: '#888888',
    alignSelf: 'stretch',
   	textAlign: 'center',
	justifyContent: 'center',
  },
    infoToastText: {
    color: '#888888',
    padding: 20,
    backgroundColor: 'transparent',
    fontSize: 14,
  },
    errorToastText: {
    color: '#888888',
    padding: 15,
    backgroundColor: 'transparent',
    fontSize: 14,
  }
})

module.exports = ToastView;