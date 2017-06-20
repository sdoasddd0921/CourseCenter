var courseCenter = {
	host:'http://172.22.114.135:6535/subjectCenter/'
}
function parseHash(URL) {
	var hash = decodeURI(URL).split('?')[1],
		result = {};
	if(hash) {
		var hashArry = hash.split('&'),
			i,
			keyValue,
			result = {},
			len;
		for( i = 0 , len = hashArry.length ; i < len ; i++){
			keyValue = hashArry[i].split('=');
			result[keyValue[0]]=keyValue[1];
		}

	}
	return result;
}

// 获取cookie
function getCookie(c_name)
{
	var c_start,
		c_end;
	if (document.cookie.length>0)
	{
		c_start=document.cookie.indexOf(c_name + "=")
		if (c_start!=-1)
		{
			c_start=c_start + c_name.length+1
			c_end=document.cookie.indexOf(";",c_start)
			if (c_end==-1) c_end=document.cookie.length
			return unescape(document.cookie.substring(c_start,c_end))
		}
	}
	return ""
}

// 删除cookie
function delCookie(name)
{
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=getCookie(name);
	if(cval!=null)
		document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
