"use strict";

var code = require("utils/code");

module.exports = function(v, s) {
    v.response.addHeader('Content-Type', 'image/jpeg');
    v.response.body.write(code.getcode());
}