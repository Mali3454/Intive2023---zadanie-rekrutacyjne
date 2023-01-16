import { render } from './render.js'

export const route = path => {
	window.history.pushState({}, '', path)
	render()
}
