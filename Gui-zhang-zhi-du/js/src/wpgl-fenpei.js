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

class Option extends React.Component {
  constructor(props) {
    super(props);
    this.search_cache={
      // byzj: Boolean(+GET("byzj"))===Boolean(+GET("bykc"))?true:Boolean(+GET("byzj")),
      // bykc: Boolean(+GET("bykc"))||false,
      // yfp:  Boolean(+GET("yfp")),
      // wfp:  Boolean(+GET("wfp")),
      // fzx: GET("fzx"),
      // name: GET("name"),

      fzx: GET("fzx")

    };
    this.state={
      TP: {
        page:1,
        pages:1,
        total:1
      },
      list: [],

      fzx_select: [],
      // fzx_select: [{fzx:1},{fzx:2},{fzx:3},{fzx:4}]


    }
  }

  _get_list(p) {
    let page=p||+GET("page")||1;

  //   ajax({
  //     url: courseCenter.host+"",
  //     data: {
  //       unifyCode: getCookie("userId"),
  //       ID: parseHash(window.location.href).id,
  //       page: page,
  //       count: _COUNT
  //     },
  //     success: (gets)=>{
  //       SET("page", page);
  //       let datas=JSON.parse(gets);
  //       // this.setState({
  //       //   TP: {
  //       //     page: page,
  //       //     pages: datas.data.totalPages,
  //       //     total:datas.data.total
  //       //   },
  //       //   list: datas.data.allocateList
  //       // });
  //     }
  //   });
  }





  search() {
    // this.search_cache.zjxm=SET("zjxm",this.state.zjxm);
    // this._get_list(1);
  }

  create_fzx_select() {
    let change_fzx=(eve)=>{
      this.search_cache.fzx=SET('fzx', eve.target.value)
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
      >
      <option value=''>{this.search_cache.fzx||'请选择a'}</option>
      </select>
    )
  }



  render() {
    return (
      <div id="wpgl_option">
        <div id="option">
          <div id="up">
            <button className="big_btn" ref={btn=>this.back=btn} >返回</button>
            <p>2017年XXX专家网评</p>
          </div>

          <div id="mid">
            <div id="big3">
              <button className="big_btn" ref={btn=>this.PLcx=btn}>批量撤销</button>
              <button className="big_btn" ref={btn=>this.PLfp=btn}>批量分配</button>
              <button className="big_btn" ref={btn=>this.fpjg=btn}>分配结果</button>
            </div>
            <div id="state">
              <span>专家课程分配状态：</span>
              <input 
                type="checkbox" 
                id="yfp" 
                ref={check=>this.yfp=check} 
              />
              <label htmlFor="yfp">
                <img src="../../imgs/public/hook.png"/>
              </label>
              <span>已分配</span>
              <input 
                type="checkbox" 
                id="wfp" 
                ref={check=>this.wfp=check} 
              />
              <label htmlFor="wfp">
                <img src="../../imgs/public/hook.png"/>
              </label>
              <span>未分配</span>
            </div>
            <div id="searchs">
              <span>分组项：</span>
              {this.create_fzx_select()}
            </div>
          </div>

          <div id="down">
            <span>注：</span>
            <div>
              <p>分组数量决定专家评价的课程数和课程评价的专家数。</p>
              <p>如专家15人，课程数30门，分组数量5，则每个专家评价的课程数=30/5=6，每门课程评价的专家数=15/5=3。</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
        // <Lists ref="list" Lists={this.state.list} model={this.model} />
        // <Fanye TP={this.state.TP} callback={(p)=>{this._get_list(p)}} />

  componentDidMount() {
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
          e=>ops+=`<option ${e.fzx===this.search_cache.fzx?'selected':null} value=${e.fzx}>${e.fzx}</option>`
        )
        this.fzx_select.innerHTML = ops
        // this.setState({
        //   fzx_select: JSON.parse(gets).data
        // });
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
      window.location.href=''
    };
  }
}

class Lists extends React.Component {
  constructor(props) {
    super(props);
  }

  create_head() {
    switch(this.props.model) {
      case 'zj':
        return (<thead>
          <tr>
            <td width="25px" className="td_head">
              <div></div>
            </td>
            <td width="0px" className="td_left_space"></td>
            <td width="10%">专家姓名</td>
            <td width="15%">所属专家分组项</td>
            <td>已分配课程</td>
            <td width="8%">操作</td>
            <td width="0px" className="td_right_space"></td>
            <td width="25px" className="td_end">
              <div></div>
            </td>
          </tr>
        </thead>);
        break;

      case 'kc':
        return (<thead>
          <tr>
            <td width="25px" className="td_head">
              <div></div>
            </td>
            <td width="20px" className="td_left_space"></td>
            <td>课程名称</td>
            <td width="10%">课程编号</td>
            <td width="15%">所属课程分组项</td>
            <td width="45%">已分配专家</td>
            <td width="8%">操作</td>
            <td width="0px" className="td_right_space"></td>
            <td width="25px" className="td_end">
              <div></div>
            </td>
          </tr>
        </thead>);
        break;
      default:
        return(<thead></thead>);
    }
  }

  option(type, id, wpid, groupItem, itemName, eve) {
    eve.preventDefault();

    console.log("option:",type);
    switch(type) {
      case 'show':
        Creat_popup('show', groupItem, id);
        document.getElementById('popup').style.display="block";
        break;
      case 'edit':
        console.log("修改");
        if(this.props.model==='zj') {
          window.location.href=`./masterWPEditorBymaster.html?wpId=${wpid}&expId=${id}&masterId=${id}&masterName=${itemName}&groupItem=${groupItem}`;
        } else {
          window.location.href=`./masterWPEditor.html?wpId=${wpid}&expId=${id}&masterId=${id}&masterName=${itemName}&groupItem=${groupItem}`;
        }
        break;
      default:
        break;
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

    switch(this.props.model) {
      case 'zj':
        return (<tbody>
          {this.props.Lists.map((e,index)=><tr key={index}>
            <td className="td_head"></td>
            <td></td>
            <td>{e.itemName}</td>
            <td>{e.groupItem}</td>
            <td>
              <span className="num">{`[${e.count}]`}</span>
              <a href="#" onClick={this.option.bind(this,"show",e.itemID, e.wpid, e.groupItem, e.itemName)}>
                {
                  e.count<4
                  ?e.list.map((m,index)=><span key={index}>{m.name}</span>)
                  :e.list.map((m,index)=>index<3&&<span key={index}>{m.name}</span>).concat(<span key="dot">……</span>)
                }
              </a>
            </td>
            <td>
              {
                e.ableModify?
                <div>
                  <span className="green_btn" onClick={this.option.bind(this,"edit", e.itemID, e.wpid, e.groupItem, e.itemName)}>修改</span>
                </div>: ''
              }
            </td>
            <td></td>
            <td className="td_end"></td>
          </tr>)}
        </tbody>);
        break;

      case 'kc':
        return (<tbody>
          {this.props.Lists.map((e,index)=><tr key={index}>
            <td className="td_head"></td>
            <td></td>
            <td>{e.itemName}</td>
            <td>{e.itemID}</td>
            <td>{e.groupItem}</td>
            <td>
              <span className="num">{`[${e.count}]`}</span>
              <span>
                {
                  e.count<6
                  ?e.list.map((m,index)=><span key={index}>{m.name}</span>)
                  :e.list.map((m,index)=>index<5&&<span key={index}>{m.name}</span>).concat(<span key="dot">……</span>)
                }
              </span>
            </td>
            <td>
              {
                e.ableModify?
                <div>
                  <span className="green_btn" onClick={this.option.bind(this,"edit", e.id, e.wppc)}>修改</span>
                </div>: ''
              }
            </td>
            <td></td>
            <td className="td_end"></td>
          </tr>)}
        </tbody>);
        break;
      default:
        return(<tbody></tbody>);
        break;
    }
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
        page: 1,
        pages: 1,
        total: 1
      }
    };
  }

  _get_list(p) {
    ajax({
      url: courseCenter.host+'queryExpAllocDetail',
      data: {
        unifyCode: getCookie("userId"),
        ID: parseHash(window.location.href).id,
        expID: this.props.id,
        groupItem: this.props.fzx,
        page: p||1,
        count: _COUNT
      },
      success: (gets) => {
        let datas=JSON.parse(gets);
        if(datas.meta.result!==100) {
          return;
        }
        this.setState({
          list: datas.data.list,
          TP: {
            page: p||1,
            pages: datas.data.totalPages,
            total: datas.data.total
          }
        });
      }
    });
  }

  render() {
    return (
      <div>
        <div id="pop_table_body">
          <table>
            <thead>
              <tr>
                <td width="30%">课程名称</td>
                <td width="30%">课程编号</td>
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
        <Fanye TP={this.state.TP} callback={(p)=>{this._get_list(p)}} />
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
    const {type,names}=this.props;
    const MAP={
      "PLdelete": "删除",
      "delete": "删除",
    };

    switch(type) {
      case 'PLdelete':
      case 'delete':
        return(
          <div id="popbody" ref='pb'>
            <div id="msg">
              <p>{`确定要${MAP[type]+names}?`}</p>
            </div>
            <div id="popup_option">
              <button id="popup_OK" ref={btn=>this.OK=btn}>确定</button>
              <button id="popup_back" ref={btn=>this.back=btn}>取消</button>
            </div>
          </div>
        );
        break;
      case 'show':
        return(
          <div 
            id="background" 
            ref={div=>this.background=div}
            onClick={e=>this.delete_popup(e)}
          >
          <div id="poplist" ref="pb" onClick={e=>e.stopPropagation}>
            <Poplist id={this.props.id} fzx={this.props.names} />
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
      let H=document.body.offsetHeight;
      if(this.background.offsetHeight>parseInt(document.body.offsetHeight)) {
        H=this.background.offsetHeight;
      }
      console.log("height:",this.background.offsetHeight)
      window.frameElement.height=H;
    }


    const {id,type}=this.props;
    let dat={};

    switch(type) {
      case "PLdelete":
      case "delete":
        dat={
          unifyCode: getCookie("userId"),
          ID: id
        };
        break;
      default:
        break;
    }
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

function Creat_popup(type, names, id) {
  console.log(id)
  const popup_datas={
    type: type,
    names: names,
    id: id
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
