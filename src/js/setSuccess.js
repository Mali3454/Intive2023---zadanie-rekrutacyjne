export const setSuccess = input => {
	const inputControl = input.parentElement
	const errorDisplay = inputControl.querySelector('.input__info')
	errorDisplay.style.opacity = 0
	input.style.border = '2px solid #0FFF50'
	input.classList.add('input__success')
	input.classList.remove('input__error')
}
