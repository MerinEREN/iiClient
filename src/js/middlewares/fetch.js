// import fetch from 'isomorphic-fetch'
import {toggleFetching} from '../actions/fetchingProgres'
import {setSnackbar} from '../actions/snackbar'

var timer

export default function fetchDomainDataIfNeeded(args) {
	// Function also receives getState()
	// which lets us choose what to dispatch next.

	// This is useful for avoiding a network request if
	// a cached value is already available.
	return (dispatch, getState) => {
		switch(args.request.method) {
			case "GET":
				if(shouldFetchDomainData(getState(), args)) {
					// Dispatch a thunk from thunk.
					return dispatch(fetchDomainData(args))
				} else {
					// Let the calling code know there's nothing to wait for.
					return Promise.resolve()
				}
			case "DELETE":
				return dispatch(shouldFetchAfterTimeout(getState, args, 10000))
			default:
				// Covers "POST" and "PUT" methods
				return dispatch(fetchDomainData(args))
		}
	}
}

function shouldFetchDomainData(state, args) {
	const {
		groupID, 
		pagObj, 
		isCached, 
		didInvalidate
	} = args
	if(isCached) {
		// For root object
		return !isCached(state)
	} else if(pagObj !== undefined && Object.keys(pagObj).length !== 0) {
		// The first check above is only for preventing "Object.keys(pagObj)" error
		// For pagination object
		if (pagObj[groupID]) {
			return !pagObj[groupID].isFetching 
				&& 
				pagObj[groupID].didInvalidate
		} else {
			return !pagObj.isFetching
				&& 
				pagObj.didInvalidate
		}
	} else {
		return true
	}
	/* const item = args.isCached(state)
	if(!item) {
		return true
	} else if(item.isFetching) {
		return false
	} else {
		return item.didInvalidate
	} */
}

const shouldFetchAfterTimeout = (getState, args, duration) => dispatch => {
	const {
		actionsSuccess, 
		request: {method}, 
		bodyData, 
		groupID
	} = args
	// Delte the object from store
	actionsSuccess.forEach(ac => dispatch(ac({
		method, 
		response: {result: bodyData}, 
		groupID
	})))
	// Set snackbar
	dispatch(setSnackbar({
		props: {
			message: `${Object.keys(bodyData).map(k => k)} deleted`,
			duration, 
			action: 'Undo', 
			onActionClick: () => dispatch(cancelFetch(getState, args)), 
			clicked: false
		}
	}))
	// CHECK DELETE, DELETE/CANCEL, DELETE SCENARIO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	// setTimeout returns a number not a promise, so this return does nothing actually.
	return timer = setTimeout(function() {
		if(getState().appState.snackbar.clicked)
			return Promise.resolve()
		return dispatch(fetchDomainData(args))
	}, duration + 1000)
}

// Add deleted object back to the store.
const cancelFetch = (getState, {actionsFailure, request: {method}, bodyData, groupID}) => dispatch => {
	const {snackbar} = getState().appState
	console.log(method, bodyData, groupID)
	actionsFailure.forEach(ac => dispatch(ac({
		method, 
		response: {result: bodyData}, 
		groupID
	})))
	dispatch(setSnackbar({
		props: {
			...snackbar, 
			// Prevent more than one click (open: !clicked, so this control
			// is NOT NECESSARY actually.
			onActionClick: undefined, 
			clicked: true
		}
	}))
	// So imported to prevent previously canceled API calls.
	clearTimeout(timer)
}

const fetchDomainData = args => dispatch => {
	const {
		actionsRequest, 
		actionsSuccess, 
		actionsFailure, 
		request, 
		bodyData, 
		groupID, 
		didInvalidate, 
		hideFetching, 
		showSnackbar
	} = args
	if (request.method === 'POST' || request.method === 'PUT') {
		actionsSuccess.forEach(ac => dispatch(ac({
			method: request.method, 
			response: {result: bodyData}, 
			groupID
		})))
	}
	if (actionsRequest)
		actionsRequest.forEach(ac => dispatch(ac({groupID})))
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
						contentType.indexOf('text/html') !== -1
					) {
						response.text()
							.then(body => 
								actionsSuccess.forEach(ac => dispatch(ac({
									response: {result: body}, 
									receivedAt: Date.now()
								})))
							)
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
								actionsSuccess.forEach(ac => dispatch(ac({
									method: request.method, 
									response: {...json}, 
									receivedAt: Date.now(), 
									groupID, 
									didInvalidate
								})))
							})
					}
				}
			} else {
				// response code is not between 199 and 300
				console.log('Response code is not between 199 and 300')
				// DID NOT USE error RIGHTNOW !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
				actionsFailure.forEach(ac => dispatch(ac({
					method: request.method, 
					error: "use error code here", 
					response: {
						result: (request.method !== 'GET') 
						? 
						bodyData 
						: 
						null
					}, 
					groupID
				})))
			}
			// USE Response.status HERE TO HANDLE RESPONSE STATUSES !!!!!!!!!!!
			if(showSnackbar)
				dispatch(setSnackbar({
					props: {
						message: response.headers.get('Date')
					}
				}))
		})
		.catch(err => {
			if(!hideFetching)
				dispatch(toggleFetching())
			console.log(
				`There has been a problem with my fetch
					operation: ${err.message}`
			)
			// DID NOT USE error RIGHTNOW !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			actionsFailure.forEach(ac => dispatch(ac({
				method: request.method, 
				error: err.message, 
				response: {
					result: (request.method !== 'GET') 
					? 
					bodyData 
					: 
					null
				}, 
				groupID
			})))
			dispatch(setSnackbar({
				props: {
					message: err.message}
			}))
		})
}
