/* 
* @Author: dingxizheng
* @Date:   2016-01-28 20:26:18
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-03-01 22:15:46
*/

'use strict';


var React                       = require('react-native');
var theme                       = require('../theme');
var CustomButtonsMixin          = require('../CustomButtonsMixin');
var Actions                     = require('react-native-router-flux').Actions;
var {BottomActions, BottomItem} = require('./BottomActionsView');
var CommentListView             = require('../ListViews/CommentList');
var PromotionList               = require('../ListViews/PromotionList');
var PromotionContent            = require('./PromotionContentView');
var LikeList                    = require('../ListViews/LikeList');
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
					initialPage={this.props.initialPage || 0}
					style={styles.content}
					renderTabBar={()=> <TabBarView />} 
					onChangeTab={this._onTabChanged}>

					<PromotionContent tabLabel="home|content" promotion={promotion}/>
					<CommentListView tabLabel={"chat-bubble-outline|" + promotion.data.comments.count} initialQuery={{ promotion_id: promotion.data.id }}/>
					<PromotionList tabLabel="repeat|2K" initialQuery={{ parent_id: promotion.data.id}}/>
					<LikeList tabLabel="favorite-border|101" initialQuery={{}} liked={promotion}/>
		    	</LazyTabView>

				<BottomActions style={{ height: 45 }} separatorHeight={0}>
					<BottomItem
						type="vertical"
						icon="chat-bubble-outline"
						text="comment"
						textStyle={{ fontSize: 10}}
						onPress={this.commentThis}/>
					<BottomItem
						type="vertical"
						icon="repeat"
						textStyle={{ fontSize: 10}}
						text="repromote"/>
					<BottomItem
						type="vertical"
						icon="favorite-border"
						textStyle={{ fontSize: 10}}
						text="like"/>
					<BottomItem
						type="vertical"
						textStyle={{ fontSize: 10}}
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
		backgroundColor: 'white'
	},
	content: {
		flex: 1,
		flexDirection: 'column'
	}
});

module.exports = PromotionView;