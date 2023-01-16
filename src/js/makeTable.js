import { sortByDate } from './sortByDate.js'

export const makeTable = (tbody, transactions, lang) => {
	let dateValue = ''
	const newTransactions = sortByDate(transactions, 'declining')
	tbody.innerHTML = ''
	let typeDesc = ''

	for (const transaction of newTransactions) {
		const tr = document.createElement('tr')
		tr.classList.add('tr__history')

		const dateTd = document.createElement('td')
		dateTd.classList.add('tr__mobile-none')
		dateTd.textContent = transaction.date
		tr.appendChild(dateTd)

		const typeTd = document.createElement('td')
		switch (transaction.type) {
			case 1:
				typeTd.innerHTML = `<img class="history__icon" src="./src/assets/income2.png">`
				if (tbody.getAttribute('language') === 'PL') {
					typeDesc = 'Wpływy - inne'
				} else if (tbody.getAttribute('language') === 'EN') {
					typeDesc = 'Income - others'
				}
				break
			case 2:
				typeTd.innerHTML = `<img class="history__icon" src="./src/assets/expenses2.png">`
				if (tbody.getAttribute('language') === 'PL') {
					typeDesc = 'Wydatki - zakupy'
				} else if (tbody.getAttribute('language') === 'EN') {
					typeDesc = 'Expenses - purchases'
				}
				break
			case 3:
				typeTd.innerHTML = `<img class="history__icon" src="./src/assets/income1.png">`
				if (tbody.getAttribute('language') === 'PL') {
					typeDesc = 'Wpływy - wynagrodzenie'
				} else if (tbody.getAttribute('language') === 'EN') {
					typeDesc = 'Income - salary'
				}
				break
			case 4:
				typeTd.innerHTML = `<img class="history__icon" src="./src/assets/expenses1.png">`
				if (tbody.getAttribute('language') === 'PL') {
					typeDesc = 'Wydatki - inne'
				} else if (tbody.getAttribute('language') === 'EN') {
					typeDesc = 'Expenses - others'
				}
				break
		}
		tr.appendChild(typeTd)

		const descriptionTd = document.createElement('td')
		descriptionTd.innerHTML = `${transaction.description} <br> <span ${
			transaction.amount < 0 ? "style='color: #FF3131;'" : "style='color: #0FFF50;'"
		}>${typeDesc}</span> <br> <p class='td__mobile-balace td__mobile-balace-inactive'>${
			lang === 'PL' ? 'Saldo: ' : 'Balance: '
		} ${transaction.balance}</p>`

		tr.appendChild(descriptionTd)

		const amountTd = document.createElement('td')
		amountTd.textContent = transaction.amount
		tr.appendChild(amountTd)

		const balanceTd = document.createElement('td')
		balanceTd.classList.add('tr__mobile-none')
		balanceTd.textContent = transaction.balance
		tr.appendChild(balanceTd)

		if (dateValue !== transaction.date) {
			const dateTr = document.createElement('tr')
			dateTr.classList.add('tr__mobile-date')
			dateTr.textContent = transaction.date
			tbody.appendChild(dateTr)
		}

		tbody.appendChild(tr)

		const trElements = tbody.querySelectorAll('tr')
		trElements.forEach(tr =>
			tr.addEventListener('click', e => {
				const clickedTr = e.currentTarget
				const paragraphs = document.querySelectorAll('.td__mobile-balace')

				paragraphs.forEach(p => {
					if (p.parentNode.parentNode === clickedTr) {
						p.classList.remove('td__mobile-balace-inactive')
						p.classList.add('td__mobile-balace-active')
					} else {
						p.classList.remove('td__mobile-balace-active')
						p.classList.add('td__mobile-balace-inactive')
					}
				})
			})
		)

		dateValue = transaction.date
	}
}
