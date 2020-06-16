var detail_vue = new Vue({
	el: '.main',
	data: {
		id: '',
		sq_data: {}
	},
	created() {
		this.id = getURLParams(0);
		getData('/index/Suqiu/suqiuView', {
			'id': this.id
		}).then(res => {
			if (res.code == 1) {
				this.sq_data = res.data;
				this.sq_data.create_time = getTime(this.sq_data.create_time);
				this.sq_data.update_time = getTime(this.sq_data.update_time);
				switch (this.sq_data.type) {
					case 0:
						this.sq_data.type = "咨询";
						break;
					case 1:
						this.sq_data.type = "建议";
						break;
					case 2:
						this.sq_data.type = "投诉";
						break;
					case 3:
						this.sq_data.type = "举报";
						break;
				}
			}

		})
	}
})

