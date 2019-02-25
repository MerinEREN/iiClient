// import union from "lodash/union"

// Returns slice reducer for given action type/function pairs in handlers
export default function createReducer(initialState, handlers) {
	return function reducer(state = initialState, action) {
		if (handlers.hasOwnProperty(action.type))
			return handlers[action.type](state, action)
		return state
	}
}

// Creates a reducer managing pagination and fetching control, given the action types 
// to handle,
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
						IDs: response.reset ? 
						[...Object.keys(response.result)] : 
						[...state.IDs, ...Object.keys(response.result)], 
						nextPageURL: response.nextPageURL || 
						state.nextPageURL, 
						prevPageURL: response.prevPageURL || 
						state.prevPageURL,
						pageCount: response.reset ? 
						1 : 
						Object.keys(response.result).length && 
						state.pageCount + 1, 
						isFetching: false, 
						didInvalidate: typeof didInvalidate === 
						"undefined"
					} : 
					{
						...state,
						IDs: method !== "PUT" && 
						(
							method === "DELETE" ?
							countAfterDelete : 
							Object.keys(response.result)
						), 
						nextPageURL: response.nextPageURL || 
						state.nextPageURL, 
						prevPageURL: response.prevPageURL || 
						state.prevPageURL,
						pageCount: method !== "PUT" && 
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
	// console.log(array1, array2)
	array1.forEach(v => {
		if (array2.indexOf(v) === -1)
			array.push(v)
	})
	return array
}

export const addDynamicKeyReturnResult = ({types, mapActionToKey}) => {
	// console.log(types, types.length)
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
		switch (action.type) {
			case setType:
				const key = mapActionToKey(action)
				return {
					...state, 
					[key]: action.response.result
				}
			case resetAllType:
				return {}
			default:
				return state
		}
	}
}

// If the result is an obeject merge it into state, 
// if it is an array of keys generate the necessary object than merge it into state.
export const mergeIntoOrRemoveFromObject = (state, action) => {
	const {
		method, 
		stateSlice, 
		key, 
		response: {
			result
		}
	} = action
	if (method === "DELETE")
		return removeFromAnObject(state, action)
	if (key != "all")
		return result ? (
			Array.isArray(result) ? 
			{
				...state, 
				[key]: {
					...state[key], 
					...resultByKeys(stateSlice, result)
				}
			} : 
			{
				...state, 
				[key]: {
					...state[key], 
					...result
				}
			}
		) : 
			state
	return result ? (
		Array.isArray(result) ? 
		{...state, ...resultByKeys(stateSlice, result)} : 
		{...state, ...result}
	) : state
}

const resultByKeys = (kind, keys) => {
	let result = {}
	keys.forEach(v => result[v] = kind[v])
	return result
}

export const removeFromObjectIfDeleteOrMergeIntoOrResetObject = (state, action) => {
	switch (action.method) {
		case "DELETE":
			return removeFromAnObject(state, action)
		default:
			return mergeIntoOrResetObject(state, action)
	}
}

// "reset" is the response flag to reset the kind for search GET.
export const mergeIntoOrResetObject = (state, action) => {
	const {
		method, 
		response: {
			result, 
			reset
		},
		key, 
		mergeIntoState
	} = action
	if (method === "DELETE")
		return state
	if (key != "all") {
		// If PUT request returns data merge it.
		if (mergeIntoState) {
			return {
				...state, 
				[key]: {
					...state[key], 
					...result
				}
			}
		} else if (method !== "GET" || reset) {
			return entitiesReset(state, action)
		}
		// Merging "GET" results
		return result ? 
			{
				...state, 
				[key]: {
					...state[key], 
					...result
				}
			} : 
			state
	} else {
		// If PUT request returns data merge it.
		if (mergeIntoState) {
			return {...state, ...result}
		} else if (method !== "GET" || reset) {
			return entitiesReset(state, action)
		}
		// Merging "GET" results
		return result ? {...state, ...result} : state
	}
}

// By array items or object keys.
// TYPE OF ARRAY IS OLSO OBJECT !!!!!
const removeFromAnObject = (state, action) => {
	const {
		response: {result}, 
		key
	} = action
	let newState = {}
	if (key != "all") {
		Object.entries(state[key]).forEach(([k, v]) => {
			if (Array.isArray(result)) {
				if (result.indexOf(k) === -1)
					newState[k] = v
			} else {
				if (!result.hasOwnProperty(k))
					newState[k] = v
			}
		})
		return {
			...state, 
			[key]: newState
		}
	}
	Object.entries(state).forEach(([k, v]) => {
		if (Array.isArray(result)) {
			if (result.indexOf(k) === -1)
				newState[k] = v
		} else {
			if (!result.hasOwnProperty(k))
				newState[k] = v
		}
	})
	return newState
}

// Replace entities with entitiesBuffered.
// Also replaces entitiesBuffered with entitiesBuffered but it is not a problem.
const entitiesReset = (state, action) => {
	const {
		response: {result}, 
		key
	} = action
	if (key !== "all") {
		return result ? 
			{
				...state, 
				[key]: result
			} : 
			state
	} else {
		return result ? {...state, ...result} : state
	}
}

export const fetchFailure = (state, action) => {
	const { response: {result}, 
		method, 
		key
	} = action
	switch (method) {
		case "DELETE":
			// Merge deleted objects back to the entitiesBuffered kind.
			if (key != "all")
				return {
					...state, 
					[key]: {
						...state[key], 
						...result
					}
				}
			return {...state, ...result}
		case "POST":
		case "PUT":
			// Replace entitiesBuffered kind with entities kind.
			return result
		default:
			// GET request
			return state
	}
}

export const resetReducer = (state, action) => action.value

export const resetReducerPartially = (state, {key}) => {
	return {
		...state, 
		[key]: Array.isArray(state[key]) ? [] : {}
	}
}

export const setReducerPartially = (state, {key, value}) => {
	return {
		...state, 
		[key]: value
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

// Inserts an object into another object by it's key or removes if it is present.
export const addToOrRemoveFromAnObject = (state, action) => {
	if (state.hasOwnProperty(action.object.ID))
		return removeByKeyFromAnObject(state, action)
	return addByKeyToAnObject(state, action)
}

// Two functions below are using for adding and removing snackbar.
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

// Removes an object by an object ID or a key from a container object.
export const removeByKeyFromAnObject = (state, action) => {
	let newState = {}
	if (action.object)
		Object.entries(state).forEach(([k, v]) => {
			if (k !== action.object.ID)
				newState[k] = v
		})
	// If action has a key.
	Object.entries(state).forEach(([k, v]) => {
		if (k !== action.key)
			newState[k] = v
	})
	return newState
}

const addByKeyToAnObject = (state, action) => {
	return {
		...state, 
		[action.object.ID]: action.object
	}
}

export const updateObject = (oldObject, newValues) => {
	// Encapsulate the idea of passing a new object as the first parameter
	// to Object.assign to ensure we correctly copy data instead of mutating
	return Object.assign({}, oldObject, newValues);
}

export const updateItemInArray = (array, itemId, updateItemCallback) => {
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
