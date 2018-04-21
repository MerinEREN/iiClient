import makeActionCreator from './creator'
import {
	COUNTER_SUCCESS
} from './types'

export const counterSuccess = makeActionCreator(
	COUNTER_SUCCESS
)
