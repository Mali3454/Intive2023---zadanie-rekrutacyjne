import { makeTable } from './makeTable.js'
import { searchTransactionType, searchTransactionDesc } from './searchTransaction.js'


export const historyTransaction = async () => {
	const response = await fetch('https://api.npoint.io/38edf0c5f3eb9ac768bd')
	const data = await response.json()
	const transactions = Object.values(data.transactions)

	const tbodyPL = document.querySelector(`tbody[language="PL"]`)
	const tbodyEN = document.querySelector(`tbody[language="EN"]`)
	const searchBars = document.querySelectorAll('#searchBar')
	const selectBars = document.querySelectorAll('#selectBar')

	selectBars.forEach(selectBar => {
		selectBar.addEventListener('change', e => {
			let value = parseInt(e.target.value)
			if (value > 0) {
				let newtransactions = searchTransactionType(transactions, value)
				makeTable(tbodyPL, newtransactions, 'PL')
				makeTable(tbodyEN, newtransactions, 'EN')
			} else if (value === 0) {
				makeTable(tbodyPL, transactions, 'PL')
				makeTable(tbodyEN, transactions, 'EN')
			}
		})
	})
	searchBars.forEach(searchBar => {
		searchBar.addEventListener('input', e => {
			if (e.target.value) {
				let newtransactions = searchTransactionDesc(transactions, e.target.value)
				makeTable(tbodyPL, newtransactions, 'PL')
				makeTable(tbodyEN, newtransactions, 'EN')
			} else if (!e.target.value) {
				makeTable(tbodyPL, transactions, 'PL')
				makeTable(tbodyEN, transactions, 'EN')
			}
		})
	})
	makeTable(tbodyPL, transactions, 'PL')
	makeTable(tbodyEN, transactions, 'EN')
}
