let BluMUI = require('../libs/blueMonUI.js');
let ajax = require('../libs/post_ajax.js');

// 需要获取用户id
let User = {
  name: "",
  id: "",
}
User.id=getCookie('userId');

BluMUI.result.user_id=User.id;
ajax({
  url: courseCenter.host+'getMenu',
  data: {
    unifyCode: User.id,
    module:11
  },
  success: function(gets) {
    var datas=JSON.parse(gets);
    console.log(datas)
    BluMUI.create({
      id:'Tab',
      role:datas.data
      },
      'CreateTab',
      document.getElementById('table_title')
    );
  }
});

