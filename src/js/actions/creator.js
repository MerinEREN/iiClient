/* export default function makeActionCreator(type, ...argNames) {
	let action = {type}
	return (...args) => {
		// let action = {type}
		argNames.forEach((v, i) => {
			action[v] = args[i]
		})
		return action
	}
} */

export default function makeActionCreator(type) {
	let action = {type}
	return (args) => {
		return {...action, ...args}
	}
}
