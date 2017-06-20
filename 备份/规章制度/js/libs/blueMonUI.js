import React from 'react';
import ReactDOM from 'react-dom';
var ajax=require('./post_ajax.js');

/*
 * 学习资源
 */

 // 左侧导航
class BlueMUI_CreateNav extends React.Component {
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
    a:BlueMUI_Create_a,
    b:BlueMUI_Create_b,
    c:BlueMUI_Create_c,
    d:BlueMUI_Create_d,
    e:BlueMUI_Create_e,
    f:BlueMUI_Create_f,
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
      zylb:1+num.indexOf(prop)
    };
  }
  ajax({
    url:url,
    data:data,
    success:function(gets) {
      let datas=JSON.parse(gets);
          console.log(datas);
      ReactDOM.unmountComponentAtNode(document.getElementById('React_right'));
      ReactDOM.render(
        <Comp {...datas}/>,
        document.getElementById('React_right')
      );
    }
  });
}

// 导航的子项目
//视频
class BlueMUI_Create_a extends React.Component {
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
    this.props.data.map(e=>{
      if(e.xyswjm) {
        back.push(<div className="shipin" key={e.id}>
          <img src="../../imgs/classListInfShow/courseShow/shipin.png"/>
          <br/>
          <span>{e.xyswjm.split('.')[0]}</span>
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
    back.push(Create_tab('其他视频'));
    this.down.map(e=>{
      back.push(<a href={e.wlxxzylj} key={e.id} >{e.ljmc}</a>)
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


//讲义
class BlueMUI_Create_b extends React.Component {
  constructor(props) {
    super(props);
    // this.create_jiangyi=this.create_jiangyi.bind(this);
  }

  create_jiangyi() {
    let back=[];
    let xiazai;
    this.props.data.map(e=>{
      if(e.sfnxz==1) {
        xiazai=<span className='ziyuan_xiazai'>下载</span>;
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
      {this.create_jiangyi()}
    </div>);
  }
}


//作业
class BlueMUI_Create_c extends React.Component {
  constructor(props) {
    super(props);
    // this.create_zuoye=this.create_zuoye.bind(this);
  }

  create_zuoye() {
    let back=[];
    let xiazai;
    this.props.data.map(e=>{
      if(e.sfnxz==1) {
        xiazai=<span className='ziyuan_xiazai'>下载</span>;
      } else {
        xiazai='';
      }
      back.push(<div className="ziyuan_item" key={e.id}>
        <img src="../../imgs/classListInfShow/courseShow/ziyuan.png"/>
        <br/>
        <span>{e.ywjm.split('.')[0]}</span>
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
    </div>);
  }
}


//习题
class BlueMUI_Create_d extends React.Component {
  constructor(props) {
    super(props);
    // this.create_xiti=this.create_xiti.bind(this);
  }

  create_xiti() {
    let back=[];
    let xiazai;
    this.props.data.map(e=>{
      if(e.sfnxz==1) {
        xiazai=<span className='ziyuan_xiazai'>下载</span>;
      } else {
        xiazai='';
      }
      back.push(<div className="ziyuan_item" key={e.id}>
        <img src="../../imgs/classListInfShow/courseShow/ziyuan.png"/>
        <br/>
        <span>{e.ywjm.split('.')[0]}</span>
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
    </div>);
  }
}


//资源
class BlueMUI_Create_e extends React.Component {
  constructor(props) {
    // this.create_ziyuan=this.create_ziyuan.bind(this);
    // this.create_link=this.create_link.bind(this);
    super(props);
  }

  create_ziyuan() {
    let back=[];
    let xiazai;
    console.log('资源',this.props.data==='undefined')
    if((typeof this.props.data)==='undefined') {
      return(<div id='right'>
        <p style={{textAlign:'center',background:'#FFF',marginTop:'20px'}}>没有数据</p>
      </div>);
    }
    this.props.data.map(e=>{
      if(e.sfnxz==1) {
        xiazai=<span className='ziyuan_xiazai'>下载</span>;
      } else {
        xiazai='';
      }
      back.push(<div className="ziyuan_item" key={e.id}>
        <img src="../../imgs/classListInfShow/courseShow/ziyuan.png"/>
        <br/>
        <span>{e.ywjm.split('.')[0]}</span>
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

  create_link() {
    let back=[];
    this.props.data.map(e=>{
      back.push(<div key={e.id} ><span>网络链接：</span><a href={e.wlxxzylj}>{e.ljmc}</a></div>)
    });
    return(<div id="ziyuan_link">
      {back}
    </div>);
  }

  render() {
    return(<div id='right'>
      {this.create_ziyuan()}
      {this.create_link()}
    </div>);
  }
}


// 参考书
class BlueMUI_Create_f extends React.Component {
  constructor(props) {
    super(props);
  }

  create_jiaocai() {
    console.log(this);
    let back=[];
    back.push(Create_tab('课程教材'));
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
  CreateNav:BlueMUI_CreateNav,
}

var BluMUI = {
	result: {},
	create: function (data, type, elem) {
		var props = data, Blu = BluMUI_M[type];
		this.result[props.id] = ReactDOM.render(<Blu {...props}/>, elem);    
	}
};

export default BluMUI;
