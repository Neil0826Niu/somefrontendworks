var login_vue = new Vue({
	el: '.loginform',
	data: {
		username: '',
		login_type: 0,
		password: '',
		code: '',
		remember: false
	},
	methods: {
		password_login: function() {
			this.login_type = 0;
			getData('/index/login/login', this.$data).then(res => {
				if (res.code == 0) alert(res.msg);
				else if (res.code == 1) {
					if (this.remember){
						localStorage.setItem("token_web", res.data);
						localStorage.setItem("token_remember", 1);
					}
					else {
						var d = new Date;
						d.setTime(d.getTime() + 1000*60 );
						window.document.cookie = "token_web" + "=" + res.data + ";path=/;expires=" + d.toGMTString();
					}

					window.location.href = '/mobile_web/person/person.html';
				}
			})
		}
	},

})
