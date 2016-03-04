/* 
* @Author: dingxizheng
* @Date:   2016-02-05 16:30:38
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-03-02 20:26:39
*/

'use strict';


var {Resource, ResourceConfig, uploadFile} = require('./Resource');

var BASE_URL  = "http://10.100.61.167:3000";
var User      = new Resource(BASE_URL + "/v1/users");
var Promotion = new Resource(BASE_URL + "/v1/promotions");
var Comment   = new Resource(BASE_URL + "/v1/comments");
var Account   = new Resource(BASE_URL + "/v1/accounts");
var Feeds     = new Resource(BASE_URL + "/v1/feeds");
var Tag       = new Resource(BASE_URL + "/v1/tags"); 

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

var likers = {
	name: 'likers',
	path: 'likers',
	method: 'GET',
};

var dislikers = {
	name: 'dislikers',
	path: 'dislikers',
	method: 'GET',
};

var friendship = {
	name: 'dislikers',
	path: 'dislikers',
	method: 'GET',
};

User.method(likeMethod);
User.method(unlikeMethod);
User.method(likers);
User.method(dislikers);
User.method(friendship);

Promotion.method(likeMethod);
Promotion.method(unlikeMethod);
Promotion.method(likers);
Promotion.method(dislikers);
Promotion.method(friendship);

Comment.method(likeMethod);
Comment.method(unlikeMethod);
Comment.method(likers);
Comment.method(dislikers);

Account.staticMethod({name: 'signin', path: 'signin', method: 'POST'});
Account.staticMethod({name: 'signup', path: 'signup', method: 'POST'});
Account.staticMethod({name: 'facebook', path: 'facebooklogin', method: 'POST'});

Feeds.staticMethod({name: 'signup', path: 'signup', method: 'POST'});

var uploadImage = async function(uri) {
	try {
		var session = await storage.load({ key: 'loginState' });
		return await uploadFile(BASE_URL + '/uploads/images?access_token=' + session.access_token, {
			file: {
				uri: uri,
				fileName: 'photo.png',
			}
		});
	} catch(e) {
		throw e;
	}
};

module.exports = {User, Promotion, Comment, Account, Resource, uploadFile, uploadImage, Feeds, Tag};