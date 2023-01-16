import { changeLanguage } from './changeLanguage.js'
import { renderNavbar } from './renderNavbar.js'
import { setUsername } from './setUsername.js'

const routes = {
	404: 'src/pages/404.html',
	'/': 'src/pages/home.html',
	'/login': 'src/pages/login.html',
	'/registration': 'src/pages/registration.html',
	'/transaction': 'src/pages/transaction.html',
	'/index.html': 'src/pages/home.html',
}

export const render = async () => {
	const language = JSON.parse(window.localStorage.getItem('language'))
	const path = window.location.pathname
	const route = routes[path] || routes[404]
	const html = await fetch(route).then(data => data.text())
	document.getElementById('container').innerHTML = html
	changeLanguage(language)
	switch (window.location.pathname) {
		case '/registration':
			renderNavbar('navbarRegistration')
			break
		case '/login':
			renderNavbar('navbarLogin')
			break
		case '/transaction':
			renderNavbar('navbarLogged')
			setUsername()
			break
		default:
			renderNavbar('navbarHome')
			break
	}
}
