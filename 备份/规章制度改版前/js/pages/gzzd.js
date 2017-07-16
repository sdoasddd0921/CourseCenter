var BluMUI = require('../libs/blueMonUI.js');
var ajax=require('../libs/post_ajax.js');

  // parent.document.getElementById('ifs-gzzd').height=document.body.scrollHeight;
document.getElementById("fabu_btn").onclick=()=>{
  window.location.href='./guizhang_publish.html';
}
BluMUI.create({},'Create_filter',document.getElementById('filter'))
// ReactDOM.render(
//   <Filter />,
//   document.getElementById('filter')
// );
console.log("规章制度初始化",parent.document.getElementById('ifs-gzzd').height)
console.log(document.body.height)
parent.document.getElementById('ifs-gzzd').height=document.body.offsetHeight;
