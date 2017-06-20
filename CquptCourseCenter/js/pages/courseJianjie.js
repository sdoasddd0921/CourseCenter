var BluMUI = require('../libs/blueMonUI.js');
var ajax=require('../libs/post_ajax.js');

/*

 院长：0102295 Cq011568 (黄容)
教研室主任：0102549  251833（罗婷婷）
课程负责人：0102387 密码caiting@cqupt（蔡婷）
教师：0102295 0102549   0102387 
欢迎页面
http://172.20.2.137/subjectCenter/CquptCourseCenter/index.html
课程编号： A1040040  A2040080  A2040020  
 */
let User={
  id:''
}
let Course={
  kcbh:''
}
User.id=getCookie('userId')
Course.kcbh=parseHash(window.location.href).classId

BluMUI.result.unifyCode=User.id;

ajax({
  url:courseCenter.host+'getCourseIntroducePageMsg',
  data:{
    kcbh:Course.kcbh,
    unifyCode:User.id
  },
  success:function(gets) {
    let datas=JSON.parse(gets);
    if(datas.meta.result==101) {
      window.location.href='error1.html';
    } else if(dats.meta.result==102) {
      window.location.href='error2.html';
    }
    if(!datas.data||datas.data[0].kcjshtml=='') {
      // window.location.href='error.html';
      document.getElementById('jianjie').innerHTML='<p style="text-align:center;">没有课程简介</p>';
    } else {
      document.getElementById('jianjie').innerHTML=datas.data[0].kcjshtml;
    }
  }
});
