webpackJsonp([2,9],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BluMUI = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../libs/blueMonUI.js\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	var ajax = __webpack_require__(2);

	var config = {
	  user_id: '',
	  course_id: ''
	};
	config.user_id = getCookie('userId');
	config.course_id = parseHash(window.location.href).classId;
	BluMUI.result.config = config;
	var prop = parseHash(window.location.href).module || 'a';
	var url = void 0;
	var data = void 0;
	var num = ['a', 'b', 'c', 'd', 'e'];
	console.log('测试接收的参数：', config.course_id, prop);
	if (prop == 'f') {
	  url = courseCenter.host + 'getTextbookResourceMsg';
	  data = {
	    unifyCode: BluMUI.result.config.user_id,
	    kcbh: BluMUI.result.config.course_id,
	    place: 2
	  };
	} else {
	  url = courseCenter.host + 'getStudyResourceMsg';
	  data = {
	    unifyCode: BluMUI.result.config.user_id,
	    kcbh: BluMUI.result.config.course_id,
	    place: 2,
	    zylb: 1 + num.indexOf(prop)
	  };
	}
	ajax({
	  url: url,
	  data: data,
	  success: function success(gets) {
	    var datas = JSON.parse(gets);
	    console.log(datas);

	    BluMUI.create({
	      id: 'Nav',
	      module: parseHash(window.location.href).module
	    }, 'CreateNav', document.getElementById('React_left'));
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