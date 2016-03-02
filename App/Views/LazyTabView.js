/* 
* @Author: dingxizheng
* @Date:   2016-02-03 20:18:48
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-03-01 23:10:23
*/

'use strict';

var React        = require('react-native');
var TimerMixin = require('react-timer-mixin');
var ScrollableTabView = require('react-native-scrollable-tab-view');
var BusyBox = require('../Parts/BusyBox');

var {
	View,
	StyleSheet,
} = React;


var LazyTabView = React.createClass({

	mixins: [TimerMixin],

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
		
		if(e.i !== this.props.initialPage) {
			this.loadTimer = this.setTimeout(function() {
				this.setState({
					['tab_' + e.i]: true
				});
			}, this.props.delay || 800);
		} else {
			this.setState({
				['tab_' + e.i]: true
			});
		}
	},

	_renderChild: function(child, i) {
		if (this.state['tab_' + i]) {
			return child;
		} 
		return <BusyBox key={i} style={{ backgroundColor: 'white' }} tabLabel={child.props.tabLabel}/>;
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