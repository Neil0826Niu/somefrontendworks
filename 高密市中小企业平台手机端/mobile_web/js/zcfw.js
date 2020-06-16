var zcfw_vue = new Vue({
	el: '.main',
	data: {
		gzdt_lists: [],
		zcfg_lists: [],
		tzgg_lists: [],
		gzdt_sel: '',
		zcfg_sel: '',
		tzgg_sel: '',
		title_seled: 'title_seled',
		title_selno: 'title_selno',
		current: '',
		gzdt_current_page: '',
		gzdt_total_page: '',
		zcfg_current_page: '',
		zcfg_total_page: '',
		tzgg_current_page: '',
		tzgg_total_page: ''
	},
	created() {
		var sel = getURLParams(0);
		if (sel != null) {
			switch (sel) {
				case '0':
					this.gzdt_sel = this.title_seled;
					this.zcfg_sel = this.title_selno;
					this.tzgg_sel = this.title_selno;
					this.current = 0;
					break;
				case '1':
					this.gzdt_sel = this.title_selno;
					this.zcfg_sel = this.title_seled;
					this.tzgg_sel = this.title_selno;
					this.current = 1;
					break;
				case '2':
					this.gzdt_sel = this.title_selno;
					this.zcfg_sel = this.title_selno;
					this.tzgg_sel = this.title_seled;
					this.current = 2;
					break;
			}
		} else {
			this.gzdt_sel = this.title_selno;
			this.zcfg_sel = this.title_seled
			this.tzgg_sel = this.title_selno;
			this.current = 1;
		}

		getData('/index/news/newsList').then(res => {
			if (res.code == 1) {
				for (i = 0; i < res.data.length; i++) {
					switch (res.data[i].id) {
						case 18:
							this.gzdt_lists = res.data[i].list.data;
							for (j = 0; j < this.gzdt_lists.length; j++) {
								this.gzdt_lists[j].create_time = getTime(this.gzdt_lists[j].create_time)
							}
							this.gzdt_total_page = res.data[i].list.last_page;
							this.gzdt_current_page = 1;
							break;
						case 17:
							this.zcfg_lists = res.data[i].list.data;
							for (j = 0; j < this.zcfg_lists.length; j++) {
								this.zcfg_lists[j].create_time = getTime(this.zcfg_lists[j].create_time)
							}
							this.zcfg_total_page = res.data[i].list.last_page;
							this.zcfg_current_page = 1;
							break;
						case 16:
							this.tzgg_lists = res.data[i].list.data;
							for (j = 0; j < this.tzgg_lists.length; j++) {
								this.tzgg_lists[j].create_time = getTime(this.tzgg_lists[j].create_time)
							}
							this.tzgg_total_page = res.data[i].list.last_page;
							this.tzgg_current_page = 1;
							break;
					}

				}
			}
		})
	},
	methods: {
		Clickgzdt: function() {
			this.gzdt_sel = this.title_seled;
			this.zcfg_sel = this.title_selno;
			this.tzgg_sel = this.title_selno;
			this.current = 0;
		},
		Clickzcfg: function() {
			this.gzdt_sel = this.title_selno;
			this.zcfg_sel = this.title_seled;
			this.tzgg_sel = this.title_selno;
			this.current = 1;
		},
		Clicktzgg: function() {
			this.gzdt_sel = this.title_selno;
			this.zcfg_sel = this.title_selno;
			this.tzgg_sel = this.title_seled;
			this.current = 2;
		},
		gzdtGetList: function(page) {
			getData('/index/news/newsList', {
				'page': page
			}).then(res => {
				if (res.code == 1) {
					for (i = 0; i < res.data.length; i++) {
						if (res.data[i].id == 18) {
							this.gzdt_lists = res.data[i].list.data;
							for (j = 0; j < this.gzdt_lists.length; j++) {
								this.gzdt_lists[j].create_time = getTime(this.gzdt_lists[j].create_time)
							}
						}

					}
				}
			})
		},
		zcfgGetList: function(page) {
			getData('/index/news/newsList', {
				'page': page
			}).then(res => {
				if (res.code == 1) {
					for (i = 0; i < res.data.length; i++) {
						if (res.data[i].id == 17) {
							this.zcfg_lists = res.data[i].list.data;
							for (j = 0; j < this.zcfg_lists.length; j++) {
								this.zcfg_lists[j].create_time = getTime(this.zcfg_lists[j].create_time)
							}
						}

					}
				}
			})
		},
		tzggGetList: function(page) {
			getData('/index/news/newsList', {
				'page': page
			}).then(res => {
				if (res.code == 1) {
					for (i = 0; i < res.data.length; i++) {
						if (res.data[i].id == 16) {
							this.tzgg_lists = res.data[i].list.data;
							for (j = 0; j < this.tzgg_lists.length; j++) {
								this.tzgg_lists[j].create_time = getTime(this.tzgg_lists[j].create_time)
							}
						}

					}
				}
			})
		},
		gzdtPrePage: function() {
			if (this.gzdt_current_page > 1) {
				this.gzdt_current_page--;
				this.gzdtGetList(this.gzdt_current_page);
				document.body.scrollTop = document.documentElement.scrollTop = 0
			}
		},
		gzdtNextPage: function() {
			if (this.gzdt_current_page < this.gzdt_total_page) {
				this.gzdt_current_page++;
				this.gzdtGetList(this.gzdt_current_page);
				document.body.scrollTop = document.documentElement.scrollTop = 0
			}
		},
		zcfgPrePage: function() {
			if (this.zcfg_current_page > 1) {
				this.zcfg_current_page--;
				this.zcfgGetList(this.zcfg_current_page);
				document.body.scrollTop = document.documentElement.scrollTop = 0
			}
		},
		zcfgNextPage: function() {
			if (this.zcfg_current_page < this.zcfg_total_page) {
				this.zcfg_current_page++;
				this.zcfgGetList(this.zcfg_current_page);
				document.body.scrollTop = document.documentElement.scrollTop = 0
			}
		},
		tzggPrePage: function() {
			if (this.tzgg_current_page > 1) {
				this.tzgg_current_page--;
				this.tzggGetList(this.tzgg_current_page);
				document.body.scrollTop = document.documentElement.scrollTop = 0
			}
		},
		tzggNextPage: function() {
			if (this.tzgg_current_page < this.zcfg_total_page) {
				this.tzgg_current_page++;
				this.tzggGetList(this.tzgg_current_page);
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
