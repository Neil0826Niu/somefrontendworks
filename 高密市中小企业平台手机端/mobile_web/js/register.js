var register_vue = new Vue({
	el: '.main',
	data: {
		username: '',
		code: '',
		password: '',
		repassword: '',
		firstGetCode: true,
		sec: '',
		interval: '',
		canclick: true,

	},
	methods: {
		getCode: function() {
			var mobile = this.username;

			if (mobile == '') alert("手机号不能为空");
			else
				getData('/index/login/duanxin', {
					mobile
				}).then(res => {
					if (res.code == 1) {
						this.countDown();
					} else
						alert(res.msg);
				})
		},

		register: function() {
			getData('/index/login/register', this.$data).then(res => {
				if (res.code == 0) alert(res.msg);
				else if (res.code == 1) {
					alert(res.msg)
					window.location.href('/mobile_web/login.html')
				}
			})
		},
		countDown: function() {
			if (!this.canclick) return;
			this.canclick = false;
			this.sec = 30;
			this.firstGetCode = false;
			this.interval = setInterval(() => {
				this.sec--;
				if (this.sec < 1) {
					clearInterval(this.interval)
					this.interval = null
					this.canclick = true;
				}
			}, 1000)
		}
	}
})
