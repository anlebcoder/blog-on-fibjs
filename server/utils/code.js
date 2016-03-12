"use strict";

var gd = require("gd");
var session_code;

function Code(codes) {
    var _m = {
        "0": "1110000111,1101111011,1101111011,1101001011,1101001011,1101001011,1101001011,1101111011,1101111011,1110000111",
        "1": "1111011111,1100011111,1111011111,1111011111,1111011111,1111011111,1111011111,1111011111,1111011111,1100000111",
        "2": "1110000111,1101111011,1101111011,1111111011,1111110111,1111101111,1111011111,1110111111,1101111011,1100000011",
        "3": "1110000111,1101111011,1101111011,1111110111,1111001111,1111110111,1111111011,1101111011,1101111011,1110000111",
        "4": "1111101111,1111101111,1111001111,1110101111,1101101111,1101101111,1100000011,1111101111,1111101111,1111000011",
        "5": "1100000011,1101111111,1101111111,1101000111,1100111011,1111111011,1111111011,1101111011,1101111011,1110000111",
        "6": "1111000111,1110111011,1101111111,1101111111,1101000111,1100111011,1101111011,1101111011,1101111011,1110000111",
        "7": "1100000011,1101110111,1101110111,1111101111,1111101111,1111011111,1111011111,1111011111,1111011111,1111011111",
        "8": "1110000111,1101111011,1101111011,1101111011,1110000111,1110110111,1101111011,1101111011,1101111011,1110000111",
        "9": "1110001111,1101110111,1101111011,1101111011,1101110011,1110001011,1111111011,1111111011,1101110111,1110001111",
        "+": "1111111111,1111011111,1111011111,1111011111,1000000011,1111011111,1111011111,1111011111,1111011111,1111111111",
        "=": "1111111111,1111111111,1111111111,1000000001,1111111111,1111111111,1000000001,1111111111,1111111111,1111111111",
        "?": "1110000111,1100110011,1101111011,1111111011,1111110011,1111100111,1111001111,1111111111,1111001111,1111001111"
    }

    var baseimg = gd.create(50, 10);
    baseimg.filledRectangle(0, 0, 50, 10, baseimg.colorAllocate(255, 255, 255));
    var redColor = baseimg.colorAllocate(255, 0, 0);

    for (var i = 0; i < codes.length; i++) {
        var x,
            y = 0,
            colors = _m[codes[i]].split(",")
        colors.forEach(function(d) {
            x = i * 10;
            d.split("").forEach(function(c) {
                if (c == 0) baseimg.setPixel(x, y, redColor);
                x++;
            });
            y++;
        });
    }
    return baseimg;
}

module.exports = {
    getcode: function() {
        var _code = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
        session_code = _code[0] + _code[1];
        return Code([_code[0], "+", _code[1], "=", "?"]).getData(gd.JPEG);
    },
    sessioncode: function() {
        return session_code;
    }
}