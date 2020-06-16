var findJobSubmit_vue = new Vue({
	el: '#app',
	data: {
		type_lists: [],
		study_lists: [],
		years_lists: [],
		pay_lists: [],
		type: '',
		name: '',
		sex: '',
		mobile: '',
		birthday: '',
		study: '',
		years: '',
		pay: '',
		signature: '',
		params: {}

	},
	created() {
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
	},
	methods: {
		Submit: function() {
			var token = localStorage.getItem("token_web")
			if(localStorage.getItem('token_web')==null){
				token=getCookieToken();
			}
			this.$set(this.params, 'type', this.type)
			this.$set(this.params, 'name', this.name)
			this.$set(this.params, 'sex', this.sex)
			this.$set(this.params, 'mobile', this.mobile)
			this.$set(this.params, 'birthday', this.birthday)
			this.$set(this.params, 'pay', this.pay)
			this.$set(this.params, 'years', this.years)
			this.$set(this.params, 'study', this.study)
			this.$set(this.params, 'signature', this.signature)
			this.$set(this.params, 'token', token)
			var data = this.params
			postData('/index/qiuzhi/setQiuzhi', data).then(res => {
				alert(res.msg)
				if (res.code == 1)
					window.location.href = '/mobile_web/person/findJobManage.html'
			})
		}
	}
})
