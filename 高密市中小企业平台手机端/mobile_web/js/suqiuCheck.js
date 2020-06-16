var findJobSubmit_vue = new Vue({
	el: '#app',
	data: {
		shouxin: '',
		type: '',
		title: '',
		content: '',
		dafu: '',
		dafu_content: '',
		is_anonymous: '',
		is_pass: '',
		status: '',
		update_time: '',
		is_pass_text: '',
		status_text: '',
		is_anonymous_text: '',
		type_text: ''
	},
	created() {
		var id = getURLParams(0);
		getData('/index/Suqiu/suqiuView', {
			'id': id
		}).then(res => {
			if (res.code == 1) {
				this.shouxin = res.data.shouxin;
				this.title = res.data.title;
				this.content = res.data.content;
				this.dafu = res.data.dafu;
				this.dafu_content = res.data.dafu_content;
				this.is_anonymous = res.data.is_anonymous;
				if (this.is_anonymous == 0)
					this.is_anonymous_text = '否'
				else if (this.is_anonymous == 1)
					this.is_anonymous_text = '是'
					
				this.is_pass = res.data.is_pass;
				if (this.is_pass == 0)
					this.is_pass_text = '待审核'
				else if (this.is_pass == 1)
					this.is_pass_text = '通过'
				else if (this.is_pass == 2)
					this.is_pass_text = '拒绝'
				this.status = res.data.status;
				switch (this.status) {
					case 0:
						this.status_text = '未受理';
						break;
					case 1:
						this.status_text = '已受理';
						break;
					case 2:
						this.status_text = '已回复';
						break;
					case 3:
						this.status_text = '未解决';
						break;
				}
				this.update_time = getTime(res.data.update_time);
				this.type = res.data.type;
				switch (this.type) {
					case 0:
						this.type_text = '咨询';
						break;
					case 1:
						this.type_text = '建议';
						break;
					case 2:
						this.type_text = '投诉';
						break;
					case 3:
						this.type_text = '举报';
						break;
				}
			}

		})
	},
})
