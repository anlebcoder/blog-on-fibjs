"use strict";

var blog = require("dbs").blog;
var util = require("util");

function mix(rs) {
	return rs.toJSON().map(function(o) {
		o = o.toJSON();
		o.value = JSON.parse(o.value);
		o.value.addtime = new Date(o.value.addtime);
		return o;
	});
}

function list(id, order, limit) {
	id = Number(id || 0);
	limit = Number(limit || 0);
	if (isNaN(id) || isNaN(limit) || (order && !util.isString(order))) throw new Error("blog list params is error");

	limit = limit || 100;
	order = order === "asc" ? "asc" : "desc";

	return mix(blog.list(id, order, limit));
}

function add(value) {
	if (!util.isObject(value) || !value.title || !value.content || !value.addtime) throw new Error("blog add value is error");
	return blog.add(JSON.stringify(value));
}

function get(id) {
	id = Number(id);
	if (!id) throw new Error("blog get params is error");
	return mix(blog.get(id));
}

module.exports = {
	list: list,
	add: add,
	get: get
};