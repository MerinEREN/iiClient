import {
	removeFromObjectIfDeleteOrMergeIntoOrResetObject, 
	mergeIntoOrResetObject
} from "./utilities"
import {
	OFFER_SUCCESS
} from "../actions/types"

const offer = {
	OFFER_SUCCESS: removeFromObjectIfDeleteOrMergeIntoOrResetObject
}
export const offerBuffered = {
	OFFER_SUCCESS: mergeIntoOrResetObject
}

export default offer
