// import union from "lodash/union"

// Returns slice reducer for given action type/function pairs in handlers
export default function createReducer(initialState, handlers) {
	return function reducer(state = initialState, action) {
		if(handlers.hasOwnProperty(action.type))
			return handlers[action.type](state, action)
		return state
	}
}

// Creates a reducer managing pagination, given the action types to handle,
// and a function telling how to extract the key from an action.
export const paginate = ({types, mapActionToKey}) => {
	if (!Array.isArray(types) || types.length !== 3) {
		throw new Error("Expected types to be an array of three elements.")
	}
	if (!types.every(t => typeof t === "string")) {
		throw new Error("Expected types to be strings.")
	}
	/* if (typeof mapActionToKey !== "function") {
		throw new Error("Expected mapActionToKey to be a function.")
	} */

	const [requestType, successType, failureType] = types

	const updatePagination = (state = {
		value: null, 
		IDs: [],
		nextPageURL: null,
		prevPageURL: null,
		pageCount: 0,
		// error: false, 
		isFetching: false,
		didInvalidate: true
	}, action) => {
		const {
			type, 
			method, 
			response, 
			didInvalidate
		} = action
		switch (type) {
			case requestType:
				return {
					...state,
					isFetching: true
				}
			case successType:
				return method === "GET" ? 
					{
						...state,
						// For counts only.
						value: typeof response.result !== "object" ? 
						response.result :
						null, 
						// IDs: union(state.IDs, response.result),
						IDs: typeof response.result !== "object" ? 
						state.IDs : 
						pushIntoArrayIfNotPresent(
							state.IDs, 
							action.response.result
						), 
						nextPageURL: response.nextPageURL || 
						state.nextPageURL, 
						prevPageURL: response.prevPageURL || 
						state.prevPageURL,
						pageCount: Object.keys(response.result).length ?
						state.pageCount + 1 : 
						state.pageCount, 
						isFetching: false, 
						didInvalidate: typeof didInvalidate === 
						"undefined"
					} : 
					{
						...state,
						IDs: Object.keys(response.result), 
						nextPageURL: response.nextPageURL || 
						state.nextPageURL, 
						prevPageURL: response.prevPageURL || 
						state.prevPageURL,
						pageCount: response.reset ? 
						1 : 
						(Object.keys(response.result).length - 1) / 10, 
						isFetching: false
						// didInvalidate: response.reset ? 
						// true : false
					}
			case failureType:
				return {
					...state,
					isFetching: false
				}
			default:
				return state
		}
	}
	// USE action.receivedAt !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	return (state = {}, action) => {
		switch (action.type) {
			case requestType:
			case successType:
			case failureType:
				const key = mapActionToKey(action)
				return {
					...state,
					[key]: updatePagination(state[key], action)
				}
			default:
				return state
		}
	}
}

export const addDynamicKeySetResetResetAll = ({types, mapActionToKey}) => {
	if (!Array.isArray(types) || types.length !== 3) {
		throw new Error("Expected types to be an array of two elements.")
	}
	if (!types.every(t => typeof t === "string")) {
		throw new Error("Expected types to be strings.")
	}
	if (typeof mapActionToKey !== "function") {
		throw new Error("Expected mapActionToKey to be a function.")
	}

	const [setType, resetType, resetAllType] = types

	const updateState = (state, action) => {
		switch (action.type) {
			case setType:
				return true
			case resetType:
				return false
			default:
				return state
		}
	}
	return (state = {}, action) => {
		switch (action.type) {
			case setType:
			case resetType:
				const key = mapActionToKey(action)
				return {
					...state, 
					[key]: updateState(state[key], action)
				}
			case resetAllType:
				return {}
			default:
				return state
		}
	}
}

const pushIntoArrayIfNotPresent = (array, obj) => {
	let IDs = []
	Object.keys(obj).forEach(v => {
		if (array.indexOf(v) === -1)
			IDs.push(v)
	})
	return [...array, ...IDs]
}

// COULD BE USED EXTERNALLY !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
/* export const removeFromArray = (IDs, action) => {
	// return [
	//...state.slice(0, action.ID.index),
	//...state.slice(action.ID.index + 1)
	// ]
	// return state.filter( (item, index) => index !== action.response.result.ID.index)
	const {result} = action.response
	if (!result)
		return IDs
	let map = []
	for (let id of IDs) {
		if (!result.hasOwnProperty(id))
			map.push(id)
	}
	return map
} */

export const mergeIntoOrRemoveFromObjectFetch = (state, action) => {
	const {
		method, 
		response: {
			result
		}
	} = action
	if (method === "DELETE")
		return removeFromObject(state, action)
	return result ? {...state, ...result} : state
}

export const mergeIntoOrResetObject = (state, action) => {
	const {
		method, 
		response: {
			result
		}
	} = action
	if (action.method !== "GET")
		return entitiesReset(action)
	// NESTED VALUES WILL CAUSE PROBLEMS FOR GET SUCCESS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	return result ? {...state, ...result} : state
}

const removeFromObject = (state, action) => {
	let newState = {}
	Object.entries(state).forEach(([k, v]) => {
		if(!action.response.result.hasOwnProperty(k))
			newState[k] = v
	})
	return newState
}

const entitiesReset = (action) => action.response.result

export const entitiesBufferedReset = (state, action) => action.method === "GET" ? 
	state : 
	action.response.result

export const mergeIntoOrRemoveFromObject = (state, action) => {
	const {obj} = action
	let hasOwnProperty = true
	let newState = {}
	Object.entries(obj).forEach(([k, v]) => {
		if(!state.hasOwnProperty(k)) {
			newState[k] = v
			hasOwnProperty = false
		}
	})
	if (!hasOwnProperty)
		return {...state, ...newState}
	Object.entries(state).forEach(([k, v]) => {
		if(!obj.hasOwnProperty(k))
			newState[k] = v
	})
	return newState
}

export const resetObject = (state, action) => {
	if (action.method === "DELETE" || action.method === "POST")
		return {}
	return state
}

export const updateObject = (oldObject, newValues) => {
	// Encapsulate the idea of passing a new object as the first parameter
	// to Object.assign to ensure we correctly copy data instead of mutating
	return Object.assign({}, oldObject, newValues);
}

export const updateItemInArray = (array, itemId, updateItemCallback) => {
	const updatedItems = array.map(item => {
		if(item.id !== itemId) {
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
