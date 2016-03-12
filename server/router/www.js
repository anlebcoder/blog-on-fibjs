"use strict";

var http = require("http");
var mq = require('mq');
var fs = require("fs");

module.exports = new mq.Chain([http.fileHandler('../www/'),
	function(v, f) {
		v.response.removeHeader("Last-Modified");
		if (v.response.status === 404) {
			v.response.body = fs.open("../www/index.html");
			v.response.status = 200;
		}
	}
])