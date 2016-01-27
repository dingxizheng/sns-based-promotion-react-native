/* 
* @Author: dingxizheng
* @Date:   2016-01-24 16:40:14
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-01-25 18:14:07
*/

'use strict';

var BASE_URL = 'http://localhost:3000';
var API_VERSION = 'v1';

var beforeActions = [];
var afterActiions = [];

beforeActions.push(function(params) {
	if(params.options && params.options.body && typeof params.options.body !== 'string') {
		params.options.body = JSON.stringify(params.options.body)
	}
	return params;
});

// async fetch
var asyncFetch = async function(path, params) {
  try {

  	// call all before actions
  	var finalParams = beforeActions.reduce(function(a, cb) {
  		return cb(a) || a;
  	}, { url: path, options: params });

    let response = await fetch(finalParams.url, finalParams.options);

    // call all after actions
    var finalResult = afterActiions.reduce(function(a, cb) {
    	return cb(a) || a;
    }, { url: path, options: params, response: response });

    // return result
    return finalResult.response;
  
  // catch all the errors
  } catch(error) {
    throw error;
  }
};

var inSiteFetch = function(method, path, params) {
	return asyncFetch(BASE_URL + '/' + API_VERSION + path, params);
};

// APIS module to be exposed
var APIS = {};

APIS.asyncFetch = asyncFetch;

APIS.addAfterAction = function(fn) {

};

APIS.addAfterAction = function(fn) {

};

// user actions
APIS.accounts = {};

APIS.accounts.login = function(params) {
	return inSiteFetch('/accounts/signin', {
		method: 'POST',
		body: params
	});
};

APIS.accounts.signinWithFacebook = function(params) {
	return inSiteFetch('/accounts/facebooklogin', {
		method: ''
	});
};

APIS.accounts.signup = function(params) {
	return inSiteFetch('/accounts/signup', params);
};

APIS.accounts.logout = function(params) {
	return inSiteFetch('/accounts/signout', params);
};

// exports APIS
module.exports = APIS;