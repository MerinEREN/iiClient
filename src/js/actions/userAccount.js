import makeActionCreator from "./creator"
import {
	USER_ACCOUNT_SUCCESS
} from "./types"

// Action Creators
export const userAccountSuccess = makeActionCreator(
	USER_ACCOUNT_SUCCESS
)
