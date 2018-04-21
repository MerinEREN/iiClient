import {makeLoader} from "./utilities"
import {
	signOutURLSuccess
} from "../actions/signOutURL"

const getSignOutURL = makeLoader({
	actionCreators: {
			actionsSuccess: [signOutURLSuccess]
	},
	options: {
		hideFetching: true
	}
	})

export default getSignOutURL
