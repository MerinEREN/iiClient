// import fetch from 'isomorphic-fetch'
import {toggleFetching} from '../actions/body'
import {setErrorMessage} from '../actions/errorMsg'

export default function fetchDomainDataIfNeeded(args) {
	// Function also receives getState()
	// which lets us choose what to dispatch next.

	// This is useful for avoiding a network request if
	// a cached value is already available.
	return (dispatch, getState) => {
		const state = getState()
		if(shouldFetchDomainData(state, args)) {
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
	if(!isCached)
		return true
	return isCached(state) ? false : true
	/* const item = args.isCached(state)
	if(!item) {
		return true
	} else if(item.isFetching) {
		return false
	} else {
		return item.didInvalidate
	} */
}

function fetchDomainData(args) {
	const {actionsRequest, actionsSuccess, actionsFailure, request, hideFetching, groupID} = args
	return dispatch => {
		actionsRequest.every(v => dispatch(v(groupID)))
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
					// console.log(response)
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
								actionsSuccess.every(v => 
									dispatch(v(body, 
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
								// For loadUserAccount only
									/* if(Array.isArray(json.result)) {
									json.result.every((r, i) => dispatch(actionsSuccess[i](groupID, {...json, result: r}, Date.now)()))
								} else { */
									actionsSuccess.every(v => 
										dispatch(v(json, 
											Date.now(), groupID)))
								}
								// }
							)
					}
				} else {
					// response code is not between 199 and 300
					console.log(
						'Response code is not between 199 and '
						+
						'300')
				}
				dispatch(setErrorMessage(null))
			})
			.catch(err => {
				console.log(
					`There has been a problem with my fetch`
					+
					` operation: ${err.message}`
				)
				actionsFailure.every(v => dispatch(v(err.message, groupID)))
				dispatch(setErrorMessage(err.message))
			})
	}
}
