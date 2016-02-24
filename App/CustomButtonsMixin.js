/* 
* @Author: dingxizheng
* @Date:   2016-01-28 16:03:30
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-23 14:08:39
*/

'use strict';

var GlobalEvent = require('./GlobalEvent');

module.exports = {

	componentWillMount: function() {
		GlobalEvent.on("right_buttons_mounted", this.onRightButtonsMounted);
		GlobalEvent.on("left_buttons_mounted",  this.onLeftButtonsMounted);
		GlobalEvent.on("bar_title_mounted",  this.onBarTitleMounted);
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
	}
}