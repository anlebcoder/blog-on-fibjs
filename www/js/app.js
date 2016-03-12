"use strict";

var __userid__,
	_router = Router();

function preview() {
	var s = Markdown($("#content").val());
	$("#demo_content").html(s);
}

function post() {
	var title = $("#title").val();
	if (!title) {
		$("#title").val("标题呢~~");
		return;
	}
	var content = $("#content").val();
	if (!content) {
		$("#content").val("内容呢~~");
		return;
	}
	var url = "/xhr/blog/post";
	Ajax.post(url, "title=" + title + "&content=" + content, function(data) {
		if (Number(data) === 1) {
			var _r = Router("/");
			Ajax.get(_r.url, Tmpl[_r.tmpl]);
		}
	});
}

$(function() {
	Ajax.get(_router.url, Tmpl[_router.tmpl]);
});