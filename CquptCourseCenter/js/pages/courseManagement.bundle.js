webpackJsonp([1,9],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BluMUI = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../libs/blueMonUI.js\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var ajax = __webpack_require__(2);

	/*
	院长：0102295 Cq011568 (黄容)
	教研室主任：0102549  251833（罗婷婷）
	课程负责人：0102387 密码caiting@cqupt（蔡婷）
	教师：0102295 0102549   0102387 
	 */
	// 此处需要获取角色ID
	var User = {
	  id: ''
	};
	User.id = getCookie('userId');
	BluMUI.result.unifyCode = User.id;
	console.log("cookie", document.cookie);

	//获取subModule(tab)

	ajax({
	  url: courseCenter.host + "getMenu",
	  data: {
	    unifyCode: User.id,
	    module: 4
	  },
	  success: function success(gets) {
	    //渲染tabs
	    BluMUI.create({
	      id: 'Tab',
	      tabs: JSON.parse(gets).data
	    }, 'Create_tabs', document.getElementById('React_tab'));

	    //渲染options
	    BluMUI.create({
	      id: 'Options',
	      subModule: parseHash(window.location.href).subModule || BluMUI.result.Tab.state.subModule
	    }, 'Create_options', document.getElementById('React_options'));
	  }
	});

	console.log('审核返回后：', parseHash(window.location.href).subModule);
	console.log(window.location.href);

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	//封装ajax(BluMUI.result.Title.props.ajaxing)
	var post_ajax = function post_ajax(options) {
	  options = options || {};
	  // options.dataType = "json";

	  //创建 - 非IE6 - 第一步
	  if (window.XMLHttpRequest) {
	    var xhr = new XMLHttpRequest();
	  } else {
	    //IE6及其以下版本浏览器
	    var xhr = new ActiveXObject('Microsoft.XMLHTTP');
	  }

	  //数据处理
	  var arr = [];
	  for (var name in options.data) {
	    arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(options.data[name]));
	  }
	  var params = arr.join("&");

	  //连接 和 发送 - 第二步
	  xhr.open("POST", options.url, true);
	  //设置表单提交时的内容类型(注意头信息的UTF-8，不然后台会乱码)
	  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
	  xhr.send(params);

	  //接收 - 第三步
	  xhr.onreadystatechange = function () {
	    if (xhr.readyState == 4) {
	      var status = xhr.status;
	      if (status >= 200 && status < 300) {
	        options.success && options.success(xhr.responseText, xhr.responseXML);
	      } else {
	        options.fail && options.fail(status);
	      }
	    }
	  };
	};

	exports["default"] = post_ajax;
	module.exports = exports['default'];

/***/ }
]);