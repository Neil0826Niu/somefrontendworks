var swiper_vue = new Vue({
	el: '.swiper',
	created() {
		this.$nextTick(() => {
			var mySwiper = new Swiper('.swiper-container', {
				direction: 'horizontal', // 垂直切换选项
				autoplay: true, //自动播放
				loop: true, // 循环模式选项

				// 如果需要分页器
				pagination: {
					el: '.swiper-pagination',
				},

				// 如果需要前进后退按钮
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			})
		})
	}
})
