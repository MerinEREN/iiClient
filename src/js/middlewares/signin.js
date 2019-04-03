import makeLoader from "./utilities"
import {
	loginUrlsSuccess
} from "../actions/signin"

const loginUrlsGet = makeLoader({
	defaults: {
		kind: "loginUrls"
	}, 
	actionCreators: {
		actionsSuccess: [loginUrlsSuccess]
	}, 
	options: {
		isCached: (state, kind, key) => Object.keys(state.entities[kind]).length
	}
})

export default loginUrlsGet
