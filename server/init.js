'use strict';

var db = require("db");
var fs = require("fs");
var process = require("process");
var conn = db.open("sqlite:blog.db");
var sql = fs.readFile("sql/sqlite.sql").split(";");
if (console.readLine("确定初始化数据库 Y/N ?").toLowerCase() !== "y") process.exit(-1);

sql.forEach(function(s) {
	if (s) conn.execute(s + ";");
});