import React from 'react';
import ReactDOM from 'react-dom';
var ajax=require('./post_ajax.js');
var Place=3;
console.log("Place=3,预览、审核页")
// var url_place=parseHash(window.location.href);
// if("place" in url_place) {
//   Place = url_place.place;
// }
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
      place:Place,
    };
  } else {
    url=courseCenter.host+'getStudyResourceMsg';
    data={
      unifyCode:BluMUI.result.config.user_id,
      kcbh:BluMUI.result.config.course_id,
      place:Place,
      zylb:prop=='b'?21:1+num.indexOf(prop)
    };
  }
  ajax({
    url:url,
    data:data,
    success:function(gets) {
      let datas=JSON.parse(gets);
      // if(datas.meta.result==101) {
      //   window.location.href='error1.html';
      // } else if(datas.meta.result==102) {
      //   window.location.href='error2.html';
      // }
      console.log(datas);
      ReactDOM.unmountComponentAtNode(document.getElementById('React_right'));
      ReactDOM.render(
        <Comp {...datas}/>,
        document.getElementById('React_right')
      );
    }
  });
}

function check() {
  if(this.props.meta.result==101) {
    return(<div id="error" key='error'>
      <img src="../../imgs/public/error.png" alt="error"/>
      <span>没有数据</span>
    </div>);
  } else if(this.props.meta.result==102) {
    return(<div id="error" key='error'>
      <img src="../../imgs/public/error.png" alt="error"/>
      <span>正在维护</span>
    </div>);
  }
  return false;
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
    let flag = check.call(this);
    if(flag) return flag;
    this.props.data.map(e=>{
      if(!e.wlxxzylj) {
        back.push(<div className="shipin" key={e.id}>
          <a target="view_window" href={'courseVideo.html?fileName='+e.xywjm}>
            <img src="../../imgs/classListInfShow/courseShow/shipin.png" style={{width:'152px',height:'131px'}}/>
          </a>
          <br/>
          <span>{e.ywjm.split('.')[0]}</span>
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
    back.push(Create_tab('录播视频'));
    let flag = check.call(this);
    if(flag) return;
    this.down.map(e=>{
      back.push(<a target="view_window" href={e.wlxxzylj} key={e.id}>{e.ljmc}</a>)
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

/* 在线展示 */
var config= { // flexpaper配置选项
  Scale : 1,
  ZoomTransition : 'easeOut',
  ZoomTime : 0.5,
  ZoomInterval : 0.2,
  FitPageOnLoad : true,
  FitWidthOnLoad : true,
  FullScreenAsMaxWindow : false,
  ProgressiveLoading : true,
  MinZoomSize : 0.2,
  MaxZoomSize : 5,
  SearchMatchAll : false,
  InitViewMode : 'Portrait',
  RenderingOrder : 'flash',
  StartAtPage : '',
  ViewModeToolsVisible : true,
  ZoomToolsVisible : true,
  NavToolsVisible : true,
  CursorToolsVisible : true,
  SearchToolsVisible :true,
  WMode : 'window',
  localeChain: 'zh_CN'
};
var swfURL = courseCenter.host + 'CquptCourseCenter/pages/classInfShow/docs/CourseCenterAttachment/';

//讲义
class BlueMUI_Create_b extends React.Component {
  constructor(props) {
    super(props);
    // this.create_jiangyi=this.create_jiangyi.bind(this);
    this.jiangyi=false;
    this.other=false;
    this.ziyuan=false;
    this.default_kcbh='';
  }
  xiazai(link) {
    this.refs.DOWNLOAD.src=courseCenter.host+'fileDownLoad?name='+link.split('.')[0]+'&oName='+link;
  }
  componentDidMount() {
    console.log('___247',this.jiangyi,this.other)
    if((this.other==101||this.other==102)&&this.jiangyi) {
      var error_msg=this.other==101?'没有数据':'正在维护';
      this.refs.right.innerHTML="<div id='error' key='error'><img src='../../imgs/public/error.png' alt='error'/><span>"+error_msg+"</span></div>";
    } else {
      this.show(this.default_kcbh);
    }
  }

  show(No) {
    if(No) {
      config.SWFFile = swfURL + No.xyswjm;
      $('#preview').FlexPaperViewer(
        {
          config: config
        }
      );
      console.log(No)
      console.log('config:',config.SWFFile)
      if(No.sfnxz==1) {
        // this.refs.fujian_download.innerText
        ReactDOM.render(
          <div>
            <div style={{
              width:'24px',
              height:'24px',
              borderRadius:'50%',
              display:'inline-block',
              overflow:'hidden',
              lineHeight:'24px'
            }}>
              <img src="../../imgs/classListInfShow/courseShow/ziyuan.png" style={{
                height:'50px',
                width:'50px',
                borderRadius:'50%',
                position:'relative',
                top:'-13px',
                left:'-13px'
              }}/>
            </div>
            <a href="javascript:void(0)" onClick={this.xiazai.bind(this,No.ywjm)}>下载讲义</a>
          </div>,
          document.getElementById('Down')
        );
      }
    }
  }
// sfnxz
  create_jiangyi() {
    this.jiangyi = check.call(this);
    console.log("讲义：",this.props)
    let back = [];
    back.push(Create_tab('讲义'));
    if(this.jiangyi) {
      back.push(<div key="no_data" style={{width:"100%",height:"100px"}}></div>);
    } else {
      this.default_kcbh=this.props.data[0];
      console.log('默认：',this.default_kcbh)
      this.props.data.map(e=>{
        back.push(<a href="javascript:void(0)" key={e.id} onClick={this.show.bind(this,e)}>{e.ywjm}</a>);
      });
    }
    return back;
  }

  create_other() {
    let back=[];
    back.push(Create_tab('其他资源'));
    var xmlhttp=new XMLHttpRequest();
    var data={
      unifyCode:BluMUI.result.config.user_id,
      kcbh:BluMUI.result.config.course_id,
      place:Place,
      zylb:22
    };
    var ajax_data='';
    for(let i in data) {
      ajax_data+=i+'='+data[i]+'&';
    }
    console.log(ajax_data.substr(0,ajax_data.length-1))
    xmlhttp.onreadystatechange=()=>
    {
      if (xmlhttp.readyState==4 && xmlhttp.status==200) {
        let datas=JSON.parse(xmlhttp.responseText);
        this.other = datas.meta.result;
        if(this.other==101||this.other==102) {
          back.push(<div key="no_data" style={{width:"100%",height:"100px"}}></div>);
        } else {
          console.log('success',datas)
          datas.data.map(e=>{
              back.push(<div className="ziyuan_item" key={e.id}>
            <img src="../../imgs/classListInfShow/courseShow/ziyuan.png"/>
            <br/>
            <span title={e.ywjm}>{e.ywjm.split('.')[0]}</span>
            <br/>
            <span className='ziyuan_xiazai' onClick={this.xiazai.bind(this,e.ywjm)}>下载</span>
          </div>);
          });
        }
      }
    }
    xmlhttp.open("POST","http://cc.cqupt.edu.cn/getStudyResourceMsg",false);
    xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
    xmlhttp.send(ajax_data.substr(0,ajax_data.length-1));
    return back;
  }

  render() {
    return(<div id='right' ref='right'>
      <div id="jiangyi">
        {this.create_jiangyi()}
        {this.jiangyi?'':<div id="preview" ref="preview" style={{paddingRight:'24px',height:'700px'}}></div>}
        
        <div ref="fujian_download" id="Down"></div>
      </div>
      <div id="other">
        {this.create_other()}
      </div>
      <iframe src="" frameBorder="0" ref='DOWNLOAD' style={{display:'none'}}></iframe>
    </div>);
  }
}


//作业
class BlueMUI_Create_c extends React.Component {
  constructor(props) {
    super(props);
    // this.create_zuoye=this.create_zuoye.bind(this);
  }
  xiazai(link) {
    this.refs.DOWNLOAD.src=courseCenter.host+'fileDownLoad?name='+link.split('.')[0]+'&oName='+link;
  }

  create_zuoye() {
    let flag = check.call(this);
    if(flag) return flag;
    let back=[];
    let xiazai;
    this.props.data.map(e=>{
      if(e.sfnxz==1) {
        xiazai=<span className='ziyuan_xiazai' onClick={this.xiazai.bind(this,e.ywjm)}>下载</span>;
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
      {this.create_zuoye()}
      <iframe src="" frameBorder="0" ref='DOWNLOAD' style={{display:'none'}}></iframe>
    </div>);
  }
}


//习题
class BlueMUI_Create_d extends React.Component {
  constructor(props) {
    super(props);
    // this.create_xiti=this.create_xiti.bind(this);
  }
  xiazai(link) {
    this.refs.DOWNLOAD.src=courseCenter.host+'fileDownLoad?name='+link.split('.')[0]+'&oName='+link;
  }

  create_xiti() {
    let flag = check.call(this);
    if(flag) return flag;
    let back=[];
    let xiazai;
    this.props.data.map(e=>{
      if(e.sfnxz==1) {
        xiazai=<span className='ziyuan_xiazai' onClick={this.xiazai.bind(this,e.ywjm)}>下载</span>;
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
      {this.create_xiti()}
      <iframe src="" frameBorder="0" ref='DOWNLOAD' style={{display:'none'}}></iframe>
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
  xiazai(link) {
    this.refs.DOWNLOAD.src=courseCenter.host+'fileDownLoad?name='+link.split('.')[0]+'&oName='+link;
  }

  create_ziyuan() {
    let flag = check.call(this);
    if(flag) return flag;
    let back=[];
    back.push(Create_tab('附件'));
    let xiazai;

    this.props.data.map(e=>{
      if(e.ywjm!='') {
        xiazai=<span className='ziyuan_xiazai' onClick={this.xiazai.bind(this,e.ywjm)}>下载</span>;
        back.push(<div className="ziyuan_item" key={e.id}>
          <img src="../../imgs/classListInfShow/courseShow/ziyuan.png"/>
          <br/>
          <span title={e.ywjm}>{e.ywjm.split('.')[0]||e.ywjm.split('.')[0]+'.'+e.ywjm.split('.')[1]}</span>
          <br/>
          {xiazai}
        </div>);
      }
    });
    if(back.length==1) {
      back.push(<div key='space' style={{height:'100px',width:'1px'}}></div>);
    }
    return(back);
  }

  create_link() {
    if(check.call(this)) {
      return;
    }
    let back=[];
    back.push(Create_tab('链接'));
    this.props.data.map(e=>{
      if(e.wlxxzylj!='') {
        back.push(<div key={e.id} className='ziyuan_link'><span>网络链接：</span><a target="view_window" href={e.wlxxzylj}>{e.ljmc}</a></div>);
      }
    });
    return(
      back
    );
  }

  render() {
    return(<div id='right'>
      {this.create_ziyuan()}
      {this.create_link()}
      <iframe src="" frameBorder="0" ref='DOWNLOAD' style={{display:'none'}}></iframe>
    </div>);
  }
}


// 参考书
class BlueMUI_Create_f extends React.Component {
  constructor(props) {
    super(props);
    this.no_data=false;
  }

  create_jiaocai() {
    console.log(this);
    let back=[];
    back.push(Create_tab('课程教材'));
    let flag = check.call(this);
    console.log('aaa',flag)
    if(flag) return flag;
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
    let flag = check.call(this);
    if(flag) return;
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
