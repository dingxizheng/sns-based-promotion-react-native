/* 
* @Author: dingxizheng
* @Date:   2016-02-05 16:30:38
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-20 22:33:33
*/

'use strict';

var {Resource, ResourceConfig, uploadFile} = require('./Resource');
var BASE_URL                   = "http://localhost:3000";
var User                       = new Resource(BASE_URL + "/v1/users");
var Promotion                  = new Resource(BASE_URL + "/v1/promotions");
var Comment                    = new Resource(BASE_URL + "/v1/comments");
var Account                    = new Resource(BASE_URL + "/v1/accounts");
var Feeds                      = new Resource(BASE_URL + "/v1/feeds");

var likeMethod = {
	name: 'like',
	path: 'like',
	method: 'POST'
};

var unlikeMethod = {
	name: 'unlike',
	path: 'unlike',
	method: 'POST'
};

User.method(likeMethod);
User.method(unlikeMethod);

Promotion.method(likeMethod);
Promotion.method(unlikeMethod);

Comment.method(likeMethod);
Comment.method(unlikeMethod);

Account.staticMethod({name: 'signin', path: 'signin', method: 'POST'});
Account.staticMethod({name: 'signup', path: 'signup', method: 'POST'});
Account.staticMethod({name: 'facebook', path: 'facebooklogin', method: 'POST'});

Feeds.staticMethod({name: 'signup', path: 'signup', method: 'POST'});
// var uploadFile = function(endpoint, options) {
// 	var obj = Object.assign(options, {
// 		uploadUrl: endpoint
// 	}, options.file);

// 	var p = new Promise(function(resolve, rej) {	
// 		NativeModules.FileTransfer.upload(obj, function(err, res) {
// 			if (err) {
// 				rej(err);
// 			} else {
// 				resolve(res);
// 			}
// 		});
// 	});

// 	return p;
// };

var uploadImage = async function(uri) {
	try {
		var session = await storage.load({ key: 'loginState' });
		return await uploadFile(BASE_URL + '/uploads/images?access_token=' + session.access_token, {
			file: {
				uri: uri,
				fileName: 'photo.png',
			}
		})
	} catch(e) {
		throw e;
	}
};

module.exports = {User, Promotion, Comment, Account, Resource, uploadFile, uploadImage, Feeds};