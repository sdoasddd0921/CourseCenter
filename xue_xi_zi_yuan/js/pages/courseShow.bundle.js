webpackJsonp([0],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var BluMUI = __webpack_require__(1);
	var ajax = __webpack_require__(160);
	var Place = 2;
	// var url_place=parseHash(window.location.href);
	// if("place" in url_place) {
	//   Place = url_place.place;
	// }
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
	    place: Place
	  };
	} else {
	  url = courseCenter.host + 'getStudyResourceMsg';
	  data = {
	    unifyCode: BluMUI.result.config.user_id,
	    kcbh: BluMUI.result.config.course_id,
	    place: Place,
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

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(159);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ajax = __webpack_require__(160);
	var Place = 2;
	console.log("Place=2,展示页");
	// var url_place=parseHash(window.location.href);
	// if("place" in url_place) {
	//   Place = url_place.place;
	// }
	/*
	 * 学习资源
	 */

	// 左侧导航

	var BlueMUI_CreateNav = function (_React$Component) {
	  _inherits(BlueMUI_CreateNav, _React$Component);

	  function BlueMUI_CreateNav(props) {
	    _classCallCheck(this, BlueMUI_CreateNav);

	    var _this = _possibleConstructorReturn(this, (BlueMUI_CreateNav.__proto__ || Object.getPrototypeOf(BlueMUI_CreateNav)).call(this, props));

	    _this.choose = _this.choose.bind(_this);
	    _this.set_nav = _this.set_nav.bind(_this);
	    console.log(_this.props, '___15');
	    // this.nav_state=[];
	    _this.state = {
	      Nav: _this.props.module || 'a'
	    };
	    return _this;
	  }

	  _createClass(BlueMUI_CreateNav, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.set_nav();
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps, prevState) {
	      this.refs[prevState.Nav].style.background = '#FFF';
	      // this.refs[prevState.Nav].children[0].style.background='#666';
	      this.refs[prevState.Nav].children[0].style.color = '#333';
	      this.set_nav();
	    }
	  }, {
	    key: 'set_nav',
	    value: function set_nav() {
	      var nav = this.refs[this.state.Nav];
	      nav.style.background = '#007A51';
	      // nav.children[0].style.background='#FFF';
	      nav.children[0].style.color = '#FFF';
	      Show_nav_item(this.state.Nav);
	    }
	  }, {
	    key: 'choose',
	    value: function choose(state) {
	      var prop = {};
	      this.setState({ Nav: state });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2["default"].createElement(
	        'ul',
	        { id: 'left' },
	        _react2["default"].createElement(
	          'li',
	          { ref: 'a', onClick: this.choose.bind(this, 'a') },
	          _react2["default"].createElement(
	            'span',
	            null,
	            '\u89C6\u9891'
	          )
	        ),
	        _react2["default"].createElement(
	          'li',
	          { ref: 'b', onClick: this.choose.bind(this, 'b') },
	          _react2["default"].createElement(
	            'span',
	            null,
	            '\u8BB2\u4E49'
	          )
	        ),
	        _react2["default"].createElement(
	          'li',
	          { ref: 'c', onClick: this.choose.bind(this, 'c') },
	          _react2["default"].createElement(
	            'span',
	            null,
	            '\u4F5C\u4E1A'
	          )
	        ),
	        _react2["default"].createElement(
	          'li',
	          { ref: 'd', onClick: this.choose.bind(this, 'd') },
	          _react2["default"].createElement(
	            'span',
	            null,
	            '\u4E60\uFF08\u8BD5\uFF09\u9898\u5E93'
	          )
	        ),
	        _react2["default"].createElement(
	          'li',
	          { ref: 'e', onClick: this.choose.bind(this, 'e') },
	          _react2["default"].createElement(
	            'span',
	            null,
	            '\u7F51\u7EDC\u5B66\u4E60\u8D44\u6E90'
	          )
	        ),
	        _react2["default"].createElement(
	          'li',
	          { ref: 'f', onClick: this.choose.bind(this, 'f') },
	          _react2["default"].createElement(
	            'span',
	            null,
	            '\u6750\u6599\uFF0C\u53C2\u8003\u4E66'
	          )
	        )
	      );
	    }
	  }]);

	  return BlueMUI_CreateNav;
	}(_react2["default"].Component);

	var Show_nav_item = function Show_nav_item(prop) {
	  var Comps = {
	    a: BlueMUI_Create_a,
	    b: BlueMUI_Create_b,
	    c: BlueMUI_Create_c,
	    d: BlueMUI_Create_d,
	    e: BlueMUI_Create_e,
	    f: BlueMUI_Create_f
	  };
	  var url = void 0;
	  var data = void 0;
	  var Comp = Comps[prop];
	  var num = ['a', 'b', 'c', 'd', 'e'];
	  if (prop == 'f') {
	    url = courseCenter.host + 'getTextbookResourceMsg';
	    data = {
	      unifyCode: BluMUI.result.config.user_id,
	      kcbh: BluMUI.result.config.course_id,
	      place: Place
	    };
	  } else {
	    url = courseCenter.host + 'getStudyResourceMsg';
	    data = {
	      unifyCode: BluMUI.result.config.user_id,
	      kcbh: BluMUI.result.config.course_id,
	      place: Place,
	      zylb: prop == 'b' ? 21 : 1 + num.indexOf(prop)
	    };
	  }
	  ajax({
	    url: url,
	    data: data,
	    success: function success(gets) {
	      var datas = JSON.parse(gets);
	      // if(datas.meta.result==101) {
	      //   window.location.href='error1.html';
	      // } else if(datas.meta.result==102) {
	      //   window.location.href='error2.html';
	      // }
	      console.log(datas);
	      _reactDom2["default"].unmountComponentAtNode(document.getElementById('React_right'));
	      _reactDom2["default"].render(_react2["default"].createElement(Comp, datas), document.getElementById('React_right'));
	    }
	  });
	};

	function check() {
	  if (this.props.meta.result == 101) {
	    return _react2["default"].createElement(
	      'div',
	      { id: 'error', key: 'error' },
	      _react2["default"].createElement('img', { src: '../../imgs/public/error.png', alt: 'error' }),
	      _react2["default"].createElement(
	        'span',
	        null,
	        '\u6CA1\u6709\u6570\u636E'
	      )
	    );
	  } else if (this.props.meta.result == 102) {
	    return _react2["default"].createElement(
	      'div',
	      { id: 'error', key: 'error' },
	      _react2["default"].createElement('img', { src: '../../imgs/public/error.png', alt: 'error' }),
	      _react2["default"].createElement(
	        'span',
	        null,
	        '\u6B63\u5728\u7EF4\u62A4'
	      )
	    );
	  }
	  return false;
	}

	// 导航的子项目
	//视频

	var BlueMUI_Create_a = function (_React$Component2) {
	  _inherits(BlueMUI_Create_a, _React$Component2);

	  function BlueMUI_Create_a(props) {
	    _classCallCheck(this, BlueMUI_Create_a);

	    var _this2 = _possibleConstructorReturn(this, (BlueMUI_Create_a.__proto__ || Object.getPrototypeOf(BlueMUI_Create_a)).call(this, props));

	    _this2.create_shipin = _this2.create_shipin.bind(_this2);
	    _this2.create_other_shipin = _this2.create_other_shipin.bind(_this2);
	    _this2.up = [];
	    _this2.down = [];
	    return _this2;
	  }

	  _createClass(BlueMUI_Create_a, [{
	    key: 'create_shipin',
	    value: function create_shipin() {
	      var _this3 = this;

	      var back = [];
	      back.push(Create_tab('微视频'));
	      var flag = check.call(this);
	      if (flag) return flag;
	      this.props.data.map(function (e) {
	        if (!e.wlxxzylj) {
	          back.push(_react2["default"].createElement(
	            'div',
	            { className: 'shipin', key: e.id },
	            _react2["default"].createElement(
	              'a',
	              { target: 'view_window', href: 'courseVideo.html?fileName=' + e.xywjm },
	              _react2["default"].createElement('img', { src: '../../imgs/classListInfShow/courseShow/shipin.png', style: { width: '152px', height: '131px' } })
	            ),
	            _react2["default"].createElement('br', null),
	            _react2["default"].createElement(
	              'span',
	              null,
	              e.ywjm.split('.')[0]
	            )
	          ));
	        } else {
	          _this3.down.push(e);
	        }
	      });
	      if (back.length == 1) {
	        back.push(_react2["default"].createElement('div', { key: 'space', style: { height: '100px', width: '1px' } }));
	      }
	      return back;
	    }
	  }, {
	    key: 'create_other_shipin',
	    value: function create_other_shipin() {
	      var back = [];
	      back.push(Create_tab('录播视频'));
	      var flag = check.call(this);
	      if (flag) return;
	      this.down.map(function (e) {
	        back.push(_react2["default"].createElement(
	          'a',
	          { target: 'view_window', href: e.wlxxzylj, key: e.id },
	          e.ljmc
	        ));
	      });
	      if (back.length == 1) {
	        back.push(_react2["default"].createElement('div', { key: 'space', style: { height: '100px', width: '1px' } }));
	      }
	      return back;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      console.log(this.props);
	      return _react2["default"].createElement(
	        'div',
	        { id: 'right' },
	        this.create_shipin(),
	        this.create_other_shipin()
	      );
	    }
	  }]);

	  return BlueMUI_Create_a;
	}(_react2["default"].Component);

	/* 在线展示 */


	var config = { // flexpaper配置选项
	  Scale: 1,
	  ZoomTransition: 'easeOut',
	  ZoomTime: 0.5,
	  ZoomInterval: 0.2,
	  FitPageOnLoad: true,
	  FitWidthOnLoad: true,
	  FullScreenAsMaxWindow: false,
	  ProgressiveLoading: true,
	  MinZoomSize: 0.2,
	  MaxZoomSize: 5,
	  SearchMatchAll: false,
	  InitViewMode: 'Portrait',
	  RenderingOrder: 'flash',
	  StartAtPage: '',
	  ViewModeToolsVisible: true,
	  ZoomToolsVisible: true,
	  NavToolsVisible: true,
	  CursorToolsVisible: true,
	  SearchToolsVisible: true,
	  WMode: 'window',
	  localeChain: 'zh_CN'
	};
	var swfURL = courseCenter.host + 'CquptCourseCenter/pages/classInfShow/docs/CourseCenterAttachment/';

	//讲义

	var BlueMUI_Create_b = function (_React$Component3) {
	  _inherits(BlueMUI_Create_b, _React$Component3);

	  function BlueMUI_Create_b(props) {
	    _classCallCheck(this, BlueMUI_Create_b);

	    // this.create_jiangyi=this.create_jiangyi.bind(this);
	    var _this4 = _possibleConstructorReturn(this, (BlueMUI_Create_b.__proto__ || Object.getPrototypeOf(BlueMUI_Create_b)).call(this, props));

	    _this4.jiangyi = false;
	    _this4.other = false;
	    _this4.ziyuan = false;
	    _this4.default_kcbh = '';
	    return _this4;
	  }

	  _createClass(BlueMUI_Create_b, [{
	    key: 'xiazai',
	    value: function xiazai(link) {
	      this.refs.DOWNLOAD.src = courseCenter.host + 'fileDownLoad?name=' + link.split('.')[0] + '&oName=' + link;
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      console.log('___247', this.jiangyi, this.other);
	      if ((this.other == 101 || this.other == 102) && this.jiangyi) {
	        var error_msg = this.other == 101 ? '没有数据' : '正在维护';
	        this.refs.right.innerHTML = "<div id='error' key='error'><img src='../../imgs/public/error.png' alt='error'/><span>" + error_msg + "</span></div>";
	      } else {
	        this.show(this.default_kcbh);
	      }
	    }
	  }, {
	    key: 'show',
	    value: function show(No) {
	      if (No) {
	        config.SWFFile = swfURL + No.xyswjm;
	        $('#preview').FlexPaperViewer({
	          config: config
	        });
	        console.log(No);
	        console.log('config:', config.SWFFile);
	        if (No.sfnxz == 1) {
	          // this.refs.fujian_download.innerText
	          _reactDom2["default"].render(_react2["default"].createElement(
	            'div',
	            null,
	            _react2["default"].createElement(
	              'div',
	              { style: {
	                  width: '24px',
	                  height: '24px',
	                  borderRadius: '50%',
	                  display: 'inline-block',
	                  overflow: 'hidden',
	                  lineHeight: '24px'
	                } },
	              _react2["default"].createElement('img', { src: '../../imgs/classListInfShow/courseShow/ziyuan.png', style: {
	                  height: '50px',
	                  width: '50px',
	                  borderRadius: '50%',
	                  position: 'relative',
	                  top: '-13px',
	                  left: '-13px'
	                } })
	            ),
	            _react2["default"].createElement(
	              'a',
	              { href: 'javascript:void(0)', onClick: this.xiazai.bind(this, No.ywjm) },
	              '\u4E0B\u8F7D\u8BB2\u4E49'
	            )
	          ), document.getElementById('Down'));
	        }
	      }
	    }
	    // sfnxz

	  }, {
	    key: 'create_jiangyi',
	    value: function create_jiangyi() {
	      var _this5 = this;

	      this.jiangyi = check.call(this);
	      console.log("讲义：", this.props);
	      var back = [];
	      back.push(Create_tab('讲义'));
	      if (this.jiangyi) {
	        back.push(_react2["default"].createElement('div', { key: 'no_data', style: { width: "100%", height: "100px" } }));
	      } else {
	        this.default_kcbh = this.props.data[0];
	        console.log('默认：', this.default_kcbh);
	        this.props.data.map(function (e) {
	          back.push(_react2["default"].createElement(
	            'a',
	            { href: 'javascript:void(0)', key: e.id, onClick: _this5.show.bind(_this5, e) },
	            e.ywjm
	          ));
	        });
	      }
	      return back;
	    }
	  }, {
	    key: 'create_other',
	    value: function create_other() {
	      var _this6 = this;

	      var back = [];
	      back.push(Create_tab('其他资源'));
	      var xmlhttp = new XMLHttpRequest();
	      var data = {
	        unifyCode: BluMUI.result.config.user_id,
	        kcbh: BluMUI.result.config.course_id,
	        place: Place,
	        zylb: 22
	      };
	      var ajax_data = '';
	      for (var i in data) {
	        ajax_data += i + '=' + data[i] + '&';
	      }
	      console.log(ajax_data.substr(0, ajax_data.length - 1));
	      xmlhttp.onreadystatechange = function () {
	        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
	          var datas = JSON.parse(xmlhttp.responseText);
	          _this6.other = datas.meta.result;
	          if (_this6.other == 101 || _this6.other == 102) {
	            back.push(_react2["default"].createElement('div', { key: 'no_data', style: { width: "100%", height: "100px" } }));
	          } else {
	            console.log('success', datas);
	            datas.data.map(function (e) {
	              back.push(_react2["default"].createElement(
	                'div',
	                { className: 'ziyuan_item', key: e.id },
	                _react2["default"].createElement('img', { src: '../../imgs/classListInfShow/courseShow/ziyuan.png' }),
	                _react2["default"].createElement('br', null),
	                _react2["default"].createElement(
	                  'span',
	                  { title: e.ywjm },
	                  e.ywjm.split('.')[0]
	                ),
	                _react2["default"].createElement('br', null),
	                _react2["default"].createElement(
	                  'span',
	                  { className: 'ziyuan_xiazai', onClick: _this6.xiazai.bind(_this6, e.ywjm) },
	                  '\u4E0B\u8F7D'
	                )
	              ));
	            });
	          }
	        }
	      };
	      xmlhttp.open("POST", "http://cc.cqupt.edu.cn/getStudyResourceMsg", false);
	      xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
	      xmlhttp.send(ajax_data.substr(0, ajax_data.length - 1));
	      return back;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2["default"].createElement(
	        'div',
	        { id: 'right', ref: 'right' },
	        _react2["default"].createElement(
	          'div',
	          { id: 'jiangyi' },
	          this.create_jiangyi(),
	          this.jiangyi ? '' : _react2["default"].createElement('div', { id: 'preview', ref: 'preview', style: { paddingRight: '24px', height: '700px' } }),
	          _react2["default"].createElement('div', { ref: 'fujian_download', id: 'Down' })
	        ),
	        _react2["default"].createElement(
	          'div',
	          { id: 'other' },
	          this.create_other()
	        ),
	        _react2["default"].createElement('iframe', { src: '', frameBorder: '0', ref: 'DOWNLOAD', style: { display: 'none' } })
	      );
	    }
	  }]);

	  return BlueMUI_Create_b;
	}(_react2["default"].Component);

	//作业


	var BlueMUI_Create_c = function (_React$Component4) {
	  _inherits(BlueMUI_Create_c, _React$Component4);

	  function BlueMUI_Create_c(props) {
	    _classCallCheck(this, BlueMUI_Create_c);

	    return _possibleConstructorReturn(this, (BlueMUI_Create_c.__proto__ || Object.getPrototypeOf(BlueMUI_Create_c)).call(this, props));
	    // this.create_zuoye=this.create_zuoye.bind(this);
	  }

	  _createClass(BlueMUI_Create_c, [{
	    key: 'xiazai',
	    value: function xiazai(link) {
	      this.refs.DOWNLOAD.src = courseCenter.host + 'fileDownLoad?name=' + link.split('.')[0] + '&oName=' + link;
	    }
	  }, {
	    key: 'create_zuoye',
	    value: function create_zuoye() {
	      var _this8 = this;

	      var flag = check.call(this);
	      if (flag) return flag;
	      var back = [];
	      var xiazai = void 0;
	      this.props.data.map(function (e) {
	        if (e.sfnxz == 1) {
	          xiazai = _react2["default"].createElement(
	            'span',
	            { className: 'ziyuan_xiazai', onClick: _this8.xiazai.bind(_this8, e.ywjm) },
	            '\u4E0B\u8F7D'
	          );
	        } else {
	          xiazai = '';
	        }
	        back.push(_react2["default"].createElement(
	          'div',
	          { className: 'ziyuan_item', key: e.id },
	          _react2["default"].createElement('img', { src: '../../imgs/classListInfShow/courseShow/ziyuan.png' }),
	          _react2["default"].createElement('br', null),
	          _react2["default"].createElement(
	            'span',
	            { title: e.ywjm },
	            e.ywjm.split('.')[0]
	          ),
	          _react2["default"].createElement('br', null),
	          xiazai
	        ));
	      });
	      if (back.length == 1) {
	        back.push(_react2["default"].createElement('div', { key: 'space', style: { height: '100px', width: '1px' } }));
	      }
	      return _react2["default"].createElement(
	        'div',
	        { id: 'ziyuan' },
	        back,
	        _react2["default"].createElement('div', { style: { clear: 'both' } })
	      );
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2["default"].createElement(
	        'div',
	        { id: 'right' },
	        this.create_zuoye(),
	        _react2["default"].createElement('iframe', { src: '', frameBorder: '0', ref: 'DOWNLOAD', style: { display: 'none' } })
	      );
	    }
	  }]);

	  return BlueMUI_Create_c;
	}(_react2["default"].Component);

	//习题


	var BlueMUI_Create_d = function (_React$Component5) {
	  _inherits(BlueMUI_Create_d, _React$Component5);

	  function BlueMUI_Create_d(props) {
	    _classCallCheck(this, BlueMUI_Create_d);

	    return _possibleConstructorReturn(this, (BlueMUI_Create_d.__proto__ || Object.getPrototypeOf(BlueMUI_Create_d)).call(this, props));
	    // this.create_xiti=this.create_xiti.bind(this);
	  }

	  _createClass(BlueMUI_Create_d, [{
	    key: 'xiazai',
	    value: function xiazai(link) {
	      this.refs.DOWNLOAD.src = courseCenter.host + 'fileDownLoad?name=' + link.split('.')[0] + '&oName=' + link;
	    }
	  }, {
	    key: 'create_xiti',
	    value: function create_xiti() {
	      var _this10 = this;

	      var flag = check.call(this);
	      if (flag) return flag;
	      var back = [];
	      var xiazai = void 0;
	      this.props.data.map(function (e) {
	        if (e.sfnxz == 1) {
	          xiazai = _react2["default"].createElement(
	            'span',
	            { className: 'ziyuan_xiazai', onClick: _this10.xiazai.bind(_this10, e.ywjm) },
	            '\u4E0B\u8F7D'
	          );
	        } else {
	          xiazai = '';
	        }
	        back.push(_react2["default"].createElement(
	          'div',
	          { className: 'ziyuan_item', key: e.id },
	          _react2["default"].createElement('img', { src: '../../imgs/classListInfShow/courseShow/ziyuan.png' }),
	          _react2["default"].createElement('br', null),
	          _react2["default"].createElement(
	            'span',
	            { title: e.ywjm },
	            e.ywjm.split('.')[0]
	          ),
	          _react2["default"].createElement('br', null),
	          xiazai
	        ));
	      });
	      if (back.length == 1) {
	        back.push(_react2["default"].createElement('div', { key: 'space', style: { height: '100px', width: '1px' } }));
	      }
	      return _react2["default"].createElement(
	        'div',
	        { id: 'ziyuan' },
	        back,
	        _react2["default"].createElement('div', { style: { clear: 'both' } })
	      );
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2["default"].createElement(
	        'div',
	        { id: 'right' },
	        this.create_xiti(),
	        _react2["default"].createElement('iframe', { src: '', frameBorder: '0', ref: 'DOWNLOAD', style: { display: 'none' } })
	      );
	    }
	  }]);

	  return BlueMUI_Create_d;
	}(_react2["default"].Component);

	//资源


	var BlueMUI_Create_e = function (_React$Component6) {
	  _inherits(BlueMUI_Create_e, _React$Component6);

	  function BlueMUI_Create_e(props) {
	    _classCallCheck(this, BlueMUI_Create_e);

	    // this.create_ziyuan=this.create_ziyuan.bind(this);
	    // this.create_link=this.create_link.bind(this);
	    return _possibleConstructorReturn(this, (BlueMUI_Create_e.__proto__ || Object.getPrototypeOf(BlueMUI_Create_e)).call(this, props));
	  }

	  _createClass(BlueMUI_Create_e, [{
	    key: 'xiazai',
	    value: function xiazai(link) {
	      this.refs.DOWNLOAD.src = courseCenter.host + 'fileDownLoad?name=' + link.split('.')[0] + '&oName=' + link;
	    }
	  }, {
	    key: 'create_ziyuan',
	    value: function create_ziyuan() {
	      var _this12 = this;

	      var flag = check.call(this);
	      if (flag) return flag;
	      var back = [];
	      back.push(Create_tab('附件'));
	      var xiazai = void 0;

	      this.props.data.map(function (e) {
	        if (e.ywjm != '') {
	          xiazai = _react2["default"].createElement(
	            'span',
	            { className: 'ziyuan_xiazai', onClick: _this12.xiazai.bind(_this12, e.ywjm) },
	            '\u4E0B\u8F7D'
	          );
	          back.push(_react2["default"].createElement(
	            'div',
	            { className: 'ziyuan_item', key: e.id },
	            _react2["default"].createElement('img', { src: '../../imgs/classListInfShow/courseShow/ziyuan.png' }),
	            _react2["default"].createElement('br', null),
	            _react2["default"].createElement(
	              'span',
	              { title: e.ywjm },
	              e.ywjm.split('.')[0] || e.ywjm.split('.')[0] + '.' + e.ywjm.split('.')[1]
	            ),
	            _react2["default"].createElement('br', null),
	            xiazai
	          ));
	        }
	      });
	      if (back.length == 1) {
	        back.push(_react2["default"].createElement('div', { key: 'space', style: { height: '100px', width: '1px' } }));
	      }
	      return back;
	    }
	  }, {
	    key: 'create_link',
	    value: function create_link() {
	      if (check.call(this)) {
	        return;
	      }
	      var back = [];
	      back.push(Create_tab('链接'));
	      this.props.data.map(function (e) {
	        if (e.wlxxzylj != '') {
	          back.push(_react2["default"].createElement(
	            'div',
	            { key: e.id, className: 'ziyuan_link' },
	            _react2["default"].createElement(
	              'span',
	              null,
	              '\u7F51\u7EDC\u94FE\u63A5\uFF1A'
	            ),
	            _react2["default"].createElement(
	              'a',
	              { target: 'view_window', href: e.wlxxzylj },
	              e.ljmc
	            )
	          ));
	        }
	      });
	      return back;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2["default"].createElement(
	        'div',
	        { id: 'right' },
	        this.create_ziyuan(),
	        this.create_link(),
	        _react2["default"].createElement('iframe', { src: '', frameBorder: '0', ref: 'DOWNLOAD', style: { display: 'none' } })
	      );
	    }
	  }]);

	  return BlueMUI_Create_e;
	}(_react2["default"].Component);

	// 参考书


	var BlueMUI_Create_f = function (_React$Component7) {
	  _inherits(BlueMUI_Create_f, _React$Component7);

	  function BlueMUI_Create_f(props) {
	    _classCallCheck(this, BlueMUI_Create_f);

	    var _this13 = _possibleConstructorReturn(this, (BlueMUI_Create_f.__proto__ || Object.getPrototypeOf(BlueMUI_Create_f)).call(this, props));

	    _this13.no_data = false;
	    return _this13;
	  }

	  _createClass(BlueMUI_Create_f, [{
	    key: 'create_jiaocai',
	    value: function create_jiaocai() {
	      console.log(this);
	      var back = [];
	      back.push(Create_tab('课程教材'));
	      var flag = check.call(this);
	      console.log('aaa', flag);
	      if (flag) return flag;
	      this.props.data.teachBookList.map(function (e) {
	        back.push(_react2["default"].createElement(
	          'div',
	          { className: 'item', key: e.id },
	          _react2["default"].createElement('img', { width: '120px', height: '160px', src: courseCenter.host + 'upload/PIC/' + e.tpmc }),
	          _react2["default"].createElement(
	            'span',
	            { className: 'item_title' },
	            '教材名称：' + e.sm
	          ),
	          _react2["default"].createElement('br', null),
	          _react2["default"].createElement('br', null),
	          _react2["default"].createElement(
	            'span',
	            null,
	            '作者：' + e.zz
	          ),
	          _react2["default"].createElement('br', null),
	          _react2["default"].createElement(
	            'span',
	            null,
	            '出版社：' + e.CBS
	          )
	        ));
	      });
	      if (back.length == 1) {
	        back.push(_react2["default"].createElement('div', { key: 'space', style: { height: '100px', width: '1px' } }));
	      }
	      return back;
	    }
	  }, {
	    key: 'create_cankaoshu',
	    value: function create_cankaoshu() {
	      var back = [];
	      back.push(Create_tab('参考书'));
	      var flag = check.call(this);
	      if (flag) return;
	      this.props.data.referenceBookList.map(function (e) {
	        back.push(_react2["default"].createElement(
	          'div',
	          { className: 'item', key: e.id },
	          _react2["default"].createElement('img', { width: '120px', height: '160px', src: courseCenter.host + 'upload/PIC/' + e.tpmc }),
	          _react2["default"].createElement(
	            'span',
	            { className: 'item_title' },
	            '参考书名称：' + e.sm
	          ),
	          _react2["default"].createElement('br', null),
	          _react2["default"].createElement('br', null),
	          _react2["default"].createElement(
	            'span',
	            null,
	            '作者：' + e.zz
	          ),
	          _react2["default"].createElement('br', null),
	          _react2["default"].createElement(
	            'span',
	            null,
	            '出版社：' + e.CBS
	          )
	        ));
	      });
	      if (back.length == 1) {
	        back.push(_react2["default"].createElement('div', { key: 'space', style: { height: '100px', width: '1px' } }));
	      }
	      return back;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2["default"].createElement(
	        'div',
	        { id: 'right' },
	        this.create_jiaocai(),
	        this.create_cankaoshu()
	      );
	    }
	  }]);

	  return BlueMUI_Create_f;
	}(_react2["default"].Component);

	function Create_tab(tab_name) {
	  return _react2["default"].createElement(
	    'div',
	    { className: 'tab', key: tab_name + 'head' },
	    _react2["default"].createElement(
	      'span',
	      null,
	      tab_name
	    )
	  );
	}

	var BluMUI_M = {
	  CreateNav: BlueMUI_CreateNav
	};

	var BluMUI = {
	  result: {},
	  create: function create(data, type, elem) {
	    var props = data,
	        Blu = BluMUI_M[type];
	    this.result[props.id] = _reactDom2["default"].render(_react2["default"].createElement(Blu, props), elem);
	  }
	};

	exports["default"] = BluMUI;
	module.exports = exports['default'];

/***/ }),

/***/ 160:
/***/ (function(module, exports) {

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

/***/ })

});