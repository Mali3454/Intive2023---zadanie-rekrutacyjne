import { route } from './route.js'

export const setLogOut = () => {
	window.sessionStorage.removeItem('isLogged')
	route('/')
}
