import makeActionCreator from "./creator"
import {
	LANGUAGES_REQUEST, 
	LANGUAGES_SUCCESS, 
	LANGUAGES_FAILURE, 
	LANGUAGEIDS_SELECTED_ADD_REMOVE
} from "./types"

// Action Creators
export const languagesRequest = makeActionCreator(
	LANGUAGES_REQUEST
)
export const languagesSuccess = makeActionCreator(
	LANGUAGES_SUCCESS
)
export const languagesFailure = makeActionCreator(
	LANGUAGES_FAILURE
)
export const selectedLanguageIDsAddRemove = makeActionCreator(
	LANGUAGEIDS_SELECTED_ADD_REMOVE, 
	"ID"
)
