var vm = new Vue({
	el: '#app',
	data: {
		lists: [],
		current_page:'',
		total_page:'',
		token:''
	},
	created() {
		this.token = localStorage.getItem('token_web');
		if(localStorage.getItem('token_web')==null){
			this.token=getCookieToken();
		}
		this.current_page=1;
		this.GetList(1)
		
	},
	methods: {
		GetList: function(page) {
			getData('/index/zhaopin/myYingpinList', {
				'page': page,
				'token': this.token
			}).then(res => {
				if (res.code == 1) {
					this.total_page=res.data.last_page
					this.lists = res.data.data;
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
		}
	}


})
