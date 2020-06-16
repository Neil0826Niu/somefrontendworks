var qydcD_vue = new Vue({
	el: '.main',
	data: {
		qiyedata: {},
		fuwu_list: [],
		id:''
	},
	created() {
		var id = getURLParams(0);
		this.id=id;
		getData('/index/fuwu/jigouView', {
			'user_id': id
		}).then(res => {
			if (res.code == 1) {
				this.qiyedata = res.data;
				this.fuwu_list = res.data.fuwu_list;
			}
		})
	}
})
