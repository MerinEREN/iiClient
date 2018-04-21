import {toggleDrawer} from "../actions/drawer"
import getSignOutURL from "./signOutURL"
import getUserAccount from "./userAccount"

export default function loadData() {
	return dispatch => {
		dispatch(getUserAccount()).then(dispatch(toggleDrawer()))
		dispatch(getSignOutURL({URL: "/signout"}))
	}
}
