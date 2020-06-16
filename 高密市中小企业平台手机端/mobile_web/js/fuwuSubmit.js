var findJobSubmit_vue = new Vue({
	el: '#app',
	data: {
		title:'',
		content:'',
		img:'',
		imgpath:'',
		params: {}

	},
	methods: {
		Submit: function() {
			var file = document.getElementById('img').files[0]
			var formData=new FormData();
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
			var data = this.params
			postData('/index/Fuwu/setFuwu', data).then(res => {
				alert(res.msg)
				if (res.code == 1)
					window.location.href = '/mobile_web/person/fuwuManage.html'
			})
		},
		updateId1: function() {
			if (document.getElementById('img').files.length != 0)
				this.img = URL.createObjectURL(document.getElementById('img').files[0])
		},
	}
})
