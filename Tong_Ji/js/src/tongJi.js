var BluMUI = require('../libs/blueMonUI.js');
var ajax=require('../libs/post_ajax.js');

var menues=BluMUI.menues;
var menue_names=BluMUI.menue_names;

ajax({
  url:courseCenter.host+'getMenu',
  data:{
    // module=9:规章制度，module=10：统计分析
    module:10,
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
    BluMUI.create({
      Menues:menues
    },'Create_menu',document.getElementById('menue'))
    // ReactDOM.render(
    //   <Menue Menues={menues}/>,
    //   document.getElementById('menue')
    // );
  }
});





