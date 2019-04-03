import makeActionCreator from "./creator"
import {DRAWER_TOGGLE} from "./types"

const drawerToggle = makeActionCreator(
	DRAWER_TOGGLE
)

export default drawerToggle
