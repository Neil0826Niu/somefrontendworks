initpage();
window.onresize = () => initpage();
if (getCookieToken() != null) {
	window.onload = () => setCookie();
	window.onbeforeunload = () => removeCookie();
}
else{
	if(localStorage.getItem('token_web')==null){
		window.location.href='/mobile_web/login.html'
	}
}
function initpage() {
	var view_width = document.getElementsByTagName('html')[0].getBoundingClientRect().width;
	var _html = document.getElementsByTagName('html')[0];
	window.fontSize = view_width / 7.5;
	_html.style.fontSize = window.fontSize + 'px';
}
