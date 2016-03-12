"use strict";
var coroutine = require('coroutine');

module.exports = function(init, nm, timeout) {
	var sem = new coroutine.Semaphore(nm || 10);
	var pools = [];
	var count = 0;

	timeout = timeout || 60000;

	return function(func) {
		var r;
		var o;
		var c;
		var d = new Date().getTime();

		while (count) {
			c = pools[0];

			if (d - c.time.getTime() > timeout) {
				pools = pools.slice(1);
				count--;

				try {
					c.o.dispose();
				} catch (e) {}
			} else
				break;
		}

		sem.acquire();
		try {
			o = count ? pools[--count].o : init();
			r = func(o);
			pools[count++] = {
				o: o,
				time: new Date()
			};

			sem.post();
		} catch (e) {
			sem.post();

			try {
				o.dispose();
			} catch (e) {}

			throw e;
		}

		return r;
	}
}