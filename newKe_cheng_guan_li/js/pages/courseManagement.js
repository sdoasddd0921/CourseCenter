var BluMUI = require('../libs/blueMonUI.js');
var ajax=require('../libs/post_ajax.js');


// 此处需要获取角色ID
var User={
  id:''
}
User.id=getCookie('userId')
BluMUI.result.unifyCode=User.id;

//获取subModule(tab)

ajax({
  url:courseCenter.host+"getMenu",
  data:{
    unifyCode:User.id,
    module:4
  },
  success:function(gets) {
    //渲染tabs
    BluMUI.create({
      id:'Tab',
      tabs:JSON.parse(gets).data
      },
      'Create_tabs',
      document.getElementById('React_tab')
    );

    //渲染options
    BluMUI.create({
      id:'Options',
      subModule:parseHash(window.location.href).subModule||BluMUI.result.Tab.state.subModule
      },
      'Create_options',
      document.getElementById('React_options')
    );
  }
});
