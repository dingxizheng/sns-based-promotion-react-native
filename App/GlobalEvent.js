/* 
* @Author: dingxizheng
* @Date:   2016-01-27 15:53:11
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-01-27 15:53:45
*/

'use strict';

var BackboneEvents = require("backbone-events-standalone");
var myEventEmitter = BackboneEvents.mixin({});

module.exports = myEventEmitter;