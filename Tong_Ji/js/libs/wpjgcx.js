import React from 'react';
import ReactDOM from 'react-dom';

const ajax=require('../libs/post_ajax.js');
const Fanye=require('../libs/fanye.js');

const _COUNT = 10;

const SET = (key, value) => {
  sessionStorage.setItem("wpjgcx-"+key, value);
  return value;
}

const GET = (key) => {
  return sessionStorage.getItem("wpjgcx-"+key) || '';
}

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      kcmc: '',
      wppc: '',
      kkxy: '',
      kkxbzx: ''
    };
  }

  get_wppc_select() {
    ajax({
      url: courseCenter.host+'reviewBriefList',
      data:{
        userID: getCookie('userId'),
        state: 4,
        expGroup: ''
      },
      success: (gets)=>{
        let datas=JSON.parse(gets);
        console.log(datas);
        let ops=[`<option value="">请选择</option>`];
        datas.data.list.forEach(e=>{
          ops.push(`<option value="${e.wppc}">${e.wppc}</option>`)
        })
        this.wppc_select.innerHTML=ops.join('');
      }
    })
  }

  get_kkxy_select() {
    ajax({
      url: courseCenter.host+'getCollege',
      data:{
        unifyCode: getCookie('userId')
      },
      success: (gets)=>{
        let datas=JSON.parse(gets);
        console.log(datas);
        let ops=[`<option value="">请选择</option>`];
        datas.data.forEach(e=>{
          ops.push(`<option value="${e.kkxymc}">${e.kkxymc}</option>`)
        })
        this.kkxy_select.innerHTML=ops.join('');
      }
    })
  }

  get_kkxbzx_select(college) {
    ajax({
      url: courseCenter.host+'getCourseDepartment',
      data:{
        unifyCode: getCookie('userId'),
        college: college
      },
      success: (gets)=>{
        let datas=JSON.parse(gets);
        console.log(datas);
        let ops=[`<option value="">请选择</option>`];
        datas.data.forEach(e=>{
          ops.push(`<option value="${e.jysmc}">${e.jysmc}</option>`)
        })
        this.kkxbzx_select.innerHTML=ops.join('');
      }
    })
  }

  render() {
    return (<div className='filters'>
      <div className="top">
        <span>网评批次：</span>
        <select name="wppc" id="wppc" onChange={(eve)=>{this.state.wppc=eve.target.value}} ref={sel=>this.wppc_select=sel}>
          <option value="">请选择</option>
        </select>
        <span>开课学院：</span>
        <select name="kkxy" id="kkxy" onChange={(eve)=>{this.state.kkxy=eve.target.value;this.get_kkxbzx_select(eve.target.value)}} ref={sel=>this.kkxy_select=sel}>
          <option value="">请选择</option>
        </select>
        <span>开课系部中心：</span>
        <select name="kkxbzx" id="kkxbzx" onChange={(eve)=>{this.state.kkxbzx=eve.target.value}} ref={sel=>this.kkxbzx_select=sel}>
          <option value="">请选择</option>
        </select>
        <span>课程名称：</span>
        <input placeholder="请输入课程名称" type="text" value={this.state.kcmc} onChange={(eve)=>{this.setState({kcmc: eve.target.value})}}/>
        <button id="search">搜索</button>
      </div>
      <Table></Table>
    </div>);
  }

  componentDidMount() {
    this.get_wppc_select();
    this.get_kkxy_select();

  }
}

class Table extends React.Component {
  constructor(props) {
    super(props);
  }

  create_tbody() {
    return(<tbody>
      <tr>
        <td></td>
        <td></td>
        <td>网评批次</td>
        <td>A256231</td>
        <td>数据库原理</td>
        <td>专家评价</td>
        <td>95</td>
        <td>展开</td>
        <td></td>
        <td></td>
      </tr>
    </tbody>);
  }

  render() {
    return (<table>
      <thead>
        <tr>
          <td className="lefttd"><div></div></td>
          <td width="5px"></td>
          <td width="15%">网评批次</td>
          <td width="15%">课程编号</td>
          <td width="">课程名称</td>
          <td width="15%">网评类别</td>
          <td width="5%">得分</td>
          <td width="10%">评价详情</td>
          <td width="5px"></td>
          <td className="righttd"><div></div></td>
        </tr>
      </thead>
      {this.create_tbody()}
    </table>);
  }
}


var BluMUI_M = {
  BluMUI_Filter: Filter
}

var BluMUI = {
  result: {},
  menues:[],
  menue_names:{},
  create: function (data, type, elem) {
    var props = data, Blu = BluMUI_M[type];
    this.result[props.id] = ReactDOM.render(<Blu {...props}/>, elem);    
  }
};


export default BluMUI;
