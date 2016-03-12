"use strict";

var mq = require('mq');
var service = require("./service");
var f = require("./f");

module.exports = new mq.Chain([
	new mq.Routing({
		'^/f/(.*)$': f,
		'^/rest/(.*)$': service.rest,
		'^/xhr/(.*)$': service.xhr,
		'^(/.*)$': require("./www")
	}),
	function(v) {}
])