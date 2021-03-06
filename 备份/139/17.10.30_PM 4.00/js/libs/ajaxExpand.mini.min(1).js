var ajaxExpanding=(function () {
	function isDomObject(domObject , type){
		if(domObject == null ||undefined){
			return false;
		}
		if(typeof domObject == 'object' && domObject.nodeType === 1){
			if(!type || type=='all' || domObject.nodeName.toLowerCase() == type.toLowerCase())
				return true;
			else
				return false;
		}
		else{
			return false;/////
		}
	}
	function isJson(obj){
		var isjson= typeof obj== "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
		return isjson;
	}
	function getXhr(){
		if(typeof XMLHttpRequest == 'undefined')
			XMLHttpRequest=function(){
				try{return new ActiveXObject("Msxml2.XMLHTTP.6.0");}
				catch(e){}
				try{return new ActiveXObject("Msxml2.XMLHTTP.3.0");}
				catch(e){}
				try{return new ActiveXObject("Msxml2.XMLHTTP");}
				catch(e){}
				return false;
			}
		return new XMLHttpRequest();
	}
	function encodeData(dataObj,name,that){
		var data='',
			key;
		if(typeof dataObj == 'object'){
					for(key in dataObj){
						if(data !== '' )
							data += '&' + key + '=' + encodeURIComponent(dataObj[key])
						else
							data +=  key + '=' + encodeURIComponent(dataObj[key])
					}
		}
		else if(typeof dataObj == 'string'){
			data=dataObj;
		}
		return data;
	}
	return {
		init: function (ajaxInf) {
			var that = this[ajaxInf.name] = {};
			that.result = null;
			that.type = ajaxInf.type || 'get';
			that.async = ajaxInf.async || false;
			that.timeOut = ajaxInf.timeOut;
			that.xhr = getXhr();
		},
		send: function (dataInf, name, bindObj) { // 发送数据
			console.log(this);
			var that = this[name],
				xhr = that.xhr,
			data = dataInf.data ? encodeData(dataInf.data, name, that) : that.data;

				that.stopFlag = false;
				that.timeoutFlag = false;
					
				if (!bindObj)
					bindObj = that;
				if (dataInf.onProgress) {
					try {
						xhr.onprogress = function (e) {
							if (e.total > 0)
								dataInf.onProgress.call(bindObj, e.loaded, e.total);
						}
					} catch (e) {
					}
				}
				if (dataInf.onAbort) {
					try {
						xhr.onabort = function (e) {
							if (that.stopFlag)
								dataInf.onAbort.call(bindObj, xhr.status);
						}
					} catch (e) {
					}
				}
				if (dataInf.onError) {
					try {
						xhr.onerror = function (e) {
							dataInf.onError.call(bindObj);
						}
					} catch (e) {}
				}
				xhr.onreadystatechange = function (e) {
					if (xhr.readyState === 4) {
						clearTimeout(timer);
						if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
							that.result = xhr.responseText;
							if (dataInf.onSuccess){
								console.log(321321);
								dataInf.onSuccess.call(bindObj, xhr.responseText);
							}
						}
						else {
							if (!that.stopFlag && !that.timeoutFlag) {
								if(dataInf.onFail)
									dataInf.onFail.call(bindObj, xhr.status);
							}
						}
					}
					if (xhr.readyState === 0) {
						var timer = setTimeout(function () {
							that.timeoutFlag = true;
							if ((that.async) && that.timeoutFlag) {
								xhr.abort();
								if (dataInf.onTimeOut) {
									dataInf.onTimeOut.call(bindObj);
								}
							}
						}, that.timeOut);
					}
				}
				if (that.type == 'post') {
					xhr.open(that.type, dataInf.url, that.async); // 创建ajax请求
				}
				else if (that.type == 'get') {
					if (dataInf.data) {
						xhr.open(that.type, dataInf.url + '?' + data, that.async);
					}
					else {
						xhr.open(that.type, dataInf.url, that.async)
					}
				}
				xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");// 设置发送信息的数据类型
				if (that.type == 'get')
					xhr.send(null);
				else {
					// console.log(data);
					xhr.send(data);
				}
		},
		stop: function (name) {
			if (this[name].xhr && !isDomObject(this[name].xhr)) {
				this[name].stopFlag = true;
				this[name].xhr.abort();
			}
		},
		parse: function (inputData,outputData,pattern) {
			var result,
				i,
				len;
			switch ((typeof inputData).toLowerCase()) {
				case 'string':
					if (pattern.toLowerCase() === 'json') {
						result = JSON.parse(inputData);
					}
					break;
				case 'object':
					if (Object.prototype.toString.call(pattern) === '[object Array]') {
						for (i = 0, len = pattern.length; i < len; i++) {
							if(!pattern[i][2].callback)
								outputData[pattern[i][1]] = inputData[pattern[i][0]];
							else
								outputData[pattern[i][1]] = pattern[i][2].callback(inputData[pattern[i][0]]);
						}
						result = output;
					}
					else if (typeof pattern == 'function') {
						result = pattern(inputData);
					}
					break
				default:
					result = inputData;
					break;
			}
			return result;
		}
	}
})();
module.exports=ajaxExpanding;
