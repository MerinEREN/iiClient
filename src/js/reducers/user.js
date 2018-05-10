import {
	removeFromObjectIfDeleteOrMergeIntoOrResetObject, 
	mergeIntoOrResetObject
} from "./utilities"
import {
	USER_SUCCESS
} from "../actions/types"

const user = {
	USER_SUCCESS: removeFromObjectIfDeleteOrMergeIntoOrResetObject
}
export const userBuffered = {
	USER_SUCCESS: mergeIntoOrResetObject
}

export default user
