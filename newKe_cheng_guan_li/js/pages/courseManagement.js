var BluMUI = require('../libs/blueMonUI.js');
var ajax=require('../libs/post_ajax.js');



/*
院长：0102295 Cq011568 (黄容)
教研室主任：0102549  251833（罗婷婷）
课程负责人：0102387 密码caiting@cqupt（蔡婷）
教师：0102295 0102549   0102387 
 */
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
