webpackJsonp([5],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(147);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(1);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ajax = __webpack_require__(159);
	var _COUNT = 10;

	var Option = function (_React$Component) {
	  _inherits(Option, _React$Component);

	  function Option(props) {
	    _classCallCheck(this, Option);

	    var _this = _possibleConstructorReturn(this, (Option.__proto__ || Object.getPrototypeOf(Option)).call(this, props));

	    _this._modeChange = _this._modeChange.bind(_this);
	    _this.shuldUp = true;
	    _this.other_args = "";
	    _this.state = {
	      page: 1,
	      pages: 1,
	      total: 1,
	      // modes
	      mode: 1,
	      list: []
	    };
	    return _this;
	  }

	  _createClass(Option, [{
	    key: '_modeChange',
	    value: function _modeChange(mode, id) {
	      sessionStorage.setItem("mode" + this.state.mode + "page", this.state.page);
	      this.other_args = id;
	      this.state = {
	        page: +sessionStorage.getItem("mode" + mode + "page") || 1,
	        pages: 1,
	        total: 1,
	        mode: mode,
	        list: []
	      };
	      this._getLists();
	    }
	  }, {
	    key: '_getLists',
	    value: function _getLists(eve, p) {
	      var _this2 = this;

	      switch (this.state.mode) {
	        case 1:
	          console.log("serch");
	          ajax({
	            url: courseCenter.host + "reviewList",
	            data: {
	              unifyCode: getCookie("userId"),
	              name: this.refs.wppc ? this.refs.wppc.value : "",
	              page: p || this.state.page,
	              count: _COUNT
	            },
	            success: function success(gets) {
	              var datas = JSON.parse(gets);
	              _this2.setState({
	                list: datas.data.list,
	                page: p || _this2.state.page,
	                pages: datas.data.totalPages,
	                total: datas.data.total
	              });
	            }
	          });
	          break;
	        case 2:
	          break;
	        case 3:
	          ajax({
	            url: courseCenter.host + "reviewList",
	            data: {
	              unifyCode: getCookie("userId"),
	              page: p || this.state.page,
	              count: _COUNT
	            },
	            success: function success(gets) {
	              var datas = JSON.parse(gets);
	              _this2.setState({
	                list: datas.data.list,
	                page: p || _this2.state.page,
	                pages: datas.data.totalPages,
	                total: datas.data.total
	              });
	            }
	          });
	          break;
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this3 = this;

	      switch (this.state.mode) {
	        case 1:
	          return _react2["default"].createElement(
	            'div',
	            { id: 'wpgl_option' },
	            _react2["default"].createElement(
	              'div',
	              { id: 'option' },
	              _react2["default"].createElement(
	                'div',
	                { id: 'big_btns' },
	                _react2["default"].createElement(
	                  'button',
	                  { className: 'big_btn', ref: 'fqwp' },
	                  '\u53D1\u8D77\u7F51\u8BC4'
	                ),
	                _react2["default"].createElement(
	                  'button',
	                  { className: 'big_btn', ref: 'plsc' },
	                  '\u6279\u91CF\u5220\u9664'
	                )
	              ),
	              _react2["default"].createElement(
	                'div',
	                { id: 'filter_bar' },
	                _react2["default"].createElement(
	                  'span',
	                  { id: 'wppc' },
	                  '\u7F51\u8BC4\u6279\u6B21\uFF1A'
	                ),
	                _react2["default"].createElement(
	                  'select',
	                  { name: 'wppc', ref: 'wppc' },
	                  _react2["default"].createElement(
	                    'option',
	                    { value: '' },
	                    '\u8BF7\u9009\u62E9'
	                  )
	                ),
	                _react2["default"].createElement(
	                  'button',
	                  { id: 'serch', ref: 'btn' },
	                  '\u641C\u7D22'
	                )
	              )
	            ),
	            _react2["default"].createElement(Lists, { ref: 'list', Lists: this.state.list, Mode: this.state.mode, callback: this._modeChange }),
	            _react2["default"].createElement(Fanye, {
	              ref: 'fanye',
	              TP: {
	                total: this.state.total,
	                page: this.state.page,
	                pages: this.state.pages
	              },
	              callback: function callback(num) {
	                _this3._getLists.call(_this3, num);
	              }
	            })
	          );
	          break;

	        case 2:
	          break;
	        case 3:
	          return _react2["default"].createElement(
	            'div',
	            { id: 'wpgl_option3' },
	            _react2["default"].createElement(
	              'div',
	              { id: 'option' },
	              _react2["default"].createElement(
	                'button',
	                { id: 'back', ref: 'back' },
	                '\u8FD4\u56DE'
	              ),
	              _react2["default"].createElement('input', { type: 'checkbox', defaultChecked: true, id: 'zj', ref: 'zj' }),
	              _react2["default"].createElement(
	                'label',
	                { htmlFor: 'zj', ref: 'zj_label' },
	                _react2["default"].createElement('img', { src: '../../imgs/public/hook.png' })
	              ),
	              _react2["default"].createElement(
	                'span',
	                null,
	                '\u6309\u4E13\u5BB6\u67E5\u770B'
	              ),
	              _react2["default"].createElement('input', { type: 'checkbox', id: 'kc', ref: 'kc' }),
	              _react2["default"].createElement(
	                'label',
	                { htmlFor: 'kc', ref: 'kc_label' },
	                _react2["default"].createElement('img', { src: '../../imgs/public/hook.png' })
	              ),
	              _react2["default"].createElement(
	                'span',
	                null,
	                '\u6309\u8BFE\u7A0B\u67E5\u770B'
	              ),
	              _react2["default"].createElement(
	                'div',
	                { id: 'filter_bar' },
	                _react2["default"].createElement(
	                  'span',
	                  null,
	                  '\u4E13\u5BB6\u5206\u914D\u8BFE\u7A0B\u72B6\u6001\uFF1A'
	                ),
	                _react2["default"].createElement('input', { type: 'checkbox', defaultChecked: true, id: 'yes', ref: 'yes' }),
	                _react2["default"].createElement(
	                  'label',
	                  { htmlFor: 'yes', ref: 'yes_label' },
	                  _react2["default"].createElement('img', { src: '../../imgs/public/hook.png' })
	                ),
	                _react2["default"].createElement(
	                  'span',
	                  { className: 'fenpei' },
	                  '\u5DF2\u5206\u914D'
	                ),
	                _react2["default"].createElement('input', { type: 'checkbox', defaultChecked: true, id: 'no', ref: 'no' }),
	                _react2["default"].createElement(
	                  'label',
	                  { htmlFor: 'no', ref: 'no_label' },
	                  _react2["default"].createElement('img', { src: '../../imgs/public/hook.png' })
	                ),
	                _react2["default"].createElement(
	                  'span',
	                  { className: 'fenpei' },
	                  '\u672A\u5206\u914D'
	                ),
	                _react2["default"].createElement(
	                  'span',
	                  { id: 'zjfz' },
	                  '\u4E13\u5BB6\u5206\u7EC4\uFF1A'
	                ),
	                _react2["default"].createElement(
	                  'select',
	                  { id: 'zjfz_select', ref: 'zjfz' },
	                  _react2["default"].createElement(
	                    'option',
	                    { value: '' },
	                    '\u8BF7\u9009\u62E9'
	                  )
	                ),
	                _react2["default"].createElement(
	                  'span',
	                  { id: 'zjmc' },
	                  '\u4E13\u5BB6\u540D\u79F0\uFF1A'
	                ),
	                _react2["default"].createElement('input', { type: 'text', ref: 'name', id: 'zjname' }),
	                _react2["default"].createElement(
	                  'button',
	                  { id: 'serch', ref: 'serch' },
	                  '\u641C\u7D22'
	                )
	              )
	            ),
	            _react2["default"].createElement(Lists, { ref: 'list', Lists: this.state.list, Mode: this.state.mode, callback: this._modeChange }),
	            _react2["default"].createElement(Fanye, {
	              ref: 'fanye',
	              TP: {
	                total: this.state.total,
	                page: this.state.page,
	                pages: this.state.pages
	              },
	              callback: function callback(num) {
	                _this3._getLists.call(_this3, num);
	              }
	            })
	          );
	          break;
	      }
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      // 填充网评批次下拉菜单
	      // ajax({
	      //   url: courseCenter.host+"reviewBriefList",
	      //   data: {
	      //     userID: getCookie("userId"),
	      //     state: 1
	      //   },
	      //   success: (gets)=>{
	      //     let datas=JSON.parse(gets);
	      //     if(datas.meta.result==100) {
	      //       let ops="<option value=''>请选择</option>";
	      //       datas.data.list.map((e,index)=>{
	      //         ops+=`<option value=${e.id}>${e.wppc}</option>`;
	      //       });
	      //       this.refs.wppc.innerHTML=ops;
	      //     }
	      //   }
	      // });

	      // // 首次查询列表并填充
	      this._getLists();
	      // this.refs.btn.onclick=this._getLists;
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps, prevState) {
	      var _this4 = this;

	      switch (this.state.mode) {
	        case 3:
	          this.refs.back.onclick = this._modeChange.bind(this, 1, "");
	          // 填充下拉菜单
	          ajax({
	            url: courseCenter.host + "getFzxByWppc",
	            data: {
	              unifyCode: getCookie("userId"),
	              reviewBatch: this.other_args
	            },
	            success: function success(gets) {
	              var datas = JSON.parse(gets);
	              console.log(datas);
	              if (datas.meta.result == 100) {
	                var ops = "<option value=''>请选择</option>";
	                datas.data.map(function (e, index) {
	                  ops += '<option value=' + e.fzx + '>' + e.fzx + '</option>';
	                });
	                _this4.refs.zjfz.innerHTML = ops;
	              }
	            }
	          });

	          break;

	        case 1:
	          // 填充网评批次下拉菜单
	          ajax({
	            url: courseCenter.host + "reviewBriefList",
	            data: {
	              userID: getCookie("userId"),
	              state: 1
	            },
	            success: function success(gets) {
	              var datas = JSON.parse(gets);
	              if (datas.meta.result == 100) {
	                var ops = "<option value=''>请选择</option>";
	                datas.data.list.map(function (e, index) {
	                  ops += '<option value=' + e.id + '>' + e.wppc + '</option>';
	                });
	                _this4.refs.wppc.innerHTML = ops;
	              }
	            }
	          });
	          // 绑定搜索事件
	          this.refs.btn.onclick = this._getLists.bind(this);
	          break;
	      }
	    }
	  }]);

	  return Option;
	}(_react2["default"].Component);

	var Lists = function (_React$Component2) {
	  _inherits(Lists, _React$Component2);

	  function Lists(props) {
	    _classCallCheck(this, Lists);

	    return _possibleConstructorReturn(this, (Lists.__proto__ || Object.getPrototypeOf(Lists)).call(this, props));
	  }

	  _createClass(Lists, [{
	    key: 'create_head',
	    value: function create_head() {
	      switch (this.props.Mode) {
	        case 1:
	          return _react2["default"].createElement(
	            'thead',
	            null,
	            _react2["default"].createElement(
	              'tr',
	              null,
	              _react2["default"].createElement(
	                'td',
	                { width: '30px', className: 'td_head' },
	                _react2["default"].createElement('div', null)
	              ),
	              _react2["default"].createElement('td', { width: '59px', className: 'td_left_space' }),
	              _react2["default"].createElement(
	                'td',
	                { width: '19px' },
	                _react2["default"].createElement('input', { type: 'checkbox', ref: 'allcheck' })
	              ),
	              _react2["default"].createElement(
	                'td',
	                null,
	                '\u7F51\u8BC4\u6279\u6B21'
	              ),
	              _react2["default"].createElement(
	                'td',
	                { width: '13.54839%' },
	                '\u5206\u7EC4\u6279\u6B21'
	              ),
	              _react2["default"].createElement(
	                'td',
	                { width: '13.54839%' },
	                '\u6307\u6807\u6279\u6B21'
	              ),
	              _react2["default"].createElement(
	                'td',
	                { width: '13.54839%' },
	                '\u4E13\u5BB6\u5206\u7EC4\u6279\u6B21'
	              ),
	              _react2["default"].createElement(
	                'td',
	                { width: '13.54839%' },
	                '\u8D77\u6B62\u65F6\u95F4'
	              ),
	              _react2["default"].createElement(
	                'td',
	                { width: '13.54839%' },
	                '\u5206\u914D\u8BFE\u7A0B'
	              ),
	              _react2["default"].createElement(
	                'td',
	                { width: '13.54839%' },
	                '\u64CD\u4F5C'
	              ),
	              _react2["default"].createElement('td', { width: '11px', className: 'td_right_space' }),
	              _react2["default"].createElement(
	                'td',
	                { width: '30px', className: 'td_end' },
	                _react2["default"].createElement('div', null)
	              )
	            )
	          );
	          break;
	      }
	    }
	  }, {
	    key: 'create_body',
	    value: function create_body() {
	      var _this6 = this;

	      switch (this.props.Mode) {
	        case 1:
	          return _react2["default"].createElement(
	            'tbody',
	            null,
	            this.props.Lists.map(function (e, index) {
	              return _react2["default"].createElement(
	                'tr',
	                { key: index },
	                _react2["default"].createElement('td', { className: 'td_head' }),
	                _react2["default"].createElement('td', null),
	                _react2["default"].createElement(
	                  'td',
	                  null,
	                  _react2["default"].createElement('input', { type: 'checkbox', value: e.id })
	                ),
	                _react2["default"].createElement(
	                  'td',
	                  null,
	                  e.wppc
	                ),
	                _react2["default"].createElement(
	                  'td',
	                  null,
	                  e.fzpc
	                ),
	                _react2["default"].createElement(
	                  'td',
	                  null,
	                  e.zbpc
	                ),
	                _react2["default"].createElement(
	                  'td',
	                  null,
	                  e.zjfzpc
	                ),
	                _react2["default"].createElement(
	                  'td',
	                  null,
	                  e.kssj + "-" + e.jssj
	                ),
	                _react2["default"].createElement(
	                  'td',
	                  null,
	                  _react2["default"].createElement(
	                    'div',
	                    null,
	                    _react2["default"].createElement(
	                      'span',
	                      { className: 'green_btn' },
	                      '\u5206\u914D'
	                    ),
	                    _react2["default"].createElement(
	                      'span',
	                      { className: 'green_btn', onClick: _this6._modeChange.bind(_this6, 3, e.wppc) },
	                      '\u7ED3\u679C'
	                    )
	                  )
	                ),
	                _react2["default"].createElement(
	                  'td',
	                  null,
	                  _react2["default"].createElement(
	                    'div',
	                    null,
	                    _react2["default"].createElement(
	                      'span',
	                      { className: 'green_btn' },
	                      '\u7F16\u8F91'
	                    ),
	                    _react2["default"].createElement(
	                      'span',
	                      { className: 'yellow_btn' },
	                      '\u5220\u9664'
	                    )
	                  )
	                ),
	                _react2["default"].createElement('td', null),
	                _react2["default"].createElement('td', { className: 'td_end' })
	              );
	            })
	          );
	          break;
	      }
	    }
	  }, {
	    key: '_modeChange',
	    value: function _modeChange(mode, id) {
	      this.props.callback(mode, id);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2["default"].createElement(
	        'div',
	        { id: 'wpgl_table' },
	        _react2["default"].createElement(
	          'table',
	          { ref: 'table' },
	          this.create_head(),
	          this.create_body()
	        )
	      );
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps, prevState) {
	      if (window.frameElement) {
	        window.frameElement.height = document.body.offsetHeight;
	      }
	    }
	  }]);

	  return Lists;
	}(_react2["default"].Component);

	var Fanye = function (_React$Component3) {
	  _inherits(Fanye, _React$Component3);

	  function Fanye(props) {
	    _classCallCheck(this, Fanye);

	    return _possibleConstructorReturn(this, (Fanye.__proto__ || Object.getPrototypeOf(Fanye)).call(this, props));
	  }

	  _createClass(Fanye, [{
	    key: 'create_popup_fanye',
	    value: function create_popup_fanye() {
	      var _this8 = this;

	      var nums = [];
	      var start = 1;
	      var end = this.props.TP.pages || 1;
	      var now = this.props.TP.page || 1;
	      var page_on = { color: "#007A51" };

	      var change_page = function change_page(p) {
	        if (p === now) {
	          nums.push(_react2["default"].createElement(
	            'li',
	            { key: p, style: page_on },
	            p
	          ));
	        } else {
	          nums.push(_react2["default"].createElement(
	            'li',
	            { key: p, onClick: _this8.fanye.bind(_this8, p) },
	            p
	          ));
	        }
	      };

	      if (end < 1) {
	        nums.push(_react2["default"].createElement(
	          'li',
	          { key: 'only', onClick: this.fanye.bind(this, 1) },
	          '1'
	        ));
	      } else if (end <= 5) {
	        for (var i = 1; i <= end; i++) {
	          change_page(i);
	        }
	      } else {
	        if (now < 3) {
	          for (var _i = 1; _i <= 5; _i++) {
	            change_page(_i);
	          }
	        } else if (now > end - 3) {
	          for (var _i2 = end - 5; _i2 <= end; _i2++) {
	            change_page(_i2);
	          }
	        } else {
	          for (var _i3 = now - 2; _i3 <= now + 2; _i3++) {
	            change_page(_i3);
	          }
	        }
	      }
	      return _react2["default"].createElement(
	        'div',
	        { id: 'kczttj_fanye' },
	        _react2["default"].createElement(
	          'span',
	          { id: 'rows' },
	          '\u5171',
	          this.props.TP.total ? this.props.TP.total : 1,
	          '\u6761\u8BB0\u5F55'
	        ),
	        _react2["default"].createElement('input', { className: 'fanye_options', type: 'button', value: '\u9996\u9875', id: 'fanye_start', onClick: this.fanye.bind(this, 1) }),
	        _react2["default"].createElement('input', { className: 'fanye_options', type: 'button', value: '\u4E0A\u4E00\u9875', id: 'fanye_pre', onClick: this.fanye.bind(this, now === 1 ? 0 : now - 1) }),
	        _react2["default"].createElement(
	          'ul',
	          { id: 'fanye_nums' },
	          nums
	        ),
	        _react2["default"].createElement('input', { type: 'text', id: 'tp', ref: 'tp', placeholder: this.props.TP.page + '/' + this.props.TP.pages }),
	        _react2["default"].createElement('input', { className: 'fanye_options', type: 'button', value: '\u4E0B\u4E00\u9875', id: 'fanye_next', onClick: this.fanye.bind(this, now === end ? 0 : now + 1) }),
	        _react2["default"].createElement('input', { className: 'fanye_options', type: 'button', value: '\u5C3E\u9875', id: 'fanye_end', onClick: this.fanye.bind(this, end) })
	      );
	    }
	  }, {
	    key: 'fanye',
	    value: function fanye(p) {
	      this.refs.tp.value = null;
	      if (p == 0) {
	        return;
	      }
	      this.props.callback(p);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return this.create_popup_fanye();
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this9 = this;

	      // 手动跳转翻页
	      this.refs.tp.onkeydown = function (eve) {
	        if (eve.keyCode === 13) {
	          if (!isNaN(+eve.target.value)) {
	            _this9.fanye(+eve.target.value);
	          } else {
	            eve.target.value = null;
	            eve.target.blur();
	          }
	        }
	      };
	    }
	  }]);

	  return Fanye;
	}(_react2["default"].Component);

	_reactDom2["default"].render(_react2["default"].createElement(Option, null), document.getElementById('wpgl'));

/***/ },

/***/ 159:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// 登录判断与处理
	function loginCheck(loginData) {
	  var status = [100, 101, 102, 303];
	  if (!Array.indexOf) {
	    Array.prototype.indexOf = function (obj) {
	      for (var i = 0; i < this.length; i++) {
	        if (this[i] == obj) {
	          return i;
	        }
	      }
	      return -1;
	    };
	  }
	  if (status.indexOf(loginData.meta.result) === -1) {
	    alert(loginData.meta.msg);
	  }
	  if (loginData.meta.result == 303) {
	    confirm(loginData.meta.msg);
	    window.location.href = "https://ids.cqupt.edu.cn/authserver/login?service=" + courseCenter.host + "classList";
	  }
	}

	// 封装ajax(BluMUI.result.Title.props.ajaxing)
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
	        loginCheck(JSON.parse(xhr.responseText));
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

});