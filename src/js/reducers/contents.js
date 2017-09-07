import createReducer, {
	paginate, 
	mergeIntoOrRemoveFromObject
} from './utilities'
import {
	CONTENTS_REQUEST, 
	CONTENTS_SUCCESS, 
	CONTENTS_FAILURE
} from '../actions/types'

const contents = createReducer(
	{}, 
	{
		CONTENTS_SUCCESS: mergeIntoOrRemoveFromObject, 
		CONTENTS_FAILURE: mergeIntoOrRemoveFromObject
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
