export const setUsername = () => {
	const user = JSON.parse(window.sessionStorage.getItem('isLogged'))
	if (user) {
		document.addEventListener('DOMNodeInserted', e => {
			const p = document.querySelector(`#usernameNavbar`)
			if (p) {
				p.textContent = user.username
			}
		})
	}
}
