// import fetch from 'isomorphic-fetch'
import {toggleFetching} from '../actions/fetchingProgres'
import {setSnackbarMessage} from '../actions/snackbar'

export default function fetchDomainDataIfNeeded(args) {
	// Function also receives getState()
	// which lets us choose what to dispatch next.

	// This is useful for avoiding a network request if
	// a cached value is already available.
	return (dispatch, getState) => {
		const state = getState()
		// if(shouldFetchDomainData(state, args)) {
		if(!args.isCached) {
			// Dispatch a thunk from thunk.
			return dispatch(fetchDomainData(args))
		} else {
			// Let the calling code know there's nothing to wait for.
			return Promise.resolve()
		}
	}
}

// MODIFY THIS CHECK !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function shouldFetchDomainData(state, args) {
	const {isCached} = args
	return isCached
	/* const item = args.isCached(state)
	if(!item) {
		return true
	} else if(item.isFetching) {
		return false
	} else {
		return item.didInvalidate
	} */
}

const fetchDomainData = args => dispatch => {
	const {
		actionsRequest, 
		actionsSuccess, 
		actionsFailure, 
		request, 
		bodyData, 
		groupID, 
		hideFetching, 
		showSnackbar
	} = args
	if (request.method !== 'GET') {
		actionsSuccess.every(ac => dispatch(ac({result: bodyData}, Date.now(), groupID)))
	}
	if (actionsRequest)
		actionsRequest.every(ac => dispatch(ac(groupID)))
	if(!hideFetching)
		dispatch(toggleFetching())
	// REMOVE IF STATEMENT BELOW !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	/* if (self.fetch)
			console.log('fetch is supported by the browser')
		else
			console.log('fetch is not supported by the browser,' + 
				'use XMLHttpRequest instead') */
	// return fetch(`http://www.reddit.com/r/${subreddit}.json`)
	return fetch(request)
		.then(response => {
			// throw new TypeError('Hello my funny TypeError =)')
			if(!hideFetching)
				dispatch(toggleFetching())
			if (response.ok) {
				if (request.method === 'GET') {
					const contentType = response.headers
						.get('content-type')
					if (
						contentType
						&&
						contentType.indexOf('text/html')
						!==
						-1
					) {
						response.text()
							.then(body => 
								actionsSuccess.every(ac => 
									dispatch(ac(body, 
										Date.now()))))
					} else if (
						contentType
						&&
						contentType.indexOf('application/json')
						!==
						-1
					) {
						/* response.json()
							.then(body => 
								dispatch(args[1](body.data.
									children.
									map(child => child.
										data), 
									Date.now()))
							) */
					}
					// Backand sending JSON data as Marshald form.
					// So the Content-Type is "text/plain".
					else if (
						contentType
						&&
						contentType.indexOf('text/plain')
						!==
						-1
					) {
						response.text()
							.then(body => {
								const json = 
									JSON.parse(body)
								actionsSuccess.every(ac => 
									dispatch(ac(json, 
										Date.now(), groupID)))
							}
							)
					}
				}
			} else {
				// response code is not between 199 and 300
				console.log(
					'Response code is not between 199 and '
					+
					'300')
			}
			// USE Response.status HERE TO HANDLE RESPONSE STATUSES !!!!!!!!!!!
			if(showSnackbar)
				dispatch(setSnackbarMessage(response.headers.get('Date')))
		})
		.catch(err => {
			if(!hideFetching)
				dispatch(toggleFetching())
			console.log(
				`There has been a problem with my fetch
					operation: ${err.message}`
			)
			const rslt = {result: bodyData}
			actionsFailure.every(ac => dispatch(ac(
				err.message, 
				groupID, 
				rslt
			)))
			dispatch(setSnackbarMessage(err.message))
		})
}
