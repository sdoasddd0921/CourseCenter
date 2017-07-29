import ReactDOM from 'react-dom';
import React from 'react';

const ajax=require('../libs/post_ajax.js');
const Fanye=require('../libs/fanye.js');
const Popup_edit=require('../libs/masterAddZb.js');

const _COUNT = 10;

class Option extends React.Component {
  constructor(props) {
    super(props);
    this.pici_insert=[];
    this.zbpc=sessionStorage.getItem("pjzbgl-zbpc")||'';
    this.state={
      TP: {
        page: 1,
        pages: 1,
        total: 1
      },
      list: [],
      zbpc_select: []
    };
  }

  insert_pici() {
    let pc=`<option value="">请选择</option>`;
    this.state.zbpc_select.map(e=>pc+=`<option ${(this.zbpc===e.zbpc)?"selected":''} value=${e.zbpc} >${e.zbpc}</option>`);
    this.pici.innerHTML=pc;
  }

  search() {
    this.zbpc=this.pici.value;
    sessionStorage.setItem("pjzbgl-zbpc", this.zbpc);
    this.get_list(1);
  }

  get_list(p) {
    let page=p||+sessionStorage.getItem("pjzbgl-page")||1;
    ajax({
      url: courseCenter.host+"getPjzbList",
      data: {
        unifyCode: getCookie('userId'),
        indexBatch: this.zbpc,
        count: _COUNT,
        page: page
      },
      success: (gets)=>{
        let datas=JSON.parse(gets);
        sessionStorage.setItem("pjzbgl-page", page);
        this.setState({
          TP: {
            page: page,
            pages: datas.data.totalPages,
            total:datas.data.total
          },
          list: datas.data.indexList
        })
      }
    });
  }

  render() {
    return (
      <div id="Option_react">
        <div id="option">
          <div id="up">
            <button id="add" ref={btn=>this.add=btn}>添加指标</button>
          </div>
          <div id="down">
            <span>指标批次：</span>
            <select 
              name="zbpc" 
              id="zbpc_select" 
              ref={sel=>(this.pici=sel)} 
              defaultValue={this.zbpc}
            >
              {
                this.state.zbpc_select.length
                ?this.insert_pici()
                :<option value="">{this.zbpc||"请选择"}</option>
              }
            </select>
            <button ref={btn=>this.search_btn=btn}>搜索</button>
          </div>
        </div>

        <List list={this.state.list} />
        <Fanye TP={this.state.TP} callback={(p)=>{this.get_list(p)}} />
      </div>
    );
  }

  componentDidMount() {
    ajax({
      url: courseCenter.host+"getPjzbpc",
      data: {
        unifyCode: getCookie('userId')
      },
      success: (gets)=>{
        let datas=JSON.parse(gets);
        this.setState({
          zbpc_select: datas.data
        })
      }
    });

    this.get_list();
    // bind search option
    this.search_btn.onclick=this.search.bind(this);
    // bind search option
    this.add.onclick=()=>{window.location.href='./masterSortEditor.html'};
  }
}

class List extends React.Component {
  constructor(props) {
    super(props);
  }

  creat_thead() {
    return(
      <thead>
        <tr>
          <td className="lefttd"><div></div></td>
          <td width="5px"></td>
          <td width="30%">分组批次</td>
          <td width="30%">分组项</td>
          <td width="30%">操作</td>
          <td width="5px"></td>
          <td className="righttd"><div></div></td>
        </tr>
      </thead>
    );
  }

  option(type, zbpc, eve) {
    eve.preventDefault();
    switch(type) {
      case 'edit': 
        Creat_popup('edit', zbpc);
        break;
      case 'delete':
        Creat_popup('delete', zbpc);
        break;
    }
  }

  creat_tbody() {
    return(
      <tbody>
        {this.props.list.map((e,index)=><tr key={index}>
          <td className="lefttd"></td>
          <td></td>
          <td>{e.zbpc}</td>
          <td>{e.zblb}</td>
          <td>
            <a href="#" onClick={this.option.bind(this,'edit',e.zbpc)} >编辑</a>
            <a href="#" onClick={this.option.bind(this,'delete',e.zbpc)} >删除</a>
          </td>
          <td></td>
          <td className='righttd'></td>
        </tr>)}
      </tbody>
    );
  }

  render() {
    return (
      <div id="List">
        <table>
          {this.creat_thead()}
          {this.creat_tbody()}
        </table>
      </div>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if(window.frameElement) {
      window.frameElement.height=document.body.offsetHeight;
    }
  }
}



class Popup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props)
    const {type,id}=this.props;
    const MAP={
      "delete": "删除"
    };

    switch(type) {
      case 'delete':
        return(
          <div id="popbody" ref='pb'>
            <div id="msg">
              <p>{`确定要${MAP[type]+id}?`}</p>
            </div>
            <div id="popup_option">
              <button id="popup_OK" ref={btn=>this.OK=btn}>确定</button>
              <button id="popup_back" ref={btn=>this.back=btn}>取消</button>
            </div>
          </div>
        );
        break;
      case 'edit':
        return(
          <div>
            <dev ref="pb"></dev>
            <Popup_edit/>
          </div>
        );
        break;
      default: 
        return(<div></div>);
        break;
    }
  }

  componentDidMount() {
    console.log("popup di mount",document.body.offsetHeight)
    if(window.frameElement) {
      window.frameElement.height=document.body.offsetHeight;
    }
    console.log(this.refs.pb)
    // background click to cancel
    this.refs.pb.onclick=e=>{e.stopPropagation();console.log("stop")};
    const {id,type}=this.props;
    let dat={};

    switch(type) {
      case "delete":
        dat={
          unifyCode: getCookie("userId"),
          indexBatch: id
        };
        break;
      case 'edit':
        return;
        break;
      default:
        break;
    }

    // back button click to cancel
    this.back.onclick=cancel_popup;
    // OK button option
    this.OK.onclick=()=>{
      let data_map={
        "delete": "deletePjzb"
      };
      ajax({
        url: courseCenter.host+data_map[type],
        data: dat,
        success: (gets)=>{
          let datas=JSON.parse(gets);
          if(datas.meta.result==100) {
            cancel_popup();
            pjzbgl_option.get_list();
          }
        }
      });
    };
  }
}

function Creat_popup(type, id) {
  const popup=document.getElementById('popup');
  const popup_datas={
    type: type,
    id: id
  };
  ReactDOM.render(
    <Popup {...popup_datas}/>,
    document.getElementById('popup')
  );
  // click to close popup
  popup.style.display="block";
  popup.onclick=cancel_popup;
}

function cancel_popup() {
  let popup=document.getElementById('popup');
  popup.style.display="none";
  ReactDOM.unmountComponentAtNode(popup);
}

var pjzbgl_option=ReactDOM.render(
  <Option />,
  document.getElementById('pjzbgl')
);