export const isAdmin = (roles) => {
	for(let r of roles) {
		if(r === 'admin')
			return true
	}
	return false
}

export const isContentEditor = (roles) => {
	for(let r of roles) {
		if(r === 'contentEditor')
			return true
	}
	return false
}

// generateURLVariableFromIDs returns a string that established with provided object keys 
// and each key seperated by comma.
export const generateURLVariableFromIDs = (obj) => {
	let URLVar = ""
	Object.keys(obj).forEach((v, i) => {
		i !== Object.keys(obj).length - 1 ? URLVar += v + "," : URLVar += v
	})
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
