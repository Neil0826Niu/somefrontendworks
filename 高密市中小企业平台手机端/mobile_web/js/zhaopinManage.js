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
	methods:{
		GetList:function(page){
			getData('/index/zhaopin/myZhaopinList',{'page':page,'token': this.token}).then(res => {
				if (res.code == 1) {
					this.lists = res.data.data;
					this.total_page=res.data.last_page;
					for (i = 0; i < this.lists.length; i++) {
						if (this.lists[i].is_pass == 0)
							this.lists[i].is_pass = "审核中";
						else if (this.lists[i].is_pass == 1)
							this.lists[i].is_pass = "通过";
						else
							this.lists[i].is_pass = "未通过";
						this.lists[i].create_time=getTime(this.lists[i].create_time)
					}
				}
			})
		},
		PrePage:function(){
			if(this.current_page>1){
				this.current_page--;
				this.GetList(this.current_page);
				document.body.scrollTop = document.documentElement.scrollTop = 0
			}
		},
		NextPage:function(){
			if(this.current_page<this.total_page){
				this.current_page++;
				this.GetList(this.current_page);
				document.body.scrollTop = document.documentElement.scrollTop = 0
			}
		}
	}
})
