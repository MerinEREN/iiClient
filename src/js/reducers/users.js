import createReducer, {
	paginate, 
	mergeIntoOrRemoveFromObjectRequest, 
	mergeIntoOrResetObject, 
	entitiesBufferedReset
} from './utilities'
import {
	USERS_REQUEST,
	USERS_SUCCESS,
	USERS_FAILURE
} from '../actions/types'
import user, {userBuffered} from "./user"

// Slice Reducers
const users = createReducer(
	{}, 
	{
		USERS_SUCCESS: mergeIntoOrResetObject, 
		...user
	}
)
export const usersBuffered = createReducer(
	{}, 
	{
		USERS_REQUEST: mergeIntoOrRemoveFromObjectRequest, 
		USERS_SUCCESS: mergeIntoOrResetObject, 
		USERS_FAILURE: entitiesBufferedReset, 
		...userBuffered
	}
)
export const paginationUsers = paginate({
	mapActionToKey: action => action.key, 
	types: [
		USERS_REQUEST, 
		USERS_SUCCESS, 
		USERS_FAILURE
	]
})

export default users
