/* 
* @Author: dingxizheng
* @Date:   2016-01-28 20:26:18
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-29 13:30:48
*/

'use strict';


var React                       = require('react-native');
var theme                       = require('../theme');
var CustomButtonsMixin          = require('../CustomButtonsMixin');
var Actions                     = require('react-native-router-flux').Actions;
var {BottomActions, BottomItem} = require('./BottomActionsView');
var PromotionContent            = require('./PromotionContentView');
var TabBarView                  = require('./TabBarView');
var LazyTabView                 = require('./LazyTabView');
var PromotionList               = require('../ListViews/PromotionList');
var UserList                    = require('../ListViews/UserList');
var UserSmallList               = require('../ListViews/UserSmallList');

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
		this.setRightButtons([{
			icon: 'add',
			onPress: this._addSubscriable
		}]);
	},

	leftButtonsDidMount: function() {
	},

	titleViewDidMount: function() {
        this.setTitleView('#' + this.props.tag);
    },

    _addSubscriable: function() {
    	Actions.autoComplete({ 
            rightButton: 'Add',
            content: require('../AutoComplete/Tags'),
            contentProps: { 
                initialTags: [this.props.tag],
                onTagsChange: this._tagsChange
            }
        });
    },

	componentDidFocus: function() {
		this.props.setNavBarStyle({
			backgroundColor: 'pink',
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
		return (
			<View style={styles.container}>
				
				<LazyTabView
					initialPage={this.props.initialPage || 0}
					style={styles.content}
					renderTabBar={()=> <TabBarView type="text-only" />} 
					onChangeTab={this._onTabChanged}>

					<PromotionList tabLabel="promotions" initialQuery={{ tags: this.props.tag}}/>
					<UserList tabLabel="users" initialQuery={{ tags: this.props.tag}}/>
		    	</LazyTabView>

				<BottomActions style={{ height: 45 }} separatorHeight={26}>
					<BottomItem
						icon="favorite-border"
						textStyle={{ fontSize: 12}}
						text="like"/>
					<BottomItem
						textStyle={{ fontSize: 12}}
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
	},
	tag: {
		height: 45,
		alignItems: 'center',
		justifyContent: 'flex-end',
		paddingBottom: 20,
	},
	tagName: {
		textAlign: 'center',
		color: theme.colors.MAIN,
		fontWeight: theme.fonts.FONT_BOLD,
		fontSize: 17,
	},
});

module.exports = PromotionView;