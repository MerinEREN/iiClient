export const isAdmin = (roles) => {
	if (!roles)
		return false
	let check = false
	Object.values(roles).forEach(v => {
		if(v.contentID === "aghkZXZ-Tm9uZXISCxIHQ29udGVudCIFYWRtaW4M")
			check = true
	})
	return check
}

export const isContentEditor = (roles) => {
	if (!roles)
		return false
	let check = false
	Object.values(roles).forEach(v => {
		if(v.contentID === "aghkZXZ-Tm9uZXIbCxIHQ29udGVudCIOQ29udGVudCBFZGl0b3IM")
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
	if (prevProps.routes !== nextProps.routes) {
		// console.log(prevProps.routes)
		// console.log(nextProps.routes)
		const {
			routes, 
			location, 
			contextsGet: get
		} = nextProps
		routes.forEach(v => {
			if (v.path) {
				if (v.path === "/") {
					if (location.pathname === "/") {
						get({
							URL: "/contexts?pageID=body", 
							key: "body"
						})
						if (session) {
							get({
								URL: "/contexts?pageID=timeline", 
								key: "timeline"
							})
						} else {
							get({
								URL: "/contexts?pageID=landingpage", 
								key: "landingpage"
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
					get({
						URL: `/contexts?pageID=${path}`, 
						key: path
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
