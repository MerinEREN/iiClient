// FOR BROWSER COMPATIBILITY YOU SHOULD IMPORT ONE OF THE BELOW
// BUT I THINK ALL BROWSERS SUPPORTS fetch NOW.
// import fetch from "isomorphic-fetch"
// OR import fetch from "cross-fetch"
import browserHistory from "react-router/lib/browserHistory"
import {toggleFetching} from "../actions/fetchingProgres"
import {
	addSnackbar, 
	removeSnackbar
} from "../actions/snackbars"
import {
	getObjectsFromAnObjectByKeys, 
	headerLocationParse
} from "./utilities"

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
					// Let the calling code know there is nothing 
					// to wait for.
					return Promise.resolve()
				}
			case "DELETE":
				// Dispatch a thunk from thunk.
				return dispatch(shouldFetchAfterDelay(args, 5000)).
					then(() => dispatch(fetchDomainData(args)))
			default:
				// Covers "POST", "PUT" and "PATCH" methods
				// Dispatch a thunk from thunk.
				return dispatch(fetchDomainData(args))
		}
	}
}

function shouldFetchDomainData(state, args) {
	const {
		isCached, 
		kind, 
		key
	} = args
	// For non paginated objects, page contexts 
	// and specific entities like account, demand, offer, page...
	if (isCached)
		return !isCached(state, kind, key)
	// For paginated objects
	if (state.pagination[kind][key])
		return !(state.pagination[kind][key].isFetching || 
			state.pagination[kind][key].didValidate)
	return true
	/* const item = args.isCached(state)
	if(!item) {
		return true
	} else if(item.isFetching) {
		return false
	} else {
		return item.didInValidate
	} */
}

const shouldFetchAfterDelay = (args, duration) => dispatch => {
	const {
		actionsRequest, 
		request: {method}, 
		data, 
		key, 
		ineffective
	} = args
	// Delete the object(s) from entitiesBufferd 
	// and update corresponding IDs in pagination.
	actionsRequest.forEach(ac => dispatch(ac({
		method, 
		ineffective, 
		data, 
		key
	})))
	// Add snackbar
	const snackbarKey = Date.now()
	dispatch(addSnackbar({
		ID: snackbarKey, 
		message: Array.isArray(data) ? 
		(
			data.length === 1 ? 
			data.map(k => {
				if (k.length > 20) {
					const substr = k.substring(0, 20)
					return `${substr}... deleted`
				} else {
					return `${k} deleted`
				}
			}) : 
			`${data.length} items deleted`
		) : 
		(
			Object.keys(data).length === 1 ? 
			Object.keys(data).map(k => {
				if (k.length > 20) {
					const substr = k.substring(0, 20)
					return `${substr}... deleted`
				} else {
					return `${k} deleted`
				}
			}) : 
			`${Object.keys(data).length} items deleted`
		),
		duration, 
		action: "Undo", 
		onActionClick: () => {
			clearTimeout(timer)
			dispatch(cancelFetch(args))
			dispatch(removeSnackbar(snackbarKey.toString()))
		}, 
		onRequestClose: reason => reason === "timeout" && dispatch(removeSnackbar(snackbarKey.toString()))
	}))
	// Return a promise
	let timer
	return new Promise(resolve => {
		timer = setTimeout(resolve, duration + 1000)
	})
}

// Restore the entities to the "entitiesBuffered" if not "ineffective"
// and update the corresponding "IDs" in the "pagination".
const cancelFetch = ({actionsFailure, request: {method}, data, kind, key, ineffective}) => 
	(dispatch, getState) => {
		actionsFailure.forEach(ac => dispatch(ac({
			error: "Delete request canceled by the user!", 
			method, 
			ineffective, 
			data: getObjectsFromAnObjectByKeys(
				data, 
				getState().entities[kind]
			), 
			key
		})))
	}

const fetchDomainData = args => (dispatch, getState) => {
	const {
		actionsRequest, 
		actionsSuccess, 
		actionsFailure, 
		request, 
		data, 
		kind, 
		key, 
		ineffective, 
		didValidate, 
		hideFetching, 
		showSnackbar
	} = args
	// "DELETE" requests are been handled in "shouldFetchAfterDelay" function.
	if (actionsRequest && request.method !== "DELETE")
		actionsRequest.forEach(ac => dispatch(ac({
			method: request.method, 
			ineffective, 
			data: (request.method === "PUT" || request.method === "PATCH") && 
			data,  
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
				// The custom header entity to reset a kind.
				if(response.headers.has("X-Reset"))
					var reset = response.headers.get("X-Reset")
				switch (response.status) {
					case 204:
						actionsSuccess && actionsSuccess.forEach(ac => dispatch(ac({
							responseStatus: response.status, 
							reset, 
							method: request.method, 
							ineffective, 
							data: request.method === "DELETE" ? 
							data : 
							(
								(
									request.method === "PUT" || 
									requset.method === "PATCH"
								) ? 
								getState().entitiesBuffered[kind] : 
								(
									(
										request.method === "POST" && 
										ineffective
									) ? 

									getObjectsFromAnObjectByKeys(data, getState().entitiesBuffered[kind]) :
									{}
								)
							), 
							key
							// receivedAt: Date.now()
						})))
						break
					case 201:
						// If needed use the "location" to redirect 
						// here.
						if(response.headers.has("Location"))
							var location = response.headers.get("Location")
					default:
						// If the response is 200.
						const contentType = response.headers.get("Content-Type")
						if(response.headers.has("Link"))
							var hrefs = headerLocationParse(response.headers.get("Link"))
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
										responseStatus: response.status, 
										response: body, 
										hrefs, 
										reset, 
										method: request.method, 
										ineffective, 
										didValidate, 
										key
										// receivedAt: Date.now(), 
									})))
								})
						}
				}
			} else {
				// response code is not between 199 and 300
				if (actionsFailure)
					actionsFailure.forEach(ac => dispatch(ac({
						error: `${response.status}: ${response.statusText}`, 
						data: request.method === "DELETE" ? 
						getObjectsFromAnObjectByKeys(data, getState().entities[kind]) :
						(
							(
								request.method === "PUT" || 
								requset.method === "PATCH"
							) &&  
							getState().entities[kind]
						), 
						method: request.method, 
						ineffective, 
						key
					})))
			}
			if(showSnackbar || (response.status === 204 && request.method === "GET")) {
				const snackbarKey = Date.now()
				dispatch(addSnackbar({
					ID: snackbarKey, 
					// message: response.headers.get("Date")
					message: response.statusText, 
					onRequestClose: () => dispatch(removeSnackbar(snackbarKey.toString()))
				}))
			}
			if (location) {
				browserHistory.push(location)
				// Let the calling code know there is nothing to wait for.
				return Promise.resolve()
			} else {
				return response
			}
		})
		.catch(err => {
			if(!hideFetching)
				dispatch(toggleFetching())
			if (actionsFailure)
				actionsFailure.forEach(ac => dispatch(ac({
					error: err.message, 
					data: request.method === "DELETE" ? 
					getObjectsFromAnObjectByKeys(data, getState().entities[kind]) :
					(
						(
							request.method === "PUT" || 
							requset.method === "PATCH"
						) &&  
						getState().entities[kind]
					), 
					method: request.method, 
					ineffective, 
					key
				})))
			const snackbarKey = Date.now()
			dispatch(addSnackbar({
				ID: snackbarKey, 
				message: err.message, 
				onRequestClose: () => dispatch(removeSnackbar(snackbarKey.toString()))
			}))
		})
}
