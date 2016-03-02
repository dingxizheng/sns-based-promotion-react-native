/* 
* @Author: dingxizheng
* @Date:   2016-02-09 13:43:52
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-25 22:56:50
*/

'use strict';

var React       = require('react-native');
var GlobalEvent = require('../GlobalEvent');
var theme       = require('../theme');

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
			titleView: null,
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
			this.setState({
				view_key: new Date().getUTCMilliseconds(),
				title: null,
				titleView: titleView
			});
		}
	},

	_renderOriginalTitle: function() {
		var {navigator, index, state} = this.props;
        let currentReoute = state.routeStack[index];
        let title = currentReoute.getTitle(navigator, index, state);

        var titleToRender = this.state.title || title;
        var titleToShow = (titleToRender).length > 20 ? (titleToRender.substring(0, 20 - 3) + '...') : titleToRender;
		return  <View style={styles.barTitleTextWrapper}>
				 <Text style={styles.barTitleText}>{titleToShow}</Text>
				</View>;
	},

	render: function() {
		if (this.state.title === null)
			return <View style={styles.customTitle}>{this.state.titleView}</View>
		
		return this._renderOriginalTitle();
	}
});

var styles = StyleSheet.create({
	customTitle:{
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		// flexDirection:'row', 
		justifyContent: 'center', 
		alignItems: 'center'
	},
	barTitleTextWrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	barTitleText: {
		fontFamily: '.HelveticaNeueInterface-MediumP4',
		fontSize: 17,
		color: theme.colors.BAR_TEXT,
		overflow: 'hidden'
		// marginTop: 11 + Layout.pixel,
	}
});

module.exports = BarTitleView;