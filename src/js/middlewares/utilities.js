import fetchDomainDataIfNeeded from "./fetch"

export const generateURL = (groupID, returnedURL, ...pageURLs) => {
	let URL = (groupID ? "/" + groupID : "/") + "?"
	URL += returnedURL === "nextPageURL" ? "d=next" : "d=prev"
	let domainAndParams
	let params
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
// isCached" is a bool or a function that takes the store 
// and returns a slice of sore to allow or prevent API call.
export const makeLoader = ({defaults = {}, actionCreators = {}, options = {}}) => { 
	let {path, method, URL} = defaults
	let {hideFetching, isCached, showSnackbar} = options
	// path = path || ["all"]
	hideFetching = hideFetching || false
	let headers = new Headers({"Accept": "text/plain"})
	let init = {
		method: method || "GET",
		credentials: "same-origin",
		headers: headers,
		// referrer: "/MerinEREN",
		// mode: "no-cors"
	}
	return (args = {}) => {
		let {returnedURL, groupID, body} = args
		if (body) {
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
								if (a[0] === "file")
									fd.set(a[0], a[1], a[1].name)
							}
						) 
					})
					init.body = fd
					break
			}
		}
		if(args.headers)
			Object.entries(args.headers).forEach(a => init.headers.set(a))
		returnedURL = returnedURL || "prevPageURL"
		// groupID = groupID || "all"
		return (dispatch, getState) => {
			if (path) {
				var pagObj = getState().pagination
				path.forEach(v => {
					pagObj = pagObj[v]
				})
			}
			if(method !== "POST") {
				if (args.URL) {
					// Use from args object
					URL = args.URL 
				} else {
					// Use returned URL
					if (pagObj !== undefined && pagObj !== {}) {
						if (groupID) {
							if (pagObj[groupID]) {
								URL = pagObj[groupID][returnedURL] 
							} else {
								URL = URL || "/"
							}
						} else {
							if (pagObj[returnedURL]) {
								URL = pagObj[returnedURL] 
							} else {
								URL = URL || "/"
							}
						}
					} else {
						// Use from defaults object or assign "/"
						URL = URL || "/"
					}
				}
				if (pagObj !== undefined && pagObj !== {}) {
					if (groupID) {
						if (pagObj[groupID]) {
							isCached = pagObj[groupID].isFetching
						} else {
							isCached = false
						}
					} else {
						isCached = pagObj.isFetching
					}
				} else {
					isCached
					?
					(
						typeof isCached !== "string" 
						?
						isCached(getState())
						:
						isCached
					)
					:
					false
				}
			}
			console.log(URL, init, groupID, hideFetching, isCached)
			return dispatch(fetchDomainDataIfNeeded({
				request: new Request(URL, init),
				bodyData: body && body.data, 
				groupID, 
				...actionCreators, 
				hideFetching, 
				isCached, 
				showSnackbar
			}))
		}
	}
}

export const trimSpace = (s) => {
	let str = ""
	s = s.trim()
	for(let ch of s) {
		if (ch !== " ")
			str = str.concat(ch)
	}
	return str
}
