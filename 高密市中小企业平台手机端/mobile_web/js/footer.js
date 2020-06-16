var footer_vue = new Vue({
	el: '.footer',
	data: {
		zhuban: '',
		chengban: '',
		address: '',
		mobile: '',
		friends_list: []
	},
	created() {
		getData('/index/dibu/dibuInfo').then(res => {
			this.zhuban = res.data.zhuban;
			this.chengban = res.data.chengban;
			this.address = res.data.address;
			this.mobile = res.data.mobile;
				this.friends_list=res.data.friends_list;
		})
	}
})
