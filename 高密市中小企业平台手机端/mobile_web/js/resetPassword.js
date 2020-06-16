var reset_vue = new Vue({
	el: '#app',
	data: {
		token: '',
		password: '',
		repassword: ''
	},
	methods: {
		resetPassword: function() {
			this.token = localStorage.getItem("token_web")
			if(localStorage.getItem('token_web')==null){
				this.token=getCookieToken();
			}
			getData('/index/login/updatePass', this.$data).then(res => {
				alert(res.msg);
				window.location.href = '/mobile_web/person/person.html';
			})
		}
	}
})
