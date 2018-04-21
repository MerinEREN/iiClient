export const isAdmin = (roles) => {
	if (!roles)
		return false
	for(let r of roles) {
		if(r === 'admin')
			return true
	}
	return false
}

export const isContentEditor = (roles) => {
	if (!roles)
		return false
	for(let r of roles) {
		if(r === 'contentEditor')
			return true
	}
	return false
}

// generateURLVariableFromIDs returns a string that established with provided object keys 
// or array values and each value seperated by comma.
export const generateURLVariableFromIDs = (arrayOrObject) => {
	let URLVar = ""
	if (Array.isArray(arrayOrObject)) {
		arrayOrObject.forEach((v, i) => {
			i !== arrayOrObject.length - 1 ? 
				URLVar += v + "," : 
				URLVar += v
		})
	} else {
		Object.keys(arrayOrObject).forEach((v, i) => {
			i !== Object.keys(arrayOrObject).length - 1 ? 
				URLVar += v + "," : 
				URLVar += v
		})
	}
	return URLVar
}

export const addIntoRemoveFromArray = (v, a) => {
	if (a.indexOf(v) === -1)
		return [...a, v]
	let a2 = []
	a.forEach(v2 => {
		if (v2 !== v)
			a2.push(v2)
	})
	return a2
}
