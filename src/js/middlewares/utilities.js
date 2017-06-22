import fetchDomainDataIfNeeded from './fetch'

export const generateURL = (groupID, returnedURL, ...pageURLs) => {
	let URL = (groupID ? "/" + groupID : "/") + "?"
	URL += returnedURL === 'nextPageURL' ? 'd=next' : 'd=prev'
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
	let {paginationID, method, URL} = defaults
	let {hideFetching, isCached, showSnackbar} = options
	paginationID = paginationID || 'all'
	hideFetching = hideFetching || false
	let headers = new Headers({'Accept': 'text/plain'})
	let init = {
		method: method || 'GET',
		credentials: "same-origin",
		headers: headers,
		// referrer: '/MerinEREN',
		// mode: 'no-cors'
	}
	return (args = {}) => {
		let {returnedURL, groupID, body} = args
		if (body) {
			switch (body.type) {
				case 'blob':
					init.body = new Blob(
						Object.values(body.data).map(v => {
							const {ID, ...rest} = v
							return JSON.stringify(rest)
						}), 
						{type : body.contentType}
					)
			}
		}
		if(args.headers)
			Object.entries(args.headers).forEach(a => init.headers.set(a))
		returnedURL = returnedURL || 'prevPageURL'
		groupID = groupID || 'all'
		return (dispatch, getState) => {
			if(method !== 'POST') {
				URL = args.URL 
					|| 
					(
						getState().pagination[paginationID] 
						? 
						(
							getState().pagination[paginationID][groupID]
							? 
							getState().pagination[paginationID][groupID][returnedURL] 
							:
							URL
						)
						:
						'/'
					)
			}
			isCached = paginationID !== 'all' 
				? 
				(
					getState().pagination[paginationID][groupID]
					?
					getState().pagination[paginationID][groupID].isFetching
					:
					false
				)
				: 
				isCached
				?
				(
					typeof isCached !== 'string' 
					?
					isCached(getState())
					:
					isCached
				)
				:
				false
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
	let str = ''
	s = s.trim()
	for(let ch of s) {
		if (ch !== ' ')
			str = str.concat(ch)
	}
	return str
}
