export const searchTransactionDesc = (transactions, value) => {
	return transactions.filter(transaction => transaction.description.toLowerCase().includes(value.toLowerCase()))
}

export const searchTransactionType = (transactions, type) => {
	return transactions.filter(transaction => transaction.type === type)
}
