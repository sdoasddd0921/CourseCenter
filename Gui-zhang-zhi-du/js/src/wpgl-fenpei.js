import React from 'react';
import ReactDOM from 'react-dom';

const ajax=require('../libs/post_ajax.js');
const Fanye=require('../libs/fanye.js');
const _COUNT=10;

const SET = (key, value) => {
  sessionStorage.setItem("wpgl-fenpei-"+key, value);
  return value;
}

const GET = (key) => {
  return sessionStorage.getItem("wpgl-fenpei-"+key) || '';
}

var WPPCS=[];
// 每组输入的数据
var Nums=[];
// 每组输入数据的缓存
var NumsCache=[];
// 每一条分组的分组数量
var FenzuNum=(new Array(10)).fill(0);
// 每一条分组的专家数量
var ZhuanjiaNum=(new Array(10)).fill(0);
// 选中的条目
var Checks=[];

class Option extends React.Component {
  constructor(props) {
    super(props);
    this.search_cache={
      fzx: GET("fzx"),
      yfp: GET("yfp")||SET("yfp","true"),
      wfp: GET("wfp")||SET("wfp","true")
    };
    this.title=parseHash(window.location.href)['wppc'];
    console.log(this.title);
    this.state={
      TP: {
        page:1,
        pages:1,
        total:1
      },
      list: [],
      dangerHTML: ''
    };
  }

  _get_list(p) {
    let page=p||+GET("page")||1;

    ajax({
      url: courseCenter.host+"reviewAlloc",
      data: {
        unifyCode: getCookie("userId"),
        ID: parseHash(window.location.href).id,
        page: page,
        count: _COUNT,
        groupItem: this.search_cache.fzx,
        assignState: `[${this.search_cache.yfp==='true'}, ${this.search_cache.wfp==='true'}]`
      },
      success: (gets)=>{
        SET("page", page);
        let datas=JSON.parse(gets);
        console.log(datas.data.list)
        this.setState({
          TP: {
            page: page,
            pages: datas.data.totalPages,
            total:datas.data.total
          },
          list: datas.data.list
        });
      }
    });
  }

  search() {
    console.log("搜索")
    // this.search_cache.zjxm=SET("zjxm",this.state.zjxm);
    this._get_list(1);
  }

  create_fzx_select() {
    let change_fzx=(eve)=>{
      this.search_cache.fzx=SET('fzx', eve.target.value);
      this._get_list(1);
      console.log(eve.target.value)
    }
    console.log('fzx:',this.search_cache.fzx)
    return (
      <select
        name="fzx" 
        id="fenpei-fzx"
        ref={sel=>this.fzx_select=sel}
        defaultValue={this.search_cache.fzx}
        onChange={change_fzx}
        // dangerouslySetInnerHTML = {this.state.dangerHTML}
      >
        <option value=''>{this.search_cache.fzx||'请选择'}</option>
      </select>
    )
  }

  change_state(state,eve) {
    console.log(state,eve.target.checked)
    this.search_cache[state]=SET(state,eve.target.checked);
    this.search();
  }



  render() {
    return (
      <div id="wpgl_option">
        <div id="option">
          <div id="up">
            <button className="big_btn" ref={btn=>this.back=btn} >返回</button>
            <p>网评批次名称：{this.title}</p>
          </div>

          <div id="mid">
            <div id="big3">
              <button className="big_btn" ref={btn=>this.PLcx=btn}>批量撤销</button>
              <button className="big_btn" ref={btn=>this.PLfp=btn}>批量分配</button>
              <button className="big_btn" ref={btn=>this.fpjg=btn}>分配结果</button>
            </div>
            <div id="state">
              <span id="zj_state">专家课程分配状态：</span>
              <input 
                type="checkbox"
                id="yfp"
                defaultChecked={this.search_cache.yfp=="true"}
                onChange={this.change_state.bind(this,'yfp')}
                ref={check=>this.yfp=check}
              />
              <label htmlFor="yfp">
                <img src="../../imgs/public/hook.png"/>
              </label>
              <span>已分配</span>
              <input 
                type="checkbox" 
                id="wfp" 
                defaultChecked={this.search_cache.wfp=="true"}
                onChange={this.change_state.bind(this,'wfp')}
                ref={check=>this.wfp=check} 
              />
              <label htmlFor="wfp">
                <img src="../../imgs/public/hook.png"/>
              </label>
              <span>未分配</span>
            </div>
            <div id="searchs">
              <span id="fzx">分组项：</span>
              {this.create_fzx_select()}
            </div>
          </div>

          <div id="down">
            <div>
              <span>注：</span>
            </div>
            <div>
              <p>分组数量决定专家评价的课程数和课程评价的专家数。</p>
              <p>如专家15人，课程数30门，分组数量5，则每个专家评价的课程数=30/5=6，每门课程评价的专家数=15/5=3。</p>
            </div>
          </div>
        </div>
        <Lists ref="list" Lists={this.state.list} model={this.model} />
        <Fanye TP={this.state.TP} callback={(p)=>{this._get_list(p)}} />
      </div>
    );
  }

  componentDidMount() {
    // document.getElementById('fenpei-fzx').onchange=this.search.bind(this);
    console.log('moren:',this.fzx_select.value)
    // 填充分组项次下拉菜单
    ajax({
      url: courseCenter.host+"getFzxByWppc",
      data: {
        unifyCode: getCookie("userId"),
        reviewBatch: parseHash(window.location.href).wppc
      },
      success: (gets)=>{
        let datas=JSON.parse(gets);
        if(datas.meta.result!==100) {
          alert("下拉菜单获取失败！");
          return;
        }

        let ops=`<option value="">请选择</option>`
        JSON.parse(gets).data.forEach(
          (e, index)=>ops+=`<option data-reactid=".0.0.1.2.1.${index}" ${e.fzx===this.search_cache.fzx?'selected':null} value=${e.fzx}>${e.fzx}</option>`
        )
        this.fzx_select.innerHTML = ops;
        // this.setState({dangerHTML: ops});
      }
    });

    // 首次查询列表并填充
    this._get_list(1);

    // back button click options
    this.back.onclick=()=>{
      // clear tab sessionStorage
      let delet_tag_prefix=new RegExp(`^wpgl-fenpei-`);
      for(let end=window.sessionStorage.length;end>0;end--) {
        if(delet_tag_prefix.test(window.sessionStorage.key(end-1))) {
          sessionStorage.removeItem(window.sessionStorage.key(end-1));
        }
      }
      window.location.href='wpgl.html';
    };

    this.PLcx.onclick=()=>{
      Creat_popup('批量撤销', Nums.toString(), this.refs.list.lists.toString());
      document.getElementById('popup').style.display="block";
    }
    this.PLfp.onclick=()=>{
      Creat_popup('批量分配', Nums.toString(), this.refs.list.lists.toString());
      document.getElementById('popup').style.display="block";
    }
  }
}

class Lists extends React.Component {
  constructor(props) {
    super(props);
    this.lists=[];
  }

  create_head() {
    return (<thead>
      <tr>
        <td width="25px" className="td_head">
          <div></div>
        </td>
        <td width="20px" className="td_left_space"></td>
        <td width="10px">
          <input 
            type="checkbox" 
            id="allCheck" 
            ref={check=>this.allCheck=check} 
          />
          <label htmlFor="allCheck">
            <img src="../../imgs/public/hook.png"/>
          </label>
        </td>
        <td width="22%">专家分组项</td>
        <td width="22%">课程分组项</td>
        <td width="15%">分组数量</td>
        <td width="15%">状态</td>
        <td>操作</td>
        <td width="0px" className="td_right_space"></td>
        <td width="25px" className="td_end">
          <div></div>
        </td>
      </tr>
    </thead>);
  }

  option(type, id, num, groupItem, eve) {
    // if(eve) {
    //   eve.preventDefault();
    // } else {
    //   groupItem.preventDefault();
    // }

    console.log("option:",type);
    switch(type) {
      case '撤销':
        Creat_popup('撤销', num, id, groupItem);
        document.getElementById('popup').style.display="block";
        break;
      case '自动分配':
        Creat_popup('自动分配', num, id, groupItem);
        document.getElementById('popup').style.display="block";
        break;
      case 'showZJ':
        Creat_popup('showZJ', num, id);
        document.getElementById('popup').style.display="block";
        break;
      case 'showKC':
        console.log('ttttttt',eve)
        Creat_popup('showKC', num, id);
        document.getElementById('popup').style.display="block";
        break;
      default:
        break;
    }
  }

  check(id, num, index, eve) {
    if(eve.target.checked) {
      this.lists.push(id);
      Nums.push(num||0);
      Checks.push(index);
    } else {
      this.lists = this.lists.filter(
        e => e !== id
      );
      Nums = Nums.filter(
        e => e !== num
      );
      Checks = Checks.filter(
        e => e !== index
      );
    }
    this.allCheck.checked=false;
    console.log(Nums,this.lists)
  }

  // 输入数字检测
  input_num(index, eve) {
    if(/^\d*$/.test(eve.target.value)) {
      FenzuNum[index] = +eve.target.value;
      console.log('ok');
    } else {
      eve.target.value = '';
      return;
    }
  }
  // 离开输入框检测
  num_input_blur(index, eve) {
    if(eve.target.value==='') {
      eve.target.value=0;
      FenzuNum[index] = 0;
    }
  }

  create_body() {
    if(this.props.Lists.length===0) {
      return (
        <tbody>
          <tr>
            <td className="lefttd"></td>
            <td colSpan="7" style={{borderBottom: 'none'}}>
              <img id="err_img" src="../../imgs/public/error.png"/>
              <div>没有数据</div>
            </td>
            <td className="righttd"></td>
          </tr>
        </tbody>
      );
    }

    return (
      <tbody>
        {this.props.Lists.map(
          (list, index) => <tr key={index}>
            <td className="td_head">{()=>{
              // 储存每条信息里需要用到的数据
              FenzuNum[index]=list.groupNum;
              ZhuanjiaNum[index]=list.expertNum;
            }}</td>
            <td></td>
            <td>
              <input 
                type="checkbox" 
                id={'list-'+index}
                onChange = {this.check.bind(this, list.expertGroup, list.expertNum, index)}
              />
              <label htmlFor={'list-'+index}>
                <img src="../../imgs/public/hook.png"/>
              </label>
            </td>
            <td>
              <div className="show_fzx">
                <span onClick={this.option.bind(this,'showZJ',list.expertGroup,list.groupItem)}>{list.groupItem}</span>
                <br/>
                <span onClick={this.option.bind(this,'showZJ',list.expertGroup,list.groupItem)}>{`(${list.expertNum})`}</span>
              </div>
            </td>
            <td>
              <div className="show_fzx">
                <span onClick={this.option.bind(this,'showKC',list.expertGroup,list.groupItem)}>{list.groupItem}</span>
                <br/>
                <span onClick={this.option.bind(this,'showKC',list.expertGroup,list.groupItem)}>{`(${list.courseNum})`}</span>
              </div>
            </td>
            <td>
              <input type="text" disabled={list.state===1} onBlur={this.num_input_blur.bind(this,index)} onChange={this.input_num.bind(this,index)} defaultValue={list.groupNum}/>
            </td>
            <td>
              <span>{list.state===1?'已分配':'未分配'}</span>
            </td>
            <td>
            <div>
              {
                list.cz.map(
                  (e,innerIndex)=><span key={innerIndex} onClick={e.able?this.option.bind(this,e.name,list.expertGroup,Nums[index]||list.expertNum,list.groupItem):''} title={e.tips} className={e.able?'able':'disable'}>{e.name}</span>
                )
              }
              {
                list.cz[0].able?'': <div style={{fontSize:'12px',color:'red'}}>{list.cz[0].tips}</div>
              }
            </div>
            </td>
            <td></td>
            <td className="td_end"></td>
          </tr>
        )}
      </tbody>
    );
  }

  render() {
    return (<div id="wpgl_table">
      <table ref="table">
        {this.create_head()}
        {this.create_body()}
      </table>
    </div>);
  }

  componentDidMount() {
    this.allCheck.onclick=(eve)=>{
      if(eve.target.checked) {
        // 情况选中的项
        Checks=[];
        this.props.Lists.forEach(
          (e, index) => {
            // 填充被选中的项（所有）
            Checks.push(index);
            this.lists.push(e.expertGroup);
            Nums.push(NumsCache[index]||e.expertNum);
          }
        );
      } else {
        this.lists = [];
        Nums = [];
      }
      Array.from(document.querySelectorAll('tbody input[type="checkbox"]')).forEach(
        e=>e.checked = eve.target.checked
      );
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(window.frameElement) {
      window.frameElement.height=document.body.offsetHeight;
    }
  }
}

class Poplist extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      list: [],
      TP: {
        page: 0,
        pages: 0,
        total: 0
      }
    };
  }

  _get_list(p) {
    // ajax({
    //   url: courseCenter.host+'queryExpAllocDetail',
    //   data: {
    //     unifyCode: getCookie("userId"),
    //     ID: parseHash(window.location.href).id,
    //     expID: this.props.id,
    //     groupItem: this.props.fzx,
    //     page: p||1,
    //     count: _COUNT
    //   },
    //   success: (gets) => {
    //     let datas=JSON.parse(gets);
    //     if(datas.meta.result!==100) {
    //       return;
    //     }
    //     this.setState({
    //       list: datas.data.list,
    //       TP: {
    //         page: p||1,
    //         pages: datas.data.totalPages,
    //         total: datas.data.total
    //       }
    //     });
    //   }
    // });
  }

  render() {
    console.log('poplist:',this.props)
    return (
      <div style={{padding:'0 40px'}}>
        <div id="ops">
        <p>{this.props.fzx}</p>
        <div id="searchZJ">
          <span>{this.props.type.indexOf('ZJ')===-1?'课程名称：':'专家姓名：'}</span>
          <input type="text" ref={inp=>this.ZJ=inp}/>
          <button ref={btn=>this.btn=btn}>搜索</button>
        </div>
        </div>
        <div id="pop_table_body">
          <table>
            <thead>
              <tr>
                <td width="30%">课程编号</td>
                <td width="30%">课程名称</td>
                <td width="40%">开课学院</td>
              </tr>
            </thead>
            <tbody>
              {
                this.state.list.map((e,index)=><tr key={index}>
                  <td>{e.courseName}</td>
                  <td>{e.courseNo}</td>
                  <td>{e.unit}</td>
                </tr>)
              }
            </tbody>
          </table>
        </div>
        {/* <Fanye TP={this.state.TP} callback={(p)=>{this._get_list(p)}} /> */}
      </div>
    );
  }

  componentDidMount() {
    this._get_list(1);
  }
}

class Popup extends React.Component {
  constructor(props) {
    super(props);
  }

  delete_popup(e) {
    if(e.target===this.background) {
      ReactDOM.unmountComponentAtNode(e.target.parentNode);
    }
  }

  render() {
    console.log(this.props)
    const {type,names,groupItem}=this.props;
    const MAP={
      "撤销": "撤销",
      "自动分配": "自动分配",
      "批量分配": "批量分配",
      "批量撤销": "批量撤销",
    };

    switch(type) {
      case '撤销':
      case '自动分配':
        return(
          <div id="background" ref={div=>this.background=div}>
            <div id="popbody" ref='pb'>
              <div id="msg">
                <p>{`确定要${MAP[type]+groupItem}?`}</p>
              </div>
              <div id="popup_option">
                <button id="popup_OK" ref={btn=>this.OK=btn}>确定</button>
                <button id="popup_back" ref={btn=>this.back=btn}>取消</button>
              </div>
            </div>
          </div>
        );
        break;
      case '批量分配':
      case '批量撤销':
        return(
          <div id="background" ref={div=>this.background=div}>
            <div id="popbody" ref='pb'>
              <div id="msg">
                <p>{`确定要${MAP[type]}?`}</p>
              </div>
              <div id="popup_option">
                <button id="popup_OK" ref={btn=>this.OK=btn}>确定</button>
                <button id="popup_back" ref={btn=>this.back=btn}>取消</button>
              </div>
            </div>
          </div>
        );
        break;
      case 'showZJ':
      case 'showKC':
        console.log("show")
        return(
          <div 
            id="background" 
            ref={div=>this.background=div}
            onClick={e=>this.delete_popup(e)}
          >
          <div id="poplist" ref="pb" onClick={e=>e.stopPropagation}>
            <Poplist fzpc={this.props.id} fzx={this.props.names} type={type} />
          </div>
          </div>
        );
      default: 
        return(<div>error</div>);
        break;
    }
  }

  componentDidMount() {
    if(window.frameElement) {
      console.log('558--',document.body.scrollHeight)
      let H=document.body.scrollHeight;
      if(this.background.height>parseInt(document.body.scrollHeight)) {
        H=this.background.scrollHeight;
      }
      console.log("height:",this.background.scrollHeight)
      window.frameElement.height=H;
    }


    const {id,type}=this.props;
    let dat={};

    switch(type) {
      case "撤销":
      case '批量撤销':
        dat={
          unifyCode: getCookie("userId"),
          ID: id,
          expertGroupItem: this.props.id
        };
        break;
      case "自动分配":
      case '批量分配':
        dat={
          unifyCode: getCookie("userId"),
          ID: id,
          expertGroupItem: this.props.id,
          groupNum: Nums.join(',')
        };
        break;
      default:
        break;
    }
    this.OK&&(this.OK.onclick=()=>{
      let data_map={
        "撤销": "reviewUndo",
        "批量撤销": "reviewUndo",
        "自动分配": "reviewAutoAlloc",
        "批量分配": "reviewAutoAlloc"
      };
      ajax({
        url: courseCenter.host+data_map[type],
        data: dat,
        success: (gets)=>{
          let datas=JSON.parse(gets);
          if(datas.meta.result==100) {
            cancel_popup();
            Kcfzgl_option._get_list();
          }
        }
      });
    });
    this.back&&(this.back.onclick=()=>{
      ReactDOM.unmountComponentAtNode(document.getElementById('popup'));
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if(window.frameElement) {
      let H=document.body.offsetHeight;
      if(this.background.style.height.split('px')[0]>parseInt(document.body.offsetHeight)) {
        H=this.background.style.height.split('px')[0];
      }
      window.frameElement.height=H;
    }
  }

  componentWillUnmount() {
    if(window.frameElement) {
      window.frameElement.height=document.body.offsetHeight;
    }
  }
}

function Creat_popup(type, names, id, groupItem) {
  console.log(id)
  const popup_datas={
    type: type,
    names: names,
    id: id,
    groupItem: groupItem
  };
  var popup = ReactDOM.render(
    <Popup {...popup_datas}/>,
    document.getElementById('popup')
  );
}

var WPGL=ReactDOM.render(
  <Option />,
  document.getElementById('wpgl')
);
