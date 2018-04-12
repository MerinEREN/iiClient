import createReducer, {
	paginate, 
	mergeIntoOrRemoveFromObjectFailure
} from './utilities'
import {
	USERS_REQUEST,
	USERS_SUCCESS,
	USERS_FAILURE,
	USER_ACCOUNT_SUCCESS
} from '../actions/types'

// Case Reducers
function mergeByID(state, action) {
	const {result} = action.response
	if(result.user) 
		return {...state, ...result.user}
	return {...state, ...result}
}

// Slice Reducers
const users = createReducer(
	{}, 
	{
		USER_ACCOUNT_SUCCESS: mergeByID, 
		USERS_SUCCESS: mergeByID, 
		USERS_FAILURE: mergeIntoOrRemoveFromObjectFailure
	}
)
export const usersFetched = createReducer(
	{}, 
	{
		USER_ACCOUNT_SUCCESS: mergeByID, 
		USERS_SUCCESS: mergeByID
	}
)
export const paginationUsers = paginate({
	mapActionToKey: action => action.groupID, 
	types: [
		USERS_REQUEST, 
		USERS_SUCCESS, 
		USERS_FAILURE
	]
})

export default users

/* import {combineReducers} from 'redux'
import createReducer from './utilities'
import {
	REQUEST_USERS_DATA,
	RECEIVE_USERS_DATA_SUCCESS,
	RECEIVE_USERS_DATA_ERROR
} from '../actions/types'

// Case Reducers
function requestUsersData(state, action) {
	return {
		...state,
		isFetching: true
	}
}
function receiveUsersDataSuccess(state, action) {
	let u = {}
	u[action.data.user.UUID] = action.data.user
	return {
		...state,
		isFetching: false,
		didInvalidate: false,
		items: u,
		error: false,
		lastUpdated: action.receivedAt
	}
}
function receiveUsersDataError(state, action) {
	return {
		...state,
		isFetching: false,
		didInvalidate: true,
		error: action.error,
		lastUpdated: action.receivedAt
	}
}
function pushUser(state, action) {
	return [...state, action.data.user.UUIDs]
}

// Slice Reducers
const byID = createReducer(
	{
		isFetching: false,
		didInvalidate: true,
		items: {},
		error: false,
		lastUpdated: null
	}, 
	{
		REQUEST_USERS_DATA: requestUsersData,
		RECEIVE_USERS_DATA_SUCCESS: receiveUsersDataSuccess,
		RECEIVE_USERS_DATA_ERROR: receiveUsersDataError
	}
)
const allIDs = createReducer(
	[], 
	{
		RECEIVE_USERS_DATA_SUCCESS: pushUser
	}
) */
