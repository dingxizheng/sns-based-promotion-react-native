/* 
* @Author: dingxizheng
* @Date:   2016-01-28 20:26:18
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-16 20:44:16
*/

'use strict';


var React                       = require('react-native');
var theme                       = require('../theme');
var CustomButtonsMixin          = require('../CustomButtonsMixin');
var Actions                     = require('react-native-router-flux').Actions;
var {BottomActions, BottomItem} = require('./BottomActionsView');
var CommentsView                = require('./CommentsView');
var PromotionContent            = require('./PromotionContentView');
// var ScrollableTabView        = require('react-native-scrollable-tab-view');
var TabBarView                  = require('./TabBarView');
var LazyTabView                 = require('./LazyTabView');

var {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	ScrollView
} = React;

var PromotionView = React.createClass({
	
	mixins: [CustomButtonsMixin],

	rightButtonsDidMount: function() {
	},

	leftButtonsDidMount: function() {
	},

	makeComment: function(text) {
		console.log(text);
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
		return (
			<View style={styles.container}>
				<LazyTabView style={styles.content}
					renderTabBar={()=> <TabBarView />} 
					onChangeTab={this._onTabChanged}>

					<PromotionContent tabLabel="home|content"/>
					<CommentsView tabLabel="chat-bubble-outline|200"/>
					<CommentsView tabLabel="repeat|2K"/>
					<CommentsView tabLabel="favorite-border|101"/>
		    	</LazyTabView>

				<BottomActions style={{ height: 45 }}>
					<BottomItem
						icon="chat-bubble-outline"
						text="comment"
						onPress={this.commentThis}/>
					<BottomItem
						icon="repeat"
						text="repromote"/>
					<BottomItem
						icon="favorite-border"
						text="like"/>
					<BottomItem
						icon="more-horiz"
						text="more"/>
				</BottomActions>
			</View>
		);
	}
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 64,
		flexDirection: 'column',
	},
	content: {
		flex: 1,
		flexDirection: 'column'
	}
});

module.exports = PromotionView;