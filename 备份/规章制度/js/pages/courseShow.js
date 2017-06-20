var BluMUI = require('../libs/blueMonUI.js');
var ajax=require('../libs/post_ajax.js');

let config={
  user_id:'',
  course_id:''
}
config.user_id=getCookie('userId')
config.course_id=parseHash(window.location.href).classId
BluMUI.result.config=config;
let prop=parseHash(window.location.href).module||'a';
let url;
let data;
let num=['a','b','c','d','e']
console.log('测试接收的参数：',config.course_id,prop)
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
    if(datas.meta.result==101||datas.meta.result==300) {
      window.location.href='error1.html';
    } else if(datas.meta.result==102) {
      window.location.href='error2.html';
    } else {
      BluMUI.create({
        id:'Nav',
        module:parseHash(window.location.href).module
        },
        'CreateNav',
        document.getElementById('React_left')
      );
    }
  }
});