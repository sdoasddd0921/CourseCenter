var BluMUI = require('../libs/kczystj.js');
var ajax=require('../libs/post_ajax.js');

// 进入页面先获取学院等信息，然后填充到获取资源数的接口



// ajax({
//   url: courseCenter.host + "getKczyList",
//   data: {
//     unifyCode: getCookie("userId"),
//     college: "",
//     courseDepartment: "",
//     courseName: "",
//     page: 1,
//     count: 10
//   },
//   success: function(gets) {
//     let datas = JSON.parse(gets);
//     // show list;
//   }
// })


BluMUI.create({
    id:'filter',
  },
  'BluMUI_Filter',
  document.getElementById('TJ')
)




