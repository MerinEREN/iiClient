export default function makeActionCreator(type, ...argNames) {
	return (...args) => {
		let action = {type}
		argNames.forEach((v, i) => {
			action[v] = args[i]
		})
		return action
	}
}
