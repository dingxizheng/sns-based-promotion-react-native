/* 
* @Author: dingxizheng
* @Date:   2016-02-19 18:13:28
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-25 19:03:49
*/

'use strict';
var {Resource, ResourceConfig} = require('./Resource');
var Actions = require('react-native-router-flux').Actions;

Resource.addBeforeAction(async function(request) {
	console.log("request options", request.url, request.options);
	try {
		var session = await storage.load({ key: 'loginState' });
		global.loginSession = session;
		
		request.options.query = request.options.query || {};
		request.options.query.access_token = session.access_token;

	} catch(e) {
		console.error(e);
	}
	return request;
});

Resource.addBeforeAction(function(request) {
	if(request.options && request.options.body && typeof request.options.body !== 'string') {
		request.options.body = JSON.stringify(request.options.body)
	}
	console.log("request body", request.options.body);
	return request;
});

Resource.addAfterAction(async function(request, response) {
	if (response.status !== 200 && response.status !== 201) {
		// console.log(await response.json());
		if (response.status === 400) {
			Actions.toast({
				msg: 'Wrong password or username',
				view_type: 'error'
			});
		}

		if (response.status === 422) {
			var error = await response.json();
			var msg = ""
			Object.keys(error.fields).forEach(function(key) {
				msg += key + ' ' + error.fields[key][0];
			});

			Actions.toast({
				msg: msg,
				view_type: 'error'
			});
		}

		if (response.status === 401) {
			var error = await response.json();
			Actions.toast({
				msg: 'Please login first!',
				view_type: 'error'
			});
			setTimeout(()=>{ Actions.login() }, 1000);
		}

		if (response.status === 500) {
			Actions.toast({
				msg: 'Unknown server error!',
				view_type: 'error'
			});
		}

		throw response;
	}
	return response;
});