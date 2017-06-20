import React from 'react';
import ReactDOM from 'react-dom';
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
