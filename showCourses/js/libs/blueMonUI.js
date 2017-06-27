import React from 'react';
import ReactDOM from 'react-dom';

// 课程资源模板
class BlueMUI_Resources extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (<div id="r2">
      <p className="content_title">课程资源</p>
      <div id="r2_content">
        <ul>
          <li>
            <div className="li_left">
              <p className="right_left">参考书</p>
              <div className="right_right">
                <span>
                  <a id="more1" className="small" href="#">更多</a>
                  <img className="smallImg" src="../../imgs/home-course/home_more.png" />
                </span>
              </div>
            </div>
          </li>
          <li>
            <div className="li_left">
              <p className="right_left">视频资源</p>
              <div className="right_right">
                <span>
                  <a id="more2" className="small" href="#">更多</a>
                  <img className="smallImg" src="../../imgs/home-course/home_more.png" />
                </span>
              </div>
            </div>
          </li>
          <li>
            <div className="li_left">
              <p className="right_left">习题库</p>
              <div className="right_right">
                <span>
                  <a id="more3" className="small" href="#">更多</a>
                  <img className="smallImg" src="../../imgs/home-course/home_more.png" />
                </span>
              </div>
            </div>
          </li>
          <li>
            <div className="li_left">
              <p className="right_left">网络学习资源</p>
              <div className="right_right">
                <span>
                  <a id="more4" className="small" href="#">更多</a>
                  <img className="smallImg" src="../../imgs/home-course/home_more.png" />
                </span>
              </div>
            </div>
          </li>
          <li>
            <div className="li_left">
              <p className="right_left">作业</p>
              <div className="right_right">
                <span>
                  <a id="more5" className="small" href="#">更多</a>
                  <img className="smallImg" src="../../imgs/home-course/home_more.png" />
                </span>
              </div>
            </div>
          </li>
          <li>
            <div className="li_left">
              <p className="right_left">讲义</p>
              <div className="right_right">
                <span>
                  <a id="more6" className="small" href="#">更多</a>
                  <img className="smallImg" src="../../imgs/home-course/home_more.png" />
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>);
  }
}

class BlueMUI_Review extends React.Component {
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
      className = { 'BlueMUI_Review ' + this.props.extClass }>
      <span className = 'name'> { this.props.name } </span> { this._createStar() } </div>
    );
  }
}

//任课教师
class BlueMUI_Teachers extends React.Component {

  constructor(props) {
    super(props);
    console.log("teachers:",this.props)
  }

  render() {
    let teachers=[];
    let teacher=[];
    let warnings;
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
    if(this.props.teachers.length==0) {
      warnings=<p>该课程没有任课教师</p>
    } else {
      warnings='';
    }
    return (
      <tbody>
        {fuzeren}
        {teacher}
        {warnings}
      </tbody>
    );
  }
}

//全部显示
class BlueMUI_ShowAll extends React.Component {

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


var BluMUI_M = {
  Review: BlueMUI_Review,
  Resources:BlueMUI_Resources,
  Show_all: BlueMUI_ShowAll,
  Show_teacher: BlueMUI_Teachers,
}
var BluMUI = {
  result: {},
  create: function(data, type, elem) {
    var props = data,
      Blu = BluMUI_M[type];
    this.result[props.id] = ReactDOM.render( <Blu {...props } />,
      elem
    );
  }
};
export default BluMUI;
