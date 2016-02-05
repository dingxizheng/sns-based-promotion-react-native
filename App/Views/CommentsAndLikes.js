/* 
* @Author: dingxizheng
* @Date:   2016-02-02 18:08:53
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-03 21:59:28
*/

'use strict';


var React        = require('react-native');
var theme        = require('../theme');
var CommentsView = require('./CommentsView');
// var ScrollableTabView = require('react-native-scrollable-tab-view');
var TabBarView   = require('./TabBarView');
var LazyTabView  = require('./LazyTabView');

var {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView
} = React;

var CommentsAndLikes = React.createClass({
	mixins: [require('../CustomButtonsMixin')],

	rightButtonsDidMount: function() {
	},

	leftButtonsDidMount: function() {
	},

	_onTabChanged: function(e) {
		// console.log(e);
	},

	render: function() {
		return (
			<LazyTabView style={styles.container}
				renderTabBar={()=> <TabBarView/>} 
				initialPage={2}
				onChangeTab={this._onTabChanged}>

				<CommentsView tabLabel="chat-bubble-outline|comments"/>
				<CommentsView tabLabel="repeat|reposts"/>
				<CommentsView tabLabel="favorite-border|likes"/>
		    </LazyTabView>
		);
	}
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 64,
		height: 30,
		paddingBottom: 0
	}
});

module.exports = CommentsAndLikes;