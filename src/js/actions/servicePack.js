import makeActionCreator from './creator'
import {
	SERVICE_PACK_SUCCESS
} from './types'

// Action Creators
export const servicePackSuccess = makeActionCreator(
	SERVICE_PACK_SUCCESS
)
