let BluMUI = require('../libs/blueMonUI.js');
var ajax = require('../libs/post_ajax.js');
// 需要获取用户id
let User = {
  name: "",
  id: "",
}
User.id=getCookie('userId')
/**
 * 0100032：院长、秘书（1）
 * 0100033：主任（2）
 * 0101225：课程负责人（3）
 * 院长：0102295 Cq011568 (黄容)
 * 教研室主任：0102549  251833（罗婷婷）
 * 课程负责人：0102387 密码caiting@cqupt（蔡婷）
 * 教师：0102295 0102549   0102387 
 */

/**
 * 服务器：172.20.2.137/subjectCenter/
 * 刘堂臣：172.22.113.230:8080/subjectCenter/
 */
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

