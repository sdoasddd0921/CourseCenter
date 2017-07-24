import React from 'react';
import ReactDOM from 'react-dom';

const _COUNT = 10;
const ajax=require('../libs/post_ajax.js');
var masters=[];

class Option extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 取不到当前默认的masterstate就默认为out
      master: sessionStorage.getItem("master")||'out',
      list: [],
      TP: {
        page:1,
        pages:1,
        total:1
      }
    }
  }

  creat_option_down() {
    const {master} = this.state;
    let inputs = null;
    switch(master) {
      case 'out':
        inputs = <div id="option_input">
          <span>账号：</span>
          <input type="text" ref="zhanghao"/>
          <span>姓名：</span>
          <input type="text" ref="name"/>
          <span>工作单位：</span>
          <input type="text" ref="danwei"/>
        </div>
        break;
      case 'in':
        inputs = <div id="option_input">
          <span>所属学院：</span>
          <select id="xueyuan" ref={select=>this.xueyuan=select}>
            <option value="">请选择</option>
          </select>
          <span>教师姓名：</span>
          <input type="text" ref="jsxm"/>
        </div>
        break;
      default: 
        inputs = null;
        break;
    }
    return <div id="down">
          {inputs}
          <div id="option_serch">
            <span>账号状态：</span>
            <input type="checkbox" id="qy" ref={input=>this.qy=input} />
            <label htmlFor="qy"><img src="../../imgs/public/hook.png"/></label>
            <span>启用</span>
            <input type="checkbox" id="ty" ref={input=>this.ty=input}/>
            <label htmlFor="ty"><img src="../../imgs/public/hook.png"/></label>
            <span>停用</span>
            <button ref={serch=>this.serch=serch} id="serch">搜索</button>
          </div>

        </div>;
  }

  insert_xueyuan() {
    // console.log("insert")
    ajax({
      url: courseCenter.host+'getCollege',
      data: {
        unifyCode: getCookie("userId")
      },
      success: (gets) => {
        let datas = JSON.parse(gets);
        let options = "<option value=''>请选择</option>";
        // console.log(datas)

        datas.data.map(e=>{
          options+=`<option value=${e.kkxymc}>${e.kkxymc}</option>`;
        });
        this.xueyuan.innerHTML=options;
        this.xueyuan.onchange=()=>{
          // console.log(this.xueyuan.value)
        }
      }
    });
  }

  change_master_state(state) {
    if(state==='in') {
      this.insert_xueyuan();
    } else if(state===this.state.master) {
      return;
    }
    // console.log("change")
    // this['master_'+state].checked=false;
    sessionStorage.setItem("master", state)

    this.setState({
      master: state,
      list: []
    },()=>{this.get_list(1)});
  }

  get_list(p) {
    // console.log("test state:",this.state.master)
    let data={};
    if(this.state.master==='out') {
      data={
        unifyCode: getCookie("userId"),
        userId: this.refs.zhanghao.value,
        userName: this.refs.name.value,
        department: this.refs.danwei.value,
        state: this.qy.checked===this.ty.checked?'':+this.qy.checked,
        page: p||1,
        count: _COUNT,
        type: ['in', 'out'].indexOf(this.state.master)
      }
    } else if(this.state.master==='in') {
      data={
        unifyCode: getCookie("userId"),
        userId: "",
        userName: this.refs.jsxm.value,
        department: this.xueyuan.value,
        state: this.qy.checked===this.ty.checked?'':+this.qy.checked,
        page: p||1,
        count: _COUNT,
        type: ['in', 'out'].indexOf(this.state.master)
      }
    }
    ajax({
      url: courseCenter.host+"getZjList",
      data: data,
      success: (gets)=>{
        let datas=JSON.parse(gets);
        // console.log(datas)
        this.setState({
          TP: {
            page:p||1,
            pages: datas.data.totalPages,
            total: datas.data.total
          },
          list: datas.data.zjList
        });
      }
    });
  }

  render() {
    // console.log("渲染")
    const {master} = this.state;
    return (
      <div id="Option">
        <div id="option_bar">
          <div id="top">
            <button className="option_big_btn" ref={button=>this.add=button}>添加专家</button>
            <button className="option_big_btn" ref={button=>this.PLdelete=button}>批量删除</button>
            <button className="option_big_btn" ref={button=>this.change=button}>修改密码</button>
          </div>
          <div id="mid">
            <input
              type="radio"
              name="master"
              id="master_in"
              ref={input=>this.master_out=input}
              onChange={()=>{this.change_master_state('out')}}
              defaultChecked={master==='out'}
            />
            <label htmlFor="master_in"><img src="../../imgs/public/hook.png"/></label>
            <span>显示校外专家</span>
            <input 
              type="radio" 
              name="master"
              id="master_out" 
              ref={input=>this.master_in=input} 
              onChange={()=>{this.change_master_state('in')}}
              defaultChecked={master==='in'}
            />
            <label htmlFor="master_out"><img src="../../imgs/public/hook.png"/></label>
            <span>显示校内专家</span>
          </div>
          {this.creat_option_down()}
        </div>
        <List list={this.state.list} master={this.state.master} ref="list" />
        <Fanye TP={this.state.TP} callback={(p)=>{this.get_list(p)}} />
      </div>
    );
  }

  componentDidMount() {
    this.add.onclick=()=>{
      window.location.href="./masterAddEditor.html";
    }
    this.get_list();

    // PiLiangDelete
    this.PLdelete.onclick=()=>{
      Creat_popup('PLdelete', masters, this.ids)
      let pop = document.getElementById('popup');
      pop.style.display='block';
      // console.log(popup)
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if(window.frameElement) {
      window.frameElement.height=document.body.offsetHeight;
    }
  }


}

class List extends React.Component {
  constructor(props) {
    super(props);
    this.ids=[];
  }

  creat_thead() {
    const {master} = this.props;
    switch(master) {
      case 'out':
        return(
          <thead>
            <tr>
              <td className="lefttd"><div></div></td>
              <td width="5px"></td>
              <td width="10%">
                <input 
                  type="checkbox" 
                  id="allcheck" 
                  ref={check=>this.allcheck=check} 
                />
                <label htmlFor="allcheck">
                  <img src="../../imgs/public/hook.png"/>
                </label>
              </td>
              <td width="15%">账号</td>
              <td width="15%">姓名</td>
              <td>工作单位</td>
              <td width="20%">联系电话</td>
              <td width="7%">账号状态</td>
              <td width="15%">操作</td>
              <td width="0px"></td>
              <td className="righttd"><div></div></td>
            </tr>
          </thead>
        );
        break;

      case 'in':
        return(
          <thead>
            <tr>
              <td className="lefttd"><div></div></td>
              <td width="5px"></td>
              <td width="10%">
                <input 
                  type="checkbox" 
                  id="allcheck" 
                  ref={check=>this.allcheck=check} 
                />
                <label htmlFor="allcheck">
                  <img src="../../imgs/public/hook.png"/>
                </label>
              </td>
              <td width="15%">姓名</td>
              <td>学院</td>
              <td width="10%">账号状态</td>
              <td width="15%">操作</td>
              <td width="0px"></td>
              <td className="righttd"><div></div></td>
            </tr>
          </thead>
        );
        break;
    }
  }

  option(op,id,eve) {
    eve.preventDefault();
    switch(op) {
      case 'edit':
        window.location.href="./masterAddEditor.html?isEditor=true&masterId="+id;
        break;
      case 'del':
        // ajax();
        break;
      default:
        break;
    }
  }

  check(id,name,eve) {
    if(eve.target.checked) {
      // add
      this.ids.push(id);
      masters.push(name);
    } else {
      // delet
      this.ids=this.ids.filter(e=>e!==id);
      masters=masters.filter(e=>e!==name);
    }
  }

  creat_tbody() {
    const {master}=this.props;
    switch(master) {
      case 'out':
        return(
          <tbody>
            {this.props.list.map((e,index)=><tr key={index}>
              <td className="lefttd"></td>
              <td></td>
              <td>
                <input 
                  type="checkbox" 
                  id={"input-"+index} 
                  value={e.id+"#"+e.xm}
                  onChange={this.check.bind(this,e.id,e.xm)} 
                />
                <label htmlFor={"input-"+index} >
                  <img src="../../imgs/public/hook.png"/>
                </label>
              </td>
              <td>{e.id}</td>
              <td>{e.xm}</td>
              <td>{e.dw}</td>
              <td>{e.lxdh}</td>
              <td>{e.zt}</td>
              <td>
                <a href="#" onClick={this.option.bind(this,'edit', e.id, e.xm)}>编辑</a>
                <a href="#" onClick={this.option.bind(this,'del', e.id, e.xm)}>删除</a>
                <a href="#" onClick={this.option.bind(this,'open', e.id, e.xm)}>启用</a>
              </td>
              <td></td>
              <td className='righttd'></td>
            </tr>)}
          </tbody>
        );
        break;

      case 'in':
        return(
          <tbody>
            {this.props.list.map((e,index)=><tr key={index}>
              <td className="lefttd"></td>
              <td></td>
              <td>
                <input 
                  type="checkbox" 
                  id={"input-"+index} 
                  value={e.sfrzh+"#"+e.xm}
                  onChange={this.check.bind(this,e.sfrzh,e.xm)} 
                />
                <label htmlFor={"input-"+index} >
                  <img src="../../imgs/public/hook.png"/>
                </label>
              </td>
              <td>{e.xm}</td>
              <td>{e.xymc}</td>
              <td>{e.zt}</td>
              <td>
                <a href="#" onClick={this.option.bind(this,'edit', e.id, e.xm)}>编辑</a>
                <a href="#" onClick={this.option.bind(this,'del', e.id, e.xm)}>删除</a>
                <a href="#" onClick={this.option.bind(this,'open', e.id, e.xm)}>启用</a>
              </td>
              <td></td>
              <td className='righttd'></td>
            </tr>)}
          </tbody>
        );
        break;
    }
  }

  render() {
    masters=[];
    this.ids=[];
    return (
      <div id="List">
        <table>
          {this.creat_thead()}
          {this.creat_tbody()}
        </table>
      </div>
    );
  }

  componentDidMount() {
    this.allcheck.onchange=(eve)=>{
      this.ids=[];
      masters=[];
      let checks=Array.from(document.querySelectorAll('tbody td input[type="checkbox"]'));
      checks.map(e=>{
        (e.checked=eve.target.checked)
        && this.ids.push(e.value.split("#")[0])
        && masters.push(e.value.split("#")[1]);
      });
      console.log(masters.join(","))
    }
  }
}

class Fanye extends React.Component {
  constructor(props) {
    super(props);
  }

  create_popup_fanye() {
    let nums=[];
    let start=1;
    let end=this.props.TP.pages||1;
    let now=this.props.TP.page||1;
    let page_on={color:"#007A51"};

    let change_page=(p)=>{
      if(p===now) {
        nums.push(<li key={p} style={page_on}>{p}</li>);
      } else {
        nums.push(<li key={p} onClick={this.fanye.bind(this,p)}>{p}</li>);
      }
    }

    if(end<1) {
      nums.push(<li key="only" onClick={this.fanye.bind(this,1)}>1</li>)
    } else if(end<=5) {
      for(let i=1;i<=end;i++) {
        change_page(i)
      }
    } else {
      if(now<3) {
        for(let i=1;i<=5;i++) {
        change_page(i)
        }
      } else if(now>end-3) {
        for(let i=end-5;i<=end;i++) {
        change_page(i)
        }
      } else {
        for(let i=now-2;i<=now+2;i++) {
        change_page(i)
        }
      }
    }

    return (<div id="fanye">
      <span id="rows">共{this.props.TP.rows>=0?this.props.TP.rows:1}条记录</span>
      <input className="fanye_options" type="button" value="首页"   id="fanye_start" onClick={this.fanye.bind(this,1)} />
      <input className="fanye_options" type="button" value="上一页" id="fanye_pre"   onClick={this.fanye.bind(this,now===1?0:now-1)} />
      <ul id="fanye_nums">{nums}</ul>
      <input type="text" id="tp" ref="tp" placeholder={`${this.props.TP.page}/${this.props.TP.pages}`} />
      <input className="fanye_options" type="button" value="下一页" id="fanye_next"  onClick={this.fanye.bind(this,now===end?0:now+1)} />
      <input className="fanye_options" type="button" value="尾页"   id="fanye_end"   onClick={this.fanye.bind(this,end)} />
    </div>);
  }

  fanye(p) {
    this.refs.tp.value=null;
    if(p==0) {
      return;
    }
    this.props.callback(p);
  }

  render() {
    return this.create_popup_fanye();
  }

  componentDidMount() {
    // 手动跳转翻页
    this.refs.tp.onkeydown=(eve)=>{
      if(eve.keyCode===13) {
        if(!isNaN(+eve.target.value)) {
          this.fanye(+eve.target.value);
        } else {
          eve.target.value=null;
          eve.target.blur();
        }
      }
    }
  }
}

class Popup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props)
    return (
      <div id="popbody" ref={button=>this.body=button}>
        <p>this is a msg</p>
        <button>OK</button>
        <button ref={button=>this.button=button}>Cancel</button>
      </div>
    );
  }
  componentDidMount() {
    this.button.onclick=(e)=>{
    }
    this.body.onclick=(e)=>{
      e.stopPropagation();
    }
  }
}

function Creat_popup(type, names) {
  var popup = ReactDOM.render(
    <Popup {...type}/>,
    document.getElementById('popup')
  );
  // click to close popup

  document.getElementById('popup').onclick=(e)=>{
    e.target.style.display="none";
    ReactDOM.unmountComponentAtNode(e.target);
  }
}






ReactDOM.render(
  <Option />,
  document.getElementById('zjkgl')
);