// FOR BROWSER COMPATIBILITY YOU SHOULD IMPORT ONE OF THE BELOW
// BUT I THINK ALL BROWSERS SUPPORTS fetch NOW.
// import fetch from "isomorphic-fetch"
// OR import fetch from "cross-fetch"
import {toggleFetching} from "../actions/fetchingProgres"
import {addSnackbar, removeSnackbar} from "../actions/snackbars"
import {getObjectsFromEntities} from "./utilities"

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
					// Let the calling code know there"s nothing to wait for.
					return Promise.resolve()
				}
			case "DELETE":
				// Dispatch a thunk from thunk.
				return dispatch(shouldFetchAfterDelay(args, 5000)).
					then(() => dispatch(fetchDomainData(args)))
			default:
				// Covers "POST" and "PUT" methods
				// Dispatch a thunk from thunk.
				return dispatch(fetchDomainData(args))
		}
	}
}

// CHANGE THIS
function shouldFetchDomainData(state, args) {
	const {
		kind, 
		key, 
		isCached, 
		didInvalidate
	} = args
	if (typeof(isCached) === "function") {
		if (key !== "all") 
			return !isCached(state, key)
		return !isCached(state)
	} else if (typeof(isCached) === "boolean") {
		return !isCached
	// Not all kinds paginated, that is the reason of the first check belove.
	} else if (state.pagination[kind] !== undefined && state.pagination[kind] !== {}) {
		// For pagination object
		if (state.pagination[kind][key])
			return !state.pagination[kind][key].isFetching 
				&& 
				state.pagination[kind][key].didInvalidate
			return true
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

const shouldFetchAfterDelay = (args, duration) => dispatch => {
	const {
		actionsRequest, 
		request: {method}, 
		dataBody, 
		key
	} = args
	// Delete the object(s) from entitiesBufferd.
	actionsRequest.forEach(ac => dispatch(ac({
		method, 
		response: {result: dataBody}, 
		key
	})))
	let timer
	const promise = new Promise(resolve => {
		/* timer = setTimeout(function() {
			resolve()
		}, duration + 1000) */
		timer = setTimeout(resolve, duration + 1000)
	})
	// Add snackbar
	const snackbarKey = Date.now()
	dispatch(addSnackbar({object: {
		[snackbarKey]: {
			message: Array.isArray(dataBody) 
			? (dataBody.length === 1 ? 
				`${dataBody.map(k => k)} deleted` : 
				`${dataBody.length} items deleted`) 
			: (Object.keys(dataBody).length === 1 ? 
				`${Object.keys(dataBody).map(k => k)} deleted` : 
				`${Object.keys(dataBody).length} items deleted`),
			duration, 
			action: "Undo", 
			onActionClick: () => {
				clearTimeout(timer)
				dispatch(cancelFetch(args))
				dispatch(removeSnackbar({key: snackbarKey.toString()}))
			}, 
			onRequestClose: reason => reason === "timeout" && dispatch(removeSnackbar({key: snackbarKey.toString()}))
		}
	}}))
	return promise
}

// Reset entitiesBuffered with entities.
const cancelFetch = ({actionsFailure, request: {method}, dataBody, kind, key}) => 
	(dispatch, getState) => {
		actionsFailure.forEach(ac => dispatch(ac({
			method, 
			response: {result: getObjectsFromEntities(dataBody, getState().entities[kind])}, 
			key
		})))
	}

const fetchDomainData = args => (dispatch, getState) => {
	const {
		actionsRequest, 
		actionsSuccess, 
		actionsFailure, 
		request, 
		dataBody, 
		kind, 
		key, 
		didInvalidate, 
		hideFetching, 
		showSnackbar, 
		mergeIntoState
	} = args
	// Modifies contentsBuffer if the method is POST.
	if (actionsRequest && request.method !== "DELETE")
		actionsRequest.forEach(ac => dispatch(ac({
			method: request.method, 
			response: {result: request.method !== "PUT" && dataBody}, 
			key
		})))
	if (!hideFetching)
		dispatch(toggleFetching())
	// REMOVE IF STATEMENT BELOW !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	/* if (self.fetch)
			console.log("fetch is supported by the browser")
		else
			console.log("fetch is not supported by the browser," + 
				"use XMLHttpRequest instead") */
	// return fetch(`http://www.reddit.com/r/${subreddit}.json`)
	return fetch(request)
		.then(response => {
			// throw new TypeError("Hello my funny TypeError =)")
			if(!hideFetching)
				dispatch(toggleFetching())
			if (response.ok) {
				switch (response.status) {
					case 204:
						// like all DELETE requests 
						// and some PUT, POST and GET requests.
						if (request.method !== "GET") {
							actionsSuccess.forEach(ac => dispatch(ac({
								method: request.method, 
								response: {result: request.method === "DELETE" ? 
									dataBody :
									{...getState().entitiesBuffered[kind]}
								}, 
								key
								// receivedAt: Date.now()
							})))
						}
						break
					case 201:
					default:
						// If the response is 200.
						const contentType = response.headers.get("Content-Type")
						if (
							contentType &&
							contentType.indexOf("text/html") !== -1
						) {
							/* response.text()
						.then(body => 
							actionsSuccess.forEach(ac => dispatch(ac({
								response: body, 
								receivedAt: Date.now()
							})))
						) */
						} else if (
							contentType &&
							contentType.indexOf("text/plain") !== -1
						) {
							/* response.text()
						.then(body => 
							dispatch(args[1](body.data.
								children.
								map(child => child.
									data), 
								Date.now()))
						) */
						} else if (
							contentType &&
							contentType.indexOf("application/json") !== -1
						) {
							response.json()
								.then(body => {
									actionsSuccess.forEach(ac => dispatch(ac({
										method: request.method, 
										response: body, 
										key, 
										// receivedAt: Date.now(), 
										didInvalidate, 
										mergeIntoState
									})))
								})
						}
				}
			} else {
				// response code is not between 199 and 300
				if (actionsFailure)
					actionsFailure.forEach(ac => dispatch(ac({
						method: request.method, 
						error: "USE ERROR CODE AND MESSAGE HERE", 
						response: {result: request.method === "DELETE" ? 
							getObjectsFromEntities(dataBody, getState().entities[kind]) :
							{...getState().entities[kind]}
						}, 
						key
					})))
			}
			// USE Response.status HERE TO HANDLE RESPONSE STATUSES !!!!!!!!!!!
			if(showSnackbar || (response.status === 204 && request.method === "GET")) {
				const snackbarKey = Date.now()
				dispatch(addSnackbar({object: {
					[snackbarKey]: {
						// message: response.headers.get("Date")
						message: response.statusText, 
						onRequestClose: () => dispatch(removeSnackbar({key:snackbarKey.toString()}))
					}
				}}))
			}
			return response
		})
		.catch(err => {
			if(!hideFetching)
				dispatch(toggleFetching())
			console.log(
				`There has been a problem with my fetch
					operation: ${err.message}`
			)
			// DID NOT USE error RIGHTNOW !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			// Remove the temporarily added new data (POST), 
			// add the temporarily removed old data (DELETE) or 
			// replace old data with modified data (PUT) from the store.
			if (actionsFailure)
				actionsFailure.forEach(ac => dispatch(ac({
					method: request.method, 
					error: err.message, 
					response: {result: request.method === "DELETE" ? 
						getObjectsFromEntities(dataBody, getState().entities[kind]) :
						{...getState().entities[kind]}
					}, 
					key
				})))
			const snackbarKey = Date.now()
			dispatch(addSnackbar({object: {
				[snackbarKey]: {
					message: err.message, 
					onRequestClose: () => dispatch(removeSnackbar({key:snackbarKey.toString()}))
				}
			}}))
		})
}
