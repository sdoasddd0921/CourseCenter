require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');
require('es6-promise');
var BluMUI = require('../libs/blueMonUI');
var ajax = require('../libs/post_ajax');

/*
院长：0102295 Cq011568 (黄容)
教研室主任：0102549  251833（罗婷婷）
课程负责人：0102387 密码caiting@cqupt（蔡婷）
教师：0102295 0102549   0102387 
课程编号： A1040040  A2040080  A2040020  
*/

//查询数据的变量
let User={
  id:''
}
let Course={
  kcbh:''
}
User.id=getCookie('userId')
Course.kcbh=parseHash(window.location.href).classId

//http://172.22.113.230:8080/getCourseMajor?courseNo=A1100020
//显示全部（适用专业）
function showMore(){
	document.getElementById('gdxy').style.display='inline';
	document.getElementById('close').onclick=function(){
		document.getElementById('gdxy').style.display='none';
	}
	return false;//禁止连接跳转
}


//提前获取“更多学院的信息”
ajax({
  url:courseCenter.host+'getCourseMajor',
  data: {
    'courseNo': Course.kcbh,
    'unifyCode': User.id
  },
  success: function (response) {
    let datas=JSON.parse(response);

    BluMUI.create({
      'xueyuan':datas
    },'Show_all',document.getElementById('xys'));
  }
});


//ajax1,显示学院(左上)
ajax({
	url:courseCenter.host+'getCourseHomePageMsg',
	data: {
		'kcbh': Course.kcbh,
    'unifyCode': User.id
	},
	success: function (response) {
    var fengmian='../../imgs/home-course/home_course.jpg';
		var totalInfos={};
		var getCourseHomePageMsg=JSON.parse(response).data;

		var courseBaseMsg=getCourseHomePageMsg.courseBaseMsg[0];
		var teacherMsg=getCourseHomePageMsg.teacherMsg;
		var courseIntrodeceList=getCourseHomePageMsg.courseIntrodeceList[0];

		for(let a in courseIntrodeceList){
			totalInfos[a]=courseIntrodeceList[a];
		}
		for(let b in courseBaseMsg){
			totalInfos[b]=courseBaseMsg[b];
		}
		// console.log(getCourseHomePageMsg,'___97');
		document.getElementById('bigkcmc').innerText=totalInfos['kcmc'];
    document.getElementById('visited').innerText=courseBaseMsg.fwl+'人看过'
		var baseInfos=['kcmc','kcbh','xf','xs','kcjs'];
		baseInfos.map(e=>{
			document.getElementById(e).innerText=totalInfos[e];
		});//填充课程基本信息
    if(courseBaseMsg.tpurl!='') {
      fengmian=courseCenter.host+'upload/PIC/'+courseBaseMsg.tpurl;
    }
    console.log(document.getElementById('fengmian').src)
    document.getElementById('fengmian').src=fengmian;
		//适用专业、学院

		totalInfos.applyMajor.map(e=>{
			document.getElementById('syxy').innerHTML+=e+';<br/>'
		});
		document.getElementById('syxy').innerHTML+='<span id="moreSpan">···<a href="#" id="showMore">[ 显示全部 ]</a></span>';
		document.getElementById('showMore').onclick=showMore;

    //左下角的老师

    BluMUI.create({
      teachers: teacherMsg
      },
      'Show_teacher',
      document.getElementById('rkjs_table')
    );

		/**
		 * 在这进行星星打分///
		 */

    //评论组件
    BluMUI.create({
      id:"Review",
      extClass:'review_test',
      name:'课程评价',// 评价组件名称
      num:5,// 评价的星星总数
      starNum:getCourseHomePageMsg.courseBaseMsg.kcpf,// 当前评价的星星数
      enable:false,// 是否可修改评价，布尔值
      callback:function(value){//
        console.log(value);
      }},
      'Review',
      document.getElementById('evaluation3')
    );

    //中间的开课情况
    // BluMUI.create({
    //     datas: getCourseHomePageMsg.semesterCourse
    //   },
    //   'Show_kkqk',
    //   document.getElementById('kkqk')
    // );
	}
});

//评论组件
BluMUI.create({
	id:"Review1",
	extClass:'review_test',
	name:'资源评价',// 评价组件名称
	num:5,// 评价的星星总数
	starNum:5,// 当前评价的星星数
	enable:true,// 是否可修改评价，布尔值
	callback:function(value){//
		console.log(value);
    document.getElementById('value2').value=value;
	}
},'Review',document.getElementById('evaluation2'));

//评论组件
BluMUI.create({
	id:"Review2",
	extClass:'review_test',
	name:'课程评价',// 评价组件名称
	num:5,// 评价的星星总数
	starNum:5,// 当前评价的星星数
	enable:true,// 是否可修改评价，布尔值
	callback:function(value){//
		console.log(value);
    document.getElementById('percent').innerText=value*20;
    document.getElementById('value1').value=value;
	}
},'Review',document.getElementById('evaluation1'));











document.getElementById('more1').onclick=function(e) {
  // alert('a');
  window.location.href='courseShow.html?module=f&toModuleName=学习资源&classId='+Course.kcbh;
  e.preventDefault();
}
document.getElementById('more2').onclick=function(e) {
  // alert('b');
  window.location.href='courseShow.html?module=a&toModuleName=学习资源&classId='+Course.kcbh;
  e.preventDefault();
}
document.getElementById('more3').onclick=function(e) {
  // alert('c');
  window.location.href='courseShow.html?module=d&toModuleName=学习资源&classId='+Course.kcbh;
  e.preventDefault();
}
document.getElementById('more4').onclick=function(e) {
  // alert('d');
  window.location.href='courseShow.html?module=e&toModuleName=学习资源&classId='+Course.kcbh;
  e.preventDefault();
}
document.getElementById('more5').onclick=function(e) {
  // alert('d');
  window.location.href='courseShow.html?module=c&toModuleName=学习资源&classId='+Course.kcbh;
  e.preventDefault();
}
document.getElementById('more6').onclick=function(e) {
  // alert('d');
  window.location.href='courseShow.html?module=b&toModuleName=学习资源&classId='+Course.kcbh;
  e.preventDefault();
}

document.getElementById('more_info').onclick=function(e) {
  window.location.href='courseJianjie.html?toModuleName=课程简介&classId='+Course.kcbh;
  e.preventDefault();
}

document.getElementById('button').onclick=function(e) {
  let v1=document.getElementById('value1').value;
  let v2=document.getElementById('value2').value;
  console.log(v1,v2);
  ajax({
    url:courseCenter.host+'courseScore',
    data: {
      'kcbh': Course.kcbh,
      'unifyCode': User.id,
      'kcpf':v1,
      'zypf':v2,
    },
    success: function (response) {
      let datas=JSON.parse(response);
      if(datas.meta.result==100) {
        alert('评论成功！');
        document.getElementById('button').onclick=function(e) {
          document.getElementById('warn').innerText='您已提交过评价，请勿重复提交！'
          e.preventDefault();
        }
      }
    }
  });
  e.preventDefault();
}