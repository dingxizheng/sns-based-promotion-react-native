/* 
* @Author: dingxizheng
* @Date:   2016-01-28 20:26:18
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-03-01 23:17:46
*/

'use strict';


var React              = require('react-native');
var theme              = require('../theme');
var CustomButtonsMixin = require('../CustomButtonsMixin');
var Actions            = require('react-native-router-flux').Actions;
var TabBarView         = require('./TabBarView');
var LazyTabView        = require('./LazyTabView');
var ScrollableTabView  = require('react-native-scrollable-tab-view');
var TimeLineView       = require('./TimeLineView');
var UserView           = require('./UserView');

var {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	ScrollView
} = React;

var HomeView = React.createClass({
	
	mixins: [CustomButtonsMixin],

	getInitialState: function() {
	  return {};
	},

	rightButtonsDidMount: function() {
	},

	leftButtonsDidMount: function() {
	},

	componentDidFocus: function() {
		this.props.setNavBarStyle({
			backgroundColor: '#000000',
			// height: 0
		});
	},

	makeComment: function(text) {
		return true;
	},

	commentThis: function() {
		Actions.simpleInput({
			title: 'New Comment',
			onDone: this.makeComment
		});
	},

	_onTabChanged: function() {},

	render: function() {
		var {promotion} = this.props;
		return (
			<View style={styles.container}>
				<LazyTabView
					delay={200}
					tabBarPosition="bottom"
					initialPage={this.props.initialPage || 0}
					style={styles.content}
					renderTabBar={()=> <TabBarView tabBarPosition="top" underLineHeight={0.1} style={{ height: 45, borderTopWidth: 1, borderTopColor: '#ddd', backgroundColor:'#f5f5f5' }} iconStyle={{ fontSize:28 }} type="icon-only"/>} 
					onChangeTab={this._onTabChanged}>

					<TimeLineView tabLabel="home" />
					<View tabLabel="explore" />
					<UserView tabLabel="account-box" nestedView={true}/>
					<View tabLabel="settings" />
		    	</LazyTabView>
			</View>
		);
	}
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 64,
		flexDirection: 'column',
		backgroundColor: 'white'
	},
	content: {
		flex: 1,
		flexDirection: 'column'
	}
});

module.exports = HomeView;