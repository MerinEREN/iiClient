import fetchDomainDataIfNeeded from './fetch'

export const generateUrl = (domain, direction, ...nextPageUrls) => {
	let url = (domain || "/") + "?"
	if(direction)
		url += direction
	let domainAndParams
	let params
	nextPageUrls.forEach((v, i) => {
		domainAndParams = v.split("?")
		params = domainAndParams[1].split("&")
		url += "&" + params[1]
	})
	return url
}

// "hideFetching" is to hide fetching progress component.
// isCached" is a bool or a function that takes the store 
// and returns a slice of sore to allow or prevent API call.
export const makeLoader = ({defaults, actionCreators, options}) => args => {
	let URL
	let groupID
	let hideFetching = false
	let isCached = false
	if (defaults) {
		if (args) {
			URL = args.url || defaults.url
			groupID = args.groupID || (defaults.groupID || 'all')
		} else {
			URL = defaults.url || '/'
			groupID = defaults.groupID || 'all'
		}
	} else {
		if (args) {
			URL = args.url || '/'
			groupID = args.groupID || 'all'
		} else {
			URL = '/'
			groupID = 'all'
		}
	}
	if (options) {
		hideFetching = options.hideFetching
		isCached = options.isCached
	}
	const headers = new Headers({'Accept': 'text/plain'})
	const init = {
		// method: 'POST',
		credentials: "same-origin",
		// body,
		headers: headers,
		// referrer: '/MerinEREN',
		// mode: 'no-cors'
	}
	const r = new Request(URL, init)
	console.log(URL, groupID, actionCreators)
	return (dispatch) => {
		return dispatch(fetchDomainDataIfNeeded({
			request: r,
			groupID, 
			...actionCreators, 
			hideFetching, 
			isCached
		}))
	}
}
