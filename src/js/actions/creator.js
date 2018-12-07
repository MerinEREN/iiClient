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

export default function makeActionCreator(type, ...argNames) {
	let action = {type}
	// If argNames provided match with returned args
	if(argNames.length)
		return (...args) => {
			argNames.forEach((v, i) => {
				action[v] = args[i]
			})
			return action
		}
	return (args) => {
		return {...action, ...args}
	}
}
