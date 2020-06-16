var zxjsDetails_vue = new Vue({
	el: '.main',
	data: {
		data: {}
	},
	created() {
		var id = getURLParams(0);
		getData('/index/Center/centerView', {
			'id': id
		}).then(res => {
			if (res.code == 1) {
				this.data = res.data;
			}
		})
	}
})
