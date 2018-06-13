import makeActionCreator from "./creator"
import {
	ROUTE_CONTENTS_SUCCESS, 
	ROUTE_CONTENTS_RESET_ALL
} from "./types"

// Action Creators
export const routeContentsSuccess = makeActionCreator(
	ROUTE_CONTENTS_SUCCESS
)
export const routeContentsResetAll = makeActionCreator(
	ROUTE_CONTENTS_RESET_ALL
)
