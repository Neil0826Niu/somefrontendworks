var swipervue = new Vue({
	el: '.swiper-wrapper',
	data: {
		lists: [],
	},
	created() {
		getData('/index/news/recommendList').then(res => {
			for (i = 0; i < res.data.length; i++) {
				this.lists.push(res.data[i]);
			}
			this.$nextTick(() => {
				mySwiper = new Swiper('.swiper-container', {
					direction: 'horizontal',
					autoplay: true,
					loop: true,
					pagination: {
						el: '.swiper-pagination',
					},
					on: {
						slideChangeTransitionStart: function() {
							var index = Number(this.realIndex);
							document.getElementById('newid').innerText = swipervue.lists[index].title;
						}
					}
				})
			})
		})
	}
})
var news_vue = new Vue({
	el: '.news',
	data: {
		gzdt_lists: [],
		zcfg_lists: [],
		tzgg_lists: [],
		displaytype: 'B',
		gzdtclass: "sel",
		zcfgclass: "seled",
		tzggclass: "sel"
	},
	methods: {
		clickA: function() {
			this.displaytype = 'A';
			this.gzdtclass = "seled",
				this.zcfgclass = "sel",
				this.tzggclass = "sel"
		},
		clickB: function() {
			this.displaytype = 'B';
			this.gzdtclass = "sel",
				this.zcfgclass = "seled",
				this.tzggclass = "sel"
		},
		clickC: function() {
			this.displaytype = 'C';
			this.gzdtclass = "sel",
				this.zcfgclass = "sel",
				this.tzggclass = "seled"
		}
	},
	created() {
		getData('/index/news/newsList').then(res => {
			for (i = 0; i < res.data.length; i++) {
				for (j = 0; j < res.data[i].list.data.length; j++) {
					if (j == 8) break;
					if (res.data[i].id == 18) {
						this.gzdt_lists.push(res.data[i].list.data[j])
						this.gzdt_lists[j].time = getTime(this.gzdt_lists[j].create_time).split(' ')[0];
					}
					if (res.data[i].id == 17) {
						this.zcfg_lists.push(res.data[i].list.data[j])
						this.zcfg_lists[j].time = getTime(this.zcfg_lists[j].create_time).split(' ')[0];
					}
					if (res.data[i].id == 16) {
						this.tzgg_lists.push(res.data[i].list.data[j])
						this.tzgg_lists[j].time = getTime(this.tzgg_lists[j].create_time).split(' ')[0];
					}
				}
			}
		})
	}
})
var fwdt_vue = new Vue({
	el: '.fwdt',
	data: {
		fuwu_lists: []
	},
	created() {
		getData('/index/Fuwu/getFuwuCategoryList').then(res => {
			if (res.code == 1) {
				this.fuwu_lists = res.data
			}
		})
	}
})


var tjjg_vue = new Vue({
	el: '.tjjgmain',
	data: {
		tjjg_lists: []
	},
	created() {
		getData('/index/fuwu/jigouRecommend').then(res => {
			for (i = 0; i < res.data.length; i++) {
				if (i == 6) break;
				this.tjjg_lists.push(res.data[i]);
			}
		})
	}
})
var qyfc_vue = new Vue({
	el: '.qyfcmain',
	data: {
		qyfc_lists: []
	},
	created() {
		getData('/index/Gongsi/gongsiRecommend').then(res => {
			for (i = 0; i < res.data.length; i++) {
				if (i == 6) break;
				this.qyfc_lists.push(res.data[i]);
			}
		})
	}
})
var zpxx_vue = new Vue({
	el: '.zpxx',
	data: {
		zpxx_lists: []
	},
	created() {
		getData('/index/zhaopin/zhaopinList').then(res => {
			for (i = 0; i < res.data.data.length; i++) {
				if (i == 3) break;
				this.zpxx_lists.push(res.data.data[i]);
				var str = this.zpxx_lists[i].pay;
				var length = str.length - 1;
				var lastword = str.charAt(length)
				if (lastword >= '0' &&
					lastword <= '9') {
					this.zpxx_lists[i].pay = this.zpxx_lists[i].pay + '元'
				}
			}
		})
	}
})
var qzxx_vue = new Vue({
	el: '.qzxx',
	data: {
		qzxx_lists: []
	},
	created() {
		getData('/index/qiuzhi/qiuzhiList').then(res => {
			for (i = 0; i < res.data.data.length; i++) {
				if (i == 3) break;
				this.qzxx_lists.push(res.data.data[i]);
				if (this.qzxx_lists[i].sex == 0)
					this.qzxx_lists[i].sex = "男";
				else
					this.qzxx_lists[i].sex = "女";
				var str = this.qzxx_lists[i].pay;
				var length = str.length - 1;
				var lastword = str.charAt(length)
				if (lastword >= '0' &&
					lastword <= '9') {
					this.qzxx_lists[i].pay = this.qzxx_lists[i].pay + '元'
				}
			}
		})
	}
})
var qysq_vue = new Vue({
	el: '.qysq',
	data: {
		qysq_lists: []
	},
	created() {
		getData('/index/Suqiu/suqiuList').then(res => {
			for (i = 0; i < res.data.data.length; i++) {
				if (i == 3) break;
				this.qysq_lists.push(res.data.data[i])
				//0:未受理,1:已受理,2:已回复,3:未解决,
				switch (this.qysq_lists[i].status) {
					case 0:
						this.qysq_lists[i].status = "未受理";
						break;
					case 1:
						this.qysq_lists[i].status = "已受理";
						break;
					case 2:
						this.qysq_lists[i].status = "已回复";
						break;
					case 3:
						this.qysq_lists[i].status = "未解决";
						break;
				}
				switch (this.qysq_lists[i].type) {
					case 0:
						this.qysq_lists[i].type = "咨询";
						break;
					case 1:
						this.qysq_lists[i].type = "建议";
						break;
					case 2:
						this.qysq_lists[i].type = "投诉";
						break;
					case 3:
						this.qysq_lists[i].type = "举报";
						break;
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
