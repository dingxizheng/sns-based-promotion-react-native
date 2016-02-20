/* 
* @Author: dingxizheng
* @Date:   2016-02-01 02:59:09
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-18 19:20:23
*/

'use strict';
var React              = require('react-native');
var Actions            = require('react-native-router-flux').Actions;
var BlurView           = require('react-native-blur').BlurView;
var Icon               = require('react-native-vector-icons/MaterialIcons');
var theme              = require('../theme');
var CustomButtonsMixin = require('../CustomButtonsMixin');
var TimerMixin         = require('react-timer-mixin');
var RCTRefreshControl  = require('react-refresh-control');
var PromotionCard      = require('./PromotionCardView');
var UserCard           = require('./UserCardView');

var {
	View, 
	Text, 
	StyleSheet, 
	TouchableOpacity,
	ListView, 
} = React;

var image = 'https://lh3.googleusercontent.com/-ZadaXoUTBfs/AAAAAAAAAAI/AAAAAAAAAAA/3rh5IMTHOzg/photo.jpg';

var promotions = [
	{	
		avatar: image,
		body: "this a good comment",
		name: 'dingxizheng',
		time: '2015-12-01',
	},
	{	
		avatar: image,
		body: "this a good comment two",
		name: 'yuanmiao',
		time: '2016-02-1',
	},
	{
		avatar: image,
		name: 'Youtube',
		type: 'user'
	},
	{	
		avatar: image,
		body: "this a good comment three",
		name: 'Coffeer',
		time: new Date().getTime(),
	},
];

var TimeLine = React.createClass({

	mixins: [CustomButtonsMixin, TimerMixin],

	rightButtonsDidMount: function() {
	},

	leftButtonsDidMount: function() {
		this.setRightButtons([
			{
				icon: 'edit',
				onPress: () => Actions.simpleInput({
									title: 'New Promotion',
									onDone: function() {}
								})
			},
			{
				icon: 'camera',
				onPress: () => Actions.newPromotion({ title: 'New Promotion'})
			},
		]);
	},

	// titleViewDidMount: function() {
	// 	// console.log("???");
	// 	// this.setTitleView("good");
	// },

	getInitialState: function() {
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		return {
		  dataSource: ds.cloneWithRows(promotions),
		};
	},

	componentDidMount: function() {
	    ListView
	    RCTRefreshControl.configure({
	      node: this.refs["cards"]
	    }, this._handleReload);
	},

	renderRow: function(rowData) {
		if (rowData.type === 'user')
			return <UserCard user={rowData}/>
		return <PromotionCard promotion={rowData}/>
	},

	render: function() {
		return (
			<ListView
		      ref="cards"
			  style={styles.container}
			  dataSource={this.state.dataSource}
			  renderRow={this.renderRow} />
			
		);
	}

});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 64,
		flexDirection: 'column',
		backgroundColor: '#eeeeee'
	},
});

module.exports = TimeLine;