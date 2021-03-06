webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var BluMUI = __webpack_require__(1);
	var ajax = __webpack_require__(160);
	// 需要获取用户id
	var User = {
	  name: "",
	  id: ""
	};
	User.id = getCookie('userId') || '0102549';
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
	      role: datas.data
	    }, 'CreateTab', document.getElementById('table_title'));
	  }
	});

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

	// /**
	//  * ******************教研室、教学团队******************
	//  */


	//创建绿色的表头（又是绿色= =！）

	var BlueMUI_CreateThead = function (_React$Component) {
	  _inherits(BlueMUI_CreateThead, _React$Component);

	  function BlueMUI_CreateThead(props) {
	    _classCallCheck(this, BlueMUI_CreateThead);

	    var _this = _possibleConstructorReturn(this, (BlueMUI_CreateThead.__proto__ || Object.getPrototypeOf(BlueMUI_CreateThead)).call(this, props));

	    _this.bind_pages = _this.bind_pages.bind(_this);
	    _this.state = {
	      lists: _this.props.lists,
	      page: _this.props.page || 1
	    };
	    return _this;
	  }

	  _createClass(BlueMUI_CreateThead, [{
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      console.log("删除");
	    }

	    //根据权限创建绿色的表头（绿色……）

	  }, {
	    key: 'thead_create',
	    value: function thead_create() {
	      // console.log(this.props.rank,"___rank__27")
	      //创建表头内容数组
	      var thead_items = [];
	      //填充表头内容
	      thead_items[0] = _react2["default"].createElement('td', { key: 'w1', width: '5px' });
	      thead_items[1] = _react2["default"].createElement(
	        'td',
	        { key: '0', width: '20px' },
	        '\u5E8F\u53F7'
	      );
	      switch (this.props.rank) {
	        case 1:
	          thead_items[2] = _react2["default"].createElement(
	            'td',
	            { key: '1', width: '100px' },
	            '\u5B66\u9662'
	          );
	          thead_items[3] = _react2["default"].createElement(
	            'td',
	            { key: '2', width: '100px' },
	            '\u6559\u7814\u5BA4\u540D\u79F0'
	          );
	          thead_items[4] = _react2["default"].createElement(
	            'td',
	            { key: '3', width: '60px' },
	            '\u6559\u7814\u5BA4\u4E3B\u4EFB'
	          );
	          break;
	        case 2:
	          thead_items[2] = _react2["default"].createElement(
	            'td',
	            { key: '1', width: '80px' },
	            '\u8BFE\u7A0B\u7F16\u53F7'
	          );
	          thead_items[3] = _react2["default"].createElement(
	            'td',
	            { key: '2', width: '200px' },
	            '\u8BFE\u7A0B\u540D\u79F0'
	          );
	          thead_items[4] = _react2["default"].createElement(
	            'td',
	            { key: '3', width: '50px' },
	            '\u8BFE\u7A0B\u8D1F\u8D23\u4EBA'
	          );
	          thead_items[5] = _react2["default"].createElement(
	            'td',
	            { key: '4', width: '200px' },
	            '\u6559\u5B66\u56E2\u961F\u6210\u5458'
	          );
	          break;
	        case 3:
	          thead_items[2] = _react2["default"].createElement(
	            'td',
	            { key: '1', width: '100px' },
	            '\u8BFE\u7A0B\u7F16\u53F7'
	          );
	          thead_items[3] = _react2["default"].createElement(
	            'td',
	            { key: '2', width: '200px' },
	            '\u8BFE\u7A0B\u540D\u79F0'
	          );
	          thead_items[4] = _react2["default"].createElement(
	            'td',
	            { key: '3', width: '200px' },
	            '\u6559\u5B66\u56E2\u961F\u6210\u5458'
	          );
	          break;
	      }
	      thead_items.push(_react2["default"].createElement(
	        'td',
	        { key: thead_items.length + 1, width: '50px' },
	        '\u64CD\u4F5C'
	      ));
	      thead_items.push(_react2["default"].createElement('td', { key: 'w2', width: '5px' }));
	      return thead_items;
	    }
	  }, {
	    key: 'face_serch',
	    value: function face_serch(p) {
	      var that = this;
	      ajax({
	        url: courseCenter.host + 'CourseMatainMsg',
	        data: {
	          type: that.props.rank,
	          unifyCode: BluMUI.result.user_id,
	          page: p,
	          count: 5
	        },
	        success: function success(gets) {
	          var list = JSON.parse(gets);
	          console.log(list, '___68');
	          that.setState({
	            lists: list.data.courseList,
	            page: p
	          });
	        }
	      });
	    }

	    //绑定翻页按钮事件（提出来是因为原来需要初始化和重渲染后再绑定）

	  }, {
	    key: 'bind_pages',
	    value: function bind_pages() {
	      var that = this;
	      var fanye_out = this.refs.fanye_out;
	      // console.log(fanye_out)
	      if (fanye_out.refs.popup_fanye) {
	        var fanye_bar = fanye_out.refs.popup_fanye.children;
	        var yema = fanye_bar.length;
	        for (var j = 0; j < yema; j++) {
	          if (fanye_bar[j].innerText != '...') {
	            fanye_bar[j].onclick = function () {
	              var click_page = +this.innerText;
	              console.log("aaa", click_page);
	              that.state.page = click_page;
	              that.face_serch(click_page);
	            };
	          }
	        }
	      }

	      //搜索的前翻和后翻
	      if (fanye_out.refs.next && fanye_out.refs.pre) {
	        fanye_out.refs.next.onclick = function () {
	          that.face_serch(that.state.page + 1 > that.props.totalPages ? that.props.totalPages : that.state.page + 1);
	        };
	        fanye_out.refs.pre.onclick = function () {
	          that.face_serch(that.state.page - 1 < 1 ? 1 : that.state.page - 1);
	        };
	      }
	    }

	    //组件加载后执行的事件

	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.bind_pages();
	    }

	    //组件重渲染后执行的事件

	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      this.bind_pages();
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      console.log(nextProps, "___nextprops");
	      this.setState({
	        lists: nextProps.lists,
	        page: nextProps.page
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      console.log(this.state.lists, "___124");
	      console.log(this.props.lists, "___123");
	      return _react2["default"].createElement(
	        'div',
	        null,
	        _react2["default"].createElement(
	          'table',
	          null,
	          _react2["default"].createElement(
	            'thead',
	            null,
	            _react2["default"].createElement(
	              'tr',
	              null,
	              this.thead_create()
	            )
	          ),
	          _react2["default"].createElement(BlueMUI_CreateTbody, { Lists: this.state.lists, Rank: this.props.rank, page: this.state.page })
	        ),
	        _react2["default"].createElement(BlueMUI_CreateFanye, { pages: this.props.totalPages, page: this.state.page, ref: 'fanye_out' })
	      );
	    }
	  }]);

	  return BlueMUI_CreateThead;
	}(_react2["default"].Component);

	//创建表身


	var BlueMUI_CreateTbody = function (_React$Component2) {
	  _inherits(BlueMUI_CreateTbody, _React$Component2);

	  function BlueMUI_CreateTbody(props) {
	    _classCallCheck(this, BlueMUI_CreateTbody);

	    var _this2 = _possibleConstructorReturn(this, (BlueMUI_CreateTbody.__proto__ || Object.getPrototypeOf(BlueMUI_CreateTbody)).call(this, props));

	    _this2.create_list = _this2.create_list.bind(_this2);
	    // this.state={
	    //   Lists:this.props.Lists
	    // }
	    return _this2;
	  }
	  //修改该组件的State（打算）

	  _createClass(BlueMUI_CreateTbody, [{
	    key: 'option',
	    value: function option(data, event) {
	      console.log(this.props.Rank, "___147");
	      switch (this.props.Rank) {
	        case 1:
	          _reactDom2["default"].render(_react2["default"].createElement(BlueMUI_CreatePopup, { Rank: this.props.Rank, Master: true, Title: '\u9009\u62E9\u6559\u7814\u5BA4\u4E3B\u4EFB', JYS: data.Jysh }), document.getElementById('popup'));
	          break;
	        case 2:
	          var that = this;
	          console.log(data, '___157');
	          //获取教学团队成员信息
	          // document.getElementById('body_head').style.display='none';
	          _reactDom2["default"].render(_react2["default"].createElement(BlueMUI_CreateAdding, { Rank: that.props.Rank, Master: data.Master, Teachers: data.Teachers, Kcbh: data.Kcbh, Kcmc: data.Kcmc }), document.getElementById('list'));
	          break;
	        case 3:
	          // console.log(data)
	          // document.getElementById('body_head').style.display='none';
	          _reactDom2["default"].render(_react2["default"].createElement(BlueMUI_CreateAdding, { Teachers: data.Teachers, Rank: this.props.Rank, Kcbh: data.Kcbh, Kcmc: data.Kcmc }), document.getElementById('list'));
	          break;
	      }
	      //将事件对象用来阻止链接跳转
	      arguments[arguments.length - 1].preventDefault();
	    }
	  }, {
	    key: 'create_list',
	    value: function create_list(all_lists) {
	      var j = 0;
	      console.log(this.props.page, '___178');
	      var lists = [];
	      var teachers = []; //教师数组
	      var end = all_lists.length;
	      switch (this.props.Rank) {
	        case 1:
	          for (var i = 0; i < end; i++) {
	            lists.push(_react2["default"].createElement(
	              'tr',
	              { key: i },
	              _react2["default"].createElement('td', null),
	              _react2["default"].createElement(
	                'td',
	                null,
	                i + 1 + 5 * (this.props.page - 1)
	              ),
	              _react2["default"].createElement(
	                'td',
	                null,
	                all_lists[i].kkxymc
	              ),
	              _react2["default"].createElement(
	                'td',
	                null,
	                all_lists[i].jysmc
	              ),
	              _react2["default"].createElement(
	                'td',
	                null,
	                all_lists[i].zrxm || ""
	              ),
	              _react2["default"].createElement(
	                'td',
	                null,
	                _react2["default"].createElement(
	                  'a',
	                  { href: '#', onClick: this.option.bind(this, { Jysh: all_lists[i].jysh, Rank: this.props.Rank }) },
	                  all_lists[i].zrxm ? "修改" : "添加"
	                )
	              ),
	              _react2["default"].createElement('td', null)
	            ));
	            lists.push(_react2["default"].createElement('tr', { className: 'tr_line', key: 'line-' + i }));
	          }
	          break;
	        case 2:
	          j = 0;
	          for (var _i = 0; _i < end; _i++) {
	            teachers = [];
	            // console.log(all_lists[i],'___204')
	            all_lists[_i].teacher.map(function (e) {
	              teachers.push(_react2["default"].createElement(
	                'span',
	                { key: j++ },
	                e.xm
	              ));
	            });

	            lists.push(_react2["default"].createElement(
	              'tr',
	              { key: _i },
	              _react2["default"].createElement('td', null),
	              _react2["default"].createElement(
	                'td',
	                null,
	                _i + 1 + 5 * (this.props.page - 1)
	              ),
	              _react2["default"].createElement(
	                'td',
	                null,
	                all_lists[_i].kcbh
	              ),
	              _react2["default"].createElement(
	                'td',
	                null,
	                all_lists[_i].kcmc
	              ),
	              _react2["default"].createElement(
	                'td',
	                null,
	                all_lists[_i].fzrxm
	              ),
	              _react2["default"].createElement(
	                'td',
	                null,
	                teachers
	              ),
	              _react2["default"].createElement(
	                'td',
	                null,
	                _react2["default"].createElement(
	                  'a',
	                  { href: '#', onClick: this.option.bind(this, {
	                      Teachers: all_lists[_i].teacher,
	                      Master: all_lists[_i].fzrxm ? { xm: all_lists[_i].fzrxm, sfrzh: all_lists[_i].fzrsfrzh } : '',
	                      Kcbh: all_lists[_i].kcbh,
	                      Kcmc: all_lists[_i].kcmc
	                    }) },
	                  '\u7F16\u8F91'
	                )
	              ),
	              _react2["default"].createElement('td', null)
	            ));
	            lists.push(_react2["default"].createElement('tr', { className: 'tr_line', key: 'line-' + _i }));
	          }
	          break;
	        case 3:
	          j = 0;
	          //过滤掉重复的教师信息
	          for (var _i2 = 0; _i2 < end; _i2++) {
	            teachers = [];
	            if (all_lists[_i2].teacher) {
	              all_lists[_i2].teacher.map(function (e) {
	                teachers.push(_react2["default"].createElement(
	                  'span',
	                  { key: j++ },
	                  e.xm
	                ));
	              });
	            } else {
	              teachers = [];
	            }
	            lists.push(_react2["default"].createElement(
	              'tr',
	              { key: _i2 },
	              _react2["default"].createElement('td', null),
	              _react2["default"].createElement(
	                'td',
	                null,
	                _i2 + 1 + 5 * (this.props.page - 1)
	              ),
	              _react2["default"].createElement(
	                'td',
	                null,
	                all_lists[_i2].kcbh
	              ),
	              _react2["default"].createElement(
	                'td',
	                null,
	                all_lists[_i2].kcmc
	              ),
	              _react2["default"].createElement(
	                'td',
	                null,
	                teachers
	              ),
	              _react2["default"].createElement(
	                'td',
	                null,
	                _react2["default"].createElement(
	                  'a',
	                  { href: '#', onClick: this.option.bind(this, { Teachers: all_lists[_i2].teacher, Kcbh: all_lists[_i2].kcbh, Kcmc: all_lists[_i2].kcmc }) },
	                  '\u7F16\u8F91'
	                )
	              ),
	              _react2["default"].createElement('td', null)
	            ));
	            lists.push(_react2["default"].createElement('tr', { className: 'tr_line', key: 'line-' + _i2 }));
	            teachers = [];
	          }
	          break;
	      }
	      return lists;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      console.log(this.props.Rank, '___253');
	      return _react2["default"].createElement(
	        'tbody',
	        null,
	        this.create_list(this.props.Lists)
	      );
	    }
	  }]);

	  return BlueMUI_CreateTbody;
	}(_react2["default"].Component);

	//创建弹出层层


	var BlueMUI_CreatePopup = function (_React$Component3) {
	  _inherits(BlueMUI_CreatePopup, _React$Component3);

	  function BlueMUI_CreatePopup(props) {
	    _classCallCheck(this, BlueMUI_CreatePopup);

	    var _this3 = _possibleConstructorReturn(this, (BlueMUI_CreatePopup.__proto__ || Object.getPrototypeOf(BlueMUI_CreatePopup)).call(this, props));

	    _this3.popup_serch = _this3.popup_serch.bind(_this3);
	    _this3.popup = document.getElementById('popup');
	    _this3.choose_teachers = [];
	    _this3.serch_name = "";
	    _this3.teacher_names = {};
	    //master
	    _this3.Master = "";
	    //用于搜索用的state
	    _this3.state = {
	      teachers: [],
	      page: 1,
	      pages: 0
	    };
	    return _this3;
	  }

	  _createClass(BlueMUI_CreatePopup, [{
	    key: 'create_popup_top',
	    value: function create_popup_top() {
	      return _react2["default"].createElement(
	        'div',
	        { id: 'top' },
	        _react2["default"].createElement(
	          'span',
	          null,
	          this.props.Title
	        ),
	        _react2["default"].createElement(
	          'span',
	          { id: 'popup_close', ref: 'close' },
	          'X'
	        )
	      );
	    }
	  }, {
	    key: 'create_popup_serch',
	    value: function create_popup_serch() {
	      return _react2["default"].createElement(
	        'div',
	        { id: 'serch' },
	        _react2["default"].createElement(
	          'span',
	          { id: 'popup_left' },
	          '\u67E5\u627E\uFF08\u59D3\u540D\uFF09'
	        ),
	        _react2["default"].createElement('input', { type: 'text', id: 'popup_serch', placeholder: '\u8BF7\u8F93\u5165\u5173\u952E\u5B57\u2026\u2026', ref: 'serch_value' }),
	        _react2["default"].createElement(
	          'span',
	          { id: 'popup_serch_button', ref: 'serch' },
	          '\u641C \xA0\u7D22'
	        )
	      );
	    }
	  }, {
	    key: 'create_popup_thead',
	    value: function create_popup_thead() {
	      return _react2["default"].createElement(
	        'thead',
	        null,
	        _react2["default"].createElement(
	          'tr',
	          null,
	          _react2["default"].createElement('td', { width: '34px' }),
	          _react2["default"].createElement(
	            'td',
	            { width: '45px', className: 'input' },
	            _react2["default"].createElement('input', { type: 'checkbox', ref: 'popup_allcheck' })
	          ),
	          _react2["default"].createElement(
	            'td',
	            { width: '184px' },
	            '\u5355\u4F4D'
	          ),
	          _react2["default"].createElement(
	            'td',
	            { width: '130px' },
	            '\u59D3\u540D'
	          ),
	          _react2["default"].createElement(
	            'td',
	            { width: '99px' },
	            '\u7EDF\u4E00\u8BA4\u8BC1\u7801'
	          )
	        )
	      );
	    }
	  }, {
	    key: 'create_popup_tbody',
	    value: function create_popup_tbody() {
	      var lists = [];
	      var end = this.state.teachers.length;
	      for (var i = 0; i < end; i++) {
	        // console.log(this.state.teachers[i],"___312")
	        lists.push(_react2["default"].createElement(
	          'tr',
	          { key: this.state.teachers[i].sfrzh },
	          _react2["default"].createElement(
	            'td',
	            null,
	            i + 1 + 10 * (this.state.page - 1)
	          ),
	          _react2["default"].createElement(
	            'td',
	            null,
	            _react2["default"].createElement('input', { type: 'checkbox', value: JSON.stringify(this.state.teachers[i]), id: this.state.teachers[i].sfrzh })
	          ),
	          _react2["default"].createElement(
	            'td',
	            null,
	            this.state.teachers[i].xymc
	          ),
	          _react2["default"].createElement(
	            'td',
	            null,
	            this.state.teachers[i].xm
	          ),
	          _react2["default"].createElement(
	            'td',
	            null,
	            this.state.teachers[i].sfrzh
	          )
	        ));
	      }
	      return _react2["default"].createElement(
	        'tbody',
	        { ref: 'popup_tbody' },
	        lists
	      );
	    }
	  }, {
	    key: 'create_popup_option',
	    value: function create_popup_option() {
	      return _react2["default"].createElement(
	        'div',
	        { id: 'popup_option' },
	        _react2["default"].createElement(
	          'span',
	          { className: 'blue_btn', id: 'popup_ok', ref: 'OK' },
	          '\u786E\u5B9A'
	        ),
	        _react2["default"].createElement(
	          'span',
	          { className: 'white_btn', id: 'popup_return', ref: 'back' },
	          '\u8FD4\u56DE'
	        )
	      );
	    }

	    //搜索

	  }, {
	    key: 'popup_serch',
	    value: function popup_serch(p, start) {
	      console.log(start, "___333");
	      //每次发生ajax的时候清空候选数据与checkbox
	      this.refs.popup_allcheck.checked = false;
	      var inputs = this.refs.popup_tbody.getElementsByTagName('input');
	      this.Master = "";
	      this.teacher_names = {};
	      this.choose_teachers = [];

	      var end = inputs.length;
	      for (var i = 0; i < end; i++) {
	        inputs[i].checked = false;
	      }
	      var that = this;
	      ajax({
	        url: courseCenter.host + 'searchTeacherByName',
	        data: {
	          name: start || that.serch_name,
	          page: p,
	          count: 10
	        },
	        success: function success(gets) {
	          var list = JSON.parse(gets);
	          // console.log(list,"___436")
	          if (list.data) {
	            that.setState({
	              teachers: list.data.teacherList,
	              pages: list.data.totalPages,
	              page: p
	            });
	          } else {
	            that.setState({
	              teachers: [],
	              page: 1,
	              pages: 0
	            });
	          }
	        }
	      });
	    }

	    //组件渲染完成后会执行的函数，可以在里面进行手动js事件绑定
	    //手动绑定可以避免react自己的事件绑定不能阻止冒泡的坑
	    //因为react的事件全部代理在document上面的

	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var that = this;
	      console.log("MOUNT");
	      var hide_popup = function hide_popup() {
	        that.popup.style.display = "none";
	        _reactDom2["default"].unmountComponentAtNode(document.getElementById('popup'));
	        // document.getElementById('popup').innerHTML="";
	        //清空搜索栏
	        // that.refs.serch_value.value="";
	      };
	      //单击弹出窗后面的背景隐藏弹出层
	      this.popup.onclick = hide_popup;
	      //单击关闭按钮隐藏弹出层
	      this.refs.close.onclick = hide_popup;
	      //单击弹出窗的返回按钮隐藏弹出层
	      this.refs.back.onclick = hide_popup;
	      //阻止弹出窗body的单击事件冒泡
	      document.getElementById('popup_body').onclick = function (e) {
	        e.stopPropagation();
	      };

	      //搜索按钮单击
	      this.refs.serch.onclick = function () {
	        that.serch_name = that.refs.serch_value.value;
	        that.popup_serch(1);
	      };

	      //单击确定按钮
	      // this.refs.OK.onclick=hide_popup;
	      this.popup_serch(1, 'init');
	    }

	    //重新渲染后的执行内容

	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      var that = this;
	      console.log("RE");

	      //单击确认
	      this.refs.OK.onclick = function () {
	        if (that.refs.popup_tbody.children.length > 0) {
	          //确认请求
	          if (that.props.Rank == 1 && that.Master != "") {
	            //权限1
	            ajax({
	              url: courseCenter.host + 'updateTeachingOfficeLeader',
	              data: {
	                jysh: that.props.JYS,
	                leaderUnifyCode: that.Master.sfrzh,
	                unifyCode: BluMUI.result.user_id
	              },
	              success: function success() {
	                that.ajax({
	                  url: courseCenter.host + 'CourseMatainMsg',
	                  data: {
	                    type: 1,
	                    unifyCode: BluMUI.result.user_id,
	                    page: BluMUI.result.Title.state.page,
	                    count: 5
	                  },
	                  success: function success(gets) {
	                    var lists = JSON.parse(gets).data.courseList;
	                    BluMUI.result.Title.setState({
	                      lists: lists,
	                      page: BluMUI.result.Title.state.page
	                    });
	                    that.state = {
	                      teachers: [],
	                      pages: 0,
	                      page: 1
	                    };
	                  }
	                });
	              }
	            });
	          } else if (that.props.Rank == 2) {
	            //权限2的确认操作
	            if (that.props.Master) {
	              that.props.callback({ master: that.Master });
	            } else {
	              (function () {
	                var Teachers = [];
	                that.choose_teachers.map(function (e) {
	                  Teachers.push({
	                    sfrzh: e,
	                    xm: that.teacher_names[e]
	                  });
	                });
	                that.props.callback(Teachers);
	              })();
	            }
	          } else if (that.props.Rank == 3) {
	            (function () {
	              var Teachers = [];
	              that.choose_teachers.map(function (e) {
	                console.log(e, "___465");
	                Teachers.push({
	                  sfrzh: e,
	                  xm: that.teacher_names[e]
	                });
	              });
	              console.log(Teachers, "RANK=3,471");
	              that.props.callback(Teachers);
	            })();
	          }
	        }
	        //清空搜索栏
	        // that.refs.serch_value.value="";
	        that.popup.style.display = "none";
	        _reactDom2["default"].unmountComponentAtNode(document.getElementById('popup'));
	      };

	      //全部打钩
	      var inputs = that.refs.popup_tbody.getElementsByTagName('input');
	      var end = inputs.length;
	      console.log("end", end);
	      if (!this.props.Master) {
	        //不是权限 1或者权限 2的 Master
	        this.refs.popup_allcheck.onchange = function () {
	          for (var i = 0; i < end; i++) {
	            inputs[i].checked = this.checked;
	            inputs[i].onchange(0);
	          }
	        };
	      }

	      //单个打钩
	      for (var j = 0; j < end; j++) {
	        inputs[j].onchange = function (a) {
	          console.log("change!496___", a);
	          if (a) {
	            //取消“全部打钩”的钩
	            that.refs.popup_allcheck.checked = false;
	          }
	          if ((that.props.Rank == 1 || that.props.Rank == 2) && that.props.Master) {
	            //权限 1进入
	            if (this.checked) {
	              console.log("___value", JSON.parse(this.value));
	              that.Master = JSON.parse(this.value);
	              for (var k = 0; k < end; k++) {
	                inputs[k].checked = false;
	                this.checked = true;
	              }
	            } else {
	              that.Master = "";
	            }
	          } else if ((that.props.Rank == 2 || that.props.Rank == 3) && !that.props.Master) {
	            //权限2************************************要修改
	            console.log("权限2——教师");
	            if (this.checked) {
	              that.choose_teachers.push(this.id);
	              that.teacher_names[this.id] = JSON.parse(this.value).xm;
	            } else {
	              var index = that.choose_teachers.indexOf(this.id);
	              if (index > -1) {
	                that.choose_teachers.splice(index, 1);
	              }
	              delete that.teacher_names[this.id];
	            }
	          }
	        };
	      }

	      //fanye
	      var fanye_in = this.refs.fanye_in;
	      // console.log(fanye_in)
	      if (fanye_in.refs.popup_fanye) {
	        var fanye_bar = fanye_in.refs.popup_fanye.children;
	        var yema = fanye_bar.length;
	        for (var _j = 0; _j < yema; _j++) {
	          if (fanye_bar[_j].innerText != '...') {
	            fanye_bar[_j].onclick = function (e) {
	              var click_page = +e.target.innerText;
	              that.state.page = click_page;
	              that.popup_serch(click_page, that.serch_name || 'init');
	            };
	          }
	        }
	      }

	      //搜索的前翻和后翻
	      if (fanye_in.refs.next && fanye_in.refs.pre) {
	        fanye_in.refs.next.onclick = function () {
	          that.popup_serch(that.state.page + 1 > that.state.pages ? that.state.pages : that.state.page + 1, that.serch_name || 'inti');
	        };
	        fanye_in.refs.pre.onclick = function () {
	          that.popup_serch(that.state.page - 1 < 1 ? 1 : that.state.page - 1, that.serch_name || 'init');
	        };
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      this.popup.style.display = "block";
	      return _react2["default"].createElement(
	        'div',
	        { id: 'popup_body' },
	        this.create_popup_top(),
	        this.create_popup_serch(),
	        _react2["default"].createElement(
	          'table',
	          { id: 'serch_table' },
	          this.create_popup_thead(),
	          this.create_popup_tbody()
	        ),
	        _react2["default"].createElement(BlueMUI_CreateFanye, { page: this.state.page, pages: this.state.pages, ref: 'fanye_in' }),
	        this.create_popup_option()
	      );
	    }
	  }]);

	  return BlueMUI_CreatePopup;
	}(_react2["default"].Component);

	var BlueMUI_CreateAdding = function (_React$Component4) {
	  _inherits(BlueMUI_CreateAdding, _React$Component4);

	  function BlueMUI_CreateAdding(props) {
	    _classCallCheck(this, BlueMUI_CreateAdding);

	    var _this4 = _possibleConstructorReturn(this, (BlueMUI_CreateAdding.__proto__ || Object.getPrototypeOf(BlueMUI_CreateAdding)).call(this, props));

	    console.log(_this4.props.Teachers, '___577');
	    _this4.del_teacher = _this4.del_teacher.bind(_this4);
	    _this4.save_adding = _this4.save_adding.bind(_this4);
	    _this4.back = _this4.back.bind(_this4);
	    _this4.state = {
	      teachers: _this4.props.Teachers || [],
	      master: _this4.props.Master
	    };
	    return _this4;
	  }

	  _createClass(BlueMUI_CreateAdding, [{
	    key: 'del_teacher',
	    value: function del_teacher(a) {
	      var that = this;

	      if (typeof a == "number") {
	        var teacher_cache = this.state.teachers;
	        teacher_cache.splice(a, 1);
	        this.setState({ teachers: teacher_cache });
	      } else {
	        console.log("master");
	        this.setState({ master: "" }, function () {
	          console.log(that.state);
	        });
	      }
	    }
	  }, {
	    key: 'back',
	    value: function back() {
	      var that = this;
	      console.log(this.props, '602');
	      ajax({
	        url: courseCenter.host + 'CourseMatainMsg',
	        data: {
	          type: that.props.Rank,
	          unifyCode: BluMUI.result.user_id,
	          page: BluMUI.result.Title.state.page,
	          count: 5
	        },
	        success: function success(gets) {
	          document.getElementById('body_head').style.display = 'block';
	          var data = JSON.parse(gets);
	          BluMUI.create({
	            id: 'Title',
	            rank: that.props.Rank,
	            page: BluMUI.result.Title.state.page,
	            lists: data.data.courseList,
	            totalPages: data.data.totalPages
	          }, 'CreateTableTitle', document.getElementById('list'));
	        }
	      });
	    }
	  }, {
	    key: 'save_adding',
	    value: function save_adding() {
	      var that = this;

	      console.log(this.state, '___629');
	      if (!this.state.master && this.props.Rank == 2) {
	        alert("请添加负责人！");
	        return;
	      }
	      if (this.props.Rank == 3) {
	        var teacher_codes = "";
	        this.state.teachers.map(function (e) {
	          teacher_codes += e.sfrzh + ",";
	        });
	        //去掉字符串末尾的","
	        teacher_codes = teacher_codes.substring(0, teacher_codes.length - 1);
	        ajax({
	          url: courseCenter.host + 'updateTeachingTeam',
	          data: {
	            kcbh: that.props.Kcbh,
	            kcmc: that.props.Kcmc,
	            unifyCode: BluMUI.result.Title.props.user,
	            unifyCodes: teacher_codes
	          },
	          success: function success(gets) {
	            if (JSON.parse(gets).meta.msg == 'success') {
	              ajax({
	                url: courseCenter.host + 'CourseMatainMsg',
	                data: {
	                  type: 3,
	                  unifyCode: BluMUI.result.user_id,
	                  // page:BluMUI.result.Title.state.page,
	                  page: 1,
	                  count: 5
	                },
	                success: function success(gets) {
	                  document.getElementById('body_head').style.display = 'block';
	                  var data = JSON.parse(gets);
	                  console.log('___665', data);
	                  BluMUI.create({
	                    id: 'Title',
	                    rank: 3,
	                    // page:BluMUI.result.Title.state.page,
	                    page: 1,
	                    lists: data.data.courseList,
	                    totalPages: data.data.totalPages
	                  }, 'CreateTableTitle', document.getElementById('list'));
	                }
	              });
	            }
	          }
	        });
	      } else if (this.props.Rank == 2) {
	        var _teacher_codes = "";
	        this.state.teachers.map(function (e) {
	          _teacher_codes += e.sfrzh + ",";
	        });
	        //去掉字符串末尾的","
	        _teacher_codes = _teacher_codes.substring(0, _teacher_codes.length - 1);
	        ajax({
	          url: courseCenter.host + 'updateCoursePrincipal',
	          data: {
	            kcbh: that.props.Kcbh,
	            kcmc: that.props.Kcmc,
	            unifyCode: BluMUI.result.user_id,
	            unifyCodes: _teacher_codes,
	            principalUnifyCode: that.state.master.sfrzh
	          },
	          success: function success(gets) {
	            if (JSON.parse(gets).meta.msg == 'success') {
	              ajax({
	                url: courseCenter.host + 'CourseMatainMsg',
	                data: {
	                  type: 2,
	                  unifyCode: BluMUI.result.user_id,
	                  // page:BluMUI.result.Title.state.page,
	                  page: 1,
	                  count: 5
	                },
	                success: function success(gets) {
	                  document.getElementById('body_head').style.display = 'block';
	                  var data = JSON.parse(gets);
	                  console.log(data, '___706');
	                  BluMUI.create({
	                    id: 'Title',
	                    rank: 2,
	                    // page:BluMUI.result.Title.state.page,
	                    page: 1,
	                    lists: data.data.courseList,
	                    totalPages: data.data.totalPages
	                  }, 'CreateTableTitle', document.getElementById('list'));
	                }
	              });
	            }
	          }
	        });
	      }
	    }
	  }, {
	    key: 'create_fuzeren',
	    value: function create_fuzeren() {
	      var fuzeren = void 0;
	      var mst = void 0;
	      console.log(this.props, '___695');

	      if (this.props.Rank == 2) {
	        if (this.state.master.xm) {
	          mst = _react2["default"].createElement(
	            'div',
	            { id: 'master' },
	            this.state.master && _react2["default"].createElement(
	              'span',
	              { className: 'blue_btn', key: this.state.master.sfrzh },
	              this.state.master.xm,
	              _react2["default"].createElement('img', { src: '../../imgs/public/teacher_del.png', onClick: this.del_teacher })
	            )
	          );
	        }
	        fuzeren = _react2["default"].createElement(
	          'div',
	          { id: 'fuzeren' },
	          _react2["default"].createElement(
	            'div',
	            { className: 'list_left' },
	            _react2["default"].createElement('img', { src: '../../imgs/public/red_star.png' }),
	            _react2["default"].createElement(
	              'span',
	              null,
	              '\xA0\u8BFE\u7A0B\u8D1F\u8D23\u4EBA'
	            )
	          ),
	          _react2["default"].createElement(
	            'div',
	            { className: 'list_right' },
	            mst,
	            _react2["default"].createElement(
	              'span',
	              { className: 'blue_btn', ref: 'adding_fuzeren' },
	              (this.state.master.xm ? "修改" : "添加") + "负责人"
	            )
	          )
	        );
	      } else {
	        fuzeren = null;
	      }
	      return fuzeren;
	    }
	  }, {
	    key: 'create_adding_left',
	    value: function create_adding_left() {
	      return _react2["default"].createElement(
	        'div',
	        { className: 'list_left' },
	        _react2["default"].createElement(
	          'span',
	          null,
	          '\u6559\u5B66\u56E2\u961F'
	        )
	      );
	    }
	  }, {
	    key: 'create_adding_right',
	    value: function create_adding_right() {
	      var teachers = [];
	      var end = this.state.teachers.length;
	      console.log(this.state, "adding_teachers_state___345");
	      for (var i = 0; i < end; i++) {
	        teachers.push(_react2["default"].createElement(
	          'span',
	          { className: 'blue_btn', key: this.state.teachers[i].sfrzh },
	          this.state.teachers[i].xm,
	          _react2["default"].createElement('img', { src: '../../imgs/public/teacher_del.png', onClick: this.del_teacher.bind(this, i) })
	        ));
	      }

	      return _react2["default"].createElement(
	        'div',
	        { className: 'list_right' },
	        _react2["default"].createElement(
	          'div',
	          { id: 'teachers' },
	          teachers
	        ),
	        _react2["default"].createElement(
	          'span',
	          { className: 'blue_btn', ref: 'adding_teachers' },
	          '\u6DFB\u52A0\u6388\u8BFE\u6559\u5E08'
	        ),
	        _react2["default"].createElement('br', null),
	        _react2["default"].createElement(
	          'span',
	          { className: 'caozuo', id: 'Adding_baocun', ref: 'save_adding', onClick: this.save_adding },
	          '\u4FDD\u5B58'
	        ),
	        _react2["default"].createElement(
	          'span',
	          { className: 'caozuo', id: 'Adding_fanhui', ref: 'back', onClick: this.back },
	          '\u8FD4\u56DE'
	        )
	      );
	    }

	    //组件第一次渲染后执行的内容

	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var that = this;

	      var change = function change(dat) {
	        that.setState(dat);
	      };
	      var add_teacher = function add_teacher(tea) {
	        console.log(that.state.teachers, "___639");

	        var newTeachers = that.state.teachers.concat(tea);
	        var result = [];
	        for (var i = 0; i < newTeachers.length; i++) {
	          var flag = 0;
	          for (var j = 0; j < result.length; j++) {
	            if (newTeachers[i].sfrzh == result[j].sfrzh) {
	              flag++;
	            }
	          }
	          if (flag == 0) {
	            result.push(newTeachers[i]);
	          }
	        }
	        // console.log("result:_",result);
	        that.setState({ teachers: result });
	      };

	      if (this.refs.adding_fuzeren) {
	        //存在按钮的时候才能绑定事件
	        this.refs.adding_fuzeren.onclick = function () {
	          _reactDom2["default"].render(_react2["default"].createElement(BlueMUI_CreatePopup, { Rank: that.props.Rank, Master: true, Title: '\u9009\u62E9\u6559\u5E08', callback: change }), document.getElementById('popup'));
	        };
	      }

	      this.refs.adding_teachers.onclick = function () {
	        _reactDom2["default"].render(_react2["default"].createElement(BlueMUI_CreatePopup, { Rank: that.props.Rank, Master: false, Title: '\u9009\u62E9\u6559\u5E08', callback: add_teacher }), document.getElementById('popup'));
	      };
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2["default"].createElement(
	        'div',
	        { id: 'adding' },
	        this.create_fuzeren(),
	        this.create_adding_left(),
	        this.create_adding_right()
	      );
	    }
	  }]);

	  return BlueMUI_CreateAdding;
	}(_react2["default"].Component);

	var BlueMUI_CreateFanye = function (_React$Component5) {
	  _inherits(BlueMUI_CreateFanye, _React$Component5);

	  function BlueMUI_CreateFanye(props) {
	    _classCallCheck(this, BlueMUI_CreateFanye);

	    return _possibleConstructorReturn(this, (BlueMUI_CreateFanye.__proto__ || Object.getPrototypeOf(BlueMUI_CreateFanye)).call(this, props));
	  }

	  _createClass(BlueMUI_CreateFanye, [{
	    key: 'create_popup_fanye',
	    value: function create_popup_fanye() {
	      // console.log(this.state,"___376")
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
	      if (this.props.pages == 0) {
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
	            { key: i, style: style },
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
	              { key: j, style: style },
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
	              { key: k, style: style },
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
	              { key: l, style: style },
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
	      if (this.props.page == 1) {
	        if (this.props.pages == 1) {
	          fanye = [_react2["default"].createElement(
	            'li',
	            { key: 1, style: style_on },
	            1
	          )];
	        } else {
	          fanye.unshift(_react2["default"].createElement(
	            'li',
	            { key: 1, style: style_on },
	            1
	          ));
	          fanye.push(_react2["default"].createElement(
	            'li',
	            { key: this.props.pages },
	            this.props.pages
	          ));
	        }
	      } else if (this.props.page == this.props.pages) {
	        fanye.unshift(_react2["default"].createElement(
	          'li',
	          { key: 1 },
	          1
	        ));
	        fanye.push(_react2["default"].createElement(
	          'li',
	          { key: this.props.pages, style: style_on },
	          this.props.pages
	        ));
	      } else {
	        fanye.unshift(_react2["default"].createElement(
	          'li',
	          { key: 1 },
	          1
	        ));
	        fanye.push(_react2["default"].createElement(
	          'li',
	          { key: this.props.pages },
	          this.props.pages
	        ));
	      }
	      return _react2["default"].createElement(
	        'div',
	        { className: 'fanye' },
	        _react2["default"].createElement(
	          'div',
	          { className: 'popup_fanye_pre', ref: 'pre' },
	          _react2["default"].createElement('img', { src: '../../imgs/courseAudit/fanye_left.png' })
	        ),
	        _react2["default"].createElement(
	          'ul',
	          { ref: 'popup_fanye' },
	          fanye
	        ),
	        _react2["default"].createElement(
	          'div',
	          { className: 'popup_fanye_next', ref: 'next' },
	          _react2["default"].createElement('img', { src: '../../imgs/courseAudit/fanye_right.png' })
	        )
	      );
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return this.create_popup_fanye();
	    }
	  }]);

	  return BlueMUI_CreateFanye;
	}(_react2["default"].Component);

	//tab标签


	var BlueMUI_CreateTab = function (_React$Component6) {
	  _inherits(BlueMUI_CreateTab, _React$Component6);

	  function BlueMUI_CreateTab(props) {
	    _classCallCheck(this, BlueMUI_CreateTab);

	    var _this6 = _possibleConstructorReturn(this, (BlueMUI_CreateTab.__proto__ || Object.getPrototypeOf(BlueMUI_CreateTab)).call(this, props));

	    console.log(_this6.props, '___982');
	    _this6.state = {
	      Rank: +_this6.props.role[0].subModule
	    };
	    _this6.show_list = _this6.show_list.bind(_this6);
	    return _this6;
	  }

	  _createClass(BlueMUI_CreateTab, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this7 = this;

	      console.log(this.refs, "___940");
	      console.log(this.state.Rank, "___941");
	      //改变第一个tab标签的字体为粗体
	      this.refs['Rank-' + this.state.Rank].style.borderBottomColor = '#009361';
	      var that = this;

	      var _loop = function _loop(i) {
	        _this7.refs['Rank-' + _this7.props.role[i].subModule].onclick = function (e) {
	          // BluMUI.result.Title.setState({page:1});
	          that.setState({ Rank: +that.props.role[i].subModule }, tab_change);
	        };
	      };

	      for (var i = 0; i < this.props.role.length; i++) {
	        _loop(i);
	      }
	      // console.log("?????",BluMUI.result.Title)
	      // BluMUI.result.Title.setState({page:1});

	      var tab_change = function tab_change() {
	        that.props.role.map(function (e) {
	          that.refs['Rank-' + e.subModule].style.borderBottomColor = '#FFF';
	        });
	        that.refs['Rank-' + that.state.Rank].style.borderBottomColor = '#009361';
	      };

	      /*绑定搜素*/
	      document.getElementById('serch_btn').onclick = function () {
	        ajax({
	          url: courseCenter.host + 'CourseMatainMsg',
	          data: {
	            page: 1,
	            count: 5,
	            type: that.state.Rank,
	            unifyCode: BluMUI.result.user_id,
	            selectName: document.getElementById('jxtdss').value
	          },
	          success: function success(get) {
	            var datas = JSON.parse(get);
	            console.log("搜索:", datas);
	            BluMUI.result.Title.setState({
	              lists: datas.data.courseList,
	              page: 1
	            });
	          }
	        });
	      };
	    }
	  }, {
	    key: 'show_list',
	    value: function show_list() {
	      var that = this;
	      ajax({
	        url: courseCenter.host + 'CourseMatainMsg',
	        data: {
	          type: that.state.Rank,
	          unifyCode: BluMUI.result.user_id,
	          page: 1,
	          count: 5
	        },
	        success: function success(gets) {
	          var datas = JSON.parse(gets);
	          console.log('newajaxdatas', datas);
	          BluMUI.create({
	            id: 'Title',
	            rank: that.state.Rank,
	            lists: datas.data.courseList,
	            page: 1,
	            totalPages: datas.data.totalPages
	          }, 'CreateTableTitle', document.getElementById('list'));
	        }
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var tabs = [];
	      this.props.role.map(function (e) {
	        tabs.push(_react2["default"].createElement(
	          'li',
	          { key: e.cdxh, ref: 'Rank-' + e.subModule },
	          e.cdmc
	        ));
	        tabs.push(_react2["default"].createElement('li', { key: 'line-' + e.cdxh, className: 'center_line' }));
	      });
	      tabs.pop();
	      this.show_list();
	      return _react2["default"].createElement(
	        'ul',
	        { ref: 'tab' },
	        tabs
	      );
	    }
	  }]);

	  return BlueMUI_CreateTab;
	}(_react2["default"].Component);

	var BluMUI_M = {
	  CreateTableTitle: BlueMUI_CreateThead,
	  CreateTableBody: BlueMUI_CreateTbody,
	  CreateTab: BlueMUI_CreateTab
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