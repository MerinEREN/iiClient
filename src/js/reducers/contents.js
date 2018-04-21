import createReducer, {
	paginate, 
	mergeIntoOrRemoveFromObjectRequest, 
	mergeIntoOrResetObject, 
	entitiesBufferedReset,
	addToOrRemoveFromArray, 
	resetArrayOrObject
} from './utilities'
import {contentUpdate} from './content'
import {
	CONTENTS_REQUEST, 
	CONTENTS_SUCCESS, 
	CONTENTS_FAILURE, 
	CONTENT_UPDATE, 
	CONTENTIDS_SELECTED_ADD_REMOVE
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
		CONTENTS_REQUEST: mergeIntoOrRemoveFromObjectRequest, 
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
export const contentIDsSelected = createReducer([],   
	{
		CONTENTS_SUCCESS: resetArrayOrObject, 
		CONTENTIDS_SELECTED_ADD_REMOVE: addToOrRemoveFromArray
	}
)

export default contents
