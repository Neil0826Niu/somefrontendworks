var qyfc_vue = new Vue({
	el: '.main',
	data: {
		lists: [],
		current_page: '',
		total_page: '',
		user_nickname: ''

	},
	created() {
		this.current_page = 1;
		this.GetList(1);
	},
	methods: {
		GetList: function(page) {
			getData('/index/Gongsi/gongsiRecommendList', {
				'page': page,
				'user_nickname': this.user_nickname
			}).then(res => {
				if (res.code == 1) {
					this.lists = res.data.data;
					this.total_page = res.data.last_page;
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
		Search: function() {
			this.current_page = 1;
			this.GetList()
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
