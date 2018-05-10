import {
	removeFromObjectIfDeleteOrMergeIntoOrResetObject, 
	mergeIntoOrResetObject
} from "./utilities"
import {
	PAGE_SUCCESS
} from "../actions/types"

const page = {
	PAGE_SUCCESS: removeFromObjectIfDeleteOrMergeIntoOrResetObject
}
export const pageBuffered = {
	PAGE_SUCCESS: mergeIntoOrResetObject
}

export default page
