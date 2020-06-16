var findJobSubmit_vue = new Vue({
	el: '#app',
	data: {
		type: '',
		name: '',
		address:'',
		study: '',
		years: '',
		pay: '',
		duty: '',
		requirement: ''
	},
	created() {
		var id = getURLParams(0);
		getData('/index/zhaopin/myYingpinView', {
			'id': id
		}).then(res => {
			if (res.code == 1) {
				this.type=res.data.type;
				this.name=res.data.name;
				this.study=res.data.study;
				this.address=res.data.address;
				this.years=res.data.years;
				this.pay=res.data.pay;
				this.duty=res.data.duty;
				this.requirement=res.data.requirement;
			}

		})
	},
})
