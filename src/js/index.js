import { renderNavbar } from './renderNavbar.js'
import { createUser } from './createUser.js'
import { validation } from './validation.js'
import { hashPassword } from './hashPassword.js'
import { render } from './render.js'
import { route } from './route.js'
import { checkUser } from './checkUser.js'
import { isValidEmail } from './validation.js'
import { setNewAccountInfo } from './setNewAccountInfo.js'
import { setLogIn } from './setLogIn.js'
import { setUsername } from './setUsername.js'
import { setLogOut } from './setLogOut.js'
import { chartDoughnut, chartBar } from './charts.js'
import { historyTransaction } from './historyTransaction.js'
import { changeLanguage } from './changeLanguage.js'

let historyAddedPL = false
let chart1AddedPL = false
let chart2AddedPL = false
let historyAddedEN = false
let chart1AddedEN = false
let chart2AddedEN = false
let language = JSON.parse(window.localStorage.getItem('language'))
if (!language) {
	window.localStorage.setItem('language', JSON.stringify('PL'))
}

document.addEventListener('DOMContentLoaded', e => {
	e.preventDefault()

	const isLogged = JSON.parse(window.sessionStorage.getItem('isLogged'))
	isLogged && route('/transaction')
	setUsername()
})

document.querySelector('#container').addEventListener('submit', e => {
	e.preventDefault()
	let language = JSON.parse(window.localStorage.getItem('language'))

	const target = document.querySelector(`form[lang="${language}"]`)

	if (target.id === "'form__registration") {
		const data = document.querySelectorAll(`input[lang="${language}"]`)

		const username = data[0]
		const password = data[1]
		const email = data[2]
		const email2 = data[3]

		const isValid = validation(username, password, email, email2)

		if (isValid) {
			createUser(username.value, hashPassword(password.value), email.value)
			route('/login')
		}
	} else if (target.id === "'form__login") {
		const data = document.querySelectorAll(`input[lang="${language}"]`)

		const username = data[0]
		const password = data[1]

		const isUser = checkUser(username, password)
		if (isUser) {
			route('/transaction')
			setLogIn(username)
		}
	}
})

document.querySelector('#container').addEventListener('mouseover', e => {
	const target = document.querySelector('span')
	if (target?.id === 'span__registration') {
		target?.addEventListener('click', e => {
			e.preventDefault()
			route('/registration')
		})
	}
})

document.querySelector('#container').addEventListener('input', e => {
	e.preventDefault()
	const target = window.location.pathname
	let language = JSON.parse(window.localStorage.getItem('language'))
	if (target === '/login') {
		const users = JSON.parse(window.localStorage.getItem('allUsers'))
		const data = document.querySelector(`input[lang="${language}"]`)
		const emailValue = data.value.trim()

		const user = users.find(user => user.email !== emailValue)

		if (isValidEmail(emailValue) && user) {
			setNewAccountInfo(data, language)
		}
	}
})

document.querySelector('#container').addEventListener('DOMNodeInserted', e => {
	let language = JSON.parse(window.localStorage.getItem('language'))
	if (window.location.pathname === '/transaction') {
		if (!chart1AddedPL) {
			const target1 = document.querySelector(`#pieChart[language="PL"]`)
			if (target1) {
				chartDoughnut(target1, (language = 'PL'))
				chart1AddedPL = true
			}
		}
		if (!chart2AddedPL) {
			const target2 = document.querySelector(`#barChart[language="PL"]`)
			if (target2) {
				chartBar(target2, (language = 'PL'))
				chart2AddedPL = true
			}
		}
		if (!historyAddedPL) {
			const target3 = document.querySelector(`#history[language="PL"]`)
			if (target3) {
				historyTransaction()
				historyAddedPL = true
			}
		}
		if (!chart1AddedEN) {
			const target1 = document.querySelector(`#pieChart[language="EN"]`)

			if (target1) {
				chartDoughnut(target1, (language = 'EN'))
				chart1AddedEN = true
			}
		}
		if (!chart2AddedEN) {
			const target2 = document.querySelector(`#barChart[language="EN"]`)
			if (target2) {
				chartBar(target2, (language = 'EN'))
				chart2AddedEN = true
			}
		}
		if (!historyAddedEN) {
			const target3 = document.querySelector(`#history[language="EN"]`)
			if (target3) {
				historyTransaction()
				historyAddedEN = true
			}
		}
	} else {
		chart1AddedPL = false
		chart2AddedPL = false
		historyAddedPL = false
		chart1AddedEN = false
		chart2AddedEN = false
		historyAddedEN = false
	}
})

document.querySelector('#container').addEventListener('mousemove', e => {
	if (e.pageY < 540 && window.location.pathname === '/transaction') {
		if (e.buttons === 1) {
			const pieCharts = document.querySelectorAll('.pieChart')
			const barCharts = document.querySelectorAll('.barChart')

			pieCharts.forEach(pieChart => {
				if (e.clientX < window.innerWidth / 2) {
					pieChart.classList.add('chart-active')
					pieChart.classList.remove('chart-inactive')
				} else {
					pieChart.classList.remove('chart-active')
					pieChart.classList.add('chart-inactive')
				}
			})
			barCharts.forEach(barChart => {
				if (e.clientX < window.innerWidth / 2) {
					barChart.classList.remove('chart-active')
					barChart.classList.add('chart-inactive')
				} else {
					barChart.classList.remove('barChart__mobile')
					barChart.classList.add('chart-active')
					barChart.classList.remove('chart-inactive')
				}
			})
		}
	}
})

document.querySelector('#container').addEventListener('touchmove', e => {
	if (e.touches[0].pageY < 540 && window.location.pathname === '/transaction') {
		const touchX = e.touches[0].clientX
		const windowWidth = window.innerWidth

		if (touchX < windowWidth / 2) {
			const pieCharts = document.querySelectorAll('.pieChart')
			pieCharts.forEach(pieChart => {
				pieChart.classList.add('chart-active')
				pieChart.classList.remove('chart-inactive')
			})

			const barCharts = document.querySelectorAll('.barChart')
			barCharts.forEach(barChart => {
				barChart.classList.remove('chart-active')
				barChart.classList.add('chart-inactive')
			})
		} else {
			const pieCharts = document.querySelectorAll('.pieChart')
			pieCharts.forEach(pieChart => {
				pieChart.classList.remove('chart-active')
				pieChart.classList.add('chart-inactive')
			})

			const barCharts = document.querySelectorAll('.barChart')
			barCharts.forEach(barChart => {
				barChart.classList.remove('barChart__mobile')
				barChart.classList.add('chart-active')
				barChart.classList.remove('chart-inactive')
			})
		}
	}
})

window.changeLanguage = changeLanguage
window.onhashchange = render
window.onpopstate = render
window.route = route
window.setLogOut = setLogOut
window.historyTransaction = historyTransaction
renderNavbar('navbarHome')
render()
