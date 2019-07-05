export const isAdmin = (roles) => {
	if (!roles)
		return false
	let check = false
	Object.values(roles).forEach(v => {
		if(v.contextID === "aghkZXZ-Tm9uZXISCxIHQ29udGVudCIFYWRtaW4M")
			check = true
	})
	return check
}

export const isContextEditor = (roles) => {
	if (!roles)
		return false
	let check = false
	Object.values(roles).forEach(v => {
		if(v.contextID === "aghkZXZ-Tm9uZXIbCxIHQ29udGVudCIOQ29udGVudCBFZGl0b3IM")
			check = true
	})
	return check
}

/* 
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
*/

export const contextsGet = (session, prevProps, nextProps) => {
	/*
	let URL = new URL("/contexts", window.location.href)
	let pathname = window.location.pathname
	WHEN prevProps.routes !== nextProps.routes !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	if (pathname === "/") {
		URL.searchParams.set("pID", "body")
		get({
			key: "body", 
			URL
		})
		if (session) {
			URL.searchParams.set("pID", "timeline")
			get({
				key: "timeline", 
				URL
			})
		} else {
			URL.searchParams.set("pID", "landingpage")
			get({
				key: "landingpage", 
				URL
			})
		}
	} else {
		// PARSE THE "pathname" !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		pathname = pathname.toLowerCase()
		URL.searchParams.set("pID", pathname)
		get({
			key: pathname, 
			URL
		})
	}
	*/
	if (prevProps.routes !== nextProps.routes) {
		// console.log(prevProps.routes)
		// console.log(nextProps.routes)
		const {
			routes, 
			location, 
			contextsGet: get
		} = nextProps
		let URL = new URL("/contexts", window.location.href)
		routes.forEach(v => {
			if (v.path) {
				if (v.path === "/") {
					if (location.pathname === "/") {
						URL.searchParams.set("pID", "body")
						get({
							key: "body", 
							URL
						})
						if (session) {
							URL.searchParams.set(
								"pID", 
								"timeline"
							)
							get({
								key: "timeline", 
								URL
							})
						} else {
							URL.searchParams.set(
								"pID", 
								"landingpage"
							)
							get({
								key: "landingpage", 
								URL
							})
						}
					}
				} else {
					let path = v.path
					if (v.path.includes("s/:ID")) {
						path = v.path.replace("s/:ID", "")
						if (path.includes(":pID/"))
							path = path.replace(":pID/", "")
					} else if (v.path.includes(":ID/")) {
						path = v.path.replace(":ID/", "")
					}
					path = path.toLowerCase()
					URL.searchParams.set("pID", path)
					get({
						key: path, 
						URL
					})
				}
			}
		})
	}
}

export const firstLettersGenerate = text => {
	if (!text)
		return
	let a = text.split(" ", 3)
	let s = ""
	a.forEach(v => s += v.charAt().toUpperCase())
	return s
}
