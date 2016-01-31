/* 
* @Author: dingxizheng
* @Date:   2016-01-27 19:50:46
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-01-28 17:45:50
*/

'use strict';

var React       = require('react-native');
var GlobalEvent = require('../GlobalEvent');
var Icon        = require('react-native-vector-icons/FontAwesome');

var {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} = React;

var {
	Actions
} = require('react-native-router-flux');

var counter = 0;

var ActionButtons = React.createClass({

	getInitialState: function() {
		return {
			buttons: []
		};
	},

	componentWillMount: function() {
		var self = this;
		GlobalEvent.trigger('right_buttons_mounted', 
			this.setButtons, 
			function(callback) { 
				self.onMounted = callback;
			}.bind(this)
		);
	},

	componentDidMount: function() {
		this.onMounted();
	},

	setButtons: function(buttons) {
		this.setState({
			buttons: buttons
		});
	},

	render: function() {
		return (
			<View style={styles.barRightButton}>
			{this.state.buttons.map(function(b, i) {

				return (
					<TouchableOpacity key={i} onPress={b.onPress || console.log } style={styles.barButtonIconWrapper}>
			            { function(){ 
			              if (b.icon) {
				            return <Icon name={b.icon} style={styles.barButtonIcon} />
				          } else{
				          	return <Text style={styles.barButtonText}>{b.text}</Text>
				          }
			            }.bind(this).call()}
			        </TouchableOpacity>
				);

			}.bind(this))}
			</View>
		);
	}
});

var styles = StyleSheet.create({
	barRightButton: {
		paddingRight: 4,
	    paddingBottom: 6,
	    flexDirection: 'row',
	    justifyContent: 'flex-end',
	    flex: 1
	},
	barButtonIconWrapper: {
		marginTop: 8,
		justifyContent: 'center',
		alignItems: 'center',
		paddingRight: 8,
		paddingLeft: 8,
	},
	barButtonIcon: {
	    color: 'white',
	    fontSize: 22
	},
	barButtonText: {
	    color: 'white',
	    fontSize: 17
	}
});

module.exports = ActionButtons;