// import fetch from "isomorphic-fetch"
import {toggleFetching} from "../actions/fetchingProgres"
import {setSnackbar} from "../actions/snackbar"
import {buttonResetAll} from "../actions/buttons"

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
					// Let the calling code know there"s nothing to wait for.
					return Promise.resolve()
				}
			case "DELETE":
				// Dispatch a thunk from thunk.
				dispatch(shouldFetchAfterTimeout(args, 10000))
			default:
				// Covers "POST" and "PUT" methods
				// Dispatch a thunk from thunk.
				return dispatch(fetchDomainData(args))
		}
	}
}

function shouldFetchDomainData(state, args) {
	const {
		path, 
		key, 
		isCached, 
		didInvalidate
	} = args
	if (isCached) {
		// For root object
		return !isCached(state)
	} else if (state.pagination.path !== undefined && Object.keys(state.pagination.path).length !== 0) {
		// The first check above is only for preventing "Object.keys(state.pagination.path)" error
		// For pagination object
		if (state.pagination.path[key]) {
			return !state.pagination.path[key].isFetching 
				&& 
				state.pagination.path[key].didInvalidate
		} else {
			return !state.pagination.path.isFetching
				&& 
				state.pagination.path.didInvalidate
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

const shouldFetchAfterTimeout = (args, duration) => (dispatch, getState) => {
	// Cancel previous api delete request
	clearTimeout(timer)
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
	// Set snackbar
	dispatch(setSnackbar({
		props: {
			message: `${Object.keys(dataBody).map(k => k)} deleted`,
			duration, 
			action: "Undo", 
			onActionClick: () => {
				dispatch(buttonResetAll())
				dispatch(cancelFetch(args))
			}, 
			clicked: false
		}
	}))
	// setTimeout returns a number not a promise, so this return does nothing actually.
	// return timer = setTimeout(function() { 
	timer = setTimeout(function() {
		if(!getState().appState.snackbar.clicked) {
			dispatch(fetchDomainData(args))
		}
	}, duration + 1000)
}

// Reset entitiesBuffered with entities.
const cancelFetch = ({actionsFailure, request: {method}, key}) => (dispatch, getState) => {
	const {appState: {snackbar}, entities} = getState()
	actionsFailure.forEach(ac => dispatch(ac({
		method, 
		response: {result: key ?
			{...entities[path][key]} :
			{...entities[path]}
		}, 
		key
	})))
	// Reset snackbar properties
	dispatch(setSnackbar({
		props: {
			...snackbar, 
			onActionClick: undefined, 
			clicked: true
		}
	}))
}

const fetchDomainData = args => (dispatch, getState) => {
	const {
		actionsRequest, 
		actionsSuccess, 
		actionsFailure, 
		request, 
		dataBody, 
		path, 
		key, 
		didInvalidate, 
		hideFetching, 
		showSnackbar
	} = args
	// Modifies contentsBuffer if the method is POST.
	if (request.method !== "DELETE")
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
				const contentType = response.headers
					.get("content-type")
				/* if (
					contentType
					&&
					contentType.indexOf("text/html") !== -1
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
					contentType.indexOf("application/json")
					!==
					-1
				) {
					response.json()
						.then(body => 
							dispatch(args[1](body.data.
								children.
								map(child => child.
									data), 
								Date.now()))
						)
				}
				else if ( */
				// Backand sending JSON data as Marshald form.
				// So the Content-Type is "text/plain".
				if (
					contentType
					&&
					contentType.indexOf("text/plain")
					!==
					-1
				) {
					response.text()
						.then(body => {
							const json = JSON.parse(body)
							actionsSuccess.forEach(ac => dispatch(ac({
								method: request.method, 
								response: body !== "" ? 
								{...json} : 
								{result: key ?
									{...getState().entitiesBufferd[path][key]} :
									{...getState().entitiesBufferd[path]}
								}, 
								key, 
								receivedAt: Date.now(), 
								didInvalidate
							})))
						})
				}
			} else {
				// response code is not between 199 and 300
				console.log("Response code is not between 199 and 300")
				actionsFailure.forEach(ac => dispatch(ac({
					method: request.method, 
					error: "USE ERROR CODE AND MESSAGE HERE", 
					response: {
						result: key ?
						{...getState().entities[path][key]} :
						{...getState().entities[path]}
					}, 
					key
				})))
			}
			// USE Response.status HERE TO HANDLE RESPONSE STATUSES !!!!!!!!!!!
			if(showSnackbar)
				dispatch(setSnackbar({
					props: {
						message: response.headers.get("Date")
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
			// Remove the temporarily added new data (POST), 
			// add the temporarily removed old data (DELETE) or 
			// replace old data with modified data (PUT) from the store.
			actionsFailure.forEach(ac => dispatch(ac({
				method: request.method, 
				error: err.message, 
				response: {
					result: key ?
					{...getState().entities[path][key]} :
					{...getState().entities[path]}
				}, 
				key
			})))
			dispatch(setSnackbar({
				props: {
					message: err.message}
			}))
		})
}
