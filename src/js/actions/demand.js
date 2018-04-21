import makeActionCreator from './creator'
import {
	DEMAND_SUCCESS
} from './types'

// Action Creators
export const demandSuccess = makeActionCreator(
	DEMAND_SUCCESS
)
