export const renderNavbar = async navbar => {
	const language = JSON.parse(window.localStorage.getItem('language'))
	const html = await fetch(`./src/pages/navbar/${navbar}.html`).then(data => data.text())
	document.querySelector('#navbar').innerHTML = html
	changeLanguage(language)
}
