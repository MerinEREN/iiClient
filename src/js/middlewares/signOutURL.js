import {makeLoader} from "./utilities"
import {
	signOutURLSuccess
} from "../actions/signOutURL"

const signOutURLGet = makeLoader({
	defaults: {
		URL: "/signout"
	}, 
	actionCreators: {
			actionsSuccess: [signOutURLSuccess]
	},
	options: {
		hideFetching: true
	}
	})

export default signOutURLGet
