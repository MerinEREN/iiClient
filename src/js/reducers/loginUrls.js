import {combineReducers} from 'redux'
import createReducer from './utilities'
import {
	LOGIN_URLS_REQUEST,
	LOGIN_URLS_SUCCESS,
	LOGIN_URLS_FAILURE
} from '../actions/types'

// Case Reducers
function loginUrlsRequest(state, action) {
	return {
		...state,
		isFetching: true
	}
}
function loginUrlsSuccess(state, action) {
	return {
		...state,
		isFetching: false,
		didInvalidate: false,
		items: action.response.result,
		error: false,
		lastUpdated: action.receivedAt
	}
}
function loginUrlsFailure(state, action) {
	return {
		...state,
		isFetching: false,
		didInvalidate: true,
		items: {},
		error: action.error,
		lastUpdated: action.receivedAt
	}
}

// Slice Reducer
const loginUrls = createReducer(
	{
		isFetching: false,
		didInvalidate: true,
		items: {},
		error: false,
		lastUpdated: null
	},
	{
		LOGIN_URLS_REQUEST: loginUrlsRequest,
		LOGIN_URLS_SUCCESS: loginUrlsSuccess,
		LOGIN_URLS_FAILURE: loginUrlsFailure
	}
)

export default loginUrls
