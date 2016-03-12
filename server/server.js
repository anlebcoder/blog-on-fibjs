'use strict';

var http = require("http");

function Server() {
	var router = require("router"),
		config = require("config");
	console.notice("[%s]服务启动~", new Date());
	new http.Server(config.services.addr, config.services.port, router).run();
}

Server();