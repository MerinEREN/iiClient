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
				if (method === "DELETE") {
					var countAfterDelete = removeItemsFromArray(state.IDs, response.result)
				}
				return method === "GET" ? 
					{
						...state,
						// IDs: union(state.IDs, response.result),
						IDs: [...state.IDs, ...Object.keys(response.result)], 
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
						IDs: method === "PUT" ? 
						state.IDs :
						(
							method === "DELETE" ?
							countAfterDelete : 
							Object.keys(response.result)
						), 
						nextPageURL: response.nextPageURL || 
						state.nextPageURL, 
						prevPageURL: response.prevPageURL || 
						state.prevPageURL,
						pageCount: method === "PUT" ? 
						state.pageCount : 
						(
							method === "DELETE" ? 
							(
								countAfterDelete.length % 20 ? 
								Math.floor(countAfterDelete.length / 20) + 1 : 
								countAfterDelete.length / 20
							) : 
							(
								Object.keys(response.result).length % 20 ? 
								Math.floor(Object.keys(response.result).length / 20) + 1 : 
								Object.keys(response.result).length / 20
							)
						), 
						isFetching: false
						// didInvalidate: response.reset
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

const removeItemsFromArray = (array1, array2) => {
	var array = []
	console.log(array1, array2)
	array1.forEach(v => {
		if (array2.indexOf(v) === -1)
			array.push(v)
	})
	return array
}

export const addDynamicKeyReturnResult = ({types, mapActionToKey}) => {
	if (!Array.isArray(types) || types.length !== 1) {
		throw new Error("Expected types to be an array of one elements.")
	}
	if (!types.every(t => typeof t === "string")) {
		throw new Error("Expected types to be strings.")
	}
	if (typeof mapActionToKey !== "function") {
		throw new Error("Expected mapActionToKey to be a function.")
	}

	const [setType] = types

	const updateState = (state, action) => {
		switch (action.type) {
			case setType:
				return action.response.result
			default:
				return state
		}
	}
	return (state = {}, action) => {
		switch (action.type) {
			case setType:
				const key = mapActionToKey(action)
				return {
					...state, 
					[key]: updateState(state[key], action)
				}
			default:
				return state
		}
	}
}

export const mergeIntoOrRemoveFromObjectRequest = (state, action) => {
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

export const removeFromObjectIfDeleteOrMergeIntoOrResetObject = (state, action) => {
	switch (action.method) {
		case "DELETE":
			return removeFromObject(state, action)
		default:
			return mergeIntoOrResetObject(state, action)
	}
}

// "reset" is for search GET.
export const mergeIntoOrResetObject = (state, action) => {
	const {
		method, 
		response: {
			result, 
			reset
		},
		mergeIntoState
	} = action
	if (mergeIntoState) // If PUT request returns data merge it.
		return {...state, ...result}
	if (method === "DELETE")
		return state
	if (method !== "GET" || reset)
		return entitiesReset(action)
	return result ? {...state, ...result} : state
}

// By array items or object keys.
// TYPE OF ARRAY IS OLSO OBJECT !!!!!
const removeFromObject = (state, action) => {
	let newState = {}
	Object.entries(state).forEach(([k, v]) => {
		if (Array.isArray(action.response.result)) {
			if (action.response.result.indexOf(k) === -1)
				newState[k] = v
		} else {
			if (!action.response.result.hasOwnProperty(k))
				newState[k] = v
		}
	})
	return newState
}

export const removeByKeyFromObject = (state, action) => {
	let newState = {}
	Object.entries(state).forEach(([k, v]) => {
			if (action.key !== k)
				newState[k] = v
	})
	return newState
}

export const addByKeyToObject = (state, action) => {
	return {...state, ...action.object}
}

const entitiesReset = (action) => action.response.result

export const fetchFailure = (state, action) => {
	switch (action.method) {
		case "DELETE":
			// Merge deleted objects back to the entitiesBuffered kind.
			return {...state, ...action.response.result}
		case "POST":
		case "PUT":
			// Replace entitiesBuffered kind with entities kind.
			return action.response.result
		default:
			// GET request
			return state
	}
}

export const resetArrayOrObject = (state, action) => {
	if (action.method === "DELETE" || action.method === "POST")
		return Array.isArray(state) ? [] : {}
	return state
}
export const addToOrRemoveFromArray = (state, action) => {
	if (state.indexOf(action.ID) === -1)
		return [...state, action.ID]
	let array = []
	for (let v of state) {
		if (v !== action.ID)
			array.push(v)
	}
	return array
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
