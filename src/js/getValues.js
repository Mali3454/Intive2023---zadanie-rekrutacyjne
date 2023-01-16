export const getValues = (object, key) => {
	const array = object.map(object => object[key])
	return array
}
