var qz_vue = new Vue({
	el: '.main',
	data: {
		data: {},
		cansee: '',
		message: ''
	},
	created() {
		var id = getURLParams(0);
		var token = localStorage.getItem('token_web');
		if(localStorage.getItem('token_web')==null){
			token=getCookieToken();
		}
		getData('/index/zhaopin/zhaopinView', {
			'id': id,
			'token': token
		}).then(res => {
			
			if (res.code == 1) {
				this.cansee = true;
				this.data = res.data;
			} 
			else {
				this.cansee=false;
				if (res.msg == '账号未认证') {
					this.message = "您的账号未认证！不能查看！"
				} else {
					this.message = "您未登录无法查看！"
				}
			}
		})
	},
	methods: {
		Submit: function() {
			var file = document.getElementById('jianli').files[0]
			var formData = new FormData();
			var imgURL = '';
			formData.append("file", file);
			$.ajax({
				url: base_url + '/index/file/upload_file',
				type: 'post',
				dataType: "json",
				data: formData,
				async: false,
				processData: false,
				contentType: false,
				success: function(data) {
					if (data.code == 1) {
						imgURL = data.data;
					}
				},
			});
			var token = localStorage.getItem('token_web');
			if(localStorage.getItem('token_web')==null){
				token=getCookieToken();
			}
			var id = getURLParams(0);
			var data = {
				'id': id,
				'token': token,
				'path': imgURL
			}
			console.log(data)
			postData('/index/zhaopin/setResume', data).then(res => {
					alert(res.msg)
					
			})
		}
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