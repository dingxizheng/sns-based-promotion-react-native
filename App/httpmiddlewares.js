/* 
* @Author: dingxizheng
* @Date:   2016-02-19 18:13:28
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-20 16:14:37
*/

'use strict';
var {Resource, ResourceConfig} = require('./Resource');
var Actions = require('react-native-router-flux').Actions;

Resource.addBeforeAction(function(request) {
	return request;
});

Resource.addBeforeAction(function(request) {
	if(request.options && request.options.body && typeof request.options.body !== 'string') {
		request.options.body = JSON.stringify(request.options.body)
	}
	// console.log(request.options.body);
	return request;
});

Resource.addAfterAction(async function(request, response) {
	if (response.status !== 200 && response.status !== 201) {
		// console.log(await response.json());
		if (response.status === 400) {
			Actions.toast({
				msg: 'Wrong password or username',
				type: 'error'
			});
		}
		var error = await response.json();
		var msg = ""
		Object.keys(error.fields).forEach(function(key) {
			msg += key + ' ' + error.fields[key] + '  ';
		});
		if (response.status === 422) {
			Actions.toast({
				msg: msg,
				type: 'error'
			});
		}
		throw response;
	}
	return response;
});