"use strict";

var config = require('config').database;
var db = require('db');
var Pool = require('utils/pool');

var pool = Pool(function() {
	var conn = db.open(config.connString);
	if (conn.txBufferSize) conn.txBufferSize = 16777220;
	return conn;
}, config.limit);


module.exports = {
	blog: require("./blog")(pool),
	tags: require("./tags")(pool)
};