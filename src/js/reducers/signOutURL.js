import createReducer from "./utilities"
import {
	SIGN_OUT_URL_SUCCESS
} from "../actions/types"

// Case Reducers
function signOutURLSuccess(state, action) {
	return action.response.result
}

// Slice Reducer
const signOutURL = createReducer("", 
	{
		SIGN_OUT_URL_SUCCESS: signOutURLSuccess
	}
)

export default signOutURL
