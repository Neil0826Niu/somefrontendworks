var vm = new Vue({
	el: '.main',
	data: {
		user_name: '',
		sex: '',
		birthday: '',
		idcard: '',
		idcard_img1: '',
		idcard_img2: ''
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
				this.user_name = res.data.info.user_name;
				if (res.data.info.sex == 0)
					this.sex = '男';
				else
					this.sex = '女';
				this.birthday = res.data.info.birthday;
				this.idcard = res.data.info.idcard;
				this.idcard_img1 = res.data.info.idcard_img1;
				this.idcard_img2 = res.data.info.idcard_img2;
			}

		})
	}
})
