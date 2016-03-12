"use strict";

module.exports = function(pool) {
	return new function() {
		this.list = function(id, order, limit) {
			return pool(function(conn) {
				var t = [limit],
					sql = "select * from `blog`";

				order = order === "desc" ? "desc" : "asc";
				if (id) {
					sql = sql + " where id " + (order === "desc" ? "<" : ">") + " ?";
					t.unshift(id);
				}
				sql = sql + " order by id " + order + " limit ?;"
				return conn.execute(sql, t[0], t[1], t[2]);
			});
		}

		this.get = function(id) {
			return pool(function(conn) {
				return conn.execute('select * from blog where id = ?;', id);
			});
		}

		this.add = function(value) {
			return pool(function(conn) {
				return conn.execute('insert into blog (value) values(?);', value).affected === 1;
			});
		}

		this.update = function() {

		}
	}
}