import makeActionCreator from './creator'
import {
	CONTENTS_REQUEST, 
	CONTENTS_SUCCESS, 
	CONTENTS_FAILURE, 
	CONTENTS_SELECTED_ADD_REMOVE
} from './types'

// Action Creators
export const contentsRequest = makeActionCreator(
	CONTENTS_REQUEST
)
export const contentsSuccess = makeActionCreator(
	CONTENTS_SUCCESS
)
export const contentsFailure = makeActionCreator(
	CONTENTS_FAILURE
)
export const selectedContentsAddRemove = makeActionCreator(
	CONTENTS_SELECTED_ADD_REMOVE, 
	'obj'
)
