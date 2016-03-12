"use strict";

function Router(_url) {
	var path = _url || location.pathname;

	//article
	if (/^\/[0-9]{1,5}$/.test(path)) return {
		url: "/rest/blog/get." + path.split("/")[1],
		tmpl: "blog"
	};

	//post
	if (/^\/post$/.test(path)) return {
		tmpl: "post"
	}

	//home
	if (path === "/") return {
		url: "/rest/blog/list",
		tmpl: "home"
	};

	if (/^\/login$/.test(path)) return {
		tmpl: "login"
	}

	return {
		tmpl: "404"
	}
}