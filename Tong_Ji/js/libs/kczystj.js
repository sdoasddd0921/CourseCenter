import React from 'react';
import ReactDOM from 'react-dom';

var ajax=require('./post_ajax.js');

class Test extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<div>test</div>);
  }
}

// 筛选条件
class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      college: "",
      department: "",
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

            // 单击搜索按钮的事件
            this.refs.btn.onclick=(e)=>{
              this.refs.list.setState({options:{
                college: this.refs.college.value,
                department: this.refs.department.value,
                name: this.refs.name.value,
                page: 1
              }});
            }
          }
        }
      });
    }
  }
}

class Lists extends React.Component {
  constructor(props) {
    super(props);
    this.state=this.props;
    this.datas=[];
  }

  create_list() {
    let tds=[];
    this.datas.map((e,index)=>{
      tds.push(<tr key={index}>
        <tr className="lefttd"><div></div></tr>
        <tr>{e.kkxync}</tr>
        <tr>{e.kkxyh}</tr>
        <tr>{e.jysmc}</tr>
        <tr>{e.jysh}</tr>
        <tr>{e.kcmc}</tr>
        <tr>{e.kcbh}</tr>
        <tr>{e.kclx}</tr>
        <tr>{e.jxdg}</tr>
        <tr>{e.zsdtx}</tr>
        <tr>{e.ksdg}</tr>
        <tr>{e.xxzy}</tr>
        <tr>{e.dzja}</tr>
        <tr>{e.dxfa}</tr>
        <tr className="righttd"><div></div></tr>
      </tr>);
    });
    return (<tbody>{tds}</tbody>);
  }

  render() {
    console.log("lists:",this.state)
    return(<div id="kczystj_lists">
      <table>
        <thead>
          <tr>
            <td className="lefttd">
              <div></div>
            </td>
            <td>学院名称</td>
            <td>学院号</td>
            <td>系部中心名称</td>
            <td>系部中心号</td>
            <td>课程名称</td>
            <td>课程编号</td>
            <td>课程类型</td>
            <td>教学大纲</td>
            <td>知识点体系</td>
            <td>考试大纲</td>
            <td>学习资源</td>
            <td>电子教案</td>
            <td>导学方案</td>
            <td className="righttd">
              <div></div>
            </td>
          </tr>
        </thead>
        {this.create_list()}
      </table>
      <Fanye This={this} page={this.state.options.page||1} pages={this.state.options.pages||1} />
    </div>);
  }

  componentDidMount() {
    ajax({
      url: courseCenter.host + "getKczyList",
      datas: {
        unifyCode: getCookie("userId"),
        college: this.props.options.college,
        courseDepartment: this.props.options.department,
        courseName: this.props.options.name,
        page: this.props.options.page,
        count: 15
      },
      success: (gets)=>{
        let datas = JSON.parse(gets);
        this.datas = datas.data.KczyList;
        console.log(this.datas);
      }
    });
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
    console.log("开始翻页")
    this.props.This.state.page=p;
  }

  render() {
    return this.create_popup_fanye();
  }
}




var BluMUI_M = {
  test: Test,
  BluMUI_Filter: Filter,
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