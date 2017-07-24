webpackJsonp([4],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

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

	var Option = function (_React$Component) {
	  _inherits(Option, _React$Component);

	  function Option(props) {
	    _classCallCheck(this, Option);

	    var _this = _possibleConstructorReturn(this, (Option.__proto__ || Object.getPrototypeOf(Option)).call(this, props));

	    _this.state = {
	      // 取不到当前默认的masterstate就默认为out
	      master: sessionStorage.getItem("master") || 'out',
	      list: [],
	      TP: {
	        page: 1,
	        pages: 1,
	        total: 1
	      }
	    };
	    return _this;
	  }

	  _createClass(Option, [{
	    key: 'creat_option_down',
	    value: function creat_option_down() {
	      var _this2 = this;

	      var master = this.state.master;

	      var inputs = null;
	      switch (master) {
	        case 'out':
	          inputs = _react2["default"].createElement(
	            'div',
	            { id: 'option_input' },
	            _react2["default"].createElement(
	              'span',
	              null,
	              '\u8D26\u53F7\uFF1A'
	            ),
	            _react2["default"].createElement('input', { type: 'text', ref: 'zhanghao' }),
	            _react2["default"].createElement(
	              'span',
	              null,
	              '\u59D3\u540D\uFF1A'
	            ),
	            _react2["default"].createElement('input', { type: 'text', ref: 'name' }),
	            _react2["default"].createElement(
	              'span',
	              null,
	              '\u5DE5\u4F5C\u5355\u4F4D\uFF1A'
	            ),
	            _react2["default"].createElement('input', { type: 'text', ref: 'danwei' })
	          );
	          break;
	        case 'in':
	          inputs = _react2["default"].createElement(
	            'div',
	            { id: 'option_input' },
	            _react2["default"].createElement(
	              'span',
	              null,
	              '\u6240\u5C5E\u5B66\u9662\uFF1A'
	            ),
	            _react2["default"].createElement(
	              'select',
	              { id: 'xueyuan', ref: function ref(select) {
	                  // 存在实例才执行
	                  (_this2.xueyuan = select) && _this2.insert_xueyuan();
	                } },
	              _react2["default"].createElement(
	                'option',
	                { value: '' },
	                '\u8BF7\u9009\u62E9'
	              )
	            ),
	            _react2["default"].createElement(
	              'span',
	              null,
	              '\u6559\u5E08\u59D3\u540D\uFF1A'
	            ),
	            _react2["default"].createElement('input', { type: 'text', ref: 'jsxm' })
	          );
	          break;
	        default:
	          inputs = null;
	          break;
	      }
	      return _react2["default"].createElement(
	        'div',
	        { id: 'down' },
	        inputs,
	        _react2["default"].createElement(
	          'div',
	          { id: 'option_serch' },
	          _react2["default"].createElement(
	            'span',
	            null,
	            '\u8D26\u53F7\u72B6\u6001\uFF1A'
	          ),
	          _react2["default"].createElement('input', { type: 'checkbox', id: 'qy', ref: function ref(input) {
	              return _this2.qy = input;
	            } }),
	          _react2["default"].createElement(
	            'label',
	            { htmlFor: 'qy' },
	            _react2["default"].createElement('img', { src: '../../imgs/public/hook.png' })
	          ),
	          _react2["default"].createElement(
	            'span',
	            null,
	            '\u542F\u7528'
	          ),
	          _react2["default"].createElement('input', { type: 'checkbox', id: 'ty', ref: function ref(input) {
	              return _this2.ty = input;
	            } }),
	          _react2["default"].createElement(
	            'label',
	            { htmlFor: 'ty' },
	            _react2["default"].createElement('img', { src: '../../imgs/public/hook.png' })
	          ),
	          _react2["default"].createElement(
	            'span',
	            null,
	            '\u505C\u7528'
	          ),
	          _react2["default"].createElement(
	            'button',
	            { ref: function ref(serch) {
	                return _this2.serch = serch;
	              }, id: 'serch' },
	            '\u641C\u7D22'
	          )
	        )
	      );
	    }
	  }, {
	    key: 'insert_xueyuan',
	    value: function insert_xueyuan() {
	      var _this3 = this;

	      ajax({
	        url: courseCenter.host + 'getCollege',
	        data: {
	          unifyCode: getCookie("userId")
	        },
	        success: function success(gets) {
	          var datas = JSON.parse(gets);
	          var options = "<option value=''>请选择</option>";
	          console.log(datas);

	          datas.data.map(function (e) {
	            options += '<option value=' + e.kkxymc + '>' + e.kkxymc + '</option>';
	          });
	          _this3.xueyuan.innerHTML = options;
	          _this3.xueyuan.onchange = function () {
	            console.log(_this3.xueyuan.value);
	          };
	        }
	      });
	    }
	  }, {
	    key: 'change_master_state',
	    value: function change_master_state(state) {
	      // this['master_'+state].checked=false;
	      sessionStorage.setItem("master", state);
	      this.setState({
	        master: state
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this4 = this;

	      var master = this.state.master;

	      return _react2["default"].createElement(
	        'div',
	        { id: 'Option' },
	        _react2["default"].createElement(
	          'div',
	          { id: 'option_bar' },
	          _react2["default"].createElement(
	            'div',
	            { id: 'top' },
	            _react2["default"].createElement(
	              'button',
	              { className: 'option_big_btn', ref: function ref(button) {
	                  return _this4.add = button;
	                } },
	              '\u6DFB\u52A0\u4E13\u5BB6'
	            ),
	            _react2["default"].createElement(
	              'button',
	              { className: 'option_big_btn', ref: function ref(button) {
	                  return _this4.PLdelete = button;
	                } },
	              '\u6279\u91CF\u5220\u9664'
	            ),
	            _react2["default"].createElement(
	              'button',
	              { className: 'option_big_btn', ref: function ref(button) {
	                  return _this4.change = button;
	                } },
	              '\u4FEE\u6539\u5BC6\u7801'
	            )
	          ),
	          _react2["default"].createElement(
	            'div',
	            { id: 'mid' },
	            _react2["default"].createElement('input', {
	              type: 'radio',
	              name: 'master',
	              id: 'master_in',
	              ref: function ref(input) {
	                return _this4.master_out = input;
	              },
	              onChange: function onChange() {
	                _this4.change_master_state('out');
	              },
	              defaultChecked: master === 'out'
	            }),
	            _react2["default"].createElement(
	              'label',
	              { htmlFor: 'master_in' },
	              _react2["default"].createElement('img', { src: '../../imgs/public/hook.png' })
	            ),
	            _react2["default"].createElement(
	              'span',
	              null,
	              '\u663E\u793A\u6821\u5916\u4E13\u5BB6'
	            ),
	            _react2["default"].createElement('input', {
	              type: 'radio',
	              name: 'master',
	              id: 'master_out',
	              ref: function ref(input) {
	                return _this4.master_in = input;
	              },
	              onChange: function onChange() {
	                _this4.change_master_state('in');
	              },
	              defaultChecked: master === 'in'
	            }),
	            _react2["default"].createElement(
	              'label',
	              { htmlFor: 'master_out' },
	              _react2["default"].createElement('img', { src: '../../imgs/public/hook.png' })
	            ),
	            _react2["default"].createElement(
	              'span',
	              null,
	              '\u663E\u793A\u6821\u5185\u4E13\u5BB6'
	            )
	          ),
	          this.creat_option_down()
	        ),
	        _react2["default"].createElement(List, { list: this.state.list, master: this.state.master })
	      );
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this5 = this;

	      this.add.onclick = function () {
	        window.location.href = "./masterAddEditor.html";
	      };
	      ajax({
	        url: courseCenter.host + "getZjList",
	        data: {
	          unifyCode: getCookie("userId"),
	          userId: this.refs.zhanghao.value,
	          userName: this.refs.name.value,
	          department: this.refs.danwei.value,
	          state: this.qy.checked === this.ty.checked ? '' : +this.qy.checked,
	          page: 1,
	          count: 10,
	          type: ['in', 'out'].indexOf(this.state.master)
	        },
	        success: function success(gets) {
	          var datas = JSON.parse(gets);
	          console.log(datas);
	          _this5.setState({
	            TP: {
	              page: 1,
	              pages: datas.data.totalPages,
	              total: datas.data.total
	            },
	            list: datas.data.zjList
	          });
	        }
	      });
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(prevProps, prevState) {
	      if (window.frameElement) {
	        window.frameElement.height = document.body.offsetHeight;
	      }
	    }
	  }]);

	  return Option;
	}(_react2["default"].Component);

	var List = function (_React$Component2) {
	  _inherits(List, _React$Component2);

	  function List(props) {
	    _classCallCheck(this, List);

	    return _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this, props));
	  }

	  _createClass(List, [{
	    key: 'creat_thead',
	    value: function creat_thead() {
	      var _this7 = this;

	      var master = this.props.master;

	      switch (master) {
	        case 'out':
	          return _react2["default"].createElement(
	            'thead',
	            null,
	            _react2["default"].createElement(
	              'tr',
	              null,
	              _react2["default"].createElement(
	                'td',
	                { id: 'td_start' },
	                _react2["default"].createElement('div', null)
	              ),
	              _react2["default"].createElement('td', { id: 'td_left' }),
	              _react2["default"].createElement(
	                'td',
	                null,
	                _react2["default"].createElement('input', {
	                  type: 'checkbox',
	                  id: 'allcheck',
	                  ref: function ref(check) {
	                    return _this7.allcheck = check;
	                  }
	                }),
	                _react2["default"].createElement(
	                  'label',
	                  { htmlFor: 'allcheck' },
	                  _react2["default"].createElement('img', { src: '../../imgs/public/hook.png' })
	                )
	              ),
	              _react2["default"].createElement(
	                'td',
	                null,
	                '\u8D26\u53F7'
	              ),
	              _react2["default"].createElement(
	                'td',
	                null,
	                '\u59D3\u540D'
	              ),
	              _react2["default"].createElement(
	                'td',
	                null,
	                '\u5DE5\u4F5C\u5355\u4F4D'
	              ),
	              _react2["default"].createElement(
	                'td',
	                null,
	                '\u8054\u7CFB\u7535\u8BDD'
	              ),
	              _react2["default"].createElement(
	                'td',
	                null,
	                '\u8D26\u53F7\u72B6\u6001'
	              ),
	              _react2["default"].createElement(
	                'td',
	                null,
	                '\u64CD\u4F5C'
	              ),
	              _react2["default"].createElement('td', { id: 'td_right' }),
	              _react2["default"].createElement(
	                'td',
	                { id: 'td_end' },
	                _react2["default"].createElement('div', null)
	              )
	            )
	          );
	          break;
	      }
	    }
	  }, {
	    key: 'option',
	    value: function option(op, id) {
	      switch (op) {
	        case 'edit':
	          window.location.href = "./masterAddEditor.html?isEditor=true&masterId=" + id;
	          break;
	        default:
	          break;
	      }
	    }
	  }, {
	    key: 'creat_tbody',
	    value: function creat_tbody() {
	      var _this8 = this;

	      var master = this.props.master;

	      switch (master) {
	        case 'out':
	          return _react2["default"].createElement(
	            'tbody',
	            null,
	            this.props.list.map(function (e, index) {
	              return _react2["default"].createElement(
	                'tr',
	                { key: index },
	                _react2["default"].createElement('td', null),
	                _react2["default"].createElement('td', null),
	                _react2["default"].createElement(
	                  'td',
	                  null,
	                  _react2["default"].createElement('input', { type: 'checkbox', id: "input-" + index }),
	                  _react2["default"].createElement(
	                    'label',
	                    { htmlFor: "input-" + index },
	                    _react2["default"].createElement('img', { src: '../../imgs/public/hook.png' })
	                  )
	                ),
	                _react2["default"].createElement(
	                  'td',
	                  null,
	                  e.id
	                ),
	                _react2["default"].createElement(
	                  'td',
	                  null,
	                  e.xm
	                ),
	                _react2["default"].createElement(
	                  'td',
	                  null,
	                  e.dw
	                ),
	                _react2["default"].createElement(
	                  'td',
	                  null,
	                  e.lxdh
	                ),
	                _react2["default"].createElement(
	                  'td',
	                  null,
	                  e.zt
	                ),
	                _react2["default"].createElement(
	                  'td',
	                  null,
	                  _react2["default"].createElement(
	                    'a',
	                    { href: '#', onClick: _this8.option.bind(_this8, 'edit', e.id) },
	                    '\u7F16\u8F91'
	                  ),
	                  _react2["default"].createElement(
	                    'a',
	                    { href: '#', onClick: _this8.option.bind(_this8, 'del', e.id) },
	                    '\u5220\u9664'
	                  ),
	                  _react2["default"].createElement(
	                    'a',
	                    { href: '#', onClick: _this8.option.bind(_this8, 'open', e.id) },
	                    '\u542F\u7528'
	                  )
	                ),
	                _react2["default"].createElement('td', null),
	                _react2["default"].createElement('td', null)
	              );
	            })
	          );
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2["default"].createElement(
	        'div',
	        { id: 'List' },
	        _react2["default"].createElement(
	          'table',
	          null,
	          this.creat_thead(),
	          this.creat_tbody()
	        )
	      );
	    }
	  }]);

	  return List;
	}(_react2["default"].Component);

	_reactDom2["default"].render(_react2["default"].createElement(Option, null), document.getElementById('zjkgl'));

/***/ },

/***/ 160:
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