/* 
* @Author: dingxizheng
* @Date:   2016-02-09 13:43:52
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-09 15:06:16
*/

'use strict';

var React       = require('react-native');
var GlobalEvent = require('../GlobalEvent');

var {
  View,
  StyleSheet,
  Text,
} = React;

var BarTitleView = React.createClass({

	getInitialState: function() {
		var {navigator, index, state} = this.props;
        let currentReoute = state.routeStack[index];
        let title = currentReoute.getTitle(navigator, index, state);
		return {
			title: title,
			view_key: new Date().getUTCMilliseconds()
		};
	},

	componentWillMount: function() {
		var self = this;
		GlobalEvent.trigger('bar_title_mounted', 
			this.setTitleView, 
			function(callback) { 
				self.onMounted = callback;
			}.bind(this)
		);
	},

	componentDidMount: function() {
		this.onMounted();
	},

	setTitleView: function(titleView) {
		if (typeof titleView === 'string') {
			this.setState({
				view_key: new Date().getUTCMilliseconds(),
				title: titleView
			});
		} else {
			this.titleView = titleView;
			this.setState({
				view_key: new Date().getUTCMilliseconds(),
				title: null
			});
		}
	},

	_renderOriginalTitle: function() {
		var {navigator, index, state} = this.props;
        let currentReoute = state.routeStack[index];
        let title = currentReoute.getTitle(navigator, index, state);
		return  <View style={styles.barTitleTextWrapper}>
				 <Text style={styles.barTitleText}>{this.state.title || title}</Text>
				</View>;
	},

	render: function() {
		if (this.state.title === null)
			return <View key={this.state.view_key}>{this.titleView}</View>
		else 
			return this._renderOriginalTitle();
	}
});

var styles = StyleSheet.create({
	barTitleTextWrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	barTitleText: {
		fontFamily: '.HelveticaNeueInterface-MediumP4',
		fontSize: 17,
		color: 'white'
		// marginTop: 11 + Layout.pixel,
	}
});

module.exports = BarTitleView;