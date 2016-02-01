/* 
* @Author: dingxizheng
* @Date:   2016-01-31 18:55:51
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-01 01:57:02
*/

'use strict';

var React   = require('react-native');
var Actions = require('react-native-router-flux').Actions;
var Icon    = require('react-native-vector-icons/MaterialIcons');
var theme   = require('../theme');
var Comment = require('./CommentView');
var CustomButtonsMixin = require('../CustomButtonsMixin');
var TimerMixin = require('react-timer-mixin');
var RCTRefreshControl = require('react-refresh-control');

var {
	View, 
	Text, 
	StyleSheet, 
	TouchableOpacity, 
	ListView
} = React;

var image = 'https://lh3.googleusercontent.com/-ZadaXoUTBfs/AAAAAAAAAAI/AAAAAAAAAAA/3rh5IMTHOzg/photo.jpg';

var comments = [
	{	
		avatar: image,
		body: "this a good comment",
		name: 'dingxizheng',
		time: '1d',
	},
	{	
		avatar: image,
		body: "this a good comment two",
		name: 'yuanmiao',
		time: '1m',
	},
	{	
		avatar: image,
		body: "this a good comment three",
		name: 'Coffeer',
		time: '1w',
	},
];

var Comments = React.createClass({

	mixins: [CustomButtonsMixin, TimerMixin],

	rightButtonsDidMount: function() {
	},

	leftButtonsDidMount: function() {
	},

	componentDidMount: function() {
		console.log(this.refs.comments);
	    // ListView
	    RCTRefreshControl.configure({
	      node: this.refs["comments"]
	    }, () => {
	      this.setTimeout(() => {
	        RCTRefreshControl.endRefreshing(this.refs["comments"]);
	      }, 2000);
	    });
	},

	getInitialState: function() {
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		return {
		  dataSource: ds.cloneWithRows(comments),
		  isRefreshing: false
		};
	},

	renderRow: function(rowData) {
		return <Comment comment={rowData}/>
	},

	render: function() {
		return (
			<ListView
			  ref="comments"
			  style={styles.container}
			  dataSource={this.state.dataSource}
			  renderRow={this.renderRow}/>
		);
	}

});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 64,
		flexDirection: 'column',
	},
});


module.exports = Comments;
