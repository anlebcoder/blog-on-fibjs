"use strict";

var blog = require("./blog");

function enMonth(m) {
	switch (m) {
		case 1:
			return "January";
		case 2:
			return "February";
		case 3:
			return "March";
		case 4:
			return "April";
		case 5:
			return "May";
		case 6:
			return "June";
		case 7:
			return "July";
		case 8:
			return "August";
		case 9:
			return "September";
		case 10:
			return "October";
		case 11:
			return "November";
		case 12:
			return "December";
		default:
			return "Null";
	}
}

function list(v, id, order, limit) {
	var data = {};
	blog.list(id, order, limit).forEach(function(o) {
		var v = o.value;
		var k = enMonth(v.addtime.getMonth() + 1) + "_" + v.addtime.getFullYear();
		data[k] = data[k] || [];
		data[k].push({
			id: o.id,
			title: v.title
		});
	});
	return data;
}

function post(v, e) {
	var title = e["title"],
		content = e["content"];
	if (!title || !content) return {
		error: "params is error"
	}

	return blog.add({
		title: title,
		content: content,
		addtime: new Date()
	});
}

function get(v, id) {
	id = Number(id);
	if (!id) return {
		error: "params is error"
	}

	var rs = blog.get(id);
	if (rs.length !== 1) return {
		error: "id is null"
	};

	var v = rs[0].value,
		addtime = v.addtime;
	v.addtime = enMonth(addtime.getMonth() + 1).substr(0, 3) + " " + addtime.getDate() + "," + addtime.getFullYear();
	return v;
}
module.exports = {
	list: list,
	post: post,
	get: get
}