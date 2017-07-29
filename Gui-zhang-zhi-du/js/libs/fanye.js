import React from 'react';

export default class Fanye extends React.Component {
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
        for(let i=end-4;i<=end;i++) {
        change_page(i)
        }
      } else {
        for(let i=now-2;i<=now+2;i++) {
        change_page(i)
        }
      }
    }

    return (<div id="fanye">
      <span id="total">共{this.props.TP.total>=0?this.props.TP.total:1}条记录</span>
      <input className="fanye_options" type="button" value="首页"   id="fanye_start" onClick={this.fanye.bind(this,now===1?0:1)} />
      <input className="fanye_options" type="button" value="上一页" id="fanye_pre"   onClick={this.fanye.bind(this,now===1?0:now-1)} />
      <ul id="fanye_nums">{nums}</ul>
      <input type="text" id="tp" ref="tp" placeholder={`${this.props.TP.page}/${this.props.TP.pages}`} />
      <input className="fanye_options" type="button" value="下一页" id="fanye_next"  onClick={this.fanye.bind(this,now===end?0:now+1)} />
      <input className="fanye_options" type="button" value="尾页"   id="fanye_end"   onClick={this.fanye.bind(this,now===end?0:end)} />
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
        let newpage=+eve.target.value;
        if(!isNaN(newpage)) {
          if(newpage>=1&&newpage<=this.props.TP.pages) {
            this.fanye(newpage);
          } else {
            eve.target.value=null;
          }
        } else {
          eve.target.value=null;
        }
        eve.target.blur();
      }
    }
  }
}
