/* 
* @Author: dingxizheng
* @Date:   2016-02-03 20:18:48
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-03 21:49:31
*/

'use strict';

var React        = require('react-native');
var ScrollableTabView = require('react-native-scrollable-tab-view');

var {
	View,
	StyleSheet,
} = React;


var LazyTabView = React.createClass({

	getInitialState: function() {
		var state = {};
		var childViews = this.props.children;
		if (!Array.isArray(childViews)) {
			childViews = [childViews];
		}
		childViews.forEach(function(c, i) {
			state['tab_' + i] = false;
		});
		return state;
	},

	loadTimer: null,

	_onTabChanged: function(e) {
		this.loadTimer && clearTimeout(this.loadTimer);
		if(this.props.onChangeTab)
			this.props.onChangeTab(e);
		this.loadTimer = setTimeout(function() {
			this.setState({
				['tab_' + e.i]: true
			});
		}.bind(this), 800);
	},

	_renderChild: function(child, i) {
		if (this.state['tab_' + i]) {
			return child;
		} 
		return <View tabLabel={child.props.tabLabel}/>;
	},

	render: function(){
		var childViews = this.props.children;
		if (!Array.isArray(childViews)) {
			childViews = [childViews];
		}

		return (
			<ScrollableTabView {...this.props} onChangeTab={this._onTabChanged}>
				{childViews.map(function(child, i){
					return this._renderChild(child, i);
				}.bind(this))}
			</ScrollableTabView>
		);
	}

});

var styles = StyleSheet.create({

});

module.exports = LazyTabView;