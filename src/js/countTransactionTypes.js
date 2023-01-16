export const countTransactionTypes = transactions => {
	let counts = {}

	const sum = transactions.length

	transactions.forEach(element => {
		const type = element.type
		counts[type] = counts[type] ? counts[type] + 1 : 1
	})

	counts = Object.values(counts)

	counts = counts.map(element => ((element / sum) * 100).toFixed(2))

	return counts
}
