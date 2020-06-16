var qz_vue = new Vue({
	el: '.main',
	data: {
		data: {},
		cansee:''
	},
	created() {
		var id = getURLParams(0);
		var token = localStorage.getItem('token_web');
		if(localStorage.getItem('token_web')==null){
			token=getCookieToken();
		}
		getData('/index/qiuzhi/qiuzhiView', {
			'id': id,
			'token': token
		}).then(res => {
			if (res.code == 1) {
				this.cansee=true;
				this.data = res.data;
			}
			else
				this.cansee=false
		})
	}
})
var user_vue = new Vue({
	el: '.user',
	data: {
		jump: ''
	},
	created() {
		var token = localStorage.getItem("token_web");
		var remember = localStorage.getItem("token_remember");
		if ((token && remember == 1)||getCookieToken()!=null)
			this.jump = '/mobile_web/person/person.html';
		else
			this.jump = '/mobile_web/login.html'
	}
})
