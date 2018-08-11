import makeActionCreator from "./creator"
import {
	ACCOUNT_SUCCESS
} from "./types"

// Action Creators
export const accountSuccess = makeActionCreator(
	ACCOUNT_SUCCESS
)
