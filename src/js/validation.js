import { setError } from './setError.js'
import { setSuccess } from './setSuccess.js'

export const validation = (username, password, email, email2) => {
	const usernameValue = username.value.trim()
	const passwordValue = password.value.trim()
	const emailValue = email.value.trim()
	const email2Value = email2.value.trim()
	const users = JSON.parse(window.localStorage.getItem('allUsers'))
	let language = JSON.parse(window.localStorage.getItem('language'))
	let isValid = []

	if (usernameValue === '') {
		setError(username, 'Nazwa użytkownika jest wymagana', 'Username is required', language)
	} else if (!isValidUsername(usernameValue)) {
		setError(username, 'Niepoprawna nazwa użytkownika ', 'Username is incorrect', language)
	} else {
		setSuccess(username)
		isValid.push(true)
	}

	if (users) {
		for (const user of users) {
			if (user.username === usernameValue) {
				setError(username, 'Nazwa użytkownika jest zajęta', 'Username is taken', language)
				isValid.push(false)
				break
			}
		}
	}

	if (passwordValue === '') {
		setError(password, 'Hasło jest wymagane', 'Password is required', language)
	} else if (passwordValue.length < 6) {
		setError(password, 'Hasło musi mięc conajmniej 6 znaków', 'Password must be at least 6 character', language)
	} else {
		setSuccess(password)
		isValid.push(true)
	}

	if (emailValue === '') {
		setError(email, 'Email jest wymagany', 'Email is required', language)
	} else if (!isValidEmail(emailValue)) {
		setError(email, 'Wprowadź poprawny adres email', 'Provide a valid email address', language)
	} else {
		setSuccess(email)
		isValid.push(true)
	}

	if (users) {
		for (const user of users) {
			if (user.email === emailValue) {
				setError(email, 'Email jest zajęty', 'Email is taken', language)
				isValid.push(false)
				break
			}
		}
	}

	if (email2Value === '') {
		setError(email2, 'Potwierdz swój emial', 'Confirm your emial', language)
	} else if (email2Value !== emailValue) {
		setError(email2, 'E-maile nie są takie same', "E-mails doesn't match", language)
	} else {
		setSuccess(email2)
		isValid.push(true)
	}

	if (isValid.length === 4 && isValid.every(el => el === true)) {
		return true
	}
}

export const isValidEmail = emailValue => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return re.test(String(emailValue).toLowerCase())
}

const isValidUsername = usernameValue => {
	const re = /^(?=.*\d)[\w\[\]\\\/]{6,16}$/
	return re.test(String(usernameValue).toLowerCase())
}
