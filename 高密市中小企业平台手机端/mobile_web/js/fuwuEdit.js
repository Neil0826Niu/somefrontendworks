var findJobSubmit_vue = new Vue({
	el: '#app',
	data: {
		title: '',
		content: '',
		img: '',
		imgpath: '',
		params: {}

	},
	created() {
		var token=localStorage.getItem('token_web')
		if(localStorage.getItem('token_web')==null){
			token=getCookieToken();
		}
		this.id = getURLParams(0);
		getData('/index/Fuwu/myfuwuList', {
			'token': token
		}).then(res => {
			console.log(res)
			if (res.code == 1)
				for (i = 0; i < res.data.data.length; i++) {
					if (res.data.data[i].id == this.id) {
						this.title = res.data.data[i].title;
						this.content = res.data.data[i].content;
						this.img = res.data.data[i].img;
						this.imgpath= res.data.data[i].img;
						break;
					}
				}
		})
	},


	methods: {
		Submit: function() {
			var file = document.getElementById('img').files[0]
			var formData = new FormData();
			var self = this;
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
						self.imgpath = data.data;
					}
				},
			});
			var token = localStorage.getItem("token_web")
			if(localStorage.getItem('token_web')==null){
				token=getCookieToken();
			}
			this.$set(this.params, 'title', this.title)
			this.$set(this.params, 'content', this.content)
			this.$set(this.params, 'img', this.imgpath)
			this.$set(this.params, 'token', token)
			this.$set(this.params, 'id', this.id)
			var data = this.params
			postData('/index/Fuwu/fuwuEdit', data).then(res => {
				alert(res.msg)
				if (res.code == 1)
					window.location.href = '/mobile_web/person/fuwuManage.html'
			})
		},
		updateId1: function() {
			if (document.getElementById('img').files.length != 0)
				this.img = URL.createObjectURL(document.getElementById('img').files[0])
		},
		Delete: function() {
			postData('/index/Fuwu/fuwuDelete', {
				'id': this.id,
				'token': this.token
			}).then(res => {
				alert(res.msg)
				if (res.code == 1)
					window.location.href = '/mobile_web/person/fuwuManage.html'
			})
		}
	}
})
