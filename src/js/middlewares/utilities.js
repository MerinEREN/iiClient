import fetchDomainDataIfNeeded from "./fetch"

export const generateURL = (key, ...pageURLs) => {
	let url = new URL(`/${key}`, window.location.href)
	pageURLs.forEach((v, i) => {
		switch (i) {
			case 0:
				const pD = new URL(v).searchParams
				url.searchParams.set("uID", pD.get("uID"))
				pD.getAll("before").forEach(v => url.searchParams.append("befored", v))
				break
			case 1:
				/* const pO = new URL(v).searchParams
				pO.getAll("before").forEach(v => url.searchParams.append("beforeo", v)) */
				break
			case 2:
				const pSP = new URL(v).searchParams
				pSP.getAll("before").forEach(v => url.searchParams.append("beforesp", v))
				break
		}
	})
	return url
}

/*
"isCached" is a function to fetch control for non paginated datas and page contexts.
"didValidate" if it is not undefined prevents the API call.
"hideFetching" is to hide fetching progress component.
"ineffective" is to prevent changes at "entities" and "entitiesBuffered" 
while changing "pagination" "IDs". Used mainly n to n relational transition tables.
"showSnackbar" if it is not undefined shows snackbar after an action.
*/
// If the request is "PUT" function compares to the entitiesBuffered and the entities to 
// send only changed entities as the request body.
const makeLoader = ({defaults = {}, actionCreators = {}, options = {}}) => { 
	var {
		URL, 
		headers, 
		method, 
		kind
	} = defaults
	var {
		ineffective, 
		hideFetching, 
		isCached, 
		didValidate, 
		showSnackbar
	} = options
	hideFetching = hideFetching || false
	var init = {
		method: method || "GET",
		credentials: "same-origin"
		// referrer: "/MerinEREN",
		// mode: "no-cors"
	}
	if (init.method === "GET")
		init.headers = new Headers({"Accept": "application/json"})
	// Some "POST", "PATCH" and "PUT" requests returns responses with data.
	if(headers) {
		init.headers = new Headers()
		Object.entries(headers).forEach(([k, v]) => init.headers.set(k, v))
	}
	return (args = {}) => {
		var {
			key, 
			data, 
			link
		} = args
		key = key || "all"
		link = link || "next"
		return (dispatch, getState) => {
			if (data && method !== "DELETE") {
				if (Array.isArray(data.value) || method === "POST") {
					var body = data.value
				} else {
					var body = {}
					if (data.value.hasOwnProperty("ID")) {
						const {ID, ...rest} = data.value
						body = rest
					} else {
						Object.values(data.value).forEach(v => {
							const {ID, ...rest} = v
							body[ID] = rest
						})
					}
				}
				switch (data.type) {
					case "Blob":
						// USING ONLY FOR CONTEXTS NOW AND IT IS 
						// NOT NECESSARY.
						// MAY BE SHOULD BE REMOVED FROM CASES
						// AFTER CONTEXTS POST AND PUT REQUESTS 
						// CHANGED !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
						init.body = new Blob(
							Object.values(method !== "PUT" ? 
								body : 
								getChanged(
									getState().entities[kind], 
									data.value
								)
							).map(v => {
								return JSON.stringify(v)
							}),
							{type : data.contentType}
						)
						break
					case "FormData":
						let fd = new FormData()
						Object.entries(body).forEach(([k, v]) => {
							// if (a[0] !== "file")
							// fd.set(a[0], a[1])
							// if (a[0] === "file") {
							// if(a[1] !== undefined) {
							// fd.set(a[0], a[1], a[1].name)
							// } else {
							// fd.set(a[0], a[1])
							// }
							// }
							Array.isArray(v) ? 
								v.forEach(v2 => fd.append(k, v2)) :
								fd.set(k, v)
						}) 
						init.body = fd
						break
					default: 
						// For JSON encoded []byte.
						init.body = JSON.stringify(body)
				}
			}
			if (args.URL) {
				// Use from args object.
				URL = args.URL 
			} else {
				// Use from defaults object or assign "/".
				URL = URL || "/"
				// If the method is GET and the pagination has 
				// the hrefs property overwrite the defaults with them.
				if(method === "GET") {
					// if (kind)
					var path = getState().pagination[kind]
					// Use returned URL
					if (
						path !== undefined && 
						path !== {} && 
						path[key] && 
						path[key].hrefs
					)
						URL = path[key].hrefs[link] 
				}
			}
			return dispatch(fetchDomainDataIfNeeded({
				request: new Request(URL, init),
				data: data && data.value, 
				kind, 
				key, 
				...actionCreators, 
				ineffective, 
				isCached, 
				didValidate, 
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

const getChanged = (entities, entitiesBuffered) => {
	let changedEntities = {}
	Object.entries(entities).forEach(([k, v]) => {
		if (v !== entitiesBuffered[k])
			changedEntities[k] = entitiesBuffered[k]
	})
	return changedEntities
}

export const filterAnObjectByKeys = (object, keys) => {
	let obj = {}
	if (!object)
		return obj
	for (let v of keys) {
		// Belowe control is delete page -> delete content which has only that page 
		// -> cancel delete content after delete page timeout expiris check.
		// And also for undefined values of object[key].
		if (object.hasOwnProperty(v))
			obj[v] = object[v]
	}
	return obj
}
export const headerLinkParse = str => {
	const links = str.split(", ")
	let linkValue = ""
	let linkParam = ""
	let hrefs = {}
	links.forEach(link => {
		linkValue = link.split('>; rel="')[0].replace('<', '')
		linkParam = link.split('>; rel="')[1].replace('"', '')
		hrefs[linkParam] = linkValue
	})
	return hrefs
}

export const isCached = (state, kind, key) => key === "all" ? 
	false : 
	state.pagination[kind].hasOwnProperty(key)

export default makeLoader
