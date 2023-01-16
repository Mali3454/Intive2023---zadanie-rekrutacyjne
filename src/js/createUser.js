export const createUser = (username, password, email) => {
	const newUser = {
		username,
		password,
		email,
	}

	let allUsers = JSON.parse(window.localStorage.getItem('allUsers')) || []
	allUsers.push(newUser)

	window.localStorage.setItem('allUsers', JSON.stringify(allUsers))
	console.log('ok')
	console.log(allUsers)
}
