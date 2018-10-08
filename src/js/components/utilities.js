export const isAdmin = (roles) => {
	if (!roles)
		return false
	return roles.indexOf("admin") > -1
}

export const isContentEditor = (roles) => {
	if (!roles)
		return false
	return roles.indexOf("contentEditor") > -1
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

export const getRouteContents = (session, prevProps, nextProps) => {
	if (prevProps.routes !== nextProps.routes) {
		// console.log(prevProps.routes)
		// console.log(nextProps.routes)
		const {
			routes, 
			location, 
			getRouteContents: get
		} = nextProps
		routes.forEach(v => {
			if (v.path) {
				if (v.path === "/") {
					if (location.pathname === "/") {
						if (session) {
							get({
								URL: "/contents?pageID=timeline", 
								key: "timeline"
							})
						} else {
							get({
								URL: "/contents?pageID=LandingPage", 
								key: "LandingPage"
							})
						}
					}
				} else {
					let path = v.path
					if (v.path.includes("s/:ID")) {
						path = v.path.replace("s/:ID", "")
					} else if (v.path.includes(":ID/")) {
						path = v.path.replace(":ID/", "")
					}
					get({
						URL: `/contents?pageID=${path}`, 
						key: path
					})
				}
			}
		})
	}
}

export const getFirstLetters = text => {
	if (!text)
		return
	let a = text.split(" ", 3)
	let s = ""
	a.forEach(v => s += v.charAt().toUpperCase())
	return s
}
