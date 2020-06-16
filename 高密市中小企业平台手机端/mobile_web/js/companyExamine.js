var exam_vue = new Vue({
	el: '#app',
	data: {
		pro2class: 'unsuccess',
		pro3class: 'unsuccess',
		token: '',
		code: '',
		status: '',
		type: '1',
		company_name: '',
		legal_person: '',
		compamy_code: '',
		company_img: '',
		mobile_name: '',
		mobile: '',
		email: '',
		logo: '',
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
			if (document.getElementById('logo').files.length != 0)
				this.img1 = URL.createObjectURL(document.getElementById('logo').files[0])
		},
		updateId2: function() {
			if (document.getElementById('company_img').files.length != 0)
				this.img2 = URL.createObjectURL(document.getElementById('company_img').files[0])
		},

		ReExamine: function() {
			this.code = 0;
		},
		Examine: function() {
			var fileinput = document.getElementById('company_img')
			var number = fileinput.files.length;
			var self = this;
			for (i = 0; i < number; i++) {
				var file = fileinput.files[i];
				var formData1 = new FormData();
				formData1.append("file", file);
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
							self.company_img += data.data;
							if (i != number - 1) {
								self.company_img += ',';
							}
						}
					},
				});
			}
			var formData2 = new FormData();
			formData2.append("file", document.getElementById('logo').files[0]);
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
						self.logo += data.data;
					}
				},
			});

			this.$set(this.params, 'type', this.type);
			this.$set(this.params, 'token', this.token);
			this.$set(this.params, 'company_name', this.company_name);
			this.$set(this.params, 'code', this.compamy_code);
			this.$set(this.params, 'legal_person', this.legal_person);
			this.$set(this.params, 'company_img', this.company_img);
			this.$set(this.params, 'mobile', this.mobile);
			this.$set(this.params, 'email', this.email);
			this.$set(this.params, 'logo', this.logo);
			this.$set(this.params, 'mobile_name', this.mobile_name);

			var data = this.params;
			$.ajax({
				url: base_url + '/index/user/setExamine', // 数据接口地址  
				type: 'post', //请求方式
				dataType: "json", //返回数据类型
				data: data,
				success: function(res) {
					alert(res.msg);
					if (res.code == 1)
						window.location.href = '/mobile_web/person/companyExamine.html'
				},
			});
		}
	}
})
