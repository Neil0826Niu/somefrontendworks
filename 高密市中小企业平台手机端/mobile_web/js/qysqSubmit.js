var qysq_Submit = new Vue({
	el: '.main',
	data: {
		shouxin_lists: [],
		selectno: '../img/appeal/appeal_button_no@2x.png',
		selected: '../img/appeal/appeal_button_yes@2x.png',
		sel_zx: '',
		sel_jy: '',
		sel_ts: '',
		sel_jb: '',
		sel_nm_yes: '',
		sel_nm_no: '',
		shouxin: '',
		title: '',
		type: '',
		content: '',
		is_anonymous: '',
		token: '',

	},
	created() {
		this.token = localStorage.getItem('token_web');
		if(localStorage.getItem('token_web')==null){
			this.token=getCookieToken();
		}
		getData('/index/Suqiu/getShouxinList').then(res => {
			if (res.code == 1) {
				this.shouxin_lists = res.data;
			}
		})
		var sel_type = getURLParams(0);
		switch (sel_type) {
			case '0':
				this.sel_zx = this.selected;
				this.sel_jy = this.selectno;
				this.sel_ts = this.selectno;
				this.sel_jb = this.selectno;
				this.type = 0;
				break;
			case '1':
				this.sel_zx = this.selectno;
				this.sel_jy = this.selected;
				this.sel_ts = this.selectno;
				this.sel_jb = this.selectno;
				this.type = 1;
				break;
			case '2':
				this.sel_zx = this.selectno;
				this.sel_jy = this.selectno;
				this.sel_ts = this.selected;
				this.sel_jb = this.selectno;
				this.type = 2;
				break;
			case '3':
				this.sel_zx = this.selectno;
				this.sel_jy = this.selectno;
				this.sel_ts = this.selectno;
				this.sel_jb = this.selected;
				this.type = 3;
				break;
		}

		this.sel_nm_yes = this.selected;
		this.sel_nm_no = this.selectno;
		this.is_anonymous = 1;
	},
	methods: {
		ClickZX: function() {
			this.sel_zx = this.selected;
			this.sel_jy = this.selectno;
			this.sel_ts = this.selectno;
			this.sel_jb = this.selectno;
			this.type = 0;
		},
		ClickJY: function() {
			this.sel_zx = this.selectno;
			this.sel_jy = this.selected;
			this.sel_ts = this.selectno;
			this.sel_jb = this.selectno;
			this.type = 1;
		},
		ClickTS: function() {
			this.sel_zx = this.selectno;
			this.sel_jy = this.selectno;
			this.sel_ts = this.selected;
			this.sel_jb = this.selectno;
			this.type = 2;
		},
		ClickJB: function() {
			this.sel_zx = this.selectno;
			this.sel_jy = this.selectno;
			this.sel_ts = this.selectno;
			this.sel_jb = this.selected;
			this.type = 3;
		},
		ClickNMYes: function() {
			this.sel_nm_yes = this.selected;
			this.sel_nm_no = this.selectno;
			this.is_anonymous = 1;
		},
		ClickNMNo: function() {
			this.sel_nm_yes = this.selectno;
			this.sel_nm_no = this.selected;
			this.is_anonymous = 0;
		},
		Submit: function() {
			var data = {
				'token': this.token,
				'shouxin': this.shouxin,
				'type': this.type,
				'title': this.title,
				'content': this.content,
				'is_anonymous': this.is_anonymous
			};
			postData('/index/Suqiu/setSuqiu', data).then(res => {
				if (res.msg == "token不能为空") {
					alert("请先登录")
				} else if (res.code == 1)
					window.location.href = 'qysq.html'
				else
					alert(res.msg)
			})
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

$('textarea').each(function () {
  this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
}).on('input', function () {
  this.style.height = 'auto';
  this.style.height = (this.scrollHeight) + 'px';
});