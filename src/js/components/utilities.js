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
