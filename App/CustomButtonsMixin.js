/* 
* @Author: dingxizheng
* @Date:   2016-01-28 16:03:30
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-03-02 13:16:29
*/

'use strict';

var GlobalEvent = require('./GlobalEvent');

module.exports = {

	componentWillMount: function() {
		if (this.props.nestedView)
			return

		this.props.setNavBarStyle({});
		// this.previousNavbarStyle = Object.assign({}, this.props.currentNarBarStyle());
		GlobalEvent.on("right_buttons_mounted", this.onRightButtonsMounted);
		GlobalEvent.on("left_buttons_mounted",  this.onLeftButtonsMounted);
		GlobalEvent.on("bar_title_mounted",  this.onBarTitleMounted);
		GlobalEvent.on(this.props.name + "_willFocus", this._componentWillFocus);
		GlobalEvent.on(this.props.name + "_didFocus", this.componentDidFocus);
		GlobalEvent.on(this.props.name + "_willBlur", this.componentWillBlur);
		GlobalEvent.on(this.props.name + "_didBlur", this.componentDidBlur);
	},

	onBarTitleMounted: function(onReiveTitleView, callBack) {
		this.view_key =  new Date().getUTCMilliseconds();
		this.setTitleView = onReiveTitleView;
		callBack(this.titleViewDidMount || function(){});
		GlobalEvent.off("bar_title_mounted", this.onBarTitleMounted);
	},

	onRightButtonsMounted: function(onReciveButtons, callBack) {
		this.view_key =  new Date().getUTCMilliseconds();
		this.setRightButtons = onReciveButtons;
		callBack(this.rightButtonsDidMount || function(){}, this.onRightButtonLayout || function() {});
		GlobalEvent.off("right_buttons_mounted", this.onRightButtonsMounted);
	},

	onLeftButtonsMounted: function(onReciveButtons, callBack) {
		this.view_key =  new Date().getUTCMilliseconds();
		this.setLeftButtons = onReciveButtons;
		callBack(this.leftButtonsDidMount || function(){}, this.onLeftButtonLayout || function() {});
		GlobalEvent.off("left_buttons_mounted", this.onLeftButtonsMounted);
	},

	componentWillUnmount: function() {
		if (this.props.nestedView)
			return
		GlobalEvent.off(this.props.name + "_willFocus", this._componentWillFocus);
		GlobalEvent.off(this.props.name + "_didFocus", this.componentDidFocus);
		GlobalEvent.off(this.props.name + "_willBlur", this.componentWillBlur);
		GlobalEvent.off(this.props.name + "_didBlur", this.componentDidBlur);
	},

	_componentWillBlur: function(e) {
		// this.props.setNavBarStyle(this.previousNavbarStyle || {});
		// this.componentWillFocus && this.componentWillFocus(e);
	},

	_componnetWillFocus: function(e) {
		if (this.props.nestedView)
			return
		this.props.setNavBarStyle({});
	},
}