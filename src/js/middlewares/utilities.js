import fetchDomainDataIfNeeded from "./fetch"

export const generateURL = (key, ...pageURLs) => {
	let url = new URL(key, document.location)
	pageURLs.forEach((v, i) => {
		switch (i) {
			case 0:
				const paramsD = (new URL(v, document.location)).searchParams
				url.searchParams.set("uID", paramsD.get("uID"))
				url.searchParams.set("d", paramsD.get("d"))
				paramsD.getAll("cs").forEach(v => url.searchParams.append("cds", v))
				break
			case 1:
				/* const paramsO = (new URL(v, document.location)).searchParams
				paramsO.getAll("cs").forEach(v => url.searchParams.append("cos", v)) */
				break
			case 2:
				const paramsSP = (new URL(v, document.location)).searchParams
				paramsSP.getAll("cs").forEach(v => url.searchParams.append("csps", v))
				break
		}
	})
	return url
}

// "hideFetching" is to hide fetching progress component.
// "isCached" is a bool or a function which takes the store 
// and returns a slice of store to allow or prevent API call for root store objects.
// "didInvalidate" if it is not undefined prevents the API call.
// "mergeIntoState" when PUT request returns data merges it into state.
// If the request is "PUT" function compares to the entitiesBuffered and the entities to 
// send only changed entities as the request body.
// "stateSlice" is the source kind object to filter by a provided array of keys.
export const makeLoader = ({defaults = {}, actionCreators = {}, options = {}}) => { 
	var {URL, headers, method, kind} = defaults
	var {hideFetching, isCached, didInvalidate, showSnackbar, mergeIntoState} = options
	hideFetching = hideFetching || false
	var init = {
		method: method || "GET",
		credentials: "same-origin",
		// referrer: "/MerinEREN",
		// mode: "no-cors"
	}
	if (method === "GET")
		init.headers = new Headers({"Accept": "application/json"})
	// Some "POST" and "PUT" requests returns responses with data.
	if(headers) {
		init.headers = new Headers()
		Object.entries(headers).forEach(([k, v]) => init.headers.set(k, v))
	}
	return (args = {}) => {
		var {returnedURL, stateSlice, key, body} = args
		returnedURL = returnedURL || "prevPageURL"
		key = key || "all"
		return (dispatch, getState) => {
			// Parse request body for "POST" and "PUT" methods
			if (body && method !== "DELETE") {
				switch (body.type) {
					case "Blob":
						// USING ONLY FOR CONTENTS NOW AND IT IS 
						// NOT NECESSARY.
						// MAY BE SHOULD BE REMOVED FROM CASES
						// AFTER CONTENTS POST AND PUT REQUESTS 
						// CHANGED !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
						/* init.body = new Blob(
							Object.values(method !== "PUT" ? 
								body.data : 
								getChanged(
									getState().entities[kind], 
									body.data
								)
							).map(v => {
								// const {ID, ...rest} = v
								// return JSON.stringify(rest)
								return JSON.stringify(v)
							}),
							{type : body.contentType}
						) */
						init.body = new Blob(
							Array.isArray(body.data) ?
							body.data.map(v => JSON.stringify(v)) :
							Object.values(method !== "PUT" ? 
								body.data : 
								getChanged(
									getState().entities[kind], 
									body.data
								)
							).map(v => {
								// const {ID, ...rest} = v
								// return JSON.stringify(rest)
								return JSON.stringify(v)
							}),
							{type : body.contentType}
						)
						break
					case "FormData":
						let fd = new FormData()
						Object.values(body.data).forEach(v => {
							Object.entries(v).forEach(a => {
								/* if (a[0] !== "file")
									fd.set(a[0], a[1])
								if (a[0] === "file") {
									if(a[1] !== undefined) {
										fd.set(a[0], a[1], a[1].name)
									} else {
										fd.set(a[0], a[1])
									}
								} */
								Array.isArray(a[1]) ? 
									a[1].forEach(v => fd.append(a[0], v)) :
									fd.set(a[0], a[1])
							}) 
						}) 
						init.body = fd
						break
					default: 
						// For JSON encoded []byte.
						init.body = JSON.stringify(body.data)
				}
			}
			if (args.URL) {
				// Use from args object
				URL = args.URL 
			} else {
				// Use from defaults object or assign "/"
				URL = URL || "/"
				// If the method is GET and pagination has the returnedURL
				// overwrite defaults with them.
				if(method === "GET") {
					if (kind)
						var path = getState().pagination[kind]
					// Use returned URL
					if (path !== undefined && path !== {}) {
						if (path[key]) {
							URL = path[key][returnedURL] 
						} else {
							URL = URL || "/"
						}
					}
				}
			}
			return dispatch(fetchDomainDataIfNeeded({
				request: new Request(URL, init),
				dataBody: body && body.data, 
				kind, 
				stateSlice, 
				key, 
				...actionCreators, 
				isCached, 
				didInvalidate, 
				hideFetching, 
				showSnackbar, 
				mergeIntoState
			}))
		}
	}
}

export const trimSpace = (s) => {
	var str = ""
	s = s.trim()
	for(let ch of s) {
		if (ch !== " ")
			str = str.concat(ch)
	}
	return str
}

const getChanged = (entities, entitiesBuffered) => {
	let changedEntities = {}
	Object.entries(entities).forEach(([k, v]) => {
		if (v !== entitiesBuffered[k])
			changedEntities[k] = entitiesBuffered[k]
	})
	return changedEntities
}

export const getObjectsFromEntities = (IDs, kind) => {
	let obj = {}
	for (let v of IDs) {
		// Belowe control is delete page -> delete content which has only that page 
		// -> cancel delete content after delete page timeout expiris check.
		if (kind[v])
			obj[v] = kind[v]
	}
	return obj
}
