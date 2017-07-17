var BluMUI = require('../libs/blueMonUI.js');
var ajax=require('../libs/post_ajax.js');

var menues=[];
var menue_names=BluMUI.menue_names;

ajax({
  url:courseCenter.host+'getMenu',
  data:{
    module:9,
    unifyCode:getCookie('userId')
  },
  success:function(gets) {
    // 未获取到数据则刷新页面
    // 
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
  }
});






