// import union from "lodash/union"

// Returns slice reducer for given action type/function pairs in handlers
export default function createReducer(initialState, handlers) {
	return function reducer(state = initialState, action) {
		if (handlers.hasOwnProperty(action.type))
			return handlers[action.type](state, action)
		return state
	}
}

// Creates a reducer for managing pagination and fetching control, given the action types 
// to handle,
// and a function telling how to extract the key from an action.
export const paginate = ({types, mapActionToKey}) => {
	if (!Array.isArray(types) || (types.length !== 3 || types.length !== 4)) {
		throw new Error("Expected types to be an array of three elements.")
	}
	if (!types.every(t => typeof t === "string")) {
		throw new Error("Expected types to be strings.")
	}
	/* if (typeof mapActionToKey !== "function") {
		throw new Error("Expected mapActionToKey to be a function.")
	} */

	const [requestType, successType, failureType, resetAllType] = types

	// "hrefs" is created via header link and refs are used as keys and urls as values.
	// if "hrefs.next" does not exist it means there is no data to fetch.
	// if "hrefs.prev" does not exist it means there is no data before the returned ones.
	// "reset" resets the "IDs" with given response.
	const updatePagination = (state = {
		IDs: [],
		hrefs: {}, 
		error: null, 
		isFetching: false,
		didValidate: false
	}, action) => {
		const {
			type, 
			method, 
			data, 
			response, 
			hrefs, 
			reset, 
			error, 
			didValidate
		} = action
		let obj = {}
		const data = data || (response.data || response)
		// If the data is not enveloped.
		if (data.hasOwnProperty(ID))
			data = {[data.ID]: data}
		switch (type) {
			case requestType:
				switch (method) {
					case "DELETE":
						obj.IDs = removeItemsFromArray(
							state.IDs, 
							data
						)
						break
					case "POST":
					case "PUT":
					case "PATCH":
					default:
				}
				return {
					...state,
					...obj, 
					isFetching: true
				}
			case successType:
				switch (method) {
					case "PUT":
					case "PATCH":
					case "DELETE":
						break
					case "POST":
						obj = {
							IDs: reset ? 
							[...Object.keys(data)] : 
							[...state.IDs, ...Object.keys(data)]
						}
						break
					default:
						obj = {
							IDs: reset ? 
							[...Object.keys(data)] : 
							[...state.IDs, ...Object.keys(data)], 
							didValidate: typeof didValidate !== 
							"undefined"
						}
				}
				return {
					...state,
					...obj, 
					hrefs: hrefs || state.hrefs, 
					error: null, 
					isFetching: false
				}
			case failureType:
				switch (method) {
					case "DELETE":
						obj.IDs = [
							...state.IDs, 
							...Object.keys(data)
						]
						break
					case "POST":
					case "PUT":
					case "PATCH":
					default:
				}
				return {
					...state,
					...obj, 
					error, 
					isFetching: false
				}
			default:
				return state
		}
	}
	// USE action.receivedAt !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	return (state = {}, action) => {
		// SHOW "resetAllType" VALUE AT THE CONSOL !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		switch (action.type) {
			case requestType:
			case successType:
			case failureType:
				const key = mapActionToKey(action)
				return {
					...state,
					[key]: updatePagination(state[key], action)
				}
			case resetAllType: 
				return {}
			default:
				return state
		}
	}
}

const removeItemsFromArray = (array1, array2) => {
	var array = []
	array1.forEach(v => {
		if (array2.indexOf(v) === -1)
			array.push(v)
	})
	return array
}

// Used for counters.
export const setPartiallyOrResetAnObject = ({types, mapActionToKey}) => {
	if (!Array.isArray(types) || types.length > 2) {
		throw new Error("Expected types to be an array of max two elements.")
	}
	if (!types.every(t => typeof t === "string")) {
		throw new Error("Expected types to be strings.")
	}
	if (typeof mapActionToKey !== "function") {
		throw new Error("Expected mapActionToKey to be a function.")
	}

	const [setType, resetAllType] = types

	return (state = {}, action) => {
		const {
			type, 
			responseStatus, 
			response, 
			data
		} = action
		if (responseStatus === 204)
			return state
		const data = data || (response.data || response)
		switch (type) {
			case setType:
				const key = mapActionToKey(action)
				return {
					...state, 
					[key]: data
				}
			case resetAllType:
				return {}
			default:
				return state
		}
	}
}

// For the "entitiesBuffered" request actions.
// If "ineffective" returns state.
// If the method is "DELETE" removes corresponding objects 
// from the "entitiesBuffered" by keys.
// If the methods are "PUT" or "PATCH" merges the data by the data id 
// to the "entitiesBuffered".
// If the methods are "GET" or "POST" returns the previous "state".
export const fetchRequest = (state, action) => {
	const {
		method, 
		data, 
		ineffective
	} = action
	if (ineffective)
		return state
	switch (method) {
		case "DELETE":
			return removeFromAnObject(state, data)
		case "PUT":
		case "PATCH":
			// If the data is the object.
			if (data.ID) 
				return {
					...state, 
					[data.ID]: {
						...state[data.ID], 
						...data
					}
				}
			// If the data is the envelop of the datas.
			let obj = {...state}
			Object.values(data).forEach(v => {
				obj = {
					...obj, 
					[v.ID]: {
						...obj[v.ID], 
						...v
					}
				}
			})
			return obj
		case "POST":
		default:
			return state
	}
}

// For the "entities" success actions.
// If "ineffective" returns state.
// If the method is "DELETE" removes corresponding objects from the "entities" by the keys.
// If the methods are "PUT" or "PATCH" and the response status code is "204" 
// replaces the "entities" with the "entitiesBuffered".
// If the methods are "GET" or "POST" and the response status code is "204" 
// returns the previous "state".
export const fetchSuccessEntities = (state, action) => {
	const {
		method, 
		data, 
		ineffective
	} = action
	if (ineffective)
		return state
	switch (method) {
		case "DELETE":
			return removeFromAnObject(state, data)
		default:
			return fetchSuccess(state, action)
	}
}

// By array items or object keys.
// TYPE OF ARRAY IS OLSO OBJECT !!!!!
export const removeFromAnObject = (state, data) => {
	let newState = {}
	Object.entries(state).forEach(([k, v]) => {
		if (Array.isArray(data)) {
			if (data.indexOf(k) === -1)
				newState[k] = v
		} else {
			if (data.ID) {
				if (data.ID !== k)
					newState[k] = v
			} else {
				// If the data is the envelop of the datas.
				if (!data.hasOwnProperty(k))
					newState[k] = v
			}
		}
	})
	return newState
}

// For the "entities" and the "entitiesBuffered" success actions.
// If "ineffective" returns state.
// If the method is "DELETE" returns the previous state for the "entitiesBuffered".
// If the methods are "PUT" or "PATCH" and the response status code is "204" 
// replaces the "entities" with the "entitiesBuffered" 
// and overwrites the "entitiesBuffered".
// If the methods are "GET" or "POST" and the response status code is "204" 
// returns the previous "state".
// Otherwise, merges the response to the state and returns the created object.
export const fetchSuccess = (state, action) => {
	const {
		method, 
		responseStatus, 
		response, 
		data, 
		ineffective
	} = action
	if (ineffective || method === "DELETE")
		return state
	switch (responseStatus) {
		case 204:
			switch (method) {
				case "PUT":
				case "PATCH":
					return {...data}
				case "POST":
				default:
					return state
			}
		default:
			const data = response.data || response
			switch (method) {
				case "PUT":
				case "PATCH":
					if (data.ID) 
						return {
							...state, 
							[data.ID]: {
								...state[data.ID], 
								...data
							}
						}
					// If the data is the envelop of the datas.
					let obj = {...state}
					Object.values(data).forEach(v => {
						obj = {
							...obj, 
							[v.ID]: {
								...obj[v.ID], 
								...v
							}
						}
					})
					return obj
				case "POST":
				default:
					let obj = {...state}
					if (data.ID) {
						if (obj.hasOwnProperty(data.ID)) {
							// For "contexts" "value" update 
							// after language change.
							obj[data.ID] = {
								...obj[data.ID], 
								...data
							}
						} else {
							obj[data.ID] = data
						}
					} else {
						// If the data is the envelop of the datas.
						Object.values(data).forEach(v => {
							if (obj.hasOwnProperty(v.ID)) {
								// For "contexts" "value" update 
								// after language change.
								obj[v.ID] = {
									...obj[v.ID], 
									...v
								}
							} else {
								obj[v.ID] = v
							}
						})
					}
					return obj
			}
	}
}

// For the "entitiesBuffered" failure actions.
// If "ineffective" returns state.
// If the method is "DELETE" merges the data that created by the deleted object's keys 
// from the "entities" to the state.
// If the methods are "PUT" or "PATCH" replaces the "entitiesBuffered" with 
// the "entities".
// If the methods are "GET" or "POST" returns the previous "state".
export const fetchFailure = (state, action) => {
	const { 
		method, 
		data, 
		ineffective
	} = action
	if (ineffective) 
		return state
	switch (method) {
		case "DELETE":
			return {...state, ...data}
		case "PUT":
		case "PATCH":
			return {...data}
		case "POST":
		default:
			return state
	}
}

// Used to reset "contexts" and "contextsBuffered".
export const resetAnObject = () => {}

// Two functions below are used with "contexts", "languagages" and "pages".
export const resetAnArrayOrAnObject = (state, action) => {
	if (action.method === "DELETE" || action.method === "POST")
		return Array.isArray(state) ? [] : {}
	return state
}

export const addToOrRemoveFromAnArray = (state, action) => {
	if (state.indexOf(action.ID) === -1)
		return [...state, action.ID]
	let array = []
	for (let v of state) {
		if (v !== action.ID)
			array.push(v)
	}
	return array
}

// Removes an object by an object ID or a key from a container object.
export const removeFromAnObjectByKey = (state, action) => {
	let newState = {}
	if (action.data)
		Object.entries(state).forEach(([k, v]) => {
			if (k !== action.data.ID)
				newState[k] = v
		})
	// If action has a key.
	Object.entries(state).forEach(([k, v]) => {
		if (k !== action.key)
			newState[k] = v
	})
	return newState
}

export const addAValueToAnObjectByKey = (state, action) => {
	const {
		key, 
		value
	} = action
	return {
		...state, 
		[key]: {
			...state[key], 
			value
		}
	}
}

export const removeAValueFromAnObjectByKey = (state, action) => {
	const {
		key, 
		value
	} = action
	let array = []
	state[key].forEach(v => {
		if (v !== value)
			array.push(v)
	})
	return {
		...state, 
		[key]: array
	}
}

export const setIntoAnObjectWithKey = (state, action) => {
	return {
		...state, 
		...action.data
	}
}

export const updateAnObject = (oldObject, newValues) => {
	// Encapsulate the idea of passing a new object as the first parameter
	// to Object.assign to ensure we correctly copy data instead of mutating
	return Object.assign({}, oldObject, newValues);
}

export const updateAnItemInAnArray = (array, itemId, updateItemCallback) => {
	const updatedItems = array.map(item => {
		if (item.id !== itemId) {
			// Since we only want to update one item, 
			// preserve all others as they are now
			return item;
		}
		// Use the provided callback to create an updated item
		const updatedItem = updateItemCallback(item);
		return updatedItem;
	});
	return updatedItems;
}

/* const newTodos = updateItemInArray(
	state.todos, 
	action.id, 
	todo => {
		return updateObject(todo, {completed : !todo.completed})
	}
) */
