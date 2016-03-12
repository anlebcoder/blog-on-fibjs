"use strict";

function response(v, r) {
	if (r === true) r = 1;
	if (r === false) r = -1;
	v.response.write(JSON.stringify(r || ""));
}

module.exports = {
	xhr: function(v, s) {
		v.response.setHeader('Content-Type', 'application/x-javascript;charset=utf-8');
		v.response.status = 200;
		console.notice("rest s:%s", s);
		var p = s.split("/");
		if (p.length < 2) return response(v, {
			error: "params is error"
		});

		var app = p[0],
			a = p[1].split("."),
			fn = a[0],
			params = [v.form.toJSON()];

		fn = fn ? require("modules/" + app).api[fn] : "";
		if (!fn) return response(v, {
			error: "app or fn is null"
		});
		params.unshift(v);
		return response(v, fn.apply(null, params));
	},
	rest: function(v, s) {
		v.response.setHeader('Content-Type', 'application/x-javascript;charset=utf-8');
		v.response.status = 200;
		console.notice("rest s:%s", s);
		var p = s.split("/");
		if (p.length < 2) return response(v, {
			error: "params is error"
		});

		var app = p[0],
			a = p[1].split("."),
			fn = a[0],
			params = a.slice(1);

		fn = fn ? require("modules/" + app).api[fn] : "";
		if (!fn) return response(v, {
			error: "app or fn is null"
		});
		params.unshift(v);
		return response(v, fn.apply(null, params));
	}
}