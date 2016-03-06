/* 
* @Author: dingxizheng
* @Date:   2016-02-03 15:55:55
* @Last Modified by:   mover
* @Last Modified time: 2016-03-04 15:59:43
*/

'use strict';

var UIImagePickerManager = require('NativeModules').UIImagePickerManager;
var React              = require('react-native');
var Actions            = require('react-native-router-flux').Actions;

var {
	ActionSheetIOS,
} = React;

var imageOptions = {
   title: 'Select Photo', 
   cancelButtonTitle: 'Cancel',
   takePhotoButtonTitle: 'Take Photo...', 
   chooseFromLibraryButtonTitle: 'Choose from Library...', 
   cameraType: 'back',
   mediaType: 'photo', 
   allowsEditing: true, 
   noData: true,
};

var Utilities = {

	sharePromotion: function(promotion) {
		ActionSheetIOS.showShareActionSheetWithOptions({
    		message: promotion.data.body.length > 140 ? promotion.data.body.substring(0, 137) + ' ...' : promotion.data.body,
    		url: promotion.data.user.avatar.image_url,
    		subject: 'New Deal'
    	}, (e)=>{
    		Actions.toast({
    			msg: 'Failed to share !',
    			view_type: 'error',
    		});
    	}, ()=>{
    		Actions.toast({
    			msg: 'Shared successfully!',
    			view_type: 'info',
    		});
    	});
	},

	selectPhoto: function(options, cbk, errcbk) {
		UIImagePickerManager.showImagePicker(Object.assign({}, imageOptions, options), (response) => {
		  if (response.didCancel) {
		    console.log('User cancelled image picker');
		    errcbk && errcbk();
		  }
		  else if (response.error) {
		    console.log('UIImagePickerManager Error: ', response.error);
		    errcbk && errcbk();
		  }
		  else if (response.customButton) {
		    console.log('User tapped custom button: ', response.customButton);
		    errcbk && errcbk();
		  }
		  else {
		    const source = {uri: response.uri.replace('file://', ''), isStatic: true};
		    cbk && cbk(source);
		  }
		});
	},

	abbrNum: function(number, decPlaces) {
	    decPlaces = Math.pow(10,decPlaces);
	    var abbrev = [ "k", "m", "b", "t" ];

	    for (var i=abbrev.length-1; i>=0; i--) {

	        var size = Math.pow(10,(i+1)*3);

	        if(size <= number) {
	             number = Math.round(number*decPlaces/size)/decPlaces;

	             if((number == 1000) && (i < abbrev.length - 1)) {
	                 number = 1;
	                 i++;
	             }

	             number += abbrev[i];

	             break;
	        }
	    }

	    return number;
	},

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
	},

	addressAutoComplete: function(input) {
		return fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${ encodeURIComponent(input) }&types=geocode&key=AIzaSyDkFKVHqncBdg9-LRTke5aa0y4rGs1BfOA`);
	},

	geocodeReverse: function(lat, lng) {
		return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${ lat + '' },${lng + ''}&key=AIzaSyDkFKVHqncBdg9-LRTke5aa0y4rGs1BfOA`);
	},

	extractArticle: function(url) {
		return  fetch(`https://api.aylien.com/api/v1/extract?url=${ encodeURIComponent(url) }&best_image=true`, { 
					headers: {
						'X-AYLIEN-TextAPI-Application-Key': '3416e4765a4a3818137f890e3be8e8f1',
						'X-AYLIEN-TextAPI-Application-ID': '749cdf1a'
					}
				});
	},
};

module.exports = Utilities;