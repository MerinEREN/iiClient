import makeActionCreator from "./creator"
import {
	DEMANDS_REQUEST, 
	DEMANDS_SUCCESS, 
	DEMANDS_FAILURE
} from "./types"

// Action Creators
export const demandsRequest = makeActionCreator(
	DEMANDS_REQUEST
)
export const demandsSuccess = makeActionCreator(
	DEMANDS_SUCCESS
)
export const demandsFailure = makeActionCreator(
	DEMANDS_FAILURE
)
