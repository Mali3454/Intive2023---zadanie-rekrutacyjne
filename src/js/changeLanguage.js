export const changeLanguage = lang => {
	let divElements = document.querySelectorAll(`[lang]`)
	divElements.forEach(div => {
		if (div.getAttribute('lang') === lang) {
			div.style.display = 'flex'
		} else {
			div.style.display = 'none'
		}
	})
	const language = JSON.parse(window.localStorage.getItem('language'))
	if (language) {
		window.localStorage.setItem('language', JSON.stringify(lang))
	}

	const btns = document.querySelectorAll('.sidebar__img')
	if (lang === 'PL') {
		btns[0].classList.add('sidebar__img-active')
		btns[1].classList.remove('sidebar__img-active')
	} else if (lang === 'EN') {
		btns[1].classList.add('sidebar__img-active')
		btns[0].classList.remove('sidebar__img-active')
	}
}
