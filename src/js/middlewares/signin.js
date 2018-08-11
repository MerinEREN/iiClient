import {makeLoader} from "./utilities"
import {
	loginUrlsSuccess
} from "../actions/signin"

const loginUrlsGet = makeLoader({
	actionCreators: {
		actionsSuccess: [loginUrlsSuccess]
	}, 
	options: {
		isCached: state => Object.keys(state.entities.loginUrls).length
	}
})

export default loginUrlsGet
