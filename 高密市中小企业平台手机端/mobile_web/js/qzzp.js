var qzzp_vue = new Vue({
	el: '.main',
	data: {
		qiuzhi: '',
		zhaopin: '',
		seled: 'top_seled',
		selno: 'top_selno',
		current_sel: '',
		qiuzhi_list: [],
		zhaopin_list: [],
		type_lists: [],
		pay_lists: [],
		years_lists: [],
		study_lists: [],
		type: '',
		pay: '',
		years: '',
		study: '',
		current_page: '',
		total_page: ''
	},
	created() {
		this.current_page = 1;
		this.current_sel = 0;
		this.qiuzhi = this.seled;
		this.zhaopin = this.selno;
		var sel = getURLParams(0);
		if (sel == 'zhaopin') {
			this.current_sel = 1;
			this.qiuzhi = this.selno;
			this.zhaopin = this.seled;
		}
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
		this.GetList(1)
	},
	methods: {
		GetList: function(page) {
			console.log(this.current_sel)
			if (this.current_sel == 0)
				getData('/index/qiuzhi/qiuzhiList', {
					'page': page,
					'type': this.type,
					'pay': this.pay,
					'years': this.years,
					'study': this.study
				}).then(res => {
					if (res.code == 1) {
						this.qiuzhi_list = res.data.data;
						for (i = 0; i < this.qiuzhi_list.length; i++) {
							if (this.qiuzhi_list[i].sex == 0)
								this.qiuzhi_list[i].sex = '男';
							else
								this.qiuzhi_list[i].sex = '女';
							var str = this.qiuzhi_list[i].pay;
							var length = str.length - 1;
							var lastword = str.charAt(length)
							if (lastword >= '0' &&
								lastword <= '9') {
								this.qiuzhi_list[i].pay = this.qiuzhi_list[i].pay + '元'
							}
						}
						this.total_page = res.data.last_page;
					}

				})
			else
				getData('/index/zhaopin/zhaopinList', {
					'page': page,
					'type': this.type,
					'pay': this.pay,
					'years': this.years,
					'study': this.study
				}).then(res => {
					if (res.code == 1) {
						this.zhaopin_list = res.data.data;
						this.total_page = res.data.last_page;
						for(i=0;i<this.zhaopin_list.length;i++){
							var str = this.zhaopin_list[i].pay;
							var length = str.length - 1;
							var lastword = str.charAt(length)
							if (lastword >= '0' &&
								lastword <= '9') {
								this.zhaopin_list[i].pay = this.zhaopin_list[i].pay + '元'
							}
						}
					}

				})
		},
		PrePage: function() {
			if (this.current_page > 1) {
				this.current_page--;
				this.GetList(this.current_page);
				document.body.scrollTop = document.documentElement.scrollTop = 0
			}
		},
		NextPage: function() {
			if (this.current_page < this.total_page) {
				this.current_page++;
				this.GetList(this.current_page);
				document.body.scrollTop = document.documentElement.scrollTop = 0
			}
		},
		Clickqiuzhi: function() {
			this.current_page = 1;
			this.current_sel = 0;
			this.qiuzhi = this.seled;
			this.zhaopin = this.selno;
			this.GetList(1);
		},
		Clickzhaopin: function() {
			this.current_page = 1;
			this.current_sel = 1;
			this.qiuzhi = this.selno;
			this.zhaopin = this.seled;
			this.GetList(1);
		},
		SelSearch: function() {
			this.current_page = 1;
			this.GetList(1)
		}
	}
})
var user_vue = new Vue({
	el: '.user',
	data: {
		jump: ''
	},
	created() {
		var token = localStorage.getItem("token_web");
		var remember = localStorage.getItem("token_remember");
		if ((token && remember == 1)||getCookieToken()!=null)
			this.jump = '/mobile_web/person/person.html';
		else
			this.jump = '/mobile_web/login.html'
	}
})
