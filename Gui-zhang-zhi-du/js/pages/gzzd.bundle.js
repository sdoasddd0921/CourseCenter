webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BluMUI = __webpack_require__(1);
	var ajax = __webpack_require__(160);

	// parent.document.getElementById('ifs-gzzd').height=document.body.scrollHeight;
	document.getElementById("fabu_btn").onclick = function () {
	  window.location.href = './guizhang_publish.html';
	};
	BluMUI.create({}, 'Create_filter', document.getElementById('filter'));
	// ReactDOM.render(
	//   <Filter />,
	//   document.getElementById('filter')
	// );
	console.log("规章制度初始化", parent.document.getElementById('ifs-gzzd').height);
	console.log(document.body.height);
	parent.document.getElementById('ifs-gzzd').height = document.body.offsetHeight;

/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

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

	var Menue_this;
	// iframe

	var Iframe = function (_React$Component) {
	  _inherits(Iframe, _React$Component);

	  function Iframe(props) {
	    _classCallCheck(this, Iframe);

	    var _this = _possibleConstructorReturn(this, (Iframe.__proto__ || Object.getPrototypeOf(Iframe)).call(this, props));

	    _this.state = _this.props;
	    _this.iframes = { length: 0 };
	    Object.defineProperty(_this.iframes, "length", {
	      enumerable: false
	    });
	    _this.state.tabs.map(function (e, index) {
	      _this.iframes[e] = _react2["default"].createElement('iframe', { src: 'guizhang-' + e + '.html', frameBorder: '0', id: 'ifs-' + e, key: e, style: { display: 'none' }, onLoad: _this.ld.bind(_this) });
	      _this.iframes.length++;
	    });
	    return _this;
	  }

	  _createClass(Iframe, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      var _this2 = this;

	      // console.log("___30",this.iframes[this.state.on])
	      // console.log(this.refs.Iframe)
	      if (nextProps.tabs.length == this.iframes.length) {
	        // console.log('same!')
	      } else if (nextProps.tabs.length > this.iframes.length) {
	        // console.log('next bigger',nextProps.tabs,this.iframes);
	        nextProps.tabs.map(function (e) {
	          if (typeof _this2.iframes[e] == 'undefined') {
	            // console.log('new element')
	            _this2.iframes[e] = _react2["default"].createElement('iframe', { src: 'guizhang-' + e + '.html', frameBorder: '0', id: 'ifs-' + e, key: e, style: { display: 'none' }, onLoad: _this2.ld.bind(_this2) });
	            _this2.iframes.length++;
	          } else {
	            console.log('old element');
	          }
	        });
	      } else if (nextProps.tabs.length < this.iframes.length) {
	        for (var i in this.iframes) {
	          if (-1 == nextProps.tabs.indexOf(i)) {
	            // console.log(i)
	            delete this.iframes[i];
	            this.iframes.length--;
	          }
	        }
	      }
	      // console.log('比较\n',nextProps,this.iframes)
	      // console.log('show',document.getElementById('ifs-'+this.state.on))
	      document.getElementById('ifs-' + this.state.on).style.display = 'none';
	      this.setState(nextProps);
	    }
	  }, {
	    key: 'ld',
	    value: function ld() {
	      console.log('Iframe load finished, set iframe height!!!');
	      // console.log(document.getElementById('ifs-'+this.state.on).contentWindow.document)
	      // 
	      // document.getElementById('ifs-'+this.state.on).height=
	      //   document.getElementById('ifs-'+this.state.on).contentWindow.document.body.scrollHeight;
	      iframe_set('ifs-' + this.state.on);
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.render();
	      // document.getElementById('ifs-'+this.state.on).style.height=document.getElementById('ifs-'+this.state.on).contentWindow.document.body.scrollHeight;
	      document.getElementById('ifs-' + this.state.on).style.display = 'block';
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      // console.log(document.getElementById('ifs-'+this.state.on))
	      document.getElementById('ifs-' + this.state.on).style.display = 'block';
	    }
	  }, {
	    key: 'create_iframes',
	    value: function create_iframes() {
	      var IFS = [];
	      for (var i in this.iframes) {
	        // console.log('sssssssss',this.iframes[i])
	        IFS.push(this.iframes[i]);
	      }
	      // console.log('IFS',IFS)
	      return _react2["default"].createElement(
	        'div',
	        { id: 'iframes', ref: 'Iframe' },
	        IFS
	      );
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      // console.log("加载完成:\n")
	      return this.create_iframes();
	    }
	  }]);

	  return Iframe;
	}(_react2["default"].Component);

	function iframe_set(elem) {
	  var child_iframe = document.getElementById(elem);
	  child_iframe.height = child_iframe.contentWindow.document.body.scrollHeight;
	}

	// 菜单

	var Menue = function (_React$Component2) {
	  _inherits(Menue, _React$Component2);

	  function Menue(props) {
	    _classCallCheck(this, Menue);

	    // 设置默认显示的第一个tab
	    var _this3 = _possibleConstructorReturn(this, (Menue.__proto__ || Object.getPrototypeOf(Menue)).call(this, props));

	    _this3.state = {
	      Menue_on: _this3.props.Menues[0]
	    };
	    return _this3;
	  }

	  _createClass(Menue, [{
	    key: 'tab_change',
	    value: function tab_change(name, eve) {
	      var _this4 = this;

	      this.setState({
	        Menue_on: name
	      }, function () {
	        Create_tabs(_this4.state.Menue_on);
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      Menue_this = this;
	      this.refs.menue.children[0].className = 'menue_on';
	      Create_tabs(this.state.Menue_on);
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(preProps, preState) {
	      this.refs.menue.children[this.props.Menues.indexOf(preState.Menue_on)].className = '';
	      this.refs.menue.children[this.props.Menues.indexOf(this.state.Menue_on)].className = 'menue_on';
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this5 = this;

	      return _react2["default"].createElement(
	        'ul',
	        { ref: 'menue' },
	        this.props.Menues.map(function (e, index) {
	          return _react2["default"].createElement(
	            'li',
	            { key: index, name: e, onClick: _this5.tab_change.bind(_this5, e) },
	            BluMUI.menue_names[e]
	          );
	        })
	      );
	    }
	  }]);

	  return Menue;
	}(_react2["default"].Component);

	// tabs


	var Tab_head = function (_React$Component3) {
	  _inherits(Tab_head, _React$Component3);

	  function Tab_head(props) {
	    _classCallCheck(this, Tab_head);

	    var _this6 = _possibleConstructorReturn(this, (Tab_head.__proto__ || Object.getPrototypeOf(Tab_head)).call(this, props));

	    _this6.state = {
	      tabs: [_this6.props.Tab],
	      on: _this6.props.Tab
	    };
	    return _this6;
	  }

	  _createClass(Tab_head, [{
	    key: 'tab_change',
	    value: function tab_change(tab_name, eve) {
	      this.refs[this.state.on].className = '';
	      this.setState({ on: tab_name });
	      Menue_this.setState({ Menue_on: tab_name });
	    }
	  }, {
	    key: 'del',
	    value: function del(tab_name, eve) {
	      eve.nativeEvent.preventDefault();
	      var tabs = this.state.tabs;
	      var index = tabs.indexOf(tab_name);
	      var new_on = void 0;
	      tabs.splice(index, 1);
	      if (index < 1) {
	        new_on = tabs[index + 1];
	      } else {
	        new_on = tabs[index - 1];
	      }
	      this.setState({
	        tabs: tabs,
	        on: new_on
	      });
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      var new_tabs = this.state.tabs;
	      // this.refs[this.state.on].className='';
	      if (this.state.tabs.indexOf(nextProps.Tab) == -1) {
	        new_tabs.push(nextProps.Tab);
	      }
	      this.setState({
	        tabs: new_tabs,
	        on: nextProps.Tab
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      Create_iframes(this.state);
	      this.refs[this.state.on].className = 'tabs_on';
	    }
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate(preProps, preState) {
	      var _this7 = this;

	      Create_iframes(this.state);
	      // console.log('updarta:',this.state.on,preState.on)
	      if (this.refs[preState.on]) {
	        // console.log('存在')
	        this.refs[preState.on].className = '';
	      }
	      this.refs[this.state.on].className = 'tabs_on';
	      // 为关闭按钮单独绑定事件，不单独绑定会触发事件冒泡
	      Array().map.call(this.refs.tabs.getElementsByClassName('close'), function (e, index) {
	        e.onclick = function (eve) {
	          // 阻止事件冒泡
	          eve.stopImmediatePropagation();
	          var new_on = _this7.state.on;
	          var tabs = _this7.state.tabs;
	          // 如果只有一个tab被打开则这个tab不能关闭
	          if (tabs.length == 1) {
	            return;
	          }
	          // 将当前打开的标签设置为关闭
	          _this7.refs[_this7.state.on].className = '';
	          // 如果关闭的tab和当前打开的tab是同一个
	          if (tabs[index] == _this7.state.on) {
	            // console.log('相等')
	            // 看是不是关闭的第一个tab，是第一个就打开后面个
	            // if(index<1) {
	            //   new_on = tabs[index+1];
	            // } else {
	            //   new_on = tabs[index-1];
	            // }
	            tabs.splice(index, 1);
	            new_on = tabs[tabs.length - 1];
	          } else {
	            tabs.splice(index, 1);
	          }
	          // console.log('new_on:',new_on)
	          _this7.setState({
	            tabs: tabs,
	            on: new_on
	          });
	          Menue_this.setState({ Menue_on: new_on });
	        };
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _this8 = this;

	      //需要this.state向下传递信息，包括tab[]和on
	      return _react2["default"].createElement(
	        'ul',
	        { ref: 'tabs' },
	        this.state.tabs.map(function (e, index) {
	          return _react2["default"].createElement(
	            'li',
	            { key: index, ref: e, onClick: _this8.tab_change.bind(_this8, e) },
	            BluMUI.menue_names[e],
	            _react2["default"].createElement(
	              'span',
	              { className: 'close' },
	              'x'
	            )
	          );
	        })
	      );
	    }
	  }]);

	  return Tab_head;
	}(_react2["default"].Component);

	function Create_tabs(tab) {
	  // ReactDOM.render(
	  //   <Tab_head Tab={tab}/>,
	  //   document.getElementById('tabs')
	  // );
	  BluMUI.create({
	    Tab: tab
	  }, 'Create_tab', document.getElementById('tabs'));
	}

	function Create_iframes(state) {
	  // ReactDOM.render(
	  //   <Iframe {...state}/>,
	  //   document.getElementById('tab')
	  // );
	  BluMUI.create(state, 'Create_iframe', document.getElementById('tab'));
	}
	// -----------------------------------------gzzd-------------------------------------------------------


	/* 筛选条件 */

	var Filter = function (_React$Component4) {
	  _inherits(Filter, _React$Component4);

	  function Filter(props) {
	    _classCallCheck(this, Filter);

	    var _this9 = _possibleConstructorReturn(this, (Filter.__proto__ || Object.getPrototypeOf(Filter)).call(this, props));

	    _this9.serch = _this9.serch.bind(_this9);
	    _this9.pub = '';
	    _this9.P = {
	      page: 1,
	      pages: 0
	    };
	    return _this9;
	  }

	  _createClass(Filter, [{
	    key: 'serch',
	    value: function serch(p) {
	      var _this10 = this;

	      var source = this.refs.Source.value;
	      var title = this.refs.Title.value;
	      if (this.refs.Pub.checked == this.refs.Unpub.checked) {
	        this.pub = '';
	      } else {
	        this.pub = this.refs.Pub.checked ? 1 : 0;
	      }
	      console.log('this page', this.P.page);
	      ajax({
	        url: courseCenter.host + 'getRegulationHead',
	        data: {
	          page: p || this.P.page,
	          unifyCode: getCookie('userId'),
	          count: 10,
	          user: 'admin',
	          state: this.pub,
	          title: title,
	          source: source
	        },
	        success: function success(gets) {
	          var datas = JSON.parse(gets);
	          console.log('列表信息', datas);
	          _this10.P = {
	            page: p || _this10.P.page,
	            pages: datas.data.totalPages
	          };
	          show_list(datas.data.regulationInformation, _this10.P, _this10);
	          console.log("子iframe");
	          console.log(parent.document.getElementById('ifs-gzzd').height);
	          console.log(document.body.scrollHeight);
	          parent.document.getElementById('ifs-gzzd').height = document.body.scrollHeight;
	        }
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var Pub = this.refs.Pub;
	      var Unpub = this.refs.Unpub;

	      this.serch();
	      this.refs.Serch.onclick = this.serch.bind(this, 1);

	      Pub.onchange = this.serch.bind(this, 1);
	      Unpub.onchange = this.serch.bind(this, 1);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2["default"].createElement(
	        'div',
	        { id: 'Filters' },
	        _react2["default"].createElement(
	          'label',
	          null,
	          _react2["default"].createElement('input', { type: 'checkbox', ref: 'Pub', id: 'Pub' }),
	          _react2["default"].createElement(
	            'span',
	            null,
	            '\xA0\u5DF2\u53D1\u5E03\xA0\xA0\xA0'
	          )
	        ),
	        _react2["default"].createElement(
	          'label',
	          null,
	          _react2["default"].createElement('input', { type: 'checkbox', ref: 'Unpub', id: 'Unpub' }),
	          _react2["default"].createElement(
	            'span',
	            null,
	            '\xA0\u672A\u53D1\u5E03\xA0\xA0\xA0'
	          )
	        ),
	        _react2["default"].createElement(
	          'span',
	          null,
	          '\u6807\u9898\xA0'
	        ),
	        _react2["default"].createElement('input', { type: 'text', ref: 'Title', id: 'Title' }),
	        _react2["default"].createElement(
	          'span',
	          null,
	          '\u6765\u6E90\xA0'
	        ),
	        _react2["default"].createElement('input', { type: 'text', ref: 'Source', id: 'Source' }),
	        _react2["default"].createElement(
	          'span',
	          { id: 'serch', ref: 'Serch' },
	          '\u67E5\u8BE2'
	        )
	      );
	    }
	  }]);

	  return Filter;
	}(_react2["default"].Component);

	var BlueMUI_CreateFanye = function (_React$Component5) {
	  _inherits(BlueMUI_CreateFanye, _React$Component5);

	  function BlueMUI_CreateFanye(props) {
	    _classCallCheck(this, BlueMUI_CreateFanye);

	    var _this11 = _possibleConstructorReturn(this, (BlueMUI_CreateFanye.__proto__ || Object.getPrototypeOf(BlueMUI_CreateFanye)).call(this, props));

	    _this11.fanye = _this11.fanye.bind(_this11);
	    _this11.create_popup_fanye = _this11.create_popup_fanye.bind(_this11);
	    return _this11;
	  }

	  _createClass(BlueMUI_CreateFanye, [{
	    key: 'create_popup_fanye',
	    value: function create_popup_fanye() {
	      console.log(this.props, "___376");
	      var style = {};
	      var fanye = [];
	      var start = 1;
	      var end = this.props.pages;
	      var style_on = {
	        background: "url('../../imgs/courseAudit/fanye_bg.png')",
	        backgroundRepeat: 'no-repeat',
	        backgroundPosition: '5px 5px',
	        color: '#FFF'
	      };
	      if (this.props.pages < 1) {
	        return _react2["default"].createElement('div', null);
	      }
	      if (this.props.pages <= 7) {
	        for (var i = 2; i < this.props.pages; i++) {
	          if (i == this.props.page) {
	            style = style_on;
	          } else {
	            style = {};
	          }
	          fanye.push(_react2["default"].createElement(
	            'li',
	            { key: i, style: style, onClick: this.fanye.bind(this, i) },
	            i
	          ));
	        }
	      } else {
	        if (this.props.page < 5) {
	          for (var j = 2; j <= 6; j++) {
	            if (j == this.props.page) {
	              style = style_on;
	            } else {
	              style = {};
	            }
	            fanye.push(_react2["default"].createElement(
	              'li',
	              { key: j, style: style, onClick: this.fanye.bind(this, j) },
	              j
	            ));
	          }
	          fanye.push(_react2["default"].createElement(
	            'li',
	            { key: 'end' },
	            '...'
	          ));
	        } else if (this.props.page > this.props.pages - 4) {
	          for (var k = this.props.pages - 5; k < this.props.pages; k++) {
	            if (k == this.props.page) {
	              style = style_on;
	            } else {
	              style = {};
	            }
	            fanye.push(_react2["default"].createElement(
	              'li',
	              { key: k, style: style, onClick: this.fanye.bind(this, k) },
	              k
	            ));
	          }
	          fanye.unshift(_react2["default"].createElement(
	            'li',
	            { key: 'start' },
	            '...'
	          ));
	        } else {
	          for (var l = this.props.page - 2; l <= this.props.page + 2; l++) {
	            if (l == this.props.page) {
	              style = style_on;
	            } else {
	              style = {};
	            }
	            fanye.push(_react2["default"].createElement(
	              'li',
	              { key: l, style: style, onClick: this.fanye.bind(this, l) },
	              l
	            ));
	          }
	          fanye.unshift(_react2["default"].createElement(
	            'li',
	            { key: 'start' },
	            '...'
	          ));
	          fanye.push(_react2["default"].createElement(
	            'li',
	            { key: 'end' },
	            '...'
	          ));
	        }
	      }
	      if (1 == this.props.pages) {
	        fanye.push(_react2["default"].createElement(
	          'li',
	          { key: 1, style: style_on },
	          1
	        ));
	      } else if (this.props.page == this.props.pages) {
	        fanye.unshift(_react2["default"].createElement(
	          'li',
	          { key: 1, onClick: this.fanye.bind(this, 1) },
	          1
	        ));
	        fanye.push(_react2["default"].createElement(
	          'li',
	          { key: this.props.pages, style: style_on },
	          this.props.pages
	        ));
	      } else if (this.props.page == 1) {
	        fanye.unshift(_react2["default"].createElement(
	          'li',
	          { key: 1, style: style_on },
	          1
	        ));
	        fanye.push(_react2["default"].createElement(
	          'li',
	          { key: this.props.pages, onClick: this.fanye.bind(this, this.props.pages) },
	          this.props.pages
	        ));
	      } else {
	        fanye.unshift(_react2["default"].createElement(
	          'li',
	          { key: 1, onClick: this.fanye.bind(this, 1) },
	          1
	        ));
	        fanye.push(_react2["default"].createElement(
	          'li',
	          { key: this.props.pages, onClick: this.fanye.bind(this, this.props.pages) },
	          this.props.pages
	        ));
	      }
	      return _react2["default"].createElement(
	        'div',
	        { id: 'fanye' },
	        _react2["default"].createElement(
	          'div',
	          { id: 'fanye_pre', ref: 'pre', onClick: this.fanye.bind(this, this.props.page - 1 < 0 ? 1 : this.props.page - 1) },
	          _react2["default"].createElement('img', { src: '../../imgs/courseAudit/fanye_left.png', alt: '' })
	        ),
	        _react2["default"].createElement(
	          'ul',
	          { ref: 'popup_fanye' },
	          fanye
	        ),
	        _react2["default"].createElement(
	          'div',
	          { id: 'fanye_next', ref: 'next', onClick: this.fanye.bind(this, this.props.page + 1 > this.props.pages ? 0 : this.props.page + 1) },
	          _react2["default"].createElement('img', { src: '../../imgs/courseAudit/fanye_right.png', alt: '' })
	        )
	      );
	    }
	  }, {
	    key: 'fanye',
	    value: function fanye(p) {
	      if (p == 0) {
	        return;
	      }
	      console.log("开始翻页");
	      this.props.This.P.page = p;
	      this.props.This.serch();
	    }

	    // componentDidMount() {
	    //   this.fanye();
	    // }
	    // componentDidUpdate(prevProps, prevState) {
	    //   this.fanye();
	    // }

	  }, {
	    key: 'render',
	    value: function render() {
	      // console.log(this.props,"fanye")
	      return this.create_popup_fanye();
	    }
	  }]);

	  return BlueMUI_CreateFanye;
	}(_react2["default"].Component);

	/* 显示列表 */


	var List = function (_React$Component6) {
	  _inherits(List, _React$Component6);

	  function List(props) {
	    _classCallCheck(this, List);

	    var _this12 = _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this, props));

	    _this12.create_body = _this12.create_body.bind(_this12);
	    _this12.del = _this12.del.bind(_this12);
	    _this12.pub = _this12.pub.bind(_this12);
	    return _this12;
	  }

	  _createClass(List, [{
	    key: 'del',
	    value: function del(id) {
	      console.log('删除：', id);
	      ajax({
	        url: courseCenter.host + 'deleteRegulation',
	        data: {
	          unifyCode: getCookie('userId'),
	          id: id
	        },
	        success: function success(e) {
	          console.log(JSON.parse(e));
	        }
	      });
	      this.props.This.serch();
	    }
	  }, {
	    key: 'pub',
	    value: function pub(id) {
	      console.log('发布：', id);
	      ajax({
	        url: courseCenter.host + 'publishRegulation',
	        data: {
	          unifyCode: getCookie('userId'),
	          id: id
	        },
	        success: function success(e) {
	          console.log(JSON.parse(e));
	        }
	      });
	      this.props.This.serch();
	    }
	  }, {
	    key: 'create_body',
	    value: function create_body() {
	      var _this13 = this;

	      var id = void 0,
	          userId = void 0,
	          title = void 0,
	          state = void 0,
	          source = void 0;
	      return _react2["default"].createElement(
	        'tbody',
	        null,
	        this.props.Lists.map(function (e, index) {
	          id = e.id;
	          userId = getCookie('userId');
	          title = document.getElementById('Title').value;
	          source = document.getElementById('Source').value;
	          state = document.getElementById('Pub').checked == document.getElementById('Unpub').checked ? '' : +document.getElementById('Pub');
	          return _react2["default"].createElement(
	            'tr',
	            { key: index, style: { background: index % 2 ? '' : 'white' } },
	            _react2["default"].createElement(
	              'td',
	              null,
	              e.bt
	            ),
	            _react2["default"].createElement(
	              'td',
	              null,
	              e.czsj
	            ),
	            _react2["default"].createElement(
	              'td',
	              null,
	              e.author
	            ),
	            _react2["default"].createElement(
	              'td',
	              null,
	              e.ly
	            ),
	            _react2["default"].createElement(
	              'td',
	              null,
	              +e.sffb ? '已发布' : '未发布'
	            ),
	            _react2["default"].createElement(
	              'td',
	              null,
	              +e.sffb ? _react2["default"].createElement(
	                'div',
	                { id: 'caozuo' },
	                _react2["default"].createElement(
	                  'span',
	                  null,
	                  _react2["default"].createElement(
	                    'a',
	                    { target: 'view_window', href: '../Regulations/regContain.html?id=' + id + '&unifyCode=' + userId + '&title=' + title + '&state=' + state + '&source=' + source },
	                    '\u67E5\u770B'
	                  )
	                ),
	                _react2["default"].createElement(
	                  'span',
	                  null,
	                  _react2["default"].createElement(
	                    'a',
	                    { href: '#', onClick: _this13.del.bind(_this13, e.id) },
	                    '\u5220\u9664'
	                  )
	                )
	              ) : _react2["default"].createElement(
	                'div',
	                { id: 'caozuo' },
	                _react2["default"].createElement(
	                  'span',
	                  null,
	                  _react2["default"].createElement(
	                    'a',
	                    { href: '#', onClick: _this13.pub.bind(_this13, e.id) },
	                    '\u53D1\u5E03'
	                  )
	                ),
	                _react2["default"].createElement(
	                  'span',
	                  null,
	                  _react2["default"].createElement(
	                    'a',
	                    { target: 'view_window', href: '../Regulations/regContain.html?id=' + id + '&unifyCode=' + userId + '&title=' + title + '&state=' + state + '&source=' + source },
	                    '\u67E5\u770B'
	                  )
	                ),
	                _react2["default"].createElement(
	                  'span',
	                  null,
	                  _react2["default"].createElement(
	                    'a',
	                    { href: '#', onClick: _this13.del.bind(_this13, e.id) },
	                    '\u5220\u9664'
	                  )
	                )
	              )
	            )
	          );
	        })
	      );
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2["default"].createElement(
	        'div',
	        null,
	        _react2["default"].createElement(
	          'table',
	          { id: 'list_table' },
	          _react2["default"].createElement(
	            'thead',
	            null,
	            _react2["default"].createElement(
	              'tr',
	              null,
	              _react2["default"].createElement(
	                'td',
	                null,
	                '\u6807\u9898'
	              ),
	              _react2["default"].createElement(
	                'td',
	                { width: '13%' },
	                '\u53D1\u5E03\u65F6\u95F4'
	              ),
	              _react2["default"].createElement(
	                'td',
	                { width: '10.5%' },
	                '\u53D1\u5E03\u4EBA'
	              ),
	              _react2["default"].createElement(
	                'td',
	                { width: '10%' },
	                '\u6765\u6E90'
	              ),
	              _react2["default"].createElement(
	                'td',
	                { width: '10%' },
	                '\u72B6\u6001'
	              ),
	              _react2["default"].createElement(
	                'td',
	                { width: '15.4%' },
	                '\u64CD\u4F5C'
	              )
	            )
	          ),
	          this.create_body()
	        ),
	        _react2["default"].createElement(BlueMUI_CreateFanye, { This: this.props.This, page: this.props.P.page, pages: this.props.P.pages })
	      );
	    }
	  }]);

	  return List;
	}(_react2["default"].Component);

	function show_list(Lists, P, This) {
	  BluMUI.create({
	    Lists: Lists,
	    P: P,
	    This: This
	  }, 'Create_gzzd_list', document.getElementById('list'));
	  // ReactDOM.render(
	  //   <List Lists={Lists} P={P} This={This}/>,
	  //   document.getElementById('list')
	  // );
	}

	// ----------------------------------------------------------------------------------------------------
	var BluMUI_M = {
	  Create_menu: Menue,
	  Create_iframe: Iframe,
	  Create_tab: Tab_head,
	  Create_filter: Filter,
	  Create_gzzd_fanye: BlueMUI_CreateFanye,
	  Create_gzzd_list: List
	};

	var BluMUI = {
	  result: {},
	  menues: [],
	  menue_names: {},
	  create: function create(data, type, elem) {
	    var props = data,
	        Blu = BluMUI_M[type];
	    this.result[props.id] = _reactDom2["default"].render(_react2["default"].createElement(Blu, props), elem);
	  }
	};

	exports["default"] = BluMUI;
	module.exports = exports['default'];

/***/ },

/***/ 160:
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

});