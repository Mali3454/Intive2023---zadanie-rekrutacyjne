export const setError = (input, messagePL, messageEN, language) => {
	const inputControl = input.parentElement
	const errorDisplay = inputControl.querySelector('.input__info')
	errorDisplay.style.opacity = 1
	errorDisplay.style.color = '#FF3131'
	input.style.border = '2px solid #FF3131'
	let message = ''
	language === 'PL' ? (message = messagePL) : (message = messageEN)
	errorDisplay.innerText = message
	input.classList.add('input__error')
	input.classList.remove('input__success')
}
