import React from 'react';
import ReactDOM from 'react-dom';

const ajax=require('../libs/post_ajax.js');
const _COUNT=10;

class Option extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      page:1,
      pages:1,
      total:1,
      list: []
    }
  }

  _getLists(p) {
    ajax({
      url: courseCenter.host+"reviewList",
      data: {
        unifyCode: getCookie("userId"),
        name: this.refs.wppc.value,
        page: p||this.state.page,
        count: _COUNT
      },
      success: (gets)=>{
        let datas=JSON.parse(gets);
        this.setState({
          list: datas.data.list,
          page: p||this.state.page,
          pages: datas.data.totalPages,
          total: datas.data.total
        });
      }
    });
  }

  render() {
    return (
      <div id="wpgl_option">
        <div id="option">
          <div id="big_btns">
            <button className="big_btn" ref="fqwp">发起网评</button>
            <button className="big_btn" ref="plsc">批量删除</button>
          </div>
          <div id="filter_bar">
            <span id="wppc">网评批次：</span>
            <select name="wppc" ref="wppc">
              <option value="">请选择</option>
            </select>
            <button id="serch" ref="btn">搜索</button>
          </div>
        </div>
        <Lists Lists={this.state.list} ref="list" />
        <Fanye
          ref="fanye"
          TP={{
            total:this.state.total,
            page:this.state.page,
            pages: this.state.pages
          }}
          callback={(num)=>{this._getLists.call(this, num)}}
        />
      </div>
    );
  }

  componentDidMount() {
    // 填充网评批次下拉菜单
    ajax({
      url: courseCenter.host+"reviewBriefList",
      data: {
        userID: getCookie("userId"),
        state: 1
      },
      success: (gets)=>{
        let datas=JSON.parse(gets);
        if(datas.meta.result==100) {
          datas.data.list.map((e,index)=>{
            this.refs.wppc.innerHTML+=`<option value=${e.id}>${e.wppc}</option>`;
          });
        }
      }
    });

    // 首次查询列表并填充
    this._getLists();
    this.refs.btn.onclick=this._getLists.bind(this);
  }
}

class Lists extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 1,
      lists: []
    }
  }

  create_head() {
    switch(this.state.mode) {
      case 1:
        return (<thead>
          <tr>
            <td width="30px" className="td_head">
              <div></div>
            </td>
            <td width="59px" className="td_left_space"></td>
            <td width="19px"><input type="checkbox" ref="allcheck" /></td>
            <td>网评批次</td>
            <td width="13.54839%">分组批次</td>
            <td width="13.54839%">指标批次</td>
            <td width="13.54839%">专家分组批次</td>
            <td width="13.54839%">起止时间</td>
            <td width="13.54839%">分配课程</td>
            <td width="13.54839%">操作</td>
            <td width="11px" className="td_right_space"></td>
            <td width="30px" className="td_end">
              <div></div>
            </td>
          </tr>
        </thead>);
        break;
    }
  }

  create_body() {
    switch(this.state.mode) {
      case 1:
        return (<tbody>
          {this.props.Lists.map((e,index)=><tr key={index}>
            <td className="td_head"></td>
            <td></td>
            <td><input type="checkbox" value={e.id}/></td>
            <td>{e.wppc}</td>
            <td>{e.fzpc}</td>
            <td>{e.zbpc}</td>
            <td>{e.zjfzpc}</td>
            <td>{e.kssj+"-"+e.jssj}</td>
            <td>{<div>
              <span className="green_btn">分配</span>
              <span className="green_btn">结果</span>
            </div>}</td>
            <td>{<div>
              <span className="green_btn">编辑</span>
              <span className="yellow_btn">删除</span>
            </div>}</td>
            <td></td>
            <td className="td_end"></td>
          </tr>)}
        </tbody>);
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

  componentDidUpdate(prevProps, prevState) {
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
    return (<div id="kczttj_fanye">
      <span id="rows">共{this.props.TP.total?this.props.TP.total:1}条记录</span>
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









ReactDOM.render(
  <Option />,
  document.getElementById('wpgl')
);





