import React from 'react';
import ReactDOM from 'react-dom';

var _COUNT=15;
var ajax=require('./post_ajax.js');

// 筛选条件
class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      college: "",
      name: "",
      page: 1,
      pages :1
    }
  }

  render() {
    return (<div id="kczystj">
      <div id="kczystj_filter">
        <select name="college" id="filter_college" ref="college">
          <option value="">请选择</option>
        </select>
        <select name="department" id="filter_department" ref="department">
          <option value="">请选择</option>
        </select>
        <div id="serch">
          <input type="text" id="filter_name" ref="name"/>
          <input type="button" id="btn" ref="btn" value="搜索"/>
        </div>
      </div>
      <Lists  ref="list" options={this.state} />
    </div>);
  }

  componentDidMount() {
    // 获取学院
    ajax({
      url: courseCenter.host + "getCollege",
      data: {
        unifyCode: getCookie("userId")
      },
      success: (gets)=>{
        let datas = JSON.parse(gets);
        if(datas.meta.result==100) {
          datas.data.map((e,index)=>{
            this.refs.college.innerHTML += `<option value=${e.kkxymc}>${e.kkxymc}</option>`;
          });
        }
      }
    });

    // 选定学院后获取专业并填充
    this.refs.college.onchange=(e)=>{
      this.refs.department.innerHTML = "<option value=''>请选择</option>";
      ajax({
        url: courseCenter.host + "getCourseDepartment",
        data: {
          unifyCode: getCookie("userId"),
          college: this.refs.college.value
        },
        success: (gets)=>{
          let datas = JSON.parse(gets);
          if(datas.meta.result==100) {
            datas.data.map((e,index)=>{
              this.refs.department.innerHTML += `<option value=${e.jysmc}>${e.jysmc}</option>`;
            });
          }
        }
      });
    }

    // 单击搜索按钮的事件
    this.refs.btn.onclick=(e)=>{
      this.refs.list.refresh(1,{
        college: this.refs.college.value,
        department: this.refs.department.value,
        name: this.refs.name.value
      });
    }
  }
}

class Lists extends React.Component {
  constructor(props) {
    super(props);
    let newState={};
    for(let i in this.props.options) {
      newState[i]=this.props.options[i];
    }
    newState.list=[];
    this.state=newState;
    this.datas=[];
  }

  create_list() {
    let tds=[];
    this.datas.map((e,index)=>{
      tds.push(<tr key={index} style={{backgroundColor:index%2?"#EEE":"#FFF"}}>
        <td className="lefttd"><div></div></td>
        <td>{e.kkxymc}</td>
        <td>{e.kkxyh}</td>
        <td>{e.jysmc}</td>
        <td>{e.jysh}</td>
        <td>{e.kcmc}</td>
        <td>{e.kcbh}</td>
        <td>{e.kclx}</td>
        <td>{e.jxdg}</td>
        <td>{e.zsdtx}</td>
        <td>{e.ksdg}</td>
        <td>{e.xxzy}</td>
        <td>{e.dzja}</td>
        <td>{e.dxfa}</td>
        <td className="righttd"><div></div></td>
      </tr>);
    });
    return (<tbody>{tds}</tbody>);
  }

  refresh(page, {...sets}) {
    // 未传第二个参数时sets为空对象{}
    // 判断sets是否为空（是否只是翻页）
    if(JSON.stringify(sets)!=="{}") {
      this.state=sets;
    }
    ajax({
      url: courseCenter.host + "getKczyList",
      data: {
        unifyCode: getCookie("userId"),
        college: sets.college||this.state.college,
        courseDepartment: sets.department||this.state.department,
        courseName: sets.name||this.state.name,
        page: page,
        count: _COUNT
      },
      success: (gets)=>{
        let datas = JSON.parse(gets);
        this.datas = datas.data.KczyList;
        this.setState({
          list: datas.data.KczyList,
          page: page,
          pages: datas.data.totalPages
        });
      }
    });
  }

  render() {
    console.log("lists-state:",this.state);
    return(<div id="kczystj_lists">
      <table>
        <thead>
          <tr>
            <td className="lefttd">
              <div></div>
            </td>
            <td width="12.55%">学院名称</td>
            <td width="4.07%">学院号</td>
            <td width="11.53%">系部中心名称</td>
            <td width="6.11%">系部中心号</td>
            <td>课程名称</td>
            <td width="6.11%">课程编号</td>
            <td width="10.85%">课程类型</td>
            <td width="5.02%">教学大纲</td>
            <td width="5.02%">知识点体系</td>
            <td width="5.02%">考试大纲</td>
            <td width="5.02%">学习资源</td>
            <td width="5.02%">电子教案</td>
            <td width="5.02%">导学方案</td>
            <td className="righttd">
              <div></div>
            </td>
          </tr>
        </thead>
        {this.create_list()}
      </table>
      <Fanye This={this} page={this.state.page||1} pages={this.state.pages||1} />
    </div>);
  }

  componentDidMount() {
    ajax({
      url: courseCenter.host + "getKczyList",
      data: {
        unifyCode: getCookie("userId"),
        college: this.props.options.college,
        courseDepartment: this.props.options.department,
        courseName: this.props.options.name,
        page: this.props.options.page,
        count: _COUNT
      },
      success: (gets)=>{
        let datas = JSON.parse(gets);
        this.datas = datas.data.KczyList;
        this.setState({
          list: datas.data.KczyList,
          pages: datas.data.totalPages
        });
        console.log(this.datas);
      }
    });
  }

  componentDidUpdate() {
    // 获取该frame的id
    // var frameId = window.frameElement && window.frameElement.id || '';
    // 设置该frame的高度自适应
    if(window.frameElement) {
      window.frameElement.height=document.body.offsetHeight;
    }
  }
}


class Fanye extends React.Component {
  constructor(props) {
    super(props);
  }

  create_popup_fanye() {
    console.log(this.props,"___376")
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
      <div id="fanye_pre" ref="pre" onClick={this.fanye.bind(this,this.props.page-1<0?1:this.props.page-1)}><img src="../../imgs/courseAudit/fanye_left.png" alt=""/></div>
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
    this.props.This.refresh(p);
  }

  render() {
    return this.create_popup_fanye();
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