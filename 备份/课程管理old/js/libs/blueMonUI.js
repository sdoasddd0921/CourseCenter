import React from 'react';
import ReactDOM from 'react-dom';
var ajax=require('./post_ajax.js');
var OUT_COUNT=10;
// /**
//  * ******************课程管理******************
//  */
/*
 * 编辑、审核等操作的跳转在300行，不要动“历史操作”
 * 批量操作214行
 */

class BlueMUI_CreateFanye extends React.Component {
  constructor(props) {
    super(props);
    this.fanye=this.fanye.bind(this);
    this.create_popup_fanye=this.create_popup_fanye.bind(this);
  }

  create_popup_fanye() {
    // console.log(this.state,"___376")
    let style={};
    let fanye=[];
    let start=1;
    let end=this.props.pages;
    let style_on={
      background:"url('../../imgs/courseAudit/fanye_bg.png')",
      backgroundRepeat:'no-repeat',
      backgroundPosition:'5px 5px',
      color:'#FFF'
    };
    if(this.props.pages<1) {
      return <div></div>;
    }
    if(this.props.pages<=7) {
      for(let i=2;i<this.props.pages;i++) {
        if(i==this.props.page) {
          style=style_on;
        } else {
          style={};
        }
        fanye.push(<li key={i} style={style} onClick={this.fanye.bind(this,i)}>{i}</li>);
      }
    } else {
      if(this.props.page<5) {
        for(let j=2;j<=6;j++) {
          if(j==this.props.page) {
            style=style_on;
          } else {
            style={};
          }
          fanye.push(<li key={j} style={style} onClick={this.fanye.bind(this,j)}>{j}</li>);
        }
        fanye.push(<li key='end' >...</li>);
      } else if(this.props.page>this.props.pages-4) {
        for(let k=this.props.pages-5;k<this.props.pages;k++) {
          if(k==this.props.page) {
            style=style_on;
          } else {
            style={};
          }
          fanye.push(<li key={k} style={style} onClick={this.fanye.bind(this,k)}>{k}</li>);
        }
        fanye.unshift(<li key='start' >...</li>);
      } else {
        for(let l=this.props.page-2;l<=this.props.page+2; l++) {
          if(l==this.props.page) {
            style=style_on;
          } else {
            style={};
          }
          fanye.push(<li key={l} style={style} onClick={this.fanye.bind(this,l)}>{l}</li>);
        }
        fanye.unshift(<li key='start' >...</li>);
        fanye.push(<li key='end' >...</li>);
      }
    }
    if(1==this.props.pages) {
      fanye.push(<li key={1} style={style_on}>{1}</li>);
    } else if(this.props.page==this.props.pages) {
      fanye.unshift(<li key={1} onClick={this.fanye.bind(this,1)}>{1}</li>);
      fanye.push(<li key={this.props.pages} style={style_on}>{this.props.pages}</li>);
    } else if(this.props.page==1) {
      fanye.unshift(<li key={1} style={style_on}>{1}</li>);
      fanye.push(<li key={this.props.pages} onClick={this.fanye.bind(this,this.props.pages)}>{this.props.pages}</li>);
    } else {
      fanye.unshift(<li key={1} onClick={this.fanye.bind(this,1)}>{1}</li>);
      fanye.push(<li key={this.props.pages} onClick={this.fanye.bind(this,this.props.pages)}>{this.props.pages}</li>);
    }
    return(<div id="fanye">
      <div id="fanye_pre" ref="pre" onClick={this.fanye.bind(this,this.props.page-1<1?0:this.props.page-1)}><img src="../../imgs/courseAudit/fanye_left.png" alt=""/></div>
      <ul ref="popup_fanye">
        {fanye}
      </ul>
      <div id="fanye_next" ref="next" onClick={this.fanye.bind(this,this.props.page+1>this.props.pages?0:this.props.page+1)}><img src="../../imgs/courseAudit/fanye_right.png" alt=""/></div>
    </div>);
  }

  fanye(p) {
    if(p==0) {
      return;
    }
    console.log("开始翻页")
    Array().map.call(
      document.getElementById('center_table').getElementsByTagName('input'),
      e=>{e.checked=false;}
    );
    this.props.This.setState({page:p});
  }

  // componentDidMount() {
  //   this.fanye();
  // }
  // componentDidUpdate(prevProps, prevState) {
  //   this.fanye();
  // }

  render() {
    // console.log(this.props,"fanye")
    return this.create_popup_fanye();
  }
}



//入口
class BlueMUI_CreateTabs extends React.Component {
  constructor(props) {
    super(props);
    this.change_subModule=this.change_subModule.bind(this);
    this.state={
      subModule:parseHash(window.location.href).subModule||this.props.tabs[0].subModule
    };
  }

  componentDidMount() {
    this.refs[this.state.subModule].style.borderBottom='2px solid #009361';
  }

  componentWillUpdate(nextProps, nextState) {
    let end=this.refs.tabs.children.length;
    for(let i=0;i<end;i++) {
      this.refs.tabs.children[i].style.borderBottom='none';
    }
    this.refs[nextState.subModule].style.borderBottom='2px solid #009361';
  }

  change_subModule(Module) {
    this.setState({subModule:Module});
    BluMUI.result.Options.setState({
      subModule:Module,
      page:1
    });
    document.getElementById('jxtdss').value='';
  }

  render() {
    // console.log(this.state.subModule)
    let tabs=[];
    if(this.props.tabs.length>1) {
      tabs=[
        <li key={this.props.tabs[0].subModule} ref={this.props.tabs[0].subModule} onClick={this.change_subModule.bind(this,this.props.tabs[0].subModule)}>{this.props.tabs[0].cdmc}</li>,
        <li key='tab_line' id='tab_line'></li>,
        <li key={this.props.tabs[1].subModule} ref={this.props.tabs[1].subModule} onClick={this.change_subModule.bind(this,this.props.tabs[1].subModule)}>{this.props.tabs[1].cdmc}</li>
      ];
    } else {
      tabs=[<li key={this.props.tabs[0].subModule} ref={this.props.tabs[0].subModule}>{this.props.tabs[0].cdmc}</li>];
    }
    return(<div id='tabs'><ul id='tab' ref='tabs'>{tabs}</ul></div>);
  }
}

//显示options
class BlueMUI_CreateOptions extends React.Component {
  constructor(props) {
    super(props);
    this.pages=1;
    this.state={
      subModule:this.props.subModule,
      page:1,
      course_state:[1,1,1,1,1,1],
    };
    this.change_course_state=this.change_course_state.bind(this);
    this.allcheck=this.allcheck.bind(this);
  }

  // 单个复选框选中
  change_course_state(eve) {
    let bit= +eve.target.value;
    let check= +this.refs['check-'+bit].checked;
    let new_state;
    if(this.refs.allchecked.checked) {
      new_state=[0,0,0,0,0,0];
    } else {
      new_state=this.state.course_state;
    }
    this.refs.allchecked.checked=false;
    new_state.splice(bit,1,check);
    this.setState({
      page:1,
      course_state:new_state
    });
  }

  allcheck(eve) {
    if(eve.target.checked) {
      for(let i=0;i<6;i++) {
        this.refs['check-'+i].checked=false;
      }
      this.setState({
        page:1,
        course_state:[1,1,1,1,1,1]
      });
    }
  }
  componentDidMount() {
    let that=this;
    function hand_serch (eve) {
      BlueMUI_GetList(
        that.state.subModule,
        1,
        that.state.course_state,
        document.getElementById('jxtdss').value,
        that
      );
    }
    //查询列表
    BlueMUI_GetList(this.state.subModule,this.state.page,this.state.course_state,this.refs.serchValue.value,this);
    this.refs.serchValue.onkeydown=e=>{
      console.log(e.keyCode)
      if(e.keyCode==13) {
        console.log(document.getElementById('jxtdss').value)
        hand_serch();
      }
    }
    this.refs.allchecked.checked=true;
    this.refs.serchBtn.onclick=hand_serch;
  }
  componentWillUpdate(nextProps, nextState) {
    BlueMUI_GetList(nextState.subModule,nextState.page,nextState.course_state,this.refs.serchValue.value,this);

  }

  pi_liang(msg) {
    let piliang_type = ['tijiaoshenhe','error','chehui','tingyong','qiyong'];
    // if(msg=='tingyong') {
      console.log(BluMUI.result.CreateList.pi_liang.toString());
    // }
    if(BluMUI.result.CreateList.pi_liang.length<=0) {
      alert('请选择课程！');
      return;
    }
    ajax({
      url:courseCenter.host+"submitOperations",
      data:{
        unifyCode:BluMUI.result.unifyCode,
        type:piliang_type.indexOf(msg)+1,
        courseNo:BluMUI.result.CreateList.pi_liang.toString()
      },
      success:function(gets) {
        let datas = JSON.parse(gets);
        if(datas.meta.result==301) {
          alert('操作失败，请检查所选课程的状态！');
        } else if(datas.meta.result==100) {
          alert('操作成功！');
          BluMUI.result.Tab.change_subModule('audit');
        }
      }
    });
  }

  render() {
    let four;
    if(this.state.subModule=='audit') {
      // 隐藏批量操作~
      four=<div id="double_option" style={{display:'none'}}>
        <span className="double_btn" ref='tingyong' onClick={this.pi_liang.bind(this,'tingyong')}>停用</span>
        <span className="double_btn" ref='qiyong' onClick={this.pi_liang.bind(this,'qiyong')}>启用</span>
      </div>;
    }
    let double_option=<div>
      {four}
      <div id="out_serch">
        <span>课程名称：</span>
        <input type="text" id="jxtdss" ref="serchValue"/>
        <span id="serch_btn" ref="serchBtn">搜索</span>
      </div>
    </div>;
    return(<div id="options">
      <ul id="option_bar">
        <li><input type="checkbox" ref='check-5' value="5" id="itm5" onChange={this.change_course_state}/><label htmlFor="itm5"></label>已上线</li>
        <li><input type="checkbox" ref='check-4' value="4" id="itm4" onChange={this.change_course_state}/><label htmlFor="itm4"></label>已停用</li>
        <li><input type="checkbox" ref='check-3' value="3" id="itm3" onChange={this.change_course_state}/><label htmlFor="itm3"></label>驳回</li>
        <li><input type="checkbox" ref='check-2' value="2" id="itm2" onChange={this.change_course_state}/><label htmlFor="itm2"></label>待审核</li>
        <li><input type="checkbox" ref='check-1' value="1" id="itm1" onChange={this.change_course_state}/><label htmlFor="itm1"></label>编辑中</li>
        <li><input type="checkbox" ref='check-0' value="0" id="itm0" onChange={this.change_course_state}/><label htmlFor="itm0"></label>初始</li>
      </ul>
      <span id="option_allcheck"><input type="checkbox" value="7" ref='allchecked' id="itm7" onChange={this.allcheck}/><label htmlFor="itm7"></label>所有课程</span>
      <div style={{clear:'both'}}></div>
      <div id="hr"></div>
      {double_option}
    </div>);
  }
}

var BlueMUI_GetList=function(Module,P,Cs,Serch,This) {
  console.log("GetList___314",Module)
  ajax({
    url:courseCenter.host+'getCourseList',
    data:{
      unifyCode:BluMUI.result.unifyCode,
      courseState:'['+Cs+']',
      page:P,
      count:OUT_COUNT,
      subModule:Module,
      selectName:Serch
    },
    success:function(gets) {
      let list=[];
      let datas=JSON.parse(gets);
      if(datas.meta.result!=100) {
        list=[];
      } else {
        // console.log(datas,'___57');
        list=datas.data.courseList;
      }
      if(BluMUI.result.CreateList) {
        console.log('set new lists___358')
        BluMUI.result.CreateList.setState({
          Lists:list
        });
      } else {
        console.log("创建列表___340")

        BluMUI.create({
          id:'CreateList',
          Lists:list
          },
          'Create_list',
          document.getElementById('React_list')
        );
      }

        //显示翻页
        // BluMUI.create({
        //   id:'Fanye',
        //   pages:datas.data.totalPages,
        //   page:BluMUI.result.Options.state.page
        //   },
        //   'Create_list',
        //   document.getElementById('React_fanye')
        //   );
        // ReactDOM.render(
        //   <BlueMUI_CreateFanye pages={datas.data.totalPages} page={P}/>,
        //   document.getElementById('React_fanye')
        // );
        // BluMUI.result.Fanye.props.pages=datas.data.totalPages;
        ReactDOM.render(
          <BlueMUI_CreateFanye pages={datas.data.totalPages} page={P} This={This}/>,
          document.getElementById('React_fanye')
        );
      // }
      // BluMUI.result.Options.pages=datas.data.totalPages;
    }
  });
};

// 提交审核的弹出

class Tijiaoshenhe extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.refs.tijiao.onclick=(e=>{
      console.log(this.props.Kcbh);
      Tijiao(1,this.props.Kcbh);
      this.die();
    });
    this.refs.fanhui.onclick=this.die;
    this.refs.close.onclick=this.die;
  }
  die() {
    document.getElementById('tijiaoshenhe').style.display='none';
    ReactDOM.unmountComponentAtNode(document.getElementById('tijiaoshenhe'));
  }
  render() {
    return(<div>
      <div id="tijiaoshenhe_head">
        <span>提交审核</span>
        <img ref='close' src="../../imgs/courseAudit/close.png"/>
      </div>
      <p>材料将提交至教学院长、系部中心主任、<br/>课程负责人进行审核，提交后不可修改。</p>
      <div id="tijiao_div">
        <span className="tijiao" ref="tijiao">确定</span>
        <span className="fanhui" ref="fanhui">返回</span>
      </div>
    </div>);
  }
}

function Tjsh(kcbh) {
  let t=document.getElementById('tijiaoshenhe');
  t.style.display="block";
  ReactDOM.render(
    <Tijiaoshenhe Kcbh={kcbh}/>,
    t
  );
}

function Tijiao(op,course,note) {
  ajax({
    url:courseCenter.host+'submitOperation',
    data: {
      unifyCode:BluMUI.result.unifyCode,
      courseNo:course,
      note:note||'',
      type:op
    },
    success:function(gets) {
      let datas=JSON.parse(gets);
      BluMUI.result.Tab.change_subModule('audit');
      // BlueMUI_GetList(
      //   BluMUI.result.Tab.state.subModule,
      //   BluMUI.result.Options.state.page,
      //   BluMUI.result.Options.state.course_state
      // );
    }
  });
}


//显示列表
class BlueMUI_CreateList extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.lists,'___298')
    this.pi_liang=[];
    this.create_list=this.create_list.bind(this);
    this.check=this.check.bind(this);
    this.allcheck=this.allcheck.bind(this);
    this.state={
      Lists:this.props.Lists
    }
  }

  operation(o,a,event) {
    console.log(a)
    switch(o) {
      // case '提交审核':
      //   Tjsh(a);
      //   console.log('提交审核')
      //   break;
      case '提交/审核':
        window.location.href='classManageCheck.html?classId='+a+'&type=1';
        break;
      case '系部中心主任审核':
        window.location.href='classManageCheck.html?classId='+a+'&type=2';
        break;
      case '教学院长审核':
        window.location.href='classManageCheck.html?classId='+a+'&type=3';
        break;

      case '撤回':
        Tijiao(3,a);
        console.log('撤回')
        break;
      case '停用':
        Tijiao(4,a);
        console.log('停用')
        break;
      case '启用':
        Tijiao(5,a);
        console.log('启用')
        break;
      case '编辑':
        window.location.href='classManageEditor.html?classId='+a;
        console.log('编辑')
        break;
      case '抽查':
        window.location.href='classManageSpotCheck.html?classId='+a+'&type=6';
        break;
      case '历史':
        console.log('历史');
        Show_lishi(a);
        break;
    }
  }

  check(No,eve) {
    this.refs.allcheck.checked=false;
    if(eve.target.checked) {
      this.pi_liang.push(No);
    } else {
      this.pi_liang.splice(this.pi_liang.indexOf(No),1);
    }
    // console.log(this.pi_liang);
  }

  create_list() {
    let op_func;
    let op_able;
    let list=[];
    if(this.state.Lists.length==0) {
      return(<tr style={{background:'transparent'}} ><td id='ND'>
        <div className='no_data'>
          <img width='150px' height='150px' src="../../imgs/public/error.png"/>
          <br/>
          <span>没有数据</span>
        </div>
      </td></tr>);
    }
    this.state.Lists.map((e,index)=>{
      let check;
      let ops=[];
      let style={
        background: index%2?'#eee':'#fff'
      };
      if(BluMUI.result.Tab.state.subModule=='audit') {
        // check=<td width="3%">
        //   <input type="checkbox" value={e.kcbh} id={e.kcbh} onChange={this.check.bind(this,e.kcbh)}/>
        //   <label htmlFor={e.kcbh}></label>
        // </td>;
      }
      e.cz.map(f=>{
        op_func=f.able?this.operation.bind(this,f.name,e.kcbh):'';
        ops.push(<span key={f.name} onClick={op_func} className={f.able?'op_on':''}>{f.name}</span>)
      });
      ops.push(<span key='lish' onClick={this.operation.bind(this,'历史',e.kcbh)} className='op_on'>历史查询</span>)

      list.push(<tr key={e.kcbh} style={style}>
        <td></td>
        {check}
        <td>{e.kcbh}</td>
        <td><a target="view_window" href={'../classInfShow/classInfReview.html?classId='+e.kcbh}>{e.kcmc}</a></td>
        <td>{e.jysmc}</td>
        <td>{e.czsj||''}</td>
        <td>{e.dqzt}</td>
        <td>{ops}</td>
        <td></td>
      </tr>);
    });
    return list;
  }

  componentDidUpdate() {
    if(BluMUI.result.Tab.state.subModule=='audit') {
      Array().map.call(
        document.getElementById('center_table').getElementsByTagName('input'),
        e=>{e.checked=false;}
      );
    }
  }

  componentDidMount() {
    // this.get_list(this.props.subModule);
  }

  allcheck() {
    this.pi_liang=[];
    Array().map.call(this.refs.list_body.getElementsByTagName('input'),(e=>{
      e.checked=this.refs.allcheck.checked;
      e.checked&&this.pi_liang.push(e.parentNode.nextSibling.innerText);
    }));
    console.log(this.pi_liang.toString());
  }

  render() {
    let check;
    if(BluMUI.result.Tab.state.subModule=='audit') {
      // check=<td width="3%"><input type="checkbox" value="0" id="allcheck" onChange={this.allcheck} ref='allcheck' /><label htmlFor="allcheck"></label><span id="quanxuan">全选</span></td>;
    }
    return(<table id="center_table">
      <thead>
        <tr>
          <td width='20px'></td>
          {check}
          <td width="16%">课程编号</td>
          <td width="20%">课程名称</td>
          <td width="20%">教学机构名称</td>
          <td width="14%">最近更新时间</td>
          <td width="13%">课程状态</td>
          <td width="10%">操作</td>
          <td width='35px'></td>
        </tr>
      </thead>
      <tbody ref='list_body'>{this.create_list()}</tbody>
    </table>);
  }
}

/*显示历史*/
function Show_lishi (course_id) {
  ReactDOM.render(
    <BlueMUI_CreatePopup Course={course_id}/>,
    document.getElementById('popup')
  );
}


//创建弹出层层(历史)
class BlueMUI_CreatePopup extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      lists:[],
      page:1,
      pages:0
    };
    this.popup=document.getElementById('popup');
  }

  create_popup_top() {
    return(<div id="top">
      <span>历史信息</span>
      <span id="popup_close" ref="close"><img src="../../imgs/classListInfShow/close.png" alt="close"/></span>
    </div>);
  }

  create_popup_thead() {
    return(<thead>
      <tr>
        <td width="10%">操作</td>
        <td width="10%">操作后状态  </td>
        <td width="15%">操作时间</td>
        <td width="10%">操作人姓名</td>
        <td width="">备注</td>
      </tr>
    </thead>);
  }

  create_popup_tbody() {
    return(<tbody ref="popup_tbody">
      {this.state.lists.map((e,index)=>{
        return(<tr key={index}>
          <td>{e.cz}</td>
          <td>{e.czhzt}</td>
          <td>{e.czsj}</td>
          <td>{e.czrxm}</td>
          <td>{e.bz}</td>
        </tr>)
      })}
    </tbody>);
  }
  del_popup() {
    ReactDOM.unmountComponentAtNode(this.popup);
    this.popup.style.display='none';
  }

  get_lists() {
      /* 获取数据 */
    ajax({
      url:courseCenter.host+'getOperationList',
      data:{
        unifyCode:BluMUI.result.unifyCode,
        courseNo:this.props.Course,
        page:this.state.page,
        count:11
      },
      success:e=>{
        let datas=JSON.parse(e);
        this.setState({
          lists:datas.data.operationList,
          pages:datas.data.totalPages
        });
      }
    });
  }

  componentDidUpdate(preProps, preState) {
    if(preState.page!=this.state.page) {
      this.get_lists();
    }
  }

  componentDidMount() {
    document.getElementById('popup_body').onclick=e=>{
      console.log('popup_body click')
      // e.stopPropagation();
    };
    this.refs.close.onclick=this.del_popup.bind(this);
    // this.popup.onclick=this.del_popup.bind(this);
    this.get_lists();




  }

  render() {
    this.popup.style.display="block";
    return(<div id="popup_body">
      {this.create_popup_top()}
      <table id="serch_table">
        {this.create_popup_thead()}
        {this.create_popup_tbody()}
      </table>
      <BlueMUI_CreateFanye page={this.state.page} pages={this.state.pages} This={this} ref="fanye_in" />
    </div>);
  }
}


var BluMUI_M = {
  Create_options:BlueMUI_CreateOptions,
  Create_tabs:BlueMUI_CreateTabs,
  Create_list:BlueMUI_CreateList,
  Get_list:BlueMUI_GetList,
}

var BluMUI = {
	result: {},
	create: function (data, type, elem) {
		var props = data, Blu = BluMUI_M[type];
		this.result[props.id] = ReactDOM.render(<Blu {...props}/>, elem);    
	}
};
BluMUI.result.Get_list=BlueMUI_GetList;

export default BluMUI;
