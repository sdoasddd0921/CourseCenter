webpackJsonp([6,9],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BluMUI = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../libs/blueMonUI.js\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var ajax = __webpack_require__(2);
	// 需要获取用户id
	var User = {
	  name: "",
	  id: ""
	};
	User.id = getCookie('userId');
	/**
	 * 0100032：院长、秘书（1）
	 * 0100033：主任（2）
	 * 0101225：课程负责人（3）
	 * 院长：0102295 Cq011568 (黄容)
	 * 教研室主任：0102549  251833（罗婷婷）
	 * 课程负责人：0102387 密码caiting@cqupt（蔡婷）
	 * 教师：0102295 0102549   0102387 
	 */

	/**
	 * 服务器：172.20.2.137/subjectCenter/
	 * 刘堂臣：172.22.113.230:8080/subjectCenter/
	 */
	BluMUI.result.user_id = User.id;
	ajax({
	  url: courseCenter.host + 'getMenu',
	  data: {
	    unifyCode: User.id,
	    module: 11
	  },
	  success: function success(gets) {
	    var datas = JSON.parse(gets);
	    console.log(datas);
	    BluMUI.create({
	      id: 'Tab',
	      role: datas.data
	    }, 'CreateTab', document.getElementById('table_title'));
	  }
	});

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