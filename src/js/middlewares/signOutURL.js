import makeLoader from "./utilities"
import {
	signOutURLSuccess
} from "../actions/signOutURL"

const signOutURLGet = makeLoader({
	defaults: {
		URL: "/signout", 
		kind: "signOutURL"
	}, 
	actionCreators: {
		actionsSuccess: [signOutURLSuccess]
	},
	options: {
		isCached: (state, kind, key) => state.entities[kind]
	}
})

export default signOutURLGet
