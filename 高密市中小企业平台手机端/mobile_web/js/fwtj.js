var fwtj_vue = new Vue({
	el: '.main',
	data: {
		current_page: '',
		total_page: '',
		current_sel: '',
		Fuwu_List: [],
		item_lists: []
	},
	created() {
		var id = getURLParams(0);

		getData('/index/Fuwu/getFuwuCategoryList').then(res => {
			if (res.code == 1) {
				this.Fuwu_List = res.data;
				if (id != null) {
					this.current_sel = id;
				} 
				else
					this.current_sel = this.Fuwu_List[0].id;
			}
		})
		this.current_page = 1;
		this.GetList();
	},
	methods: {
		GetList: function() {
			getData('/index/fuwu/jigouList', {
				'page': this.current_page
			}).then(res => {
				if (res.code == 1) {
					for (i = 0; i < res.data.length; i++) {
						if (res.data[i].id == this.current_sel) {
							this.item_lists = res.data[i].list.data;
							this.total_page = res.data[i].list.last_page;
						}
					}
				}
			})
		},
		PrePage: function() {
			if (this.current_page > 1) {
				this.current_page--;
				this.GetList();
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
		Changesel: function(id) {
			this.current_sel = id;
			this.current_page = 1;
			this.GetList();
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
