/* 
* @Author: dingxizheng
* @Date:   2016-02-01 02:59:09
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-01 13:57:32
*/

'use strict';
var React       = require('react-native');
var Actions     = require('react-native-router-flux').Actions;
var BlurView    = require('react-native-blur').BlurView;
var Icon        = require('react-native-vector-icons/MaterialIcons');
var theme       = require('../theme');
var CustomButtonsMixin = require('../CustomButtonsMixin');
var TimerMixin = require('react-timer-mixin');
var RCTRefreshControl = require('react-refresh-control');

var {
	View, 
	Text, 
	StyleSheet, 
	TouchableOpacity, 
	Image
} = React;

var TimeLine = React.createClass({

	mixins: [CustomButtonsMixin, TimerMixin],

	rightButtonsDidMount: function() {
	},

	leftButtonsDidMount: function() {
	},

	getInitialState: function() {
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		return {
		  dataSource: ds.cloneWithRows([]),
		};
	},

	componentDidMount: function() {
	    // ListView
	    // RCTRefreshControl.configure({
	    //   node: this.refs["comments"]
	    // }, this._handleReload);
	},

	render: function() {
		return (
			<ListView
			  style={}
			  dataSource={this.state.dataSource}
			  renderRow={(rowData) => <Text>{rowData}</Text>} />
			
		);
	}

});

var styles = StyleSheet.create({

});

module.exports = TimeLine;