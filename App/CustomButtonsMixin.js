/* 
* @Author: dingxizheng
* @Date:   2016-01-28 16:03:30
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-01-28 17:45:11
*/

'use strict';

var GlobalEvent = require('./GlobalEvent');

module.exports = {

	componentWillMount: function() {
		GlobalEvent.on("right_buttons_mounted", this.onRightButtonsMounted);
		GlobalEvent.on("left_buttons_mounted",  this.onLeftButtonsMounted);
	},

	onRightButtonsMounted: function(onReciveButtons, callBack) {
		this.view_key =  new Date().getUTCMilliseconds();
		this.setRightButtons = onReciveButtons;
		callBack(this.rightButtonsDidMount);
		GlobalEvent.off("right_buttons_mounted", this.onRightButtonsMounted);
	},

	onLeftButtonsMounted: function(onReciveButtons, callBack) {
		this.view_key =  new Date().getUTCMilliseconds();
		this.setLeftButtons = onReciveButtons;
		callBack(this.leftButtonsDidMount);
		GlobalEvent.off("left_buttons_mounted", this.onLeftButtonsMounted);
	}
}