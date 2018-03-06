import makeActionCreator from './creator'
import {
	CONTENT_UPDATE
} from './types'

// Action Creators
export const contentUpdate = makeActionCreator(
	CONTENT_UPDATE, 
	'ID', 
	'fieldName', 
	'value'
)
