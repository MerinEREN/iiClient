import createReducer, {
	paginate, 
	mergeIntoOrRemoveFromObjectFetch, 
	mergeIntoOrResetObject, 
	entitiesBufferedReset,
	mergeIntoOrRemoveFromObject, 
	resetObject
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
		CONTENTS_SUCCESS: mergeIntoOrResetObject
	}
)
export const contentsBuffered = createReducer(
	{}, 
	{
		CONTENTS_REQUEST: mergeIntoOrRemoveFromObjectFetch, 
		CONTENTS_SUCCESS: mergeIntoOrResetObject, 
		CONTENTS_FAILURE: entitiesBufferedReset, 
		CONTENT_UPDATE: contentUpdate
	}
)
export const paginationContents = paginate({
	mapActionToKey: action => action.key, 
	types: [
		CONTENTS_REQUEST, 
		CONTENTS_SUCCESS, 
		CONTENTS_FAILURE
	]
})
export const contentsSelected = createReducer( {},  
	{
		CONTENTS_SUCCESS: resetObject, 
		CONTENTS_SELECTED_ADD_REMOVE: mergeIntoOrRemoveFromObject
	}
)

export default contents
