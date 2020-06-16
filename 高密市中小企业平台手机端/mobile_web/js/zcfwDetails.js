var zcfwDetails_vue = new Vue({
	el: '.main',
	data: {
		data: {}
	},
	created() {
		var id = getURLParams(0);
		getData('/index/news/newsView', {
			'id': id
		}).then(res => {
			if (res.code == 1) {
				this.data = res.data;
				this.data.create_time=getTime(this.data.create_time)
			}
		})
	}
})
