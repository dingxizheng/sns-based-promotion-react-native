/* 
* @Author: dingxizheng
* @Date:   2016-02-03 15:55:55
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-24 19:15:36
*/

'use strict';

var Utilities = {
	hexToRgb: function(hex) {
	    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	    var result = result ? {
	        r: parseInt(result[1], 16),
	        g: parseInt(result[2], 16),
	        b: parseInt(result[3], 16),
	        a: parseInt(result[4], 16),
	    } : null;

	    result = !result ? function(){
	    			var temp = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	    			return temp ? {
				        r: parseInt(temp[1], 16),
				        g: parseInt(temp[2], 16),
				        b: parseInt(temp[3], 16),
				    } : null;
	    		}(hex) : result;
	    return result;
	},

	hexToRgbStr: function(hex) {
		var c = this.hexToRgb(hex);
		return 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + (c.a || 1) + ')';
	},

	googleMapImage: function() {
		var url = 'https://maps.googleapis.com/maps/api/staticmap?';
		var img = {
			get: function() {
                return url;
            },

            center: function(addr) {
                url += 'center=' + encodeURIComponent(addr) + '&';
                return this;
            },

            size: function(width, height) {
                url += 'size=' + width + 'x' + height + '&';
                return this;
            },

            zoom: function(scale) {
                url += 'zoom=' + scale + '&';
                return this;
            },

            markers: function(color, label, addr) {
                url += 'markers=color:' + color + '%7Clabel:' + label + '%7C' + encodeURIComponent(addr) + '&';
                return this;
            }
		};
		return img;
	}
};

module.exports = Utilities;