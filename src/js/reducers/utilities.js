// import union from 'lodash/union'

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
		throw new Error('Expected types to be an array of three elements.')
	}
	if (!types.every(t => typeof t === 'string')) {
		throw new Error('Expected types to be strings.')
	}
	/* if (typeof mapActionToKey !== 'function') {
		throw new Error('Expected mapActionToKey to be a function.')
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
		const {method, type, response, didInvalidate} = action
		switch (type) {
			case requestType:
				return {
					...state,
					isFetching: true
				}
			case successType:
				// First one is for GET request only.
				return method === "GET"
					? 
					{
						...state,
						// For counts only.
						value: setValue(response.result), 
						// IDs: union(state.IDs, response.result),
						IDs: mergeKeysIntoArray(
							state.IDs, 
							response.result
						), 
						nextPageURL: response.nextPageURL,
						prevPageURL: response.prevPageURL,
						pageCount: state.pageCount + 1, 
						isFetching: false, 
						didInvalidate: typeof didInvalidate === "undefined"
					}
					: 
					{
						...state,
						IDs: method !== "DELETE" 
						? 
						mergeKeysIntoArray(
							state.IDs, 
							response.result
						)
						:
						removeFromArray(state.IDs, action)
					}
			case failureType:
				// return !response 
				return method === "GET"
					?
					{
						...state,
						isFetching: false
					}
					:
					{
						...state,
						IDs: method === "DELETE" 
						? 
						mergeKeysIntoArray(
							state.IDs, 
							response.result
						)
						:
						removeFromArray(state.IDs, action)
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

function setValue(r){
	return typeof r === "object" ? null : r
}

const mergeKeysIntoArray = (IDs, result) => {
	// if (!result)
	if (typeof result !== "object")
		return IDs
	// const IDs = Object.keys(o).map(k => k)
	// return [...a, ...IDs]
	Object.keys(result).forEach(k => {
		if(IDs.indexOf(k) === -1)
			IDs.push(k)
	})
	return IDs
}

export const removeFromArray = (IDs, action) => {
	/* return [
		...state.slice(0, action.ID.index),
		...state.slice(action.ID.index + 1)
	] */
	// return state.filter( (item, index) => index !== action.response.result.ID.index)
	const {result} = action.response
	if (!result)
		return IDs
	let map = []
	for(let id of IDs) {
		if(!result.hasOwnProperty(id))
			map.push(id)
	}
	return map
}

export const mergeIntoOrRemoveFromObjectSuccess = (state, action) => {
	if(action.method === "DELETE")
		return removeFromObject(state, action)
	return mergeObjectIntoObject(state, action)
}

export const mergeIntoOrRemoveFromObjectFailure = (state, action) => {
	if(action.method === "DELETE")
		return mergeObjectIntoObject(state, action)
	return removeFromObject(state, action)
}


const mergeObjectIntoObject = (state, action) => {
	return {...state, ...action.response.result}
}

const removeFromObject = (state, action) => {
	const {result} = action.response
	if (!result) // for GET method
		return state
	let newState = {}
	Object.entries(state).forEach(([k, v]) => {
		if(!result.hasOwnProperty(k))
			newState[k] = v
	})
	return newState
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
