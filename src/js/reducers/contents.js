import {combineReducers} from 'redux'
import createReducer, {
	paginate, 
	mergeObjectIntoObject, 
	pushIDs, 
	removeFromObject, 
	removeFromArray
} from './utilities'
import {
	CONTENTS_REQUEST, 
	CONTENTS_SUCCESS, 
	CONTENTS_FAILURE
} from '../actions/types'

// Slice Reducers
const byID = createReducer(
	{}, 
	{
		CONTENTS_SUCCESS: mergeObjectIntoObject, 
		CONTENTS_FAILURE: removeFromObject
	}
)
const allIDs = createReducer(
	[], 
	{
		CONTENTS_SUCCESS: pushIDs,
		CONTENTS_FAILURE: removeFromArray
	}
)
export const paginationContents = paginate({
	mapActionToKey: action => action.groupID, 
	types: [
		CONTENTS_REQUEST, 
		CONTENTS_SUCCESS, 
		CONTENTS_FAILURE
	]
})

// Higher-Order Reducer
const contents = combineReducers({
	byID,
	allIDs
})

export default contents


