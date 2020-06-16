var vm = new Vue({
	el: '.main',
	data: {
		company_name: '',
		legal_person: '',
		mobile_name: '',
		mobile: '',
		email: '',
		code: '',
		logo: '',
		company_img: '',
		category_id:'',
	},
	created() {
		var token = localStorage.getItem('token_web');
		if(localStorage.getItem('token_web')==null){
			token=getCookieToken();
		}
		getData('/index/user/getShenhe', {
			token
		}).then(res => {
			if (res.code == 1) {
				this.company_name = res.data.info.company_name;
				this.legal_person = res.data.info.legal_person;
				this.mobile_name = res.data.info.mobile_name;
				this.mobile = res.data.info.mobile;
				this.email = res.data.info.email;
				this.code = res.data.info.code;
				this.logo = res.data.info.logo;
				this.category_id=res.data.info.category_id;
				var img = res.data.info.company_img;
				this.company_img = img.split(',')[0];
			}

		})
	}
})