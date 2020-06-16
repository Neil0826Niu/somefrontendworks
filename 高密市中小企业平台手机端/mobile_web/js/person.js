var person_vue = new Vue({
	el: '.main',
	data: {
		mobile: '',
		avatar: '',
		type: '',
		status: '',
	},
	created() {
		var token = localStorage.getItem("token_web");
		if(token==null){
			token=getCookieToken();
		}
		getData('/index/user/getUserInfo', {
			token
		}).then(res => {
			this.mobile = res.data.mobile;
			this.avatar = res.data.avatar;
			if(this.avatar==''){
				this.avatar='/mobile_web//img/userHome/123.png'
			}
			this.type = res.data.type;
			switch (this.type) {
				case 0:
					this.status = "未认证";
					break;
				case 1:
					this.status = "当前身份：个人";
					break;
				case 2:
					this.status = "当前身份：企业";
					break;
				case 3:
					this.status = "当前身份：机构";
					break;
			}
		})
	},
	methods: {
		logout: function() {
			window.localStorage.clear();
			var d = new Date;
			d.setTime(d.getTime() );
			window.document.cookie = "token_web" + "=" + getCookieToken() + ";path=/;expires=" + d.toGMTString();
			window.location.href = '/mobile_web/login.html';
		},
		check: function() {
			if (this.type == 2)
				window.location.href = '/mobile_web/person/checkCompany.html';
			else
				window.location.href = '/mobile_web/person/checkJigou.html';
		}
	}
})