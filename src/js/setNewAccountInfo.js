export const setNewAccountInfo = (input, language) => {
	const usernameValue = input.value.trim()
	const users = JSON.parse(window.localStorage.getItem('allUsers'))
	const user = users.find(user => user.email === usernameValue)

	const inputControl = input.parentElement
	const errorDisplay = inputControl.querySelector('.input__info')
	if (!user) {
		errorDisplay.style.opacity = 1
		if (language === 'PL') {
			errorDisplay.innerHTML =
				"<p>Email jest wolny, <span class='newAccountInfo' id='span__registration'>załóż konto<span></p>"
			errorDisplay.style.color = '#0FFF50'
			input.classList.add('input__success')
			input.classList.remove('input__error')
		} else {
			errorDisplay.innerHTML =
				"<p>Email is free, <span class='newAccountInfo' id='span__registration'>create an account<span></p>"
			errorDisplay.style.color = '#0FFF50'
			input.classList.add('input__success')
			input.classList.remove('input__error')
		}
	} else {
		errorDisplay.style.opacity = 0
		input.style.border = '1px solid #fbfcfd'
	}
}
