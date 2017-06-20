import React from 'react';
import ReactDOM from 'react-dom';
var ajax=require('../libs/post_ajax.js');

var Menue_this;

var menues=[];
var menue_names={};
ajax({
  url:courseCenter.host+'getMenu',
  data:{
    module:9,
    unifyCode:getCookie('userId')
  },
  success:function(gets) {
    let datas=JSON.parse(gets);
    menues=[];
    datas.data.map(e=>{
      menues.push(e.subModule);
      menue_names[e.subModule]=e.cdmc;
    });

    // 左边的菜单
    ReactDOM.render(
      <Menue Menues={menues}/>,
      document.getElementById('menue')
    );
  }
});

// iframe
class Iframe extends React.Component {
  constructor(props) {
    super(props);
    this.state=this.props;
    this.iframes={length:0};
    Object.defineProperty(this.iframes, "length", {
      enumerable: false
    });
    this.state.tabs.map((e,index)=>{
      this.iframes[e]=<iframe src={'guizhang-'+e+'.html'} frameBorder="0" id={'ifs-'+e} key={e} style={{display:'none'}} onLoad={this.ld.bind(this)} ></iframe>;
      this.iframes.length++;
    });
  }
  componentWillReceiveProps(nextProps) {
    // console.log("___30",this.iframes[this.state.on])
    // console.log(this.refs.Iframe)
    if(nextProps.tabs.length==this.iframes.length) {
      // console.log('same!')
    } else if(nextProps.tabs.length>this.iframes.length) {
      // console.log('next bigger',nextProps.tabs,this.iframes);
      nextProps.tabs.map(e=>{
        if(typeof this.iframes[e] =='undefined') {
          // console.log('new element')
          this.iframes[e]=<iframe src={'guizhang-'+e+'.html'} frameBorder="0" id={'ifs-'+e} key={e} style={{display:'none'}} onLoad={this.ld.bind(this)}></iframe>;
          this.iframes.length++;
        } else {
          console.log('old element')
        }
      })
    } else if(nextProps.tabs.length<this.iframes.length) {
      for(let i in this.iframes) {
        if(-1==nextProps.tabs.indexOf(i)) {
          // console.log(i)
          delete this.iframes[i];
          this.iframes.length--;
        }
      }
    }
    // console.log('比较\n',nextProps,this.iframes)
    // console.log('show',document.getElementById('ifs-'+this.state.on))
    document.getElementById('ifs-'+this.state.on).style.display='none';
    this.setState(nextProps);
  }
  ld() {
    console.log('Iframe load finished, set iframe height!');
    // console.log(document.getElementById('ifs-'+this.state.on).contentWindow.document)
    document.getElementById('ifs-'+this.state.on).height=
      document.getElementById('ifs-'+this.state.on).contentWindow.document.body.scrollHeight;
  }

  componentDidMount() {
    this.render();
    // document.getElementById('ifs-'+this.state.on).style.height=document.getElementById('ifs-'+this.state.on).contentWindow.document.body.scrollHeight;
    document.getElementById('ifs-'+this.state.on).style.display='block';
  }

  componentDidUpdate() {
    // console.log(document.getElementById('ifs-'+this.state.on))
    document.getElementById('ifs-'+this.state.on).style.display='block';
  }

  create_iframes() {
    let IFS=[];
    for(let i in this.iframes) {
      // console.log('sssssssss',this.iframes[i])
      IFS.push(this.iframes[i])
    }
    // console.log('IFS',IFS)
    return(<div id="iframes" ref="Iframe">{IFS}</div>);
  }
  render() {
    // console.log("加载完成:\n")
    return(this.create_iframes());
  }
}



// tabs
class Tab_head extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      tabs:[this.props.Tab],
      on:this.props.Tab
    }
  }
  tab_change(tab_name,eve) {
    this.refs[this.state.on].className='';
    this.setState({on:tab_name});
    Menue_this.setState({Menue_on:tab_name});
  }
  del(tab_name,eve) {
    eve.nativeEvent.preventDefault()
    let tabs=this.state.tabs;
    let index=tabs.indexOf(tab_name);
    let new_on;
    tabs.splice(index,1);
    if(index<1) {
      new_on = tabs[index+1];
    } else {
      new_on = tabs[index-1];
    }
    this.setState({
      tabs:tabs,
      on:new_on
    });
  }
  componentWillReceiveProps(nextProps) {
    let new_tabs=this.state.tabs;
    // this.refs[this.state.on].className='';
    if(this.state.tabs.indexOf(nextProps.Tab)==-1) {
      new_tabs.push(nextProps.Tab);
    }
    this.setState({
      tabs:new_tabs,
      on:nextProps.Tab
    });
  }
  componentDidMount() {
    Create_iframes(this.state);
    this.refs[this.state.on].className='tabs_on';
  }
  componentDidUpdate(preProps,preState) {
    Create_iframes(this.state);
    // console.log('updarta:',this.state.on,preState.on)
    if(this.refs[preState.on]) {
      // console.log('存在')
      this.refs[preState.on].className='';
    }
    this.refs[this.state.on].className='tabs_on';
    // 为关闭按钮单独绑定事件，不单独绑定会触发事件冒泡
    Array().map.call(
      this.refs.tabs.getElementsByClassName('close'),
      (e,index)=>{e.onclick=eve=>{
        // 阻止事件冒泡
        eve.stopImmediatePropagation();
        let new_on=this.state.on;
        let tabs=this.state.tabs;
        // 如果只有一个tab被打开则这个tab不能关闭
        if(tabs.length==1) {
          return;
        }
        // 将当前打开的标签设置为关闭
        this.refs[this.state.on].className='';
        // 如果关闭的tab和当前打开的tab是同一个
        if(tabs[index]==this.state.on) {
          // console.log('相等')
          // 看是不是关闭的第一个tab，是第一个就打开后面个
          // if(index<1) {
          //   new_on = tabs[index+1];
          // } else {
          //   new_on = tabs[index-1];
          // }
          tabs.splice(index,1);
          new_on=tabs[tabs.length-1];
        } else {
          tabs.splice(index,1);
        }
    // console.log('new_on:',new_on)
        this.setState({
          tabs:tabs,
          on:new_on
        });
        Menue_this.setState({Menue_on:new_on})
      }}
    );
  }
  render() {
    //需要this.state向下传递信息，包括tab[]和on
    return(<ul ref='tabs'>{
      this.state.tabs.map((e,index)=><li key={index} ref={e} onClick={this.tab_change.bind(this,e)}>
        {menue_names[e]}
        <span className="close">x</span>
      </li>)
    }</ul>);
  }
}


class Menue extends React.Component {
  constructor(props) {
    super(props);
    // 设置默认显示的第一个tab
    this.state={
      Menue_on:this.props.Menues[0]
    }
  }

  tab_change(name,eve) {
    this.setState({
      Menue_on:name
    },()=>{
      Create_tabs(this.state.Menue_on);
    });
    
  }

  componentDidMount() {
    Menue_this=this;
    this.refs.menue.children[0].className='menue_on';
    Create_tabs(this.state.Menue_on);
  }
  componentDidUpdate(preProps,preState) {
    this.refs.menue.children[this.props.Menues.indexOf(preState.Menue_on)].className='';
    this.refs.menue.children[this.props.Menues.indexOf(this.state.Menue_on)].className='menue_on';
  }

  render() {
    return(<ul ref='menue'>{
      this.props.Menues.map((e,index)=><li key={index} name={e} onClick={this.tab_change.bind(this,e)}>{menue_names[e]}</li>)
    }</ul>);
  }
}
function Create_tabs(tab) {
  ReactDOM.render(
    <Tab_head Tab={tab}/>,
    document.getElementById('tabs')
  );
}

function Create_iframes(state) {
  ReactDOM.render(
    <Iframe {...state}/>,
    document.getElementById('tab')
  );
}


