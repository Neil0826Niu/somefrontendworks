var zxjs_vue = new Vue({
	el: '.main',
	data: {
		zhu_lists: [],
		fen_lists: [],
		qita_lists: [],
		zhu_sel: '',
		fen_sel: '',
		qita_sel: '',
		title_seled: 'title_seled',
		title_selno: 'title_selno',
		current: '',
		zhu_total: '',
		fen_total: '',
		qita_total: '',
		zhu_current_page: '',
		zhu_total_page: '',
		fen_current_page: '',
		fen_total_page: '',
		qita_current_page: '',
		qita_total_page: ''
	},
	created() {
		this.zhu_sel = this.title_seled;
		this.fen_sel = this.title_selno;
		this.qita_sel = this.title_selno;
		this.current = 0;
		getData('/index/Center/centerList').then(res => {
			if (res.code == 1) {
				for (i = 0; i < res.data.length; i++) {
					switch (res.data[i].id) {
						case 16:
							this.zhu_lists = res.data[i].list.data;
							this.zhu_total = res.data[i].list.total;
							this.zhu_total_page = res.data[i].list.last_page;
							this.zhu_current_page = 1;
							break;
						case 18:
							this.fen_lists = res.data[i].list.data;
							this.fen_total = res.data[i].list.total;
							this.fen_total_page = res.data[i].list.last_page;
							this.fen_current_page = 1;
							break;
						case 19:
							this.qita_lists = res.data[i].list.data;
							this.qita_total = res.data[i].list.total;
							this.qita_total_page = res.data[i].list.last_page;
							this.qita_current_page = 1;
							break;
					}

				}
			}
		})
	},
	methods: {
		ClickZhu: function() {
			this.zhu_sel = this.title_seled;
			this.fen_sel = this.title_selno;
			this.qita_sel = this.title_selno;
			this.current = 0;
		},
		ClickFen: function() {
			this.zhu_sel = this.title_selno;
			this.fen_sel = this.title_seled;
			this.qita_sel = this.title_selno;
			this.current = 1;
		},
		ClickQita: function() {
			this.zhu_sel = this.title_selno;
			this.fen_sel = this.title_selno;
			this.qita_sel = this.title_seled;
			this.current = 2;
		},
		zhuGetList: function(page) {
			getData('/index/Center/centerList', {
				'page': page
			}).then(res => {
				if (res.code == 1) {
					for (i = 0; i < res.data.length; i++) {
						if (res.data[i].id == 16) {
							this.zhu_lists = res.data[i].list.data;
							this.zhu_total = res.data[i].list.total;
							this.zhu_total_page = res.data[i].list.last_page;
						}
					}
				}
			})
		},
		fenGetList: function(page) {
			getData('/index/Center/centerList', {
				'page': page
			}).then(res => {
				if (res.code == 1) {
					for (i = 0; i < res.data.length; i++) {
						if (res.data[i].id == 18) {
							this.fen_lists = res.data[i].list.data;
							this.fen_total = res.data[i].list.total;
							this.fen_total_page = res.data[i].list.last_page;
						}
					}
				}
			})
		},
		qitaGetList: function(page) {
			getData('/index/Center/centerList', {
				'page': page
			}).then(res => {
				if (res.code == 1) {
					for (i = 0; i < res.data.length; i++) {
						if (res.data[i].id == 16) {
							this.qita_lists = res.data[i].list.data;
							this.qita_total = res.data[i].list.total;
							this.qita_total_page = res.data[i].list.last_page;
						}
					}
				}
			})
		},
		zhuPrePage: function() {
			if (this.zhu_current_page > 1) {
				this.zhu_current_page--;
				this.zhuGetList(this.zhu_current_page);
				document.body.scrollTop = document.documentElement.scrollTop = 0
			}
		},
		zhuNextPage: function() {
			if (this.zhu_current_page < this.zhu_total_page) {
				this.zhu_current_page++;
				this.zhuGetList(this.zhu_current_page);
				document.body.scrollTop = document.documentElement.scrollTop = 0
			}
		},
		fenPrePage: function() {
			if (this.fen_current_page > 1) {
				this.fen_current_page--;
				this.fenGetList(this.fen_current_page);
				document.body.scrollTop = document.documentElement.scrollTop = 0
			}
		},
		fenNextPage: function() {
			if (this.fen_current_page < this.fen_total_page) {
				this.fen_current_page++;
				this.fenGetList(this.fen_current_page);
				document.body.scrollTop = document.documentElement.scrollTop = 0
			}
		},
		qitaPrePage: function() {
			if (this.qita_current_page > 1) {
				this.qita_current_page--;
				this.qitaGetList(this.qita_current_page);
				document.body.scrollTop = document.documentElement.scrollTop = 0
			}
		},
		qitaNextPage: function() {
			if (this.qita_current_page < this.qita_total_page) {
				this.qita_current_page++;
				this.qitaGetList(this.qita_current_page);
				document.body.scrollTop = document.documentElement.scrollTop = 0
			}
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

