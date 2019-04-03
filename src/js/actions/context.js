import makeActionCreator from "./creator"
import {
	CONTEXT_UPDATE
} from "./types"

// Action Creators
export const contextUpdate = makeActionCreator(
	CONTEXT_UPDATE, 
	"ID", 
	"fieldName", 
	"value"
)
