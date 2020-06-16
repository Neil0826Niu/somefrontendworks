var suqiu_vue = new Vue({
	el: '.main',
	data: {
		search_title: '',
		lists: [],
		count: {},
		current_page:'',
		total_page:'',
	},
	created() {
		this.current_page=1;
		this.GetList(this.current_page);
		getData('/index/Suqiu/suqiuCount').then(res => {
			if (res.code == 1) {
				this.count = res.data
			}
		})
	},
	methods:{
		GetList:function(page){
			getData('/index/Suqiu/suqiuList',{'page':page,'title':this.search_title}).then(res => {
				if (res.code == 1) {
					this.lists = res.data.data;
					this.total_page=res.data.last_page;
					for (i = 0; i < res.data.data.length; i++) {
						this.lists[i].create_time=getTime(this.lists[i].create_time).split(' ')[0];
						if (this.lists[i].status == 0)
							this.lists[i].status = "未受理"
						else if (this.lists[i].status == 1)
							this.lists[i].status = "已受理"
						else if (this.lists[i].status == 2)
							this.lists[i].status = "已回复"
						else if (this.lists[i].status == 3)
							this.lists[i].status = "未解决"
						switch (this.lists[i].type) {
							case 0:
								this.lists[i].type = "咨询";
								break;
							case 1:
								this.lists[i].type = "建议";
								break;
							case 2:
								this.lists[i].type = "投诉";
								break;
							case 3:
								this.lists[i].type = "举报";
								break;
						}
					}
				}
			})
		},
		Search:function(){
			this.current_page=1;
			this.GetList();
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
