/* 
* @Author: dingxizheng
* @Date:   2016-02-01 02:59:09
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-25 12:01:12
*/

'use strict';
var React              = require('react-native');
var Actions            = require('react-native-router-flux').Actions;
var BlurView           = require('react-native-blur').BlurView;
var Icon               = require('react-native-vector-icons/MaterialIcons');
var theme              = require('../theme');
var CustomButtonsMixin = require('../CustomButtonsMixin');
var TimerMixin         = require('react-timer-mixin');
var RNRefreshControl   = require('react-refresh-control');
var PromotionCard      = require('./PromotionCardView');
var UserCard           = require('./UserCardView');
var BusyBox            = require('./BusyBox');

var {Promotion, Resource, Feeds} = require('../apis');

var {
	View, 
	Text, 
	StyleSheet, 
	TouchableOpacity,
	ListView, 
	LayoutAnimation
} = React;

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.data.result.id !== r1.data.result.id});

var TimeLine = React.createClass({

	mixins: [CustomButtonsMixin, TimerMixin],

	rightButtonsDidMount: function() {
	},

	leftButtonsDidMount: function() {
		this.setRightButtons([
			{
				icon: 'search',
				onPress: () => Actions.autoComplete({ 
					rightButton: 'Add',
					content: require('../AutoComplete/Tags'),
					contentProps: { initialTags: ["oneeee"] }})
			},
			{
				icon: 'add',
				onPress: () => Actions.user()
			},
		]);
	},

	getInitialState: function() {
		return {
		  loadingNext: false,
		  dataSource: ds.cloneWithRows(["busyBox"]),
		};
	},

	componentDidMount: function() {

	    RNRefreshControl.configure({
	      node: this.refs["cards"]
	    }, this._reload);

	    // this._fetchCurrentLocation();
	    
	    // fetch feeds
	    this._fetchTimeline();
	},

	_reload: async function() {
		try {
			var activities = await Feeds.fetchAll();
			this.setState({
				dataSource: ds.cloneWithRows(activities)
			});
		} catch(e) {
			console.err(e);
		}
		RNRefreshControl.endRefreshing(this.refs["cards"]);
	},

	_fetchCurrentLocation: function() {
		navigator.geolocation.getCurrentPosition(
	      (initialPosition) => { console.log(initialPosition) },
	      (error) => console.log(error.message),
	      {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000}
	    );
	},

	_fetchTimeline: async function() {
		this.setState({loadingNext: true});
		try {
			var activities = await Feeds.fetchAll();
			LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
			this.setState({
				dataSource: ds.cloneWithRows(activities),
				loadingNext: false
			});
		} catch(e) {
			console.error(e);
			this.setState({loadingNext: false});
		}
	},

	renderRow: function(rowData) {
		if (rowData === 'busyBox') {
			return <BusyBox isVisible={this.state.loadingNext} text="loading..."/>
		}
		
		// return <UserCard user={rowData}/>
		if (rowData.data.type === 'Promotion') {
			return <PromotionCard promotion={new Promotion(rowData.data.result)}/>	
		}

		if (rowData.data.type === 'Comment') {
			return <View/>
		}
	},

	render: function() {
		return (
			<View style={styles.container}>
				<ListView
			      ref="cards"
				  style={styles.listView}
				  dataSource={this.state.dataSource}
				  renderRow={this.renderRow} />
		  	</View>
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
	listView: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#eeeeee'
	}
});

module.exports = TimeLine;