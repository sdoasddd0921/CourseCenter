import React from 'react';
import ReactDOM from 'react-dom';
var ajax=require('./post_ajax.js');

var Menue_this;
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
    console.log('Iframe load finished, set iframe height!!!');
    // console.log(document.getElementById('ifs-'+this.state.on).contentWindow.document)
    // 
    // document.getElementById('ifs-'+this.state.on).height=
    //   document.getElementById('ifs-'+this.state.on).contentWindow.document.body.scrollHeight;
    iframe_set('ifs-'+this.state.on);
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

function iframe_set(elem) {
  var child_iframe=document.getElementById(elem);
  child_iframe.height=child_iframe.contentWindow.document.body.scrollHeight;
}

// 菜单

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
      this.props.Menues.map((e,index)=><li key={index} name={e} onClick={this.tab_change.bind(this,e)}>{BluMUI.menue_names[e]}</li>)
    }</ul>);
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
        {BluMUI.menue_names[e]}
        <span className="close">x</span>
      </li>)
    }</ul>);
  }
}


function Create_tabs(tab) {
  // ReactDOM.render(
  //   <Tab_head Tab={tab}/>,
  //   document.getElementById('tabs')
  // );
  BluMUI.create({
    Tab:tab
  },'Create_tab',document.getElementById('tabs'))
}

function Create_iframes(state) {
  // ReactDOM.render(
  //   <Iframe {...state}/>,
  //   document.getElementById('tab')
  // );
  BluMUI.create(state,'Create_iframe',document.getElementById('tab'))
}
// -----------------------------------------gzzd-------------------------------------------------------


/* 筛选条件 */
class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.serch=this.serch.bind(this);
    this.pub='';
    this.P={
      page:1,
      pages:0
    }
  }

  serch(p) {
    let source=this.refs.Source.value;
    let title=this.refs.Title.value;
    if(this.refs.Pub.checked==this.refs.Unpub.checked) {
      this.pub='';
    } else {
      this.pub=this.refs.Pub.checked?1:0;
    }
      console.log('this page',this.P.page)
    ajax({
      url:courseCenter.host+'getRegulationHead',
      data:{
        page:p||this.P.page,
        unifyCode:getCookie('userId'),
        count:10,
        user:'admin',
        state:this.pub,
        title:title,
        source:source
      },
      success:gets=>{
        let datas=JSON.parse(gets);
        console.log('列表信息',datas)
        this.P={
          page:p||this.P.page,
          pages:datas.data.totalPages
        }
        show_list(
          datas.data.regulationInformation,
          this.P,
          this
        );
        console.log("子iframe")
        console.log(parent.document.getElementById('ifs-gzzd').height)
        console.log(document.body.scrollHeight)
        parent.document.getElementById('ifs-gzzd').height=document.body.scrollHeight;
      }
    });
  }

  componentDidMount() {
    let Pub=this.refs.Pub;
    let Unpub=this.refs.Unpub;

    this.serch();
    this.refs.Serch.onclick=this.serch.bind(this,1);

    Pub.onchange=this.serch.bind(this,1);
    Unpub.onchange=this.serch.bind(this,1);
  }

  render() {
    return(<div id="Filters">
      <label>
        <input type="checkbox" ref='Pub' id='Pub'/>
        <span>&nbsp;已发布&nbsp;&nbsp;&nbsp;</span>
      </label>
      <label>
        <input type="checkbox" ref='Unpub' id='Unpub'/>
        <span>&nbsp;未发布&nbsp;&nbsp;&nbsp;</span>
      </label>
      <span>标题&nbsp;</span>
      <input type="text" ref='Title' id='Title'/>
      <span>来源&nbsp;</span>
      <input type="text" ref='Source' id='Source'/>
      <span id="serch" ref='Serch'>查询</span>
    </div>);
  }
}


class BlueMUI_CreateFanye extends React.Component {
  constructor(props) {
    super(props);
    this.fanye=this.fanye.bind(this);
    this.create_popup_fanye=this.create_popup_fanye.bind(this);
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
    this.props.This.P.page=p;
    this.props.This.serch();
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


/* 显示列表 */
class List extends React.Component {
  constructor(props) {
    super(props);
    this.create_body=this.create_body.bind(this);
    this.del=this.del.bind(this);
    this.pub=this.pub.bind(this);
  }
  del(id) {
    console.log('删除：',id);
    ajax({
      url:courseCenter.host+'deleteRegulation',
      data:{
        unifyCode:getCookie('userId'),
        id:id
      },
      success:e=>{
        console.log(JSON.parse(e))
      }
    });
    this.props.This.serch();
  }
  pub(id) {
    console.log('发布：',id);
    ajax({
      url:courseCenter.host+'publishRegulation',
      data:{
        unifyCode:getCookie('userId'),
        id:id
      },
      success:e=>{
        console.log(JSON.parse(e))
      }
    });
    this.props.This.serch();
  }

  create_body() {
    let id, userId, title, state, source;
    return(<tbody>
      {this.props.Lists.map((e,index)=>{
        id=e.id;
        userId=getCookie('userId');
        title=document.getElementById('Title').value;
        source=document.getElementById('Source').value;
        state=(document.getElementById('Pub').checked==document.getElementById('Unpub').checked?'':+document.getElementById('Pub'));
        return <tr key={index} style={{background:index%2?'':'white'}}>
          <td>{e.bt}</td>
          <td>{e.czsj}</td>
          <td>{e.author}</td>
          <td>{e.ly}</td>
          <td>{+e.sffb?'已发布':'未发布'}</td>
          <td>{+e.sffb?
            <div id="caozuo">
              <span><a target="view_window" href={
                '../Regulations/regContain.html?id='+id+'&unifyCode='+userId+'&title='+title+'&state='+state+'&source='+source
              }>查看</a></span>
              <span><a href="#" onClick={this.del.bind(this,e.id)}>删除</a></span>
            </div>:
            <div id="caozuo">
              <span><a href="#" onClick={this.pub.bind(this,e.id)}>发布</a></span>
              <span><a target="view_window" href={
                '../Regulations/regContain.html?id='+id+'&unifyCode='+userId+'&title='+title+'&state='+state+'&source='+source
              }>查看</a></span>
              <span><a href="#" onClick={this.del.bind(this,e.id)}>删除</a></span>
            </div>
          }</td>
        </tr>;
      })}
    </tbody>);
  }


  render() {
    return(<div>
      <table id='list_table'>
        <thead>
          <tr>
            <td>标题</td>
            <td width='13%'>发布时间</td>
            <td width='10.5%'>发布人</td>
            <td width='10%'>来源</td>
            <td width='10%'>状态</td>
            <td width='15.4%'>操作</td>
          </tr>
        </thead>
        {this.create_body()}
      </table>
      <BlueMUI_CreateFanye This={this.props.This} page={this.props.P.page} pages={this.props.P.pages}/>
    </div>);
  }
}
function show_list(Lists,P,This) {
  BluMUI.create({
    Lists:Lists,
    P:P,
    This:This
  },'Create_gzzd_list',document.getElementById('list'));
  // ReactDOM.render(
  //   <List Lists={Lists} P={P} This={This}/>,
  //   document.getElementById('list')
  // );
}





// ----------------------------------------------------------------------------------------------------
var BluMUI_M = {
  Create_menu: Menue,
  Create_iframe: Iframe,
  Create_tab: Tab_head,
  Create_filter: Filter,
  Create_gzzd_fanye: BlueMUI_CreateFanye,
  Create_gzzd_list: List
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
