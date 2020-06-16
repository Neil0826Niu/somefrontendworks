var qydcD_vue = new Vue({
	el: '.main',
	data: {
		qiyedata: {},
		fuwu_list: [],
		zhaopin_list: [],
		id:''
	},
	created() {
		var id = getURLParams(0);
		this.id=id;
		getData('/index/Gongsi/gongsiView', {
			'id': id
		}).then(res => {
			if (res.code == 1) {
				this.qiyedata = res.data;
				this.fuwu_list = res.data.fuwu_list.data;
				this.zhaopin_list = res.data.zhaopin_list.data;
				for(i=0;i<this.zhaopin_list.length;i++){
					var str = this.zhaopin_list[i].pay;
					var length = str.length - 1;
					var lastword = str.charAt(length)
					if (lastword >= '0' &&
						lastword <= '9') {
						this.zhaopin_list[i].pay = this.zhaopin_list[i].pay + '元'
					}
				}
			}
		})
	}
})
