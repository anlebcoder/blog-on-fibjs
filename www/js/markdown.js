"use strict";

// reg is poor,sorry

function Markdown(text) {
	var code = {},
		reg = /\n?`{3}\s{0,}\n([\s\S]*)\n`{3}\n?/g;

	(text.match(reg) || []).forEach(function(c, i) {
		code["__code__" + i] = '<div class="highlight"><pre><code class="language-text" data-lang="text">' + c.replace(reg, "$1") + '</code></pre></div>';
		text = text.replace(c, "__code__" + i);
	});

	[{
		r: /\n{0,1}#####\s([^\n]*)\n{0,1}/g,
		v: "<h5>$1</h5>"
	}, {
		r: /\n{0,1}####\s([^\n]*)\n{0,1}/g,
		v: "<h4>$1</h4>"
	}, {
		r: /\n{0,1}###\s([^\n]*)\n{0,1}/g,
		v: "<h3>$1</h3>"
	}, {
		r: /\n{0,1}##\s([^\n]*)\n{0,1}/g,
		v: "<h2>$1</h2>"
	}, {
		r: /\n{0,1}#\s([^\n]*)\n{0,1}/g,
		v: "<h1>$1</h1>"
	}, {
		r: /\n([^\n]*)\n{0,1}/g,
		v: "<p>$1</p>"
	}].forEach(function(rule) {
		text = text.replace(rule.r, rule.v);
	});

	for (var k in code) text = text.replace(k, code[k]);
	return text;
}