import {combineReducers} from 'redux'
import createReducer from './utilities'
import {ADD_NEW_TODO, EDIT_TODO, REMOVE_TODO, SAVE_TODO} from '../actions/types'

// Set initial state
const initialByIdState = {
	0: {id: 0, children: 'merin', editable: false}, 
	1: {id: 1, children: 'eren', editable: false}
}
const initialAllIdsState = [0, 1]
let allIdsLength = initialAllIdsState.length

// Utilitiy Functions
/* function updateObject(oldObj, newVals) {
	return Object.assign({}, oldObj, newVals)
}

function updateItemInArray(array, itemId, updateItemCallback) {
	const updatedArray = array.map(item => {
		if(item.id !== itemId) {
			return item
		}
		const updatedItem = updateItemCallback(item)
		return updatedItem
	})
	return updatedArray
} */

// Business Logic Functions
function addTodo() {
	return {
		id: allIdsLength,
		children: 'New ToDo No: ' + allIdsLength++,
		editable: false
	}

}
function editTodo(state) {
	return {...state, editable: true}
}
function saveTodo(state, action) {
	const {text} = action
	return {...state, children: text, editable: false}
}
const toDo = createReducer({}, {
	ADD_NEW_TODO: addTodo,
	EDIT_TODO: editTodo,
	SAVE_TODO: saveTodo
})

// Case Reducers
function addTodoEntry(state, action) {
	return {
		...state,
		[allIdsLength]: toDo(state, action)
	}
}
function editTodoEntry(state, action) {
	return {
		...state,
		[action.id]: toDo(state[action.id], action)
	}
}
function removeTodoEntry(state, action) {
	// delete state[action.id]
	let updatedState = {}
	Object.keys(state).map(function(key) {
		if(key != action.id) 
			updatedState[key] = state[key]
	})
	return updatedState
}
function saveTodoEntry(state, action) {
	return {
		...state,
		[action.id]: toDo(state[action.id], action)
	}
}
function addTodoId(state, action) {
	return [
		...state,
		action.id
	]
}
function removeTodoId(state, action) {
	const i = state.indexOf(action.id)
	return [
		...state.slice(0, i),
		...state.slice(i + 1)
	]

	/* let newState = state.slice()
	newState.splice(i, 1)
	return newState */
	
	// return state.filter((item.id) => item !== i)
}

// Slice Reducer
const byId = createReducer(initialByIdState, {
	ADD_NEW_TODO: addTodoEntry,
	EDIT_TODO: editTodoEntry,
	REMOVE_TODO: removeTodoEntry,
	SAVE_TODO: saveTodoEntry
})
const allIds = createReducer(initialAllIdsState, {
	ADD_NEW_TODO: addTodoId,
	Remove_TODO: removeTodoId
})

// Higher-Order Reducer
const timelineReducer = combineReducers({
	byId,
	allIds
})
export default timelineReducer

// RETURN HAS TO HAVE A INITIAL VALUE, OTHERWISE IT THROWS AN ERROR
/* const ToDo = (state={}, action) => {
	switch(action.type) {

		case ADD_NEW_TODO:
			return {
				id: allIdsLength,
				children: 'New ToDo No: ' + allIdsLength++,
				editable: false
			}
		case EDIT_TODO:
			return {...state, editable: true}
		case SAVE_TODO:
			return {...state, children: action.text, editable: false}
		default:
			return state
	}
} */

