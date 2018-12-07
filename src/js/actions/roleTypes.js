import makeActionCreator from "./creator"
import {
	ROLETYPES_REQUEST, 
	ROLETYPES_SUCCESS, 
	ROLETYPES_FAILURE, 
	ROLETYPEIDS_SELECTED_RESET
} from "./types"

// Action Creators
export const roleTypesRequest = makeActionCreator(
	ROLETYPES_REQUEST
)
export const roleTypesSuccess = makeActionCreator(
	ROLETYPES_SUCCESS
)
export const roleTypesFailure = makeActionCreator(
	ROLETYPES_FAILURE
)
export const roleTypeIDsSelectedReset = makeActionCreator(
	ROLETYPEIDS_SELECTED_RESET, 
	"value"
)
