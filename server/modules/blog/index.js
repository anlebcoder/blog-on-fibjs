"use strict";

var blog = require("./lib/class");

module.exports = {
	api: {
		list: blog.list,
		post: blog.post,
		get: blog.get
	}
}