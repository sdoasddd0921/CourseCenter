var BluMUI = require('../libs/kczystj.js');
var ajax=require('../libs/post_ajax.js');

// ����ҳ���Ȼ�ȡѧԺ����Ϣ��Ȼ����䵽��ȡ��Դ���Ľӿ�



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




