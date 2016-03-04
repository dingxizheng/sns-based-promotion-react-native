/* 
* @Author: dingxizheng
* @Date:   2016-01-28 16:03:30
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-03-02 16:19:00
*/

'use strict';

var GlobalEvent = require('./GlobalEvent');

module.exports = {

	componentWillMount: function() {
		if (this.props.nestedView) {
			this._handleDelegates();
			return
		}

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

	_handleDelegates: function() {
		this.props.eventDelegates && this.props.eventDelegates({

			rightButtonsDidMount: this.rightButtonsDidMount,
			leftButtonsDidMount: this.leftButtonsDidMount,
			titleViewDidMount: this.titleViewDidMount,
			index: this.props.nestedViewIndex

		}, function(delegates) {
			this.setLeftButtons = delegates.setLeftButtons;
			this.setRightButtons = delegates.setRightButtons;
			this.setTitleView = delegates.setTitleView;
		}.bind(this));
	},

	_eventDelegates: function(delegates, callback) {
		callback({
			setLeftButtons: this.setLeftButtons,
			setRightButtons: this.setRightButtons,
			setTitleView: this.setTitleView
		});
		this.nestedChildren = this.nestedChildren || [];
		this.nestedChildren[delegates.index] = {
			rightButtonsDidMount: delegates.rightButtonsDidMount,
			leftButtonsDidMount: delegates.leftButtonsDidMount,
			titleViewDidMount: delegates.titleViewDidMount
		};
		this._refreshBar(delegates.index);
	},

	_refreshBar: function(i) {
		this.nestedChildren[i].rightButtonsDidMount && this.nestedChildren[i].rightButtonsDidMount();
		this.nestedChildren[i].leftButtonsDidMount && this.nestedChildren[i].leftButtonsDidMount();
		this.nestedChildren[i].titleViewDidMount && this.nestedChildren[i].titleViewDidMount();

		this._afterRefreshBar && this._afterRefreshBar(i);
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