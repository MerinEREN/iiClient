import createReducer, {
	removeFromObjectIfDeleteOrMergeIntoOrResetObject, 
	mergeIntoOrResetObject
} from "./utilities"
import {
	USER_LOGGED_SUCCESS
} from "../actions/types"

const userLogged = createReducer(
	{}, 
	{
		USER_LOGGED_SUCCESS: removeFromObjectIfDeleteOrMergeIntoOrResetObject
	}
)
export const userLoggedBuffered = createReducer(
	{}, 
	{
		USER_LOGGED_SUCCESS: mergeIntoOrResetObject
	}
)

export default userLogged
