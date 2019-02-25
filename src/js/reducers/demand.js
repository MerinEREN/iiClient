import {
	removeFromObjectIfDeleteOrMergeIntoOrResetObject, 
	mergeIntoOrResetObject
} from "./utilities"
import {
	DEMAND_SUCCESS
} from "../actions/types"

const demand = {
	DEMAND_SUCCESS: removeFromObjectIfDeleteOrMergeIntoOrResetObject
}
export const demandBuffered = {
	DEMAND_SUCCESS: mergeIntoOrResetObject
}

export default demand
