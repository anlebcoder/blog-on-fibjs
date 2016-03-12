"use strict";

var Ajax = {
	get: function(url, callback) {
		if (url)
			$.ajax({
				type: 'GET',
				url: url,
				dataType: "json",
				success: function(data) {
					return callback(data);
				}
			});
		else
			return callback();
	},
	post: function(url, params, callback) {
		$.ajax({
			type: 'POST',
			url: url,
			data: params,
			success: function(data) {
				return callback ? callback(data) : true;
			}
		});
	}
}