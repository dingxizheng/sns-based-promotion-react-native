/* 
* @Author: dingxizheng
* @Date:   2016-02-04 10:47:54
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-28 16:46:54
*/

'use strict';
var queryString = require('query-string');
var {NativeModules} = require('react-native');

var Promisefy = function(fn) {
	var newFn = function() {
		try {
			var result = fn.apply(null, arguments);
			
			if (!result) {
				return Promise.reject(result);
			}
			if (result.then !== 'function') {
				return Promise.resolve(result);
			}
			return result;
		} catch (e) {
			return Promise.reject(e);
		}
	}; 
	return newFn;
};

// default options
var defaultOptions = {
	disableBeforeFilters: false,
	disableAfterFilters: false
};

var defaultHttpOptions = {
	headers: {
	    'Accept': 'application/json',
	    'Content-Type': 'application/json',
	}
};

Object.freeze(defaultHttpOptions);

// global actions;
var globalBeforeActions = [];
var globalAfterActions  = [];

// resource 
var Resource = function(endpoint, options) {
	this.defaultOptions = Object.assign(defaultOptions, options || {});
	this.beforeActions = [];
	this.afterActions = [];
	this.endpoint = endpoint;
	this.options = options;
	this.url = this.endpoint;

	var resourceType = this;

	var TypedResource = function(params) {
		this.data = {};
		this.notFetched = false;
		this.updateData = {};

		// params could be a single 'string' id;
		if (typeof params === 'string') {
			this.data.id = params;
			this.notFetched = true;
		} else if(typeof params === 'object') {
			this.data = Object.assign({}, this.data, params);
		}

		var self = this;

		this.set = function(object) {
				self.data = Object.assign({}, self.data, object);
				self.updateData = Object.assign({}, self.updateData, object);
				return this;
		};

		this.get = function(key) {
				return self.data[key];
		};

		this.fetch = function(options) {
			if (this.get("id") !== undefined)
				return self._fetch([resourceType.url, this.get("id")].join('/'), Object.assign({method: 'GET'}, options));
			else
				return Promise.reject(null);
		};

		this.save = function(options) {
			if (this.get("id") === undefined){
				return self._fetch(resourceType.url, Object.assign({method: 'POST', body: this.data }, options));
			}
			else
				return self._fetch([resourceType.url, this.get("id")].join('/'), Object.assign({method: 'PUT', body: self.updateData}, options));
		};

		this.remove = function(options) {
			return self._fetch(resourceType.url, Object.assign({method: 'DELETE'}, options));
		};
	};

	// custom install methods
	TypedResource.method = function (options_) {
		TypedResource.prototype[options_.name] = function (options) {
			return this._fetch([resourceType.url, this.get("id"), options_.path].join('/'), Object.assign(options_, options));
		};
	};

	// custom methods
	TypedResource.staticMethod = function (options_) {
		TypedResource[options_.name] = function (options) {
			return Resource.fetch([resourceType.url, options_.path].join('/'), Object.assign(options_, options));
		};
	};

	TypedResource.prototype._fetch = async function(url, options) {
		try {
			var request = await globalBeforeActions.concat(resourceType.beforeActions).reduce(async function(res, current){
				return await current.action(await res);
			}, {url, options});

			// convert query params into a query string
			request = convertQueryParams(request);

			var result = await fetch(request.url, Object.assign({}, defaultHttpOptions, request.options));

			result = await globalAfterActions.concat(resourceType.afterActions).reduce(async function(res, current){
				return await current.action(request, await res);
			}, result);

			var jsonData = await result.json();
			this.data = Object.assign(this.data, jsonData);
			this.notFetched = false;
			this.updateData = {};
			return jsonData;
		} catch(e) {
			return Promise.reject(e);
		}
	};

	TypedResource.fetchAll = async function(query, options) {
		try {
			var list = await Resource.fetch(resourceType.url, Object.assign({query: query}, options, {method: 'GET'}));
			return (await list.json()).map(function(rawData){
				return new TypedResource(rawData);
			});
		} catch(e) {
			return Promise.reject(new Error(e));
		}
	};

	return TypedResource;
};

// static fetch method, can be used standalone
Resource.fetch = async function(url, options) {
	try {
		var request = {url, options};
		request = await globalBeforeActions.reduce(async function(req, current){
			return await current.action(await req);
		}, request);

		// convert query params into a query string
		request = convertQueryParams(request);

		// console.log("final Options", Object.assign({}, request.options, { headers: Object.assign({}, defaultHttpOptions.headers, request.options.headers) }));

		var response = await fetch(request.url, Object.assign({}, request.options, { headers: Object.assign({}, defaultHttpOptions.headers, request.options.headers) }));
		
		response = await globalAfterActions.reduce(async function(res, current){
			return await current.action(request, await res);
		}, response);

		return response;

	} catch(e) {
		return Promise.reject(e);
	}

};

// add a function which will be executed before the request
Resource.addBeforeAction = function(beforeAction) {
	if (typeof beforeAction !== 'function') {
		return null;
	}

	var key = + new Date();
	globalBeforeActions.push({
		key: key,
		action: Promisefy(beforeAction)
	});
	return key;
};

Resource.removeBeforeAction = function(actionId) {
	var fnIndex = false;
	globalBeforeActions.forEach((a, i) => {
		a.key === actionId && (fnIndex = i);
	});

	fnIndex && globalBeforeActions.splice(fnIndex, 1);
};

// add a function which will be exected after the request
Resource.addAfterAction = function(afterAction) {
	if (typeof afterAction !== 'function')
		return null;
	var key = + new Date();
	globalAfterActions.push({
		key: key,
		action: Promisefy(afterAction)
	});
	return key;
};

Resource.removeAfterAction = function(actionId) {
	var fnIndex = false;
	globalAfterActions.forEach((a, i) => {
		a.key === actionId && (fnIndex = i);
	});

	fnIndex && globalAfterActions.splice(fnIndex, 1);
};


// add a function which will be executed before the request
Resource.prototype.addBeforeAction = function(beforeAction) {
	if (typeof beforeAction !== 'function') {
		return null;
	}

	var key = + new Date();
	this.beforeActions.push({
		key: key,
		action: Promisefy(beforeAction)
	});
	return key;
};

// add a function which will be exected after the request
Resource.prototype.addAfterAction = function(afterAction) {
	if (typeof afterAction !== 'function')
		return null;
	var key = + new Date();
	this.afterActions.push({
		key: key,
		action: Promisefy(afterAction)
	});
	return key;
};


var ResourceConfig = function(options) {
	defaultOptions = Object.assign(defaultOptions, options);
};

// convert query params to url encoded string
var convertQueryParams = function(request) {
	if(typeof request.options.query === 'object') {
		var urlParts = request.url.split("?");
		urlParts.shift();
		var urlQuery = urlParts.join();
		var queryParams = Object.assign(queryString.parse(urlQuery), request.options.query);
		queryParams = queryString.stringify(queryParams);
		request.url = request.url.split("?")[0] + '?' + queryParams;
	}
	return request;
};

// upload file 
var uploadFile = function(endpoint, options) {
	var obj = Object.assign(options, {
		uploadUrl: endpoint
	}, options.file);

	var p = new Promise(function(resolve, rej) {	
		NativeModules.FileTransfer.upload(obj, function(err, res) {
			if (err) {
				rej(err);
			} else {
				resolve(res);
			}
		});
	});

	return p;
};


module.exports = {Resource, ResourceConfig, uploadFile};