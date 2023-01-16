import { setSuccess } from './setSuccess.js'
import { setError } from './setError.js'
import { checkPassword } from './checkPassword.js'
import { hashPassword } from './hashPassword.js'


export const checkUser = (username, password) => {
	const users = JSON.parse(window.localStorage.getItem('allUsers'))
	const usernameValue = username.value.trim()
	const passwordValue = password.value.trim()
	let language = JSON.parse(window.localStorage.getItem('language'))

	const user = users.find(user => user.username === usernameValue || user.email === usernameValue)

	if (!user) {
		setError(username, 'Nie ma takiego użytkownika', 'User does not exist', language)
		return false
	} else if (user) {
		setSuccess(username)
		const isCorrectPasword = checkPassword(user.password, hashPassword(passwordValue))
		if (isCorrectPasword) {
			setSuccess(password)

			return true
		} else if (!isCorrectPasword) {
			setError(password, 'Niepoprawne hasło', 'Password is incorrect', language)
			return false
		}
	}
}
