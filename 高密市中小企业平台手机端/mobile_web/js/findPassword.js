var find_vue = new Vue({
	el: '.main',
	data: {
		username: '',
		mobile: '',
		code: '',
		password: '',
		repassword: '',
		params: {},
		firstGetCode: true,
		sec: '',
		interval: '',
		canclick: true,
	},
	methods: {
		getCode: function() {
			if (this.mobile == '') alert("手机号不能为空");
			else {
				var mb = this.mobile
				getData('/index/login/duanxin', this.$data).then(res => {
					if (res.code == 1)
						this.countDown();
					else
						alert(res.msg);
				})
			}

		},

		reset: function() {
			this.$set(this.params, 'mobile', this.mobile);
			this.$set(this.params, 'password', this.password);
			this.$set(this.params, 'repassword', this.repassword);
			this.$set(this.params, 'code', this.code);
			var data = this.params
			$.ajax({
				url: base_url + '/index/login/forget', // 数据接口地址  
				type: 'post', //请求方式
				dataType: "json", //返回数据类型
				data: data,
				success: function(res) {
					if (res.code == 0) alert(res.msg);
					else if (res.code == 1) {
						alert(res.msg)
						window.location.href = '/mobile_web/login.html';
					}
				},
			});
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
