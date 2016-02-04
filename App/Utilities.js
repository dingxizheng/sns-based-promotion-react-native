/* 
* @Author: dingxizheng
* @Date:   2016-02-03 15:55:55
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-03 16:03:48
*/

'use strict';

var Utilities = {
	hexToRgb: function(hex) {
	    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
	    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
	        return r + r + g + g + b + b;
	    });

	    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	    return result ? {
	        r: parseInt(result[1], 16),
	        g: parseInt(result[2], 16),
	        b: parseInt(result[3], 16)
	    } : null;
	},

	hexToRgbStr: function(hex) {
		var c = this.hexToRgb(hex);
		return 'rgb(' + c.r + ',' + c.g + ',' + c.b + ')';
	}
};

module.exports = Utilities;