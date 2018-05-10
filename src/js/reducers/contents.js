import createReducer, {
	paginate, 
	mergeIntoOrRemoveFromObjectRequest, 
	removeFromObjectIfDeleteOrMergeIntoOrResetObject, 
	mergeIntoOrResetObject, 
	fetchFailure,
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
		CONTENTS_SUCCESS: removeFromObjectIfDeleteOrMergeIntoOrResetObject
	}
)
export const contentsBuffered = createReducer(
	{}, 
	{
		CONTENTS_REQUEST: mergeIntoOrRemoveFromObjectRequest, 
		CONTENTS_SUCCESS: mergeIntoOrResetObject, 
		CONTENTS_FAILURE: fetchFailure, 
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
		CONTENTS_REQUEST: resetArrayOrObject, 
		CONTENTIDS_SELECTED_ADD_REMOVE: addToOrRemoveFromArray
	}
)

export default contents
