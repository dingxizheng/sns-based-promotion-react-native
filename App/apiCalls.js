/* 
* @Author: dingxizheng
* @Date:   2016-01-24 16:40:14
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-01-25 15:00:06
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

module.exports = {
	fetch: asyncFetch,

	accounts: {
		login: function(params) {
			return asyncFetch(BASE_URL + '/' + API_VERSION + '/accounts/signin', {
				method: 'POST',
				body: params
			});
		},

		signinWithFacebook: function(params) {
			return asyncFetch(BASE_URL + '/' + API_VERSION + '/accounts/facebooklogin', params);
		},

		signup: async function(params) {

		}
	},

	// add before callbacks
	addBeforeAction: function(fn) {

	},

	// add after callbacks
	addAfterAction: function(fn) {

	}
};