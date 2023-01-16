export const setLogIn = username => {
	const usernameValue = username.value.trim()
	const users = JSON.parse(window.localStorage.getItem('allUsers'))
	const user = users.find(user => user.username === usernameValue || user.email === usernameValue)

	const isLogged = window.sessionStorage.setItem('isLogged', JSON.stringify(user))

	if (isLogged) {
		isLogged.splice(0, 1, user)
	}
}
