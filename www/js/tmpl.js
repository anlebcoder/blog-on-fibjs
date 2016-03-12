"use strict";

function _bind() {
	$("a").click(function() {
		var url = this.href.replace(/^http:\/\/.*\//, "/");
		var _r = Router(url);
		history.pushState({}, "", url);
		var _render = Tmpl[_r.tmpl];
		Ajax.get(_r.url, _render);
		return false;
	})
}

var Tmpl = {
	home: function(data) {
		var _tmpl = '<h3 id="${year}-${month}-ref">${month}, ${year}</h3><ul>{@each list as it,k}<li><a class="post-link" href="/${it.id}">${it.title}</a></li>{@/each}</ul>';

		var str = "";
		for (var k in data) {
			var _d = k.split("_");
			str = str + juicer(_tmpl, {
				year: _d[1],
				month: _d[0],
				list: data[k]
			});
		}
		$(".page-content").html('<div class="wrap"><div class="home archive posts">' + str + '</div></div>');
		_bind();
	},
	blog: function(data) {
		_bind();
		var _tmpl = ' <div class="wrap"><div class="post"><header class="post-header"><h1>${title}</h1><p class="meta"><i class="fa fa-calendar"></i>${addtime}</p></header><article class="post-content">$${content}</article><div class="jiathis_style_24x24 share-btn btn-group"><a class="jiathis_button_qzone"></a><a class="jiathis_button_tsina"></a><a class="jiathis_button_weixin"></a><a class="jiathis_counter_style"></a></div><script type="text/javascript" src="http://v3.jiathis.com/code/jia.js?uid=1397180868830331" charset="utf-8"></script></div></div>';
		data.content = Markdown(data.content);
		$(".page-content").html(juicer(_tmpl, data));
	},
	post: function() {
		_bind();
		$(".page-content").html('<div class="wrap"><textarea id = "title" style = \'font-family:Menlo, Monaco, "Andale Mono", "lucida console", "Courier New",monospace;background:#3d3d3e;color:white;font-size:18px;width:100%;height: 40px;resize:none\' ></textarea><div class="embed-nav group" id="embed-nav"><ul><li><a id="css-link" href="#" class="">支持Markdown</a></li></ul><div class="logo-wrap" id="edit-area"><a href="" onclick = "javascript:{preview();return false;}">预览</a><a href="" onclick = "javascript:{post();return false;}">发布</a></div></div><div id="output" data-border-style="none" data-header="true" style="height: auto;"><div id="css-box" class="code-box active"><textarea id = "content" style = \'font-family:Menlo, Monaco, "Andale Mono", "lucida console", "Courier New",monospace;background:#3d3d3e;color:white;font-size:15px;width:100%;height: 300px;resize:none\' ></textarea></div></div><article class="post-content" id = "demo_content"></article></div>');
	},
	"404": function() {
		_bind();
		$(".page-content").html('<div class="wrap"><div class="post"><article class="post-content"><h3>[404]夕阳下奔跑,故事就这样开始了~</h3><blockquote><blockquote><p>And just as Steve loved ideas, and loved making stuff, he treated the process of creativity with a rare and a wonderful reverence. You see, I think he better than anyone understood that while ideas ultimately can be so powerful, they begin as fragile, barely formed thoughts, so easily missed, so easily compromised, so easily just squished.</p></blockquote></blockquote></article></div></div>');

	},
	login: function() {
		_bind();
		$(".page-content").html('<div class="wrap"><div class = "login"><span>用户名:<input type = "text" name = "username" id = "username"></span><span>密&nbsp;&nbsp;&nbsp;码:<input type = "password" name = "password" id = "password"></span><span>验证码:<img src = "/f/getcode" id = "imgcode" onclick = \'javascript:{$("#imgcode")[0].src = $("#imgcode")[0].src + "." + new Date().getTime()};\'><input type = "text" class = "code" id = "code" name = "code"></span><span><input type = "button" onclick = "login();" value = "登陆"></span></div></div>');
	}
}