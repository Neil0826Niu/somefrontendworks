var findJobSubmit_vue = new Vue({
	el: '#app',
	data: {
		type_lists: [],
		study_lists: [],
		years_lists: [],
		pay_lists: [],
		type: '',
		name: '',
		address: '',
		duty: '',
		study: '',
		years: '',
		pay: '',
		requirement: '',
		params: {}

	},
	created() {
		this.token = localStorage.getItem("token_web")
		if(localStorage.getItem('token_web')==null){
			this.token=getCookieToken();
		}
		this.id = getURLParams(0);
		getData('/index/zhaopin/hangyeList').then(res => {
			if (res.code == 1) {
				this.type_lists = res.data.data;
			}
		})
		getData('/index/zhaopin/payList').then(res => {
			if (res.code == 1) {
				this.pay_lists = res.data.data;
			}
		})
		getData('/index/zhaopin/yearsList').then(res => {
			if (res.code == 1) {
				this.years_lists = res.data.data;
			}
		})
		getData('/index/zhaopin/studyList').then(res => {
			if (res.code == 1) {
				this.study_lists = res.data.data;
			}
		})
		getData('/index/zhaopin/myZhaopinList', {
			'token': this.token
		}).then(res => {
			if (res.code == 1)
				for (i = 0; i < res.data.data.length; i++) {
					if (res.data.data[i].id == this.id) {
						this.type = res.data.data[i].type;
						this.name = res.data.data[i].name;
						this.address = res.data.data[i].address;
						this.duty = res.data.data[i].duty;
						this.study = res.data.data[i].study;
						this.pay = res.data.data[i].pay;
						this.years = res.data.data[i].years;
						this.requirement = res.data.data[i].requirement;
						break;
					}
				}
		
		})
	},
	methods: {
		Submit: function() {
			this.$set(this.params, 'type', this.type)
			this.$set(this.params, 'name', this.name)
			this.$set(this.params, 'address', this.address)
			this.$set(this.params, 'duty', this.duty)
			this.$set(this.params, 'pay', this.pay)
			this.$set(this.params, 'years', this.years)
			this.$set(this.params, 'study', this.study)
			this.$set(this.params, 'requirement', this.requirement)
			this.$set(this.params, 'id', this.id)
			var data = this.params
			postData('/index/zhaopin/zhaopinEdit', data).then(res => {
				alert(res.msg)
				if (res.code == 1)
					window.location.href = '/mobile_web/person/zhaopinManage.html'
			})
		},
		Delete: function() {
			postData('/index/zhaopin/zhaopinDelete', {
				'id': this.id
			}).then(res => {
				alert(res.msg)
				if (res.code == 1)
					window.location.href = '/mobile_web/person/zhaopinManage.html'
			})
		}
	}
})
