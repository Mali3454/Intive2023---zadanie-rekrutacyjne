import { countTransactionTypes } from './countTransactionTypes.js'
import { getValues } from './getValues.js'
import { sortByDate } from './sortByDate.js'

Chart.defaults.borderColor = 'transparent'
Chart.defaults.color = '#fbfcfd'

export const chartDoughnut = async (target, language) => {
	const response = await fetch('https://api.npoint.io/38edf0c5f3eb9ac768bd')
	const data = await response.json()

	const transactionTypesPL = Object.values(data.transacationTypes)
	const transactionTypesEN = ['Income - other', 'Expenses - purchases', 'Income - salary', 'Expenses - other']

	new Chart(target, {
		type: 'doughnut',
		data: {
			labels: language === 'PL' ? transactionTypesPL : transactionTypesEN,
			datasets: [
				{
					label: language === 'PL' ? 'Procent transakcji' : 'Procent of transaction',
					data: countTransactionTypes(data.transactions),
					borderWidth: 1,
				},
			],
		},
		options: { responsive: true },
	})
}

export const chartBar = async (target, language) => {
	const response = await fetch('https://api.npoint.io/38edf0c5f3eb9ac768bd')
	const data = await response.json()

	const transactions = Object.values(data.transactions)
	sortByDate(transactions, 'growing')
	const dates = getValues(transactions, 'date')
	const amounts = getValues(transactions, 'balance')

	new Chart(target, {
		type: 'bar',
		data: {
			labels: dates,
			datasets: [
				{
					label: language === 'PL' ? 'Saldo' : 'Balance',
					data: amounts,
					borderWidth: 1,
					backgroundColor: amounts.map(el => {
						if (el < 0) {
							return '#FF3131'
						} else {
							return '#0FFF50'
						}
					}),
				},
			],
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
		},
	})
}
