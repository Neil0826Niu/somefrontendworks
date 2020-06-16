var qz_vue = new Vue({
	el: '.main',
	data: {
		data: {},
	},
	created() {
		var companyId = getURLParams(0);
		var fuwuId = getURLParams(1);
		var token = localStorage.getItem('token_web');
		if(localStorage.getItem('token_web')==null){
			token=getCookieToken();
		}
		getData('/index/fuwu/jigouView', {
			'id': companyId,
		}).then(res => {
			if (res.code == 1) {
				for(i=0;i<res.data.fuwu_list.length;i++){
					if(res.data.fuwu_list[i].id==fuwuId){
						this.data=res.data.fuwu_list[i];
						break;
					}
				}
			}
		})
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
