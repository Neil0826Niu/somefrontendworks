var vm = new Vue({
	el: '#app',
	data: {
		lists: [],
		length:'',
	},
	created() {
		var id=getURLParams(0);
		getData('/index/zhaopin/ShowYingpin', {
			'id': id
		}).then(res => {
			console.log(res)
			if (res.code == 1) {
				this.lists = res.data.data;
				this.length=this.lists.length
			}
		})
	}
})
