
//封装ajax(BluMUI.result.Title.props.ajaxing)
var post_ajax=function(options) {
  options = options || {};
  // options.dataType = "json";

  //创建 - 非IE6 - 第一步
  if (window.XMLHttpRequest) {
    var xhr = new XMLHttpRequest();
  } else { //IE6及其以下版本浏览器
    var xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }

  //数据处理
  var arr=[];
  for(var name in options.data) {
      arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(options.data[name]));
  }
  var params=arr.join("&");


  //连接 和 发送 - 第二步
  xhr.open("POST", options.url, true);
  //设置表单提交时的内容类型(注意头信息的UTF-8，不然后台会乱码)
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
  xhr.send(params);

  //接收 - 第三步
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
      var status = xhr.status;
      if (status >= 200 && status < 300) {
        options.success && options.success(xhr.responseText, xhr.responseXML);
      } else {
        options.fail && options.fail(status);
      }
    }
  }
}

export default post_ajax;
