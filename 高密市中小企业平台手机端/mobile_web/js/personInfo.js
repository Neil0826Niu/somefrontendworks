var infovue = new Vue({
	el: '#app',
	data: {
		token: '',
		type: '2',
		isChangeAvatar: false,
		avatarurl: '',
		avatar: '',
		avatarpath: '',
		user_nickname: '',
		user_url: '',
		sex: '',
		birthday: '',
		xueli: '',
		user_email: '',
		signature: '',
		user_url: '',
		xueli_lists: [],
		params: {}
	},
	created() {
		this.token = localStorage.getItem("token_web");
		if(localStorage.getItem('token_web')==null){
			this.token=getCookieToken();
		}
		if(localStorage.getItem('token_web')==null){
			this.token=getCookieToken();
		}
		getData('/index/user/getUserInfo', {
			'token': this.$data.token
		}).then(res => {
			if (res.code == 1) {
				this.type = res.data.type;
				this.avatarpath = res.data.avatar;
				if(this.avatarpath==''){
					this.avatarpath='/mobile_web//img/userHome/123.png'
				}
				this.user_nickname = res.data.user_nickname;
				this.sex = res.data.sex;
				this.birthday = res.data.birthday.split(' ')[0];
				this.user_email = res.data.user_email;
				this.signature = res.data.signature;
				this.user_url = res.data.user_url;
				this.xueli = res.data.xueli;
			}
		})
		getData('/index/zhaopin/studyList').then(res => {
			this.xueli_lists = res.data.data;
		})
	},
	methods: {
		changeInfo: function() {
			if (this.type == 0 || this.type == 1) {
				if (this.isChangeAvatar) {
					var self = this;
					var file = document.getElementById('avatar-file').files[0];
					var formData = new FormData();
					formData.append("file", file);
					$.ajax({
						url: base_url + '/index/file/upload_file', // 数据接口地址  
						type: 'post', //请求方式
						dataType: "json", //返回数据类型
						data: formData,
						async: false, //是否异步
						processData: false,
						contentType: false,
						success: function(data) {
							if (data.code == 1) {
								self.avatar = data.data;
							}
						},
					});
					this.$set(this.params, 'avatar', this.avatar);
				}
				this.$set(this.params, 'token', this.token);
				this.$set(this.params, 'user_nickname', this.user_nickname);
				this.$set(this.params, 'sex', this.sex);
				console.log(this.sex)
				this.$set(this.params, 'birthday', this.birthday);
				this.$set(this.params, 'xueli', this.xueli);
				var data = this.params;

				$.ajax({
					url: base_url + '/index/user/editUserInfo', // 数据接口地址  
					type: 'post', //请求方式
					dataType: "json", //返回数据类型
					data: data,
					success: function(res) {
						if (res.code == 1) {
							window.location.href = '/mobile_web/person/personInfo.html'
						} else
							alert(res.msg);
					},
				});

			} else {
				if (this.isChangeAvatar) {
					var self = this;
					var file = document.getElementById('comp-avatar-file').files[0];
					var formData = new FormData();
					formData.append("file", file);
					$.ajax({
						url: base_url + '/index/file/upload_file', // 数据接口地址  
						type: 'post', //请求方式
						dataType: "json", //返回数据类型
						data: formData,
						async: false, //是否异步
						processData: false,
						contentType: false,
						error: function(res) {
							console.log(res.msg)
						},
						success: function(data) {
							console.log(data);
							if (data.code == 1) {
								self.avatar = data.data;
							}
						},
					});
					this.$set(this.params, 'avatar', this.avatar);
				}

				this.$set(this.params, 'token', this.token);
				var data = this.params;
				$.ajax({
					url: base_url + '/index/user/editCompanyInfo', // 数据接口地址  
					type: 'post', //请求方式
					dataType: "json", //返回数据类型
					data: data,
					success: function(res) {
						if (res.code == 1) {
							window.location.href = '/mobile_web/person/personInfo.html'
						} else
							alert(res.msg);
					},
				});
			}
		},
		changeAvatar: function() {
			this.avatarurl = URL.createObjectURL(document.getElementById('avatar-file').files[0])
			this.isChangeAvatar = true;
		},
		changeCompAvatar: function() {
			this.avatarurl = URL.createObjectURL(document.getElementById('comp-avatar-file').files[0])
			this.isChangeAvatar = true;
		},
		changeEmail: function() {
			this.$set(this.params, 'email', this.user_email);
		},
		changeSignature: function() {
			this.$set(this.params, 'signature', this.signature);
		},
		changeURL: function() {
			this.$set(this.params, 'user_url', this.user_url);
		}
	}
})
