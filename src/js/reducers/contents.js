import createReducer, {
	paginate, 
	mergeIntoOrRemoveFromObjectSuccess, 
	mergeIntoOrRemoveFromObjectFailure
} from './utilities'
import {
	CONTENTS_REQUEST, 
	CONTENTS_SUCCESS, 
	CONTENTS_FAILURE
} from '../actions/types'

const contents = createReducer(
	{}, 
	{
		CONTENTS_SUCCESS: mergeIntoOrRemoveFromObjectSuccess, 
		CONTENTS_FAILURE: mergeIntoOrRemoveFromObjectFailure
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

export default contents
