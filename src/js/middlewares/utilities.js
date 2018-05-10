import fetchDomainDataIfNeeded from "./fetch"

export const generateURL = (key, returnedURL, ...pageURLs) => {
	var URL = (key ? "/" + key : "/") + "?"
	URL += returnedURL === "nextPageURL" ? "d=next" : "d=prev"
	var domainAndParams
	var params
	pageURLs.forEach((v, i) => {
		domainAndParams = v.split("?")
		params = domainAndParams[1].split("&c")
		switch (i) {
			case 0:
				URL += "&cd" + params[1]
				return
			case 1:
				URL += "&co" + params[1]
				return
			case 2:
				URL += "&csp" + params[1]
				return
		}
	})
	return URL
}

// "hideFetching" is to hide fetching progress component.
// "isCached" is a bool or a function which takes the store 
// and returns a slice of store to allow or prevent API call for root store objects.
// "didInvalidate" if it is not undefined prevents the API call.
// "mergeIntoState" when PUT request returns data merges it into state.
export const makeLoader = ({defaults = {}, actionCreators = {}, options = {}}) => { 
	var {kind, method, URL} = defaults
	var {hideFetching, isCached, didInvalidate, showSnackbar, mergeIntoState} = options
	hideFetching = hideFetching || false
	var headers = new Headers({"Accept": "text/plain"})
	var init = {
		method: method || "GET",
		credentials: "same-origin",
		headers: headers,
		// referrer: "/MerinEREN",
		// mode: "no-cors"
	}
	return (args = {}) => {
		var {returnedURL, key, body} = args
		returnedURL = returnedURL || "prevPageURL"
		if(args.headers)
			Object.entries(args.headers).forEach(a => init.headers.set(a))
		key = key || "all"
		return (dispatch, getState) => {
			// Parse request body for "POST" and "PUT" methods
			if (body && method !== "DELETE") {
				switch (body.type) {
					case "Blob":
						init.body = new Blob(
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
								if (a[0] !== "file")
									fd.set(a[0], a[1])
								if (a[0] === "file") {
									if(a[1] !== undefined) {
										fd.set(a[0], a[1], a[1].name)
									} else {
										fd.set(a[0], a[1])
									}
								}
							}) 
						}) 
						init.body = fd
						break
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
