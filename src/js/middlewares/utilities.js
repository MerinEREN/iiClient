import fetchDomainDataIfNeeded from "./fetch"

export const generateURL = (groupID, returnedURL, ...pageURLs) => {
	var URL = (groupID ? "/" + groupID : "/") + "?"
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
// "isCached" is a bool or a function that takes the store 
// and returns a slice of store to allow or prevent API call for root store objects.
// "didInvalidate" if it is not undefined prevents the API call.
export const makeLoader = ({defaults = {}, actionCreators = {}, options = {}}) => { 
	var {path, method, URL} = defaults
	var {hideFetching, isCached, didInvalidate, showSnackbar} = options
	// path = path || ["all"]
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
		var {returnedURL, groupID, body} = args
		returnedURL = returnedURL || "prevPageURL"
		// Parse request body for "POST" and "PUT" methods
		if (body && method !== "DELETE") {
			switch (body.type) {
				case "Blob":
					init.body = new Blob(
						Object.values(body.data).map(v => {
							const {ID, ...rest} = v
							return JSON.stringify(rest)
						}), 
						{type : body.contentType}
					)
					break
				case "FormData":
					let fd = new FormData()
					Object.values(body.data).forEach(v => {
						Object.entries(v).forEach(
							a => {
								if (
									a[0] !== "ID" 
									|| 
									a[0] !== "file"
								)
									fd.set(a[0], a[1])
								if (a[0] === "file"){
									if(a[1] !== undefined) {
										fd.set(a[0], a[1], a[1].name)
									} else {
										fd.set(a[0], a[1])
									}
								}
							}
						) 
					})
					init.body = fd
					break
			}
		}
		if(args.headers)
			Object.entries(args.headers).forEach(a => init.headers.set(a))
		groupID = groupID || "all"
		return (dispatch, getState) => {
			if (path) {
				var pagObj = getState().pagination
				path.forEach(v => {
					pagObj = pagObj[v]
				})
			}
			// BE CAREFUL
			// IF THE METHOD IS "GET" OVERWRITES args.URL !!!!!!!!!!!!!!!!!!!!!
			if (args.URL) {
				// Use from args object
				URL = args.URL 
			} else {
				// Use from defaults object or assign "/"
				URL = URL || "/"
			}
			if(method === "GET") {
				// Use returned URL
				if (pagObj !== undefined && pagObj !== {}) {
					if (pagObj[groupID]) {
						URL = pagObj[groupID][returnedURL] 
					} else {
						URL = URL || "/"
					}
				}
			}
			return dispatch(fetchDomainDataIfNeeded({
				request: new Request(URL, init),
				bodyData: body && body.data, 
				pagObj, 
				groupID, 
				...actionCreators, 
				isCached, 
				didInvalidate, 
				hideFetching, 
				showSnackbar
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
