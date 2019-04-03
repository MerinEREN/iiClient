import createReducer from "./utilities"
import {
	DRAWER_TOGGLE
} from "../actions/types"

// Case Reducers
const drawerToggle = (state, action) => !state

// Slice Reducers
const drawerOpen = createReducer(false, {
	DRAWER_TOGGLE: drawerToggle
})

export default drawerOpen
