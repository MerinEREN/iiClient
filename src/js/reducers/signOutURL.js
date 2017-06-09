import createReducer from './utilities'
import {
	SIGN_OUT_URL_REQUEST,
	SIGN_OUT_URL_SUCCESS,
	SIGN_OUT_URL_FAILURE
} from '../actions/types'

// Case Reducers
function signOutURLRequest(state, action) {
	return {
		...state,
		isFetching: true
	}
}
function signOutURLSuccess(state, action) {
	return {
		...state,
		isFetching: false,
		didInvalidate: false,
		value: action.response.result,
		error: false,
		lastUpdated: action.receivedAt
	}
}
function signOutURLFailure(state, action) {
	return {
		...state,
		isFetching: false,
		didInvalidate: true,
		value: null,
		error: action.error,
		lastUpdated: action.receivedAt
	}
}

// Slice Reducer
const signOutURL = createReducer(
	{
		isFetching: false,
		didInvalidate: true,
		value: null,
		error: false,
		lastUpdated: null
	},
	{
		SIGN_OUT_URL_REQUEST: signOutURLRequest,
		SIGN_OUT_URL_SUCCESS: signOutURLSuccess,
		SIGN_OUT_URL_FAILURE: signOutURLFailure
	}
)

export default signOutURL
