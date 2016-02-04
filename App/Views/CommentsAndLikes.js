/* 
* @Author: dingxizheng
* @Date:   2016-02-02 18:08:53
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-03 17:26:50
*/

'use strict';


var React        = require('react-native');
var theme        = require('../theme');
var CommentsView = require('./CommentsView');
var ScrollableTabView = require('react-native-scrollable-tab-view');
var TabBarView   = require('./TabBarView');

var {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView
} = React;

var CommentsAndLikes = React.createClass({
	_onTabChanged: function(e) {
		// console.log(e);
	},

	render: function() {
		return (
			<ScrollableTabView style={styles.container}
				renderTabBar={()=> <TabBarView/>} 
				initialPage={2}
				tabBarInactiveTextColor="#555555" 
				tabBarActiveTextColor={theme.colors.MAIN}
				tabBarUnderlineColor={theme.colors.MAIN}
				onChangeTab={this._onTabChanged}>

				<CommentsView tabLabel="chat-bubble-outline|comments"/>
				<CommentsView tabLabel="repeat|reposts"/>
				<CommentsView tabLabel="favorite-border|likes"/>
		    </ScrollableTabView>
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