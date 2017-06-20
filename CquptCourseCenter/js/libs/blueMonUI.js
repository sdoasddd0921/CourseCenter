
//=>>教学团队=========================================================================================================

import React from 'react';
import ReactDOM from 'react-dom';
var ajax = require('../libs/post_ajax.js');
var _count=13;



//创建绿色的表头（又是绿色= =！）
class BluMUI_CreateThead extends React.Component {
  constructor(props) {
    super(props);
    this.bind_pages=this.bind_pages.bind(this);
    this.state={
      lists:this.props.lists,
      page: this.props.page||1,
      totalPages:this.props.totalPages
    }
  }

  componentWillUnmount() {
    console.log("删除");
  }

  //根据权限创建绿色的表头（绿色……）
  thead_create() {
    // console.log(this.props.rank,"___rank__27")
    //创建表头内容数组
    let thead_items=[];
    //填充表头内容
    thead_items[0]=<td key='w1' width='5px'></td>;
    thead_items[1]=<td key='0' width='40px'>序号</td>;
    switch(BluMUI.result.Tab.state.Rank) {
      case 1:
        thead_items[2]=<td key='1' width='100px'>学院</td>;
        thead_items[3]=<td key='2' width='100px'>系部中心名称</td>;
        thead_items[4]=<td key='3' width='60px'>系部中心主任</td>;
        break;
      case 2:
      case 3:
        thead_items[2]=<td key='1' width='80px'>课程编号</td>;
        thead_items[3]=<td key='2' width='200px'>课程名称</td>;
        thead_items[4]=<td key='3' width='50px'>课程负责人</td>;
        thead_items[5]=<td key='4' width='200px'>教学团队成员</td>;
        break;
    }
    thead_items.push(<td key={thead_items.length+1} width='50px'>操作</td>);
    thead_items.push(<td key='w2' width='5px'></td>);
    return thead_items;
  }

  face_serch(p) {
    if(p==0||p==this.state.page) {
      console.log('阻止翻页')
      return;
    }
    let that=this;
    ajax({
      url:courseCenter.host+'CourseMatainMsg',
      data: {
        type: BluMUI.result.Tab.state.Rank,
        unifyCode: BluMUI.result.user_id,
        page: p,
        count:_count,
        selectName:document.getElementById('jxtdss').value
      },
      success: function(gets) {
        let list=JSON.parse(gets);
        console.log(list,'___68')
        that.setState({
          lists: list.data.courseList,
          page: p
        });
      }
    });
  }

  //绑定翻页按钮事件（提出来是因为原来需要初始化和重渲染后再绑定）
  bind_pages() {
    let that=this;
    let fanye_out=this.refs.fanye_out;
    // console.log(fanye_out)
    if(fanye_out.refs.popup_fanye){
      let fanye_bar=fanye_out.refs.popup_fanye.children;
      let yema=fanye_bar.length;
      for(let j=0;j<yema;j++) {
        if(fanye_bar[j].innerText!='...') {
          fanye_bar[j].onclick=function() {
            let click_page= +this.innerText;
            console.log("aaa",click_page)
            that.face_serch(click_page);
            // that.state.page=click_page;
          }
        }
      }
    }

    //搜索的前翻和后翻
    if(fanye_out.refs.next&&fanye_out.refs.pre) {
      fanye_out.refs.next.onclick=function() {
        that.face_serch(that.state.page+1>that.state.totalPages?0:that.state.page+1);
      }
      fanye_out.refs.pre.onclick=function() {
        that.face_serch(that.state.page-1<0?1:that.state.page-1);
      }
    }
  }

  //组件加载后执行的事件
  componentDidMount() {
    this.bind_pages();
  }

  //组件重渲染后执行的事件
  componentDidUpdate() {
    this.bind_pages();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps,"___nextprops")
    this.setState({
      lists:nextProps.lists,
      page:nextProps.page
    });
  }

  render() {
    console.log(this.state.lists,"___124")
    console.log(this.props.lists,"___123")
    return (<div>
      <table>
        <thead>
          <tr>{this.thead_create()}</tr>
        </thead>
        <BluMUI_CreateTbody Lists={this.state.lists} Rank={BluMUI.result.Tab.state.Rank} page={this.state.page} />
      </table>
      <BluMUI_Create_Fanye pages={this.state.totalPages} page={this.state.page} ref="fanye_out" />
    </div>);
  }
}
//创建表身
class BluMUI_CreateTbody extends React.Component {
  constructor(props) {
    super(props);
    this.create_list=this.create_list.bind(this);
    // this.state={
    //   Lists:this.props.Lists
    // }
  }
  //修改该组件的State（打算）

  option(data,event) {
    console.log(this.props.Rank,"___147")
    switch(this.props.Rank) {
      case 1:
      document.getElementById('body_head').style.display='none';
        ReactDOM.render(
          <BluMUI_CreateAdding Rank={BluMUI.result.Tab.state.Rank} Leaders={data.Liders} Jysh={data.Jysh} />,
          document.getElementById('list')
        );
        break;
      case 2:
      console.log(document.getElementById('out_serch'))
      document.getElementById('body_head').style.display='none';
      // document.getElementById('out_serch').style.display='none';
        let that=this;
        //获取教学团队成员信息
        // document.getElementById('body_head').style.display='none';
        ReactDOM.render(
          <BluMUI_CreateAdding Rank={BluMUI.result.Tab.state.Rank} Master={data.Master} Teachers={data.Teachers} Kcbh={data.Kcbh} Kcmc={data.Kcmc} />,
          document.getElementById('list')
        );
        break;
      case 3:
      console.log("LLLLLLLLLLLLLLLLL")
    document.getElementById('body_head').style.display='none';
        // console.log(data)
        // document.getElementById('body_head').style.display='none';
        ReactDOM.render(
          <BluMUI_CreateAdding Teachers={data.Teachers} Rank={BluMUI.result.Tab.state.Rank} Kcbh={data.Kcbh} Kcmc={data.Kcmc} />,
          document.getElementById('list')
        );
        break;
    }
    //将事件对象用来阻止链接跳转
    arguments[arguments.length-1].preventDefault();
  }

  create_list(all_lists) {
    if(all_lists.length==0) {
      return(<tr id='No-data'><td>
        <div className='no_data'>
          <img width='150px' height='150px' src="../../imgs/public/error.png"/>
          <br/>
          <span>没有数据</span>
        </div>
      </td></tr>);
    }
    let j=0;
    console.log(this.props.page,'___178')
    let lists=[];
    let teachers=[];//教师数组
    let end=all_lists.length;
    switch(BluMUI.result.Tab.state.Rank) {
      case 1:
        for(let i=0;i<end;i++) {
          lists.push(<tr key={i} style={{background:i%2==0?'#FFF':'#EEE'}}>
            <td></td>
            <td>{i+1+5*(this.props.page-1)}</td>
            <td>{all_lists[i].kkxymc}</td>
            <td>{all_lists[i].jysmc}</td>
            <td>{all_lists[i].officeLeadersName.map(e=><span key={e.jyszr}>{e.jyszr}</span>)}</td>
            <td><a href="#" onClick={this.option.bind(this,{
              Liders:all_lists[i].officeLeadersName,
              Kcbh:all_lists[i].kcbh,
              Kcmc:all_lists[i].kcmc,
              Jysh:all_lists[i].jysh
            })}>{all_lists[i].officeLeadersName.length?"修改":"添加"}</a></td>
            <td></td>
          </tr>);
          // lists.push(<tr className='tr_line' key={'line-'+i} ></tr>);
        }
        break;
      case 2:
        j=0;
        for(let i=0;i<end;i++) {
          teachers=[];
          // console.log(all_lists[i],'___204')
          all_lists[i].teacher.map(e=>{
            teachers.push(<span key={j++} >{e.xm}</span>);
          });

          lists.push(<tr key={i} style={{background:i%2==0?'#FFF':'#EEE'}}>
            <td></td>
            <td>{i+1+5*(this.props.page-1)}</td>
            <td>{all_lists[i].kcbh}</td>
            <td>{all_lists[i].kcmc}</td>
            <td>{all_lists[i].fzrxm}</td>
            <td>{teachers}</td>
            <td><a href="#" onClick={this.option.bind(this,{
              Teachers:all_lists[i].teacher,
              Master:all_lists[i].fzrxm?{xm:all_lists[i].fzrxm,sfrzh:all_lists[i].fzrsfrzh}:'',
              Kcbh:all_lists[i].kcbh,
              Kcmc:all_lists[i].kcmc
            })}>编辑</a></td>
            <td></td>
          </tr>);
          // lists.push(<tr className='tr_line' key={'line-'+i} ></tr>);
        }
        break;
      case 3:
        j=0;
        //过滤掉重复的教师信息
        for(let i=0;i<end;i++) {
          teachers=[];
          if(all_lists[i].teacher) {
            all_lists[i].teacher.map(e=>{
              teachers.push(<span key={j++} >{e.xm}</span>);
            });
          } else {
            teachers=[];
          }
          lists.push(<tr key={i} style={{background:i%2==0?'#FFF':'#EEE'}}>
            <td></td>
            <td>{i+1+5*(this.props.page-1)}</td>
            <td>{all_lists[i].kcbh}</td>
            <td>{all_lists[i].kcmc}</td>
            <td>{all_lists[i].fzrxm}</td>
            <td>{teachers}</td>
            <td><a href="#" onClick={this.option.bind(this,{
              Teachers:all_lists[i].teacher, 
              Kcbh:all_lists[i].kcbh, 
              Kcmc:all_lists[i].kcmc
            })}>编辑</a></td>
            <td></td>
          </tr>);
          // lists.push(<tr className='tr_line' key={'line-'+i} ></tr>);
          teachers=[];
        }
        break;
    }
    return lists;
  }
  render() {
    console.log(this.props.Rank,'___253')
    return (<tbody>{this.create_list(this.props.Lists)}</tbody>);
  }
}

//创建弹出层层
class BluMUI_CreatePopup extends React.Component {
  constructor(props) {
    super(props);
    this.popup_serch=this.popup_serch.bind(this);
    this.popup=document.getElementById('popup');
    this.choose_teachers=[];
    this.serch_name="";
    this.teacher_names={};
    this.Master="";
    //用于搜索用的state
    this.state={
      teachers:[],
      page:1,
      pages:0
    };
  }

  create_popup_top() {
    return(<div id="top">
      <span>{this.props.Title}</span>
      <span id="popup_close" ref="close">X</span>
    </div>);
  }

  create_popup_serch() {
    return(<div id="serch">
      <span id="popup_left">查找（姓名）</span>
      <input type="text" id="popup_serch" placeholder="请输入关键字……" ref="serch_value"/>
      <span id="popup_serch_button" ref="serch">搜 &nbsp;索</span>
    </div>);
  }

  create_popup_thead() {
    return(<thead>
      <tr>
        <td width="34px"></td>
        <td width="45px" className="input"><input type="checkbox" ref="popup_allcheck" /></td>
        <td width="184px">单位</td>
        <td width="130px">姓名</td>
        <td width="99px">统一认证码</td>
      </tr>
    </thead>);
  }

  create_popup_tbody() {
    let lists=[];
    let end=this.state.teachers.length;
    for(let i=0;i<end;i++) {
      // console.log(this.state.teachers[i],"___312")
      lists.push(<tr key={this.state.teachers[i].sfrzh}>
        <td>{i+1+10*(this.state.page-1)}</td>
        <td><input type="checkbox" value={JSON.stringify(this.state.teachers[i])} id={this.state.teachers[i].sfrzh} /></td>
        <td>{this.state.teachers[i].xymc}</td>
        <td>{this.state.teachers[i].xm}</td>
        <td>{this.state.teachers[i].sfrzh}</td>
      </tr>);
    }
    return(<tbody ref="popup_tbody">{lists}</tbody>);
  }

  create_popup_option() {
    return(<div id="popup_option">
      <span className="blue_btn" id="popup_ok" ref="OK">确定</span>
      <span className="white_btn" id="popup_return" ref="back">返回</span>
    </div>);
  }

  //搜索
  popup_serch(p,start) {
    if(p==0) {
      console.log('popup翻页阻止');
      return;
    }
    console.log(start,"___333")
    //每次发生ajax的时候清空候选数据与checkbox
    this.refs.popup_allcheck.checked=false;
    let inputs=this.refs.popup_tbody.getElementsByTagName('input');
    this.Master="";
    this.teacher_names={};
    this.choose_teachers=[];

    let end=inputs.length;
    for(let i=0;i<end;i++) {
      inputs[i].checked=false;
    }
    let that=this;
    ajax({
      url:courseCenter.host+'searchTeacherByName',
      data: {
        name: start||that.serch_name,
        page: p,
        count:10
      },
      success: function(gets) {
        let list=JSON.parse(gets);
        // console.log(list,"___436")
        if(list.data) {
          that.setState({
            teachers: list.data.teacherList,
            pages: list.data.totalPages,
            page: p
          });
        } else {
          that.setState({
            teachers:[],
            page:1,
            pages:0
          });
        }
      }
    });
  }

  //组件渲染完成后会执行的函数，可以在里面进行手动js事件绑定
  //手动绑定可以避免react自己的事件绑定不能阻止冒泡的坑
  //因为react的事件全部代理在document上面的
  componentDidMount(){
    let that=this;
    console.log("MOUNT");
    let hide_popup=function(){
      that.popup.style.display="none";
      ReactDOM.unmountComponentAtNode(document.getElementById('popup'));
      // document.getElementById('popup').innerHTML="";
      //清空搜索栏
      // that.refs.serch_value.value="";
    };
    //单击弹出窗后面的背景隐藏弹出层
    this.popup.onclick=hide_popup;
    //单击关闭按钮隐藏弹出层
    this.refs.close.onclick=hide_popup;
    //单击弹出窗的返回按钮隐藏弹出层
    this.refs.back.onclick=hide_popup;
    //阻止弹出窗body的单击事件冒泡
    document.getElementById('popup_body').onclick=function(e){
      e.stopPropagation();
    };

    //搜索按钮单击
    this.refs.serch.onclick=function() {
      that.serch_name=that.refs.serch_value.value;
      that.popup_serch(1);
    }

    //单击确定按钮
    // this.refs.OK.onclick=hide_popup;
    this.popup_serch(1,'init');
  }

  //重新渲染后的执行内容
  componentDidUpdate() {
    let that=this;

    //单击确认
    this.refs.OK.onclick=function() {
      if(that.refs.popup_tbody.children.length>0) {
        //确认请求  //权限2的确认操作
        if(that.props.Master) {
          that.props.callback({master:that.Master});
        } else {
          let Teachers=[];
          if(that.props.Rank==1) {
            that.choose_teachers.map(e=>{
              Teachers.push({
                sfrzh: e,
                jyszr: that.teacher_names[e]
              });
            });
          } else {
            that.choose_teachers.map(e=>{
              Teachers.push({
                sfrzh: e,
                xm: that.teacher_names[e]
              });
            });
          }
          that.props.callback(Teachers);
        }
      }
      //清空搜索栏
      // that.refs.serch_value.value="";
      that.popup.style.display="none";
      ReactDOM.unmountComponentAtNode(document.getElementById('popup'));
      console.log(that.props)
    }

    //全部打钩
    let inputs=that.refs.popup_tbody.getElementsByTagName('input');
    let end=inputs.length;
    console.log("end",end)
    if(!this.props.Master) {   //不是权限 1或者权限 2的 Master
      this.refs.popup_allcheck.onchange=function() {
        for(let i=0;i<end;i++) {
          inputs[i].checked=this.checked;
          inputs[i].onchange(0);
        }
      }
      
    } else {
      this.refs.popup_allcheck.style.display='none';
    }

    //单个打钩
    for(let j=0;j<end;j++) {
      inputs[j].onchange=function(a) {
        console.log("change!496___",a)
        if(a) {
          //取消“全部打钩”的钩
          that.refs.popup_allcheck.checked=false;
        }
        if(that.props.Master) {      //权限 1进入
          if(this.checked) {
            console.log("___value",JSON.parse(this.value))
            that.Master=JSON.parse(this.value);
            for(let k=0;k<end;k++) {
              inputs[k].checked=false;
              this.checked=true;
            }
          } else {
            that.Master="";
          }
        } else {     //不是唯一设置的课程负责人
          console.log("权限2——教师");
          if(this.checked) {
            that.choose_teachers.push(this.id);
            that.teacher_names[this.id]=JSON.parse(this.value).xm;
          } else {
            let index=that.choose_teachers.indexOf(this.id);
            if(index>-1) {
              that.choose_teachers.splice(index,1);
            }
            delete that.teacher_names[this.id];
          }
        }
      }
    }

    //fanye
    let fanye_in=this.refs.fanye_in;
    // console.log(fanye_in)
    if(fanye_in.refs.popup_fanye){
      let fanye_bar=fanye_in.refs.popup_fanye.children;
      let yema=fanye_bar.length;
      for(let j=0;j<yema;j++) {
        if(fanye_bar[j].innerText!='...') {
          fanye_bar[j].onclick=e=>{
            let click_page= +e.target.innerText;
            // that.state.page=click_page;
            that.popup_serch(click_page==this.state.page?0:click_page,that.serch_name||'init');
          }
        }
      }
    }

    //搜索的前翻和后翻
    if(fanye_in.refs.next&&fanye_in.refs.pre) {
      fanye_in.refs.next.onclick=function() {
        that.popup_serch(that.state.page+1>that.state.pages?0:that.state.page+1,that.serch_name||'inti');
      }
      fanye_in.refs.pre.onclick=function() {
        that.popup_serch(that.state.page-1<1?0:that.state.page-1,that.serch_name||'init');
      }
    }
  }

  render() {
    this.popup.style.display="block";
    return(<div id="popup_body">
      {this.create_popup_top()}
      {this.create_popup_serch()}
      <table id="serch_table">
        {this.create_popup_thead()}
        {this.create_popup_tbody()}
      </table>
      <BluMUI_Create_Fanye page={this.state.page} pages={this.state.pages} ref="fanye_in" />
      {this.create_popup_option()}
    </div>);
  }
}


class BluMUI_CreateAdding extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.Teachers,'___577')
    this.del_teacher=this.del_teacher.bind(this);
    this.save_adding=this.save_adding.bind(this);
    this.back=this.back.bind(this);
    this.create_tdjs=this.create_tdjs.bind(this);
    this.state={
      teachers:this.props.Teachers||this.props.Leaders,
      // leaders:this.props.Leaders||[],
      master:this.props.Master,
    }
  }
  del_teacher(a) {
    let that=this;

    if(typeof a == "number") {
      let teacher_cache=this.state.teachers;
      teacher_cache.splice(a,1);
      this.setState({teachers:teacher_cache});
    } else {
      console.log(("master"))
      this.setState({master:""},function(){console.log(that.state)});
    }
  }

  back() {
    let that=this;
    console.log(this.props,'602')
    ajax({
      url:courseCenter.host+'CourseMatainMsg',
      data:{
        type:that.props.Rank,
        unifyCode:BluMUI.result.user_id,
        page:BluMUI.result.Title.state.page,
        count:_count,
        selectName:document.getElementById('jxtdss').value
      },
      success:function(gets) {
        console.log('BACK')
        document.getElementById('body_head').style.display='block';
        let data=JSON.parse(gets);
        BluMUI.create({
          id:'Title',
          rank:that.props.Rank,
          page:BluMUI.result.Title.state.page,
          lists:data.data.courseList,
          totalPages:data.data.totalPages
        },
        'CreateTableTitle',
        document.getElementById('list'));
      }
    });
  }

  save_adding() {
    let that=this;

    console.log(this.state,'___629');
    if(!this.state.master&&this.props.Rank==2) {
      alert("请添加负责人！");
      return;
    }
    if(this.props.Rank==3) {
      if(this.refs.Js.value==='') {
        alert('请填写团队介绍！');
        return;
      }
      let teacher_codes="";
      this.state.teachers.map(e=>{
        teacher_codes += e.sfrzh +",";
      });
      //去掉字符串末尾的","
      teacher_codes=teacher_codes.substring(0,teacher_codes.length-1);
      ajax({
        url:courseCenter.host+'updateTeachingTeam',
        data: {
          kcbh: that.props.Kcbh,
          kcmc: that.props.Kcmc,
          unifyCode: BluMUI.result.user_id,
          unifyCodes: teacher_codes,
          tdjs:document.getElementById('tdjs_text').value
        },
        success: function(gets){
          if(JSON.parse(gets).meta.msg=='success') {
            ajax({
              url:courseCenter.host+'CourseMatainMsg',
              data:{
                type:3,
                unifyCode:BluMUI.result.user_id,
                // page:BluMUI.result.Title.state.page,
                page:BluMUI.result.Title.state.page,
                count:_count,
                selectName:document.getElementById('jxtdss').value
              },
              success:function(gets) {
        document.getElementById('body_head').style.display='block';
                let data=JSON.parse(gets);
                console.log('___665',data)
                BluMUI.create({
                  id:'Title',
                  rank:3,
                  // page:BluMUI.result.Title.state.page,
                  page:BluMUI.result.Title.state.page,
                  lists:data.data.courseList,
                  totalPages:data.data.totalPages
                },
                'CreateTableTitle',
                document.getElementById('list'));
              }
            });
          }
        }
      });
    } else if(this.props.Rank==2) {
      let teacher_codes="";
      this.state.teachers.map(e=>{
        teacher_codes += e.sfrzh +",";
      });
      //去掉字符串末尾的","
      teacher_codes=teacher_codes.substring(0,teacher_codes.length-1);
      ajax({
        url:courseCenter.host+'updateCoursePrincipal',
        data: {
          kcbh: that.props.Kcbh,
          kcmc: that.props.Kcmc,
          unifyCode: BluMUI.result.user_id,
          unifyCodes: teacher_codes,
          principalUnifyCode:that.state.master.sfrzh
        },
        success: function(gets){
          if(JSON.parse(gets).meta.msg=='success') {
            ajax({
              url:courseCenter.host+'CourseMatainMsg',
              data:{
                type:2,
                unifyCode:BluMUI.result.user_id,
                // page:BluMUI.result.Title.state.page,
                page:BluMUI.result.Title.state.page,
                count:_count,
                selectName:document.getElementById('jxtdss').value
              },
              success:function(gets) {
        document.getElementById('body_head').style.display='block';
                let data=JSON.parse(gets);
                console.log(data,'___706')
                BluMUI.create({
                  id:'Title',
                  rank:2,
                  // page:BluMUI.result.Title.state.page,
                  page:BluMUI.result.Title.state.page,
                  lists:data.data.courseList,
                  totalPages:data.data.totalPages
                },
                'CreateTableTitle',
                document.getElementById('list'));
              }
            });
          }
        }
      });
    } else if(this.props.Rank==1) {
      let teacher_codes="";
      this.state.teachers.map(e=>{
        teacher_codes += e.sfrzh +",";
      });
      //去掉字符串末尾的","
      teacher_codes=teacher_codes.substring(0,teacher_codes.length-1);
      ajax({
        url:courseCenter.host+'updateTeachingOfficeLeader',
        data: {
          jysh:this.props.Jysh,
          unifyCode: BluMUI.result.user_id,
          leaderUnifyCode: teacher_codes
        },
        success: function(gets){
          if(JSON.parse(gets).meta.msg=='success') {
            ajax({
              url:courseCenter.host+'CourseMatainMsg',
              data:{
                type:1,
                unifyCode:BluMUI.result.user_id,
                // page:BluMUI.result.Title.state.page,
                page:BluMUI.result.Title.state.page,
                count:_count,
                selectName:document.getElementById('jxtdss').value
              },
              success:function(gets) {
        document.getElementById('body_head').style.display='block';
                let data=JSON.parse(gets);
                console.log(data,'___706')
                BluMUI.create({
                  id:'Title',
                  rank:1,
                  // page:BluMUI.result.Title.state.page,
                  page:BluMUI.result.Title.state.page,
                  lists:data.data.courseList,
                  totalPages:data.data.totalPages
                },
                'CreateTableTitle',
                document.getElementById('list'));
              }
            });
          }
        }
      });
    }
  }

  create_fuzeren() {
    let fuzeren;
    let mst;
    console.log(this.props,'___695')

    if(this.props.Rank==2) {
      if(this.state.master.xm) {
        mst=<div id="master">
          {this.state.master&&<span className="blue_btn" key={this.state.master.sfrzh}>
            {this.state.master.xm}
            <img src="../../imgs/public/teacher_del.png" onClick={this.del_teacher} />
          </span>}
        </div>;
      }
      fuzeren=<div id="fuzeren">
        <div className="list_left">
          <img src="../../imgs/public/red_star.png" />
          <span>&nbsp;课程负责人</span>
        </div>
        <div className="list_right">
          {mst}
          <span className="blue_btn" ref="adding_fuzeren">{(this.state.master.xm?"修改":"添加")+"负责人"}</span>
        </div>
      </div>;
    } else { fuzeren=null; }
    return fuzeren;
  }

  create_adding_left() {
    let leader=<span><span style={{color:'red',position:'relative',top:'2px'}}>*&nbsp;</span>系部中心主任</span>;
    let jiaoshi=<span>任课教师</span>;
    return(<div className="list_left">
      <span>{this.props.Rank==1?leader:jiaoshi}</span>
    </div>);
  }

  create_adding_right() {
    let teachers=[];
    let end=this.state.teachers.length;
    console.log(this.state,"adding_teachers_state___345")
    for(let i=0;i<end;i++) {
      teachers.push(
        <span className="blue_btn" key={this.state.teachers[i].sfrzh}>
          {this.props.Rank==1?this.state.teachers[i].jyszr:this.state.teachers[i].xm}
          <img src="../../imgs/public/teacher_del.png" onClick={this.del_teacher.bind(this,i)} />
        </span>
      )
    }

    return(<div className="list_right">
      <div id="teachers">{teachers}</div>
      <span className="blue_btn" ref="adding_teachers">{this.props.Rank==1?'添加系部中心主任':'添加授课教师'}</span>
      <br/>
      <span className="caozuo" id="Adding_baocun" ref="save_adding" onClick={this.save_adding} >保存</span>
      <span className="caozuo" id="Adding_fanhui" ref="back" onClick={this.back} >返回</span>
    </div>);
  }

  create_tdjs() {
    if(this.props.Rank!=3) return;
    return(<div id="tdjs">
      <span style={{color:'red'}}>*</span><span style={{marginLeft:5}}>团队介绍</span>
      <textarea name="TDJS" id="tdjs_text" cols="30" rows="10" ref='Js'></textarea>
      <span id="Js_warn" ref='Js_warn' style={{color:'red'}}></span>
    </div>);
  }

  //组件第一次渲染后执行的内容
  componentDidMount() {
    if(this.props.Rank==3) {
      ajax({
        url:courseCenter.host+'getTeachingTeamPageMsg',
        data:{
          kcbh:this.props.Kcbh,
          unifyCode:BluMUI.result.user_id
        },
        success:gets=>{
          document.getElementById('tdjs_text').value=JSON.parse(gets).data.tdjs;
        }
      });
    }
    let that=this;

    let change=function(dat) {
      that.setState(dat);
    };
    let add_teacher=function(tea) {
      console.log(that.state.teachers,"___639");

      let newTeachers=that.state.teachers.concat(tea);
      let result=[];
      for(let i=0;i<newTeachers.length;i++) {
        let flag=0;
        for(let j=0;j<result.length;j++) {
          if(newTeachers[i].sfrzh==result[j].sfrzh) {
            flag++;
          }
        }
        if(flag==0) {
          result.push(newTeachers[i]);
        }
      }
      // console.log("result:_",result);
      that.setState({teachers:result});
    }

    if(this.refs.adding_fuzeren) {   //存在按钮的时候才能绑定事件
      this.refs.adding_fuzeren.onclick=function() {
        ReactDOM.render(
          <BluMUI_CreatePopup Rank={that.props.Rank} Master={true} Title="选择教师" callback={change} />,
          document.getElementById('popup')
        );
      }
    }

    this.refs.adding_teachers.onclick=function() {
      if(that.props.Rank==1) {
        ReactDOM.render(
          <BluMUI_CreatePopup Rank={that.props.Rank} Master={false} Title="选择系部中心主任" callback={add_teacher} />,
          document.getElementById('popup')
        );
      } else {
        ReactDOM.render(
          <BluMUI_CreatePopup Rank={that.props.Rank} Master={false} Title="选择教师" callback={add_teacher} />,
          document.getElementById('popup')
        );
      }
    }
    if(this.props.Rank==3) {
      this.refs.Js.onchange=e=>{
        if(e.target.value==='') {
          this.refs.Js_warn.innerText='请输入团队介绍！';
        } else {
          this.refs.Js_warn.innerText='';
        }
      }
    }

  }

  render() {
    return(<div id="adding">
      {this.create_tdjs()}
      {this.create_fuzeren()}
      {this.create_adding_left()}
      {this.create_adding_right()}
    </div>);
  }
}


class BluMUI_Create_Fanye extends React.Component {
  constructor(props) {
    super(props);
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
    if(this.props.pages==0) {
      return <div></div>;
    }
    if(this.props.pages<=7) {
      for(let i=2;i<this.props.pages;i++) {
        if(i==this.props.page) {
          style=style_on;
        } else {
          style={};
        }
        fanye.push(<li key={i} style={style}>{i}</li>);
      }
    } else {
      if(this.props.page<5) {
        for(let j=2;j<=6;j++) {
          if(j==this.props.page) {
            style=style_on;
          } else {
            style={};
          }
          fanye.push(<li key={j} style={style}>{j}</li>);
        }
        fanye.push(<li key='end' >...</li>);
      } else if(this.props.page>this.props.pages-4) {
        for(let k=this.props.pages-5;k<this.props.pages;k++) {
          if(k==this.props.page) {
            style=style_on;
          } else {
            style={};
          }
          fanye.push(<li key={k} style={style}>{k}</li>);
        }
        fanye.unshift(<li key='start' >...</li>);
      } else {
        for(let l=this.props.page-2;l<=this.props.page+2; l++) {
          if(l==this.props.page) {
            style=style_on;
          } else {
            style={};
          }
          fanye.push(<li key={l} style={style}>{l}</li>);
        }
        fanye.unshift(<li key='start' >...</li>);
        fanye.push(<li key='end' >...</li>);
      }
    }
    if(this.props.page==1) {
      if(this.props.pages==1) {
        fanye=[<li key={1} style={style_on} >{1}</li>];
      } else {
        fanye.unshift(<li key={1} style={style_on} >{1}</li>);
        fanye.push(<li key={this.props.pages}>{this.props.pages}</li>);
      }
    } else if(this.props.page==this.props.pages) {
      fanye.unshift(<li key={1}>{1}</li>);
      fanye.push(<li key={this.props.pages} style={style_on} >{this.props.pages}</li>);
    } else {
      fanye.unshift(<li key={1}>{1}</li>);
      fanye.push(<li key={this.props.pages}>{this.props.pages}</li>);
    }
    return(<div className="fanye">
      <div className="popup_fanye_pre" ref="pre"><img src="../../imgs/courseAudit/fanye_left.png"/></div>
      <ul ref="popup_fanye">
        {fanye}
      </ul>
      <div className="popup_fanye_next" ref="next"><img src="../../imgs/courseAudit/fanye_right.png"/></div>
    </div>);
  }

  render() {
    return this.create_popup_fanye();
  }

}

//tab标签
class BluMUI_CreateTab extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props,'___982')
    this.state={
      Rank: +this.props.role[0].subModule,
    };
    this.show_list=this.show_list.bind(this);
  }

  componentDidMount() {
    console.log(this.refs,"___940")
    console.log(this.state.Rank,"___941")
    //改变第一个tab标签的字体为粗体
    this.refs['Rank-'+this.state.Rank].style.borderBottomColor='#009361';
    let that=this;
    for(let i=0; i<this.props.role.length; i++) {
      this.refs['Rank-'+this.props.role[i].subModule].onclick=function(e) {
        document.getElementById('jxtdss').value='';
        // BluMUI.result.Title.setState({page:1});
        that.setState({Rank: +that.props.role[i].subModule},tab_change);
      }
    }
    // console.log("?????",BluMUI.result.Title)
    // BluMUI.result.Title.setState({page:1});

    let tab_change=function() {
      that.props.role.map(e=>{
        that.refs['Rank-'+e.subModule].style.borderBottomColor='#FFF'
      });
      that.refs['Rank-'+that.state.Rank].style.borderBottomColor='#009361';
    }

    /*绑定搜素*/
    document.getElementById('serch_btn').onclick=function() {
      ajax({
        url:courseCenter.host+'CourseMatainMsg',
        data:{
          page:1,
          count:_count,
          type:that.state.Rank,
          unifyCode:BluMUI.result.user_id,
          selectName:document.getElementById('jxtdss').value
        },
        success:function(get) {
          let datas=JSON.parse(get);
          console.log("搜索:",datas);
          BluMUI.result.Title.setState({
            lists:datas.data.courseList,
            page:1,
            totalPages:datas.data.totalPages
          });
        }
      });
    }
  }

  show_list() {
    let that=this;
    ajax({
      url:courseCenter.host+'CourseMatainMsg',
      data:{
        type:that.state.Rank,
        unifyCode:BluMUI.result.user_id,
        page:1,
        count:_count,
        selectName:document.getElementById('jxtdss').value
      },
      success:function(gets) {
        let datas=JSON.parse(gets);
        console.log('newajaxdatas',datas)
        if(!BluMUI.result.Title) {
          BluMUI.create({
            id:'Title',
            rank:that.state.Rank,
            lists:datas.data.courseList,
            page:1,
            totalPages:datas.data.totalPages
          },
          'CreateTableTitle',
          document.getElementById('list'));
        } else {
          BluMUI.result.Title.setState({
            rank:that.state.Rank,
            lists:datas.data.courseList,
            page:1,
            totalPages:datas.data.totalPages
          });
        }
      }
    });
  }

  render() {
    if(this.state.Rank==1) {
      document.getElementById('serch_title').innerText='系部中心名称';
    } else {
      document.getElementById('serch_title').innerText='课程名称';
    }
    let tabs=[];
    this.props.role.map(e=>{
      tabs.push(<li key={e.cdxh} ref={'Rank-'+e.subModule}>{e.cdmc}</li>);
      tabs.push(<li key={'line-'+e.cdxh} className='center_line'></li>);
    });
    tabs.pop();
    this.show_list();
    return (<ul ref='tab'>{tabs}</ul>);
  }
}






//=>>课程简介============================================================================================================================

class BluMUI_CreateJianjie extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let JS;
    if(this.props.Jianjie=='') {
      JS=<p style={{textAlign: 'center'}}>没有数据！</p>;
    } else {
      JS=this.props.Jianjie;
    }
    return(<div>{JS}</div>);
  }
}




//=>>课程管理=========================================================================================




class BluMUI_CreateFanye extends React.Component {
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



  render() {
    // console.log(this.props,"fanye")
    return this.create_popup_fanye();
  }
}



//入口
class BluMUI_CreateTabs extends React.Component {
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
class BluMUI_CreateOptions extends React.Component {
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
    //查询列表
    BluMUI_GetList(this.state.subModule,this.state.page,this.state.course_state,this.refs.serchValue.value,this);
    let that=this;
    this.refs.allchecked.checked=true;
    this.refs.serchBtn.onclick=e=>{
      BluMUI_GetList(
        this.state.subModule,
        1,
        this.state.course_state,
        document.getElementById('jxtdss').value
      );
    }
  }
  componentWillUpdate(nextProps, nextState) {
    BluMUI_GetList(nextState.subModule,nextState.page,nextState.course_state,this.refs.serchValue.value,this);

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
      four=<div id="double_option" style={{display:'inline-block'}}>
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
        <li><input type="checkbox" ref='check-3' value="3" id="itm3" onChange={this.change_course_state}/><label htmlFor="itm3"></label>驳回待修改</li>
        <li><input type="checkbox" ref='check-2' value="2" id="itm2" onChange={this.change_course_state}/><label htmlFor="itm2"></label>待审</li>
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
var BluMUI_GetList=function(Module,P,Cs,Serch,This) {
  console.log("GetList___314",Module)
  ajax({
    url:courseCenter.host+'getCourseList',
    data:{
      unifyCode:BluMUI.result.unifyCode,
      courseState:'['+Cs+']',
      page:P,
      count:5,
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


        ReactDOM.render(
          <BluMUI_CreateFanye pages={datas.data.totalPages} page={P} This={This}/>,
          document.getElementById('React_fanye')
        );
      // }
      // BluMUI.result.Options.pages=datas.data.totalPages;
    }
  });
}

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
      note:note,
      type:op
    },
    success:function(gets) {
      let datas=JSON.parse(gets);
      BluMUI.result.Tab.change_subModule('audit');
    }
  });
}

//显示列表
class BluMUI_CreateList extends React.Component {
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
        window.location.href='classManageCheck.html?classId='+a;
        console.log('原来的审核,现在的 提交/审核')
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
        window.location.href='classManageSpotCheck.html?classId='+a;
        break;
      case '历史':
        console.log('历史');
        Show_lishi(a);
        break;
      case '系部中心主任审核':

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
    this.state.Lists.map(e=>{
      let check;
      let ops=[];
      if(BluMUI.result.Tab.state.subModule=='audit') {
        check=<td width="3%">
          <input type="checkbox" value={e.kcbh} id={e.kcbh} onChange={this.check.bind(this,e.kcbh)}/>
          <label htmlFor={e.kcbh}></label>
        </td>;
      }
      console.log('___521',e)
        e.cz.map(f=>{
          op_func=f.able?this.operation.bind(this,f.name,e.kcbh):'';
          ops.push(<span key={f.name} onClick={op_func} className={f.able?'op_on':''}>{f.name}</span>)
        });
        ops.push(<span key='lish' onClick={this.operation.bind(this,'历史',e.kcbh)} className='op_on'>历史查询</span>)

      list.push(<tr key={e.kcbh}>
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
      list.push(<tr key={'line'+e.kcbh} className='list_line' ></tr>)
    });
    list.pop();
    return list;
  }

  componentDidUpdate() {
    // this.refs.AC.checked=false;
    if(BluMUI.result.Tab.state.subModule=='audit') {
      Array().map.call(
        document.getElementById('center_table').getElementsByTagName('input'),
        e=>{e.checked=false;}
      );
    }
    // this.get_list(newProps.subModule);
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
      check=<td width="3%"><input type="checkbox" value="0" id="allcheck" onChange={this.allcheck} ref='allcheck' /><label htmlFor="allcheck"></label><span id="quanxuan">全选</span></td>;
    }
    // console.log(this.props,'___184');
    return(<table id="center_table">
      <thead>
        <tr>
          <td width='20px'></td>
          {check}
          <td width="16%">课程编号</td>
          <td width="20%">课程名称</td>
          <td width="20%">教学机构名称</td>
          <td width="14%">最近更新时间</td>
          <td width="15%">课程状态</td>
          <td width="8%">操作</td>
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
    <BluMUI_CreateLishi Course={course_id}/>,
    document.getElementById('popup')
  );
}

//创建弹出层层(历史)
class BluMUI_CreateLishi extends React.Component {
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
      <BluMUI_CreateFanye page={this.state.page} pages={this.state.pages} This={this} ref="fanye_in" />
    </div>);
  }
}




// =>>课程首页===============================================================================================


class BluMUI_Review extends React.Component {
  constructor(props) {
    super(props);
    this._clickStar = this._clickStar.bind(this);
    this.state = {
      choiced: null,
      curIndex: this.props.starNum
    };
  }
  componentWillMount() {
    var len,
      i,
      result = [];
    if (this.props.starNum <= this.props.num)
      len = this.props.starNum;
    else
      len = this.props.num;
    for (i = 1; i <= this.props.num; i++) {
      if (i <= len)
        result.push(1);
      else
        result.push(0);
    }
    this.setState({
      choiced: result
    })
  }
  _clickStar(e) {
    var index = parseInt(e.target.getAttribute('data-key')) + 1,
      len,
      i,
      result = [];
    for (i = 1; i <= this.props.num; i++) {
      if (this.state.curIndex != index) {
        if (i <= index)
          result.push(1);
        else
          result.push(0);
      } else {
        if (this.state.choiced[0] == 0 && i <= index) {
          result.push(1);
        } else {
          result.push(0);
          index = 0;
        }
      }
    }
    this.props.callback(index);
    this.setState({
      choiced: result,
      curIndex: index
    })
  }
  _createStar() {
    var i,
      len,
      starList = [];
    for (i = 0, len = this.props.num; i <len; i++) {
      starList.push( <span className = { this.state.choiced[i] == 1 ? 'star onstar' : 'star nostar' }
        key = { i }
        data-key = { i }
        onClick = { this.props.enable ? this._clickStar : function() {} }> </span>
      );
    }
    return starList;
  }
  render() {
    return ( <div id = { this.props.id }
      className = { 'BluMUI_Review ' + this.props.extClass }>
      <span className = 'name'> { this.props.name } </span> { this._createStar() } </div>
    );
  }
}
//任课教师
class BluMUI_Teachers extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let teachers=[];
    let teacher=[];
    let fuzeren;
    this.props.teachers.map(e => {
      if (e.jslx == '负责人') {
        fuzeren = 
          <tr>
            <td className="down">
              <img src="../../imgs/home-course/home_teacher.png" />
            </td>
            <td className="down">
              <a href="javascript:void(0);">
                { e.xm }(<span style={{color:'red'}}>负责人</span>)
                <br/>
                <span>{ e.xymc }</span>
              </a>
            </td>
          </tr>;        
      } else {
        teachers.push( 
          <tr key={e.xm}>
            <td className="down">
              <img src="../../imgs/home-course/home_teacher.png" />
            </td>
            <td className="down">
              <a href="javascript:void(0);">{ e.xm }
                <br />
                <span>{ e.xymc }</span>
              </a>
            </td>
          </tr>
        );
      }
    });
    if(fuzeren) {
      if(teachers.length>2) {
        teacher[0]=teachers[0];
        teacher[1]=teachers[1];
      } else {
        teacher=teachers;
      }
    } else {
      if(teachers.length>3) {
        teacher[0]=teachers[0];
        teacher[1]=teachers[1];
        teacher[2]=teachers[2];
      } else {
        teacher=teachers;
      }
    }
    return (
      <tbody>
        {fuzeren}
        {teacher}
      </tbody>
    );
  }
}

//全部显示
class BluMUI_ShowAll extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let items=[];
    this.props.xueyuan.data.map(e=>{
      let listitem=[];
      e.zy.map(m=>{
        listitem.push(<li key={m.zyh}>{'-'+m.zymc}</li>);
      })
      items.push(
        <li key={e.xyh}>
          <ul>
            <b>{e.xymc}</b>
            <li>
              <ul>{listitem}</ul>
            </li>
          </ul>
        </li>
      );
    });
    return (<ul>{items}</ul>)
  }
}





// =>>团队展示============================================================================================================================




function BluMUI_Js(props) {
  console.log(props)
  return(<div id='tdjs'>{props.Js}</div>)
}

class BluMUI_Fuzeren extends React.Component {
  constructor(props) {
    super(props);
    // this.create_fuzeren=this.create_fuzeren.bind(this);
  }
  create_fuzeren() {
    let fuzeren=[];
    this.props.Fuzeren.map(e=>{
      fuzeren.push(<div className="fuzeren" key={e.xm}>
        <img src="../../imgs/team_show/teacher_l.png" width='182px' height='182px'/>
        <div className="msg">
          <span>姓名：{e.xm}</span>
          <span>学院：<span className="xueyuan">{e.xymc}</span></span>
        </div>
      </div>);
    });
    return fuzeren;
  }
  render() {
    return(<div id="fuzeren">{this.create_fuzeren()}</div>);
  }
}

class BluMUI_Teachers extends React.Component {
  constructor(props) {
    super(props);
  }
  create_teachers() {
    let teachers=[];
    this.props.Teachers.map(e=>{
      teachers.push(<div className="teachers" key={e.xm}>
        <img src="../../imgs/team_show/teacher_s.png"/>
        <br/><br/>
        <p>{e.xm}</p>
        <p className="xy">{e.xymc}</p>
      </div>);
    });
    return teachers;
  }
  render() {
    return(<div id="teachers">{this.create_teachers()}</div>);
  }
}




// =>>学习资源=============================================================================================





 // 左侧导航
class BluMUI_CreateNav extends React.Component {
  constructor(props) {
    super(props);
    this.choose=this.choose.bind(this);
    this.set_nav=this.set_nav.bind(this);
    console.log(this.props,'___15')
    // this.nav_state=[];
    this.state={
      Nav:this.props.module||'a'
    }
  }

  componentDidMount() {
    this.set_nav();
  }
  componentDidUpdate(prevProps, prevState) {
    this.refs[prevState.Nav].style.background='#FFF';
    // this.refs[prevState.Nav].children[0].style.background='#666';
    this.refs[prevState.Nav].children[0].style.color='#333';
    this.set_nav();
  }

  set_nav() {
    let nav=this.refs[this.state.Nav];
    nav.style.background='#007A51';
    // nav.children[0].style.background='#FFF';
    nav.children[0].style.color='#FFF';
    Show_nav_item(this.state.Nav);
  }

  choose(state) {
    let prop={};
    this.setState({Nav:state});
  }

  render() {
    return (<ul id="left">
      <li ref='a' onClick={this.choose.bind(this,'a')}><span>视频</span></li>
      <li ref='b' onClick={this.choose.bind(this,'b')}><span>讲义</span></li>
      <li ref='c' onClick={this.choose.bind(this,'c')}><span>作业</span></li>
      <li ref='d' onClick={this.choose.bind(this,'d')}><span>习（试）题库</span></li>
      <li ref='e' onClick={this.choose.bind(this,'e')}><span>网络学习资源</span></li>
      <li ref='f' onClick={this.choose.bind(this,'f')}><span>材料，参考书</span></li>
    </ul>);
  }
}

var Show_nav_item=function(prop) {
  let Comps={
    a:BluMUI_Create_a,
    b:BluMUI_Create_b,
    c:BluMUI_Create_c,
    d:BluMUI_Create_d,
    e:BluMUI_Create_e,
    f:BluMUI_Create_f,
  };
  let url;
  let data;
  let Comp=Comps[prop];
  let num=['a','b','c','d','e']
  if(prop=='f') {
    url=courseCenter.host+'getTextbookResourceMsg';
    data={
      unifyCode:BluMUI.result.config.user_id,
      kcbh:BluMUI.result.config.course_id,
      place:2,
    };
  } else {
    url=courseCenter.host+'getStudyResourceMsg';
    data={
      unifyCode:BluMUI.result.config.user_id,
      kcbh:BluMUI.result.config.course_id,
      place:2,
      zylb:prop=='b'?21:1+num.indexOf(prop)
    };
  }
  ajax({
    url:url,
    data:data,
    success:function(gets) {
      let datas=JSON.parse(gets);
      // if(datas.meta.result==101) {
      //   window.location.href='error1.html';
      // } else if(datas.meta.result==102) {
      //   window.location.href='error2.html';
      // }
      console.log(datas);
      ReactDOM.unmountComponentAtNode(document.getElementById('React_right'));
      ReactDOM.render(
        <Comp {...datas}/>,
        document.getElementById('React_right')
      );
    }
  });
}
function check() {
  if(this.props.meta.result==101) {
    return(<div id="error" key='error'>
      <img src="../../imgs/public/error.png" alt="error"/>
      <span>没有数据</span>
    </div>);
  } else if(this.props.meta.result==102) {
    return(<div id="error" key='error'>
      <img src="../../imgs/public/error.png" alt="error"/>
      <span>正在维护</span>
    </div>);
  }
  return false;
}

// 导航的子项目
//视频
class BluMUI_Create_a extends React.Component {
  constructor(props) {
    super(props);
    this.create_shipin=this.create_shipin.bind(this);
    this.create_other_shipin=this.create_other_shipin.bind(this);
    this.up=[];
    this.down=[];
  }

  create_shipin() {
    let back=[];
    back.push(Create_tab('微视频'));
    let flag = check.call(this);
    if(flag) return flag;
    this.props.data.map(e=>{
      if(!e.wlxxzylj) {
        back.push(<div className="shipin" key={e.id}>
          <a target="view_window" href={'courseVideo.html?fileName='+e.xywjm}>
            <img src="../../imgs/classListInfShow/courseShow/shipin.png"/>
          </a>
          <br/>
          <span>{e.ywjm.split('.')[0]}</span>
        </div>);
      } else {
        this.down.push(e);
      }
    });
    if(back.length==1) {
      back.push(<div key='space' style={{height:'100px',width:'1px'}}></div>);
    }
    return back;
  }

  create_other_shipin() {
    let back=[];
    back.push(Create_tab('录播视频'));
    let flag = check.call(this);
    if(flag) return;
    this.down.map(e=>{
      back.push(<a target="view_window" href={e.wlxxzylj} key={e.id}>{e.ljmc}</a>)
    })
    if(back.length==1) {
      back.push(<div key='space' style={{height:'100px',width:'1px'}}></div>);
    }
    return back;
  }

  render() {
    console.log(this.props)
    return(<div id='right'>
      {this.create_shipin()}
      {this.create_other_shipin()}
    </div>);
  }
}

/* 在线展示 */
var config= { // flexpaper配置选项
  Scale : 1,
  ZoomTransition : 'easeOut',
  ZoomTime : 0.5,
  ZoomInterval : 0.2,
  FitPageOnLoad : true,
  FitWidthOnLoad : true,
  FullScreenAsMaxWindow : false,
  ProgressiveLoading : true,
  MinZoomSize : 0.2,
  MaxZoomSize : 5,
  SearchMatchAll : false,
  InitViewMode : 'Portrait',
  RenderingOrder : 'flash',
  StartAtPage : '',
  ViewModeToolsVisible : true,
  ZoomToolsVisible : true,
  NavToolsVisible : true,
  CursorToolsVisible : true,
  SearchToolsVisible :true,
  WMode : 'window',
  localeChain: 'zh_CN'
};
var swfURL = courseCenter.host + 'CquptCourseCenter/pages/classInfShow/docs/CourseCenterAttachment/';

//讲义
class BluMUI_Create_b extends React.Component {
  constructor(props) {
    super(props);
    // this.create_jiangyi=this.create_jiangyi.bind(this);
    this.jiangyi=false;
    this.other=false;
    this.ziyuan=false;
    this.default_kcbh='';
  }
  xiazai(link) {
    this.refs.DOWNLOAD.src=courseCenter.host+'fileDownLoad?name='+link.split('.')[0]+'&oName='+link;
  }

  componentDidMount() {
    console.log('___247',this.jiangyi,this.other)
    if(this.other&&this.jiangyi) {
      this.refs.right.innerHTML="<div id='error' key='error'><img src='../../imgs/public/error.png' alt='error'/><span>没有数据</span></div>";
    } else {
      this.show(this.default_kcbh);
    }
  }

  show(No) {
    if(No) {
      config.SWFFile = swfURL + No.xyswjm;
      $('#preview').FlexPaperViewer(
        {
          config: config
        }
      );
      console.log(No)
      console.log('config:',config.SWFFile)
      if(No.sfnxz==1) {
        // this.refs.fujian_download.innerText
        ReactDOM.render(
          <div>
            <div style={{
              width:'24px',
              height:'24px',
              borderRadius:'50%',
              display:'inline-block',
              overflow:'hidden',
              lineHeight:'24px'
            }}>
              <img src="../../imgs/classListInfShow/courseShow/ziyuan.png" style={{
                height:'50px',
                width:'50px',
                borderRadius:'50%',
                position:'relative',
                top:'-13px',
                left:'-13px'
              }}/>
            </div>
            <a href="javascript:void(0)" onClick={this.xiazai.bind(this,No.ywjm)}>下载讲义</a>
          </div>,
          document.getElementById('Down')
        );
      }
    }
  }

  create_jiangyi() {
    this.jiangyi = check.call(this);
    console.log("讲义：",this.props)
    let back = [];
    back.push(Create_tab('讲义'));
    if(this.jiangyi) {
      back.push(<div key="no_data" style={{width:"100%",height:"100px"}}></div>);
    } else {
      this.default_kcbh=this.props.data[0];
      console.log('默认：',this.default_kcbh)
      this.props.data.map(e=>{
        back.push(<a href="javascript:void(0)" key={e.id} onClick={this.show.bind(this,e)}>{e.ywjm}</a>);
      });
    }
    return back;
  }

  create_other() {
    let back=[];
    back.push(Create_tab('其他资源'));
    var xmlhttp=new XMLHttpRequest();
    var data={
      unifyCode:BluMUI.result.config.user_id,
      kcbh:BluMUI.result.config.course_id,
      place:2,
      zylb:22
    };
    var ajax_data='';
    for(let i in data) {
      ajax_data+=i+'='+data[i]+'&';
    }
    console.log(ajax_data.substr(0,ajax_data.length-1))
    xmlhttp.onreadystatechange=()=>
    {
      if (xmlhttp.readyState==4 && xmlhttp.status==200) {
        let datas=JSON.parse(xmlhttp.responseText);
        this.other = datas.meta.result==101;
        if(this.other) {
          back.push(<div key="no_data" style={{width:"100%",height:"100px"}}></div>);
        } else {
          console.log('success',datas)
          datas.data.map(e=>{
              back.push(<div className="ziyuan_item" key={e.id}>
            <img src="../../imgs/classListInfShow/courseShow/ziyuan.png"/>
            <br/>
            <span title={e.ywjm}>{e.ywjm.split('.')[0]}</span>
            <br/>
            <span className='ziyuan_xiazai' onClick={this.xiazai.bind(this,e.ywjm)}>下载</span>
          </div>);
          });
        }
      }
    }
    xmlhttp.open("POST","http://cc.cqupt.edu.cn/getStudyResourceMsg",false);
    xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
    xmlhttp.send(ajax_data.substr(0,ajax_data.length-1));
    return back;
  }

  render() {
    return(<div id='right' ref='right'>
      <div id="jiangyi">
        {this.create_jiangyi()}
        {this.jiangyi?'':<div id="preview" ref="preview" style={{paddingRight:'24px',height:'700px'}}></div>}
        
        <div ref="fujian_download" id="Down"></div>
      </div>
      <div id="other">
        {this.create_other()}
      </div>
      <iframe src="" frameBorder="0" ref='DOWNLOAD' style={{display:'none'}}></iframe>
    </div>);
  }
}


//作业
class BluMUI_Create_c extends React.Component {
  constructor(props) {
    super(props);
    // this.create_zuoye=this.create_zuoye.bind(this);
  }
  xiazai(link) {
    this.refs.DOWNLOAD.src=courseCenter.host+'fileDownLoad?name='+link.split('.')[0]+'&oName='+link;
  }

  create_zuoye() {
    let flag = check.call(this);
    if(flag) return flag;
    let back=[];
    let xiazai;
    this.props.data.map(e=>{
      if(e.sfnxz==1) {
        xiazai=<span className='ziyuan_xiazai' onClick={this.xiazai.bind(this,e.ywjm)}>下载</span>;
      } else {
        xiazai='';
      }
      back.push(<div className="ziyuan_item" key={e.id}>
        <img src="../../imgs/classListInfShow/courseShow/ziyuan.png"/>
        <br/>
        <span title={e.ywjm}>{e.ywjm.split('.')[0]}</span>
        <br/>
        {xiazai}
      </div>);
    });
    if(back.length==1) {
      back.push(<div key='space' style={{height:'100px',width:'1px'}}></div>);
    }
    return(<div id="ziyuan">
      {back}
      <div style={{clear:'both'}} ></div>
    </div>);
  }

  render() {
    return(<div id='right'>
      {this.create_zuoye()}
      <iframe src="" frameBorder="0" ref='DOWNLOAD' style={{display:'none'}}></iframe>
    </div>);
  }
}


//习题
class BluMUI_Create_d extends React.Component {
  constructor(props) {
    super(props);
    // this.create_xiti=this.create_xiti.bind(this);
  }
  xiazai(link) {
    this.refs.DOWNLOAD.src=courseCenter.host+'fileDownLoad?name='+link.split('.')[0]+'&oName='+link;
  }

  create_xiti() {
    let flag = check.call(this);
    if(flag) return flag;
    let back=[];
    let xiazai;
    this.props.data.map(e=>{
      if(e.sfnxz==1) {
        xiazai=<span className='ziyuan_xiazai' onClick={this.xiazai.bind(this,e.ywjm)}>下载</span>;
      } else {
        xiazai='';
      }
      back.push(<div className="ziyuan_item" key={e.id}>
        <img src="../../imgs/classListInfShow/courseShow/ziyuan.png"/>
        <br/>
        <span title={e.ywjm}>{e.ywjm.split('.')[0]}</span>
        <br/>
        {xiazai}
      </div>);
    });
    if(back.length==1) {
      back.push(<div key='space' style={{height:'100px',width:'1px'}}></div>);
    }
    return(<div id="ziyuan">
      {back}
      <div style={{clear:'both'}} ></div>
    </div>);
  }

  render() {
    return(<div id='right'>
      {this.create_xiti()}
      <iframe src="" frameBorder="0" ref='DOWNLOAD' style={{display:'none'}}></iframe>
    </div>);
  }
}


//资源
class BluMUI_Create_e extends React.Component {
  constructor(props) {
    // this.create_ziyuan=this.create_ziyuan.bind(this);
    // this.create_link=this.create_link.bind(this);
    super(props);
  }
  xiazai(link) {
    this.refs.DOWNLOAD.src=courseCenter.host+'fileDownLoad?name='+link.split('.')[0]+'&oName='+link;
  }

  create_ziyuan() {
    let flag = check.call(this);
    if(flag) return flag;
    let back=[];
    back.push(Create_tab('附件'));
    let xiazai;

    this.props.data.map(e=>{
      if(e.ywjm!='') {
        xiazai=<span className='ziyuan_xiazai' onClick={this.xiazai.bind(this,e.ywjm)}>下载</span>;
        back.push(<div className="ziyuan_item" key={e.id}>
          <img src="../../imgs/classListInfShow/courseShow/ziyuan.png"/>
          <br/>
          <span title={e.ywjm}>{e.ywjm.split('.')[0]||e.ywjm.split('.')[0]+'.'+e.ywjm.split('.')[1]}</span>
          <br/>
          {xiazai}
        </div>);
      }
    });
    if(back.length==1) {
      back.push(<div key='space' style={{height:'100px',width:'1px'}}></div>);
    }
    return(back);
  }

  create_link() {
    if(check.call(this)) {
      return;
    }
    let back=[];
    back.push(Create_tab('链接'));
    this.props.data.map(e=>{
      if(e.wlxxzylj!='') {
        back.push(<div key={e.id} className='ziyuan_link'><span>网络链接：</span><a target="view_window" href={e.wlxxzylj}>{e.ljmc}</a></div>);
      }
    });
    return(
      back
    );
  }

  render() {
    return(<div id='right'>
      {this.create_ziyuan()}
      {this.create_link()}
      <iframe src="" frameBorder="0" ref='DOWNLOAD' style={{display:'none'}}></iframe>
    </div>);
  }
}


// 参考书
class BluMUI_Create_f extends React.Component {
  constructor(props) {
    super(props);
    this.no_data=false;
  }

  create_jiaocai() {
    console.log(this);
    let back=[];
    back.push(Create_tab('课程教材'));
    let flag = check.call(this);
    console.log('aaa',flag)
    if(flag) return flag;
    this.props.data.teachBookList.map(e=>{
      back.push(<div className="item" key={e.id} >
        <img width='120px' height='160px' src={courseCenter.host+'upload/PIC/'+e.tpmc}/>
        <span className="item_title">{'教材名称：'+e.sm}</span><br/><br/>
        <span>{'作者：'+e.zz}</span><br/>
        <span>{'出版社：'+e.CBS}</span>
      </div>);
    });
    if(back.length==1) {
      back.push(<div key='space' style={{height:'100px',width:'1px'}}></div>);
    }
    return back;
  }

  create_cankaoshu() {
    let back=[];
    back.push(Create_tab('参考书'));
    let flag = check.call(this);
    if(flag) return;
    this.props.data.referenceBookList.map(e=>{
      back.push(<div className="item" key={e.id} >
        <img width='120px' height='160px' src={courseCenter.host+'upload/PIC/'+e.tpmc}/>
        <span className="item_title">{'参考书名称：'+e.sm}</span><br/><br/>
        <span>{'作者：'+e.zz}</span><br/>
        <span>{'出版社：'+e.CBS}</span>
      </div>);
    });
    if(back.length==1) {
      back.push(<div key='space' style={{height:'100px',width:'1px'}}></div>);
    }
    return back;
  }

  render() {
    return(<div id='right'>
      {this.create_jiaocai()}
      {this.create_cankaoshu()}
    </div>);
  }
}

function Create_tab(tab_name) {
  return(<div className="tab" key={tab_name+'head'} >
    <span>{tab_name}</span>
  </div>);
}



var BluMUI_M = {
  CreateTableTitle: BluMUI_CreateThead,
  CreateTableBody:  BluMUI_CreateTbody,
  CreateTab:        BluMUI_CreateTab,
  Create_jianjie:   BluMUI_CreateJianjie,
  Create_options:   BluMUI_CreateOptions,
  Create_tabs:      BluMUI_CreateTabs,
  Create_list:      BluMUI_CreateList,
  Get_list:         BluMUI_GetList,
  Review:           BluMUI_Review,
  Show_all:         BluMUI_ShowAll,
  Show_teacher:     BluMUI_Teachers,
  Create_fuzeren:   BluMUI_Fuzeren,
  Create_teachers:  BluMUI_Teachers,
  Create_jieshao:   BluMUI_Js,
  CreateNav:        BluMUI_CreateNav,
}

var BluMUI = {
  result: {},
  create: function (data, type, elem) {
    var props = data, Blu = BluMUI_M[type];
    this.result[props.id] = ReactDOM.render(<Blu {...props}/>, elem);    
  }
};
BluMUI.result.Get_list=BluMUI_GetList;

export default BluMUI;