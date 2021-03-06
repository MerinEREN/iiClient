import createReducer from "./utilities"
import {
	LOGIN_URLS_SUCCESS
} from "../actions/types"

// Case Reducers
function loginUrlsSuccess(state, action) {
	return action.response.data || action.response
}

// Slice Reducer
const loginUrls = createReducer(
	{},
	{
		LOGIN_URLS_SUCCESS: loginUrlsSuccess
	}
)

export default loginUrls
