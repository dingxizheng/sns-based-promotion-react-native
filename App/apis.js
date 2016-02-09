/* 
* @Author: dingxizheng
* @Date:   2016-02-05 16:30:38
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-05 17:29:41
*/

'use strict';

var {Resource, ResourceConfig} = require('./Resource');

var BASE_URL = "http://localhost:3000";

var User = new Resource(BASE_URL + "/v1/users");

var Promotion = new Resource(BASE_URL + "/v1/promotions");

var Comment = new Resource(BASE_URL + "/v1/comments");

var Account = new Resource(BASE_URL + "/v1/accounts");

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

module.exports = {User, Promotion, Comment, Account};