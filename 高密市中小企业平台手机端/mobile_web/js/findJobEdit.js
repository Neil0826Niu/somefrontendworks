var findJobSubmit_vue = new Vue({
	el: '#app',
	data: {
		type_lists: [],
		study_lists: [],
		years_lists: [],
		pay_lists: [],
		id: '',
		type: '',
		name: '',
		token: '',
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
		getData('/index/qiuzhi/qiuzhiView', {
			'token': this.token,
			'id': this.id
		}).then(res => {
			if (res.code == 1) {
				this.type = res.data.type;
				this.name = res.data.name;
				this.sex = res.data.sex;
				this.mobile = res.data.mobile;
				this.birthday = getTime(res.data.birthday).split(' ')[0];
				this.study = res.data.study;
				this.pay = res.data.pay;
				this.years = res.data.years;
				this.signature = res.data.signature;


			}

		})
	},
	methods: {
		Submit: function() {
			this.$set(this.params, 'type', this.type)
			this.$set(this.params, 'name', this.name)
			this.$set(this.params, 'sex', this.sex)
			this.$set(this.params, 'mobile', this.mobile)
			this.$set(this.params, 'birthday', this.birthday)
			this.$set(this.params, 'pay', this.pay)
			this.$set(this.params, 'years', this.years)
			this.$set(this.params, 'study', this.study)
			this.$set(this.params, 'signature', this.signature)
			this.$set(this.params, 'token', this.token)
			this.$set(this.params, 'id', this.id)
			var data = this.params
			postData('/index/qiuzhi/qiuzhiEdit', data).then(res => {
				alert(res.msg)
				if (res.code == 1)
					window.location.href = '/mobile_web/person/findJobManage.html'
			})
		},
		Delete: function() {
			postData('/index/qiuzhi/qiuzhiDelete', {
				'id': this.id,
				'token': this.token
			}).then(res => {
				alert(res.msg)
				if (res.code == 1)
					window.location.href = '/mobile_web/person/findJobManage.html'
			})
		}
	}
})
