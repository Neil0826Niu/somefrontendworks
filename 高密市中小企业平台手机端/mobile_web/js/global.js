var base_url = "http://119.190.10.131:9001";
//var base_url = "http://qiye.jzbwlkj.com";

var token = localStorage.getItem("token_web");

function getData(url, params) {
	axios.defaults.baseURL = base_url;
	var token = localStorage.getItem("token_web");
	if(localStorage.getItem('token_web')==null){
		token=getCookieToken();
	}
	axios.defaults.headers.common['XX-Token'] = token;
	return new Promise((resolve, reject) => {
		axios.get(url, {
			params: params
		}).then(res => {
			resolve(res.data);
		}).catch(err => {
			reject(err.data)
		})
	});
}


function postData(url, data) {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: base_url + url, // 数据接口地址  
			type: 'post', //请求方式
			dataType: "json", //返回数据类型
			data: data,
			success: function(data) {
				resolve(data);
			},
		});
	});
}

function getTime(te) {
	var time = new Date(te * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
	var y = time.getFullYear();
	var m = time.getMonth() < 9 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;
	var d = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
	var h = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
	var mm = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
	var s = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
	var timedate = y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s;
	return timedate;
}

function getURLParams(paramNumber){
	var url=location.search;
	if(url.indexOf('?')!=-1){
		var params=url.split('?')[1];
		var param=params.split('&')[paramNumber];
		return param.split('=')[1];
	}
}

function getCookieToken(){
	return document.cookie.split(';')[0].split('=')[1];
}

function removeCookie(){
	var d = new Date;
	var token=getCookieToken();
	d.setTime(d.getTime() + 1000*5 );
	window.document.cookie = "token_web" + "=" + token + ";path=/;expires=" + d.toGMTString();
}
