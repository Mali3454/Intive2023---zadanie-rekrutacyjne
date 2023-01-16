export const sortByDate = (object, type) => {
	object.sort((a, b) => {
		const dateA = new Date(a.date)
		const dateB = new Date(b.date)
		if (type === 'growing') {
			if (dateA > dateB) return 1
			if (dateA < dateB) return -1
			return 0
		}
		if (type === 'declining') {
			if (dateA > dateB) return -1
			if (dateA < dateB) return 1
			return 0
		}
	})
	return object
}
