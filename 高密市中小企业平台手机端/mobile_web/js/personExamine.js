var exam_vue = new Vue({
	el: '#app',
	data: {
		pro2class: 'unsuccess',
		pro3class: 'unsuccess',
		token: '',
		code: '',
		status: '',
		type: '0',
		user_name: '',
		sex: '',
		birthday: '',
		idcard: '',
		idcard_img1path: '',
		idcard_img2path: '',
		img1: '',
		img2: '',
		params: {}
	},
	created() {
		this.token = localStorage.getItem('token_web');
		if(localStorage.getItem('token_web')==null){
			this.token=getCookieToken();
		}
		getData('/index/user/getShenhe', {
			'token': this.$data.token
		}).then(res => {
			if (res.code == 1) {
				this.status = 0;
				this.code = 1;
				if (this.status == 0)
					this.pro2class = 'success';
				else if(this.status == 1||this.status == 2){
					this.pro2class = 'success';
					this.pro3class = 'success';
				}
			} else {
				this.code = 0;
			}

		})
	},
	methods: {
		updateId1: function() {
			if (document.getElementById('idcard_img1').files.length != 0)
				this.img1 = URL.createObjectURL(document.getElementById('idcard_img1').files[0])
		},
		updateId2: function() {
			if (document.getElementById('idcard_img2').files.length != 0)
				this.img2 = URL.createObjectURL(document.getElementById('idcard_img2').files[0])
		},

		ReExamine: function() {
			this.code = 0;
		},
		Examine: function() {
			var date = new Date(this.birthday);
			var time = parseInt(date.getTime() / 1000);
			this.$set(this.params, 'type', this.type);
			this.$set(this.params, 'token', this.token);
			this.$set(this.params, 'user_name', this.user_name);
			this.$set(this.params, 'sex', this.sex);
			this.$set(this.params, 'birthday', this.birthday);
			this.$set(this.params, 'idcard', this.idcard);
			var file1 = document.getElementById('idcard_img1').files[0];
			var formData1 = new FormData();
			var self = this;
			formData1.append("file", file1);
			$.ajax({
				url: base_url + '/index/file/upload_file', // 数据接口地址  
				type: 'post', //请求方式
				dataType: "json", //返回数据类型
				data: formData1,
				async: false, //是否异步
				processData: false,
				contentType: false,
				success: function(data) {
					if (data.code == 1) {
						self.idcard_img1path = data.data;
					}
				},
			});
			var file2 = document.getElementById('idcard_img2').files[0];
			var formData2 = new FormData();
			formData2.append("file", file2);
			$.ajax({
				url: base_url + '/index/file/upload_file', // 数据接口地址  
				type: 'post', //请求方式
				dataType: "json", //返回数据类型
				data: formData2,
				async: false, //是否异步
				processData: false,
				contentType: false,
				success: function(data) {
					if (data.code == 1) {
						self.idcard_img2path = data.data;
					}
				},
			});
			this.$set(this.params, 'idcard_img1', this.idcard_img1path);
			this.$set(this.params, 'idcard_img2', this.idcard_img2path);

			var data = this.params;
			$.ajax({
				url: base_url + '/index/user/setExamine', // 数据接口地址  
				type: 'post', //请求方式
				dataType: "json", //返回数据类型
				data: data,
				success: function(res) {
					alert(res.msg);
					if (res.code == 1)
						window.location.href = '/mobile_web/person/personExamine.html'
				},
			});
		}
	}
})
