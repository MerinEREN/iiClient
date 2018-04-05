import createReducer, {
	paginate, 
	mergeIntoOrRemoveFromObjectSuccess, 
	mergeIntoOrRemoveFromObjectFailure, 
	mergeIntoOrRemoveFromObject
} from './utilities'
import {contentUpdate} from './content'
import {
	CONTENTS_REQUEST, 
	CONTENTS_SUCCESS, 
	CONTENTS_FAILURE, 
	CONTENT_UPDATE, 
	CONTENTS_SELECTED_ADD_REMOVE
} from '../actions/types'

const contents = createReducer(
	{}, 
	{
		CONTENTS_SUCCESS: mergeIntoOrRemoveFromObjectSuccess, 
		CONTENTS_FAILURE: mergeIntoOrRemoveFromObjectFailure, 
		CONTENT_UPDATE: contentUpdate
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

export const contentsSelected = createReducer( {},  
	{
		CONTENTS_SELECTED_ADD_REMOVE: mergeIntoOrRemoveFromObject
	}
)

export default contents
