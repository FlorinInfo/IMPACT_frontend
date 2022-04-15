import Cookies from 'js-cookie';

const setCookies = (cookies)=> {
	for (const cookie in cookies) {
		Cookies.set(cookie, cookies[cookie]);
	}
}

export default setCookies;