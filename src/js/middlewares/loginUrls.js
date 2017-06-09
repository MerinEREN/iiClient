import {makeLoader} from './utilities'
import {
	loginUrlsRequest,
	loginUrlsSuccess,
	loginUrlsFailure,
} from '../actions/loginUrls'

const loadLoginUrls = makeLoader({
	actionCreators: {
		actionsRequest: [loginUrlsRequest],
		actionsSuccess: [loginUrlsSuccess],
		actionsFailure: [loginUrlsFailure]
	}, 
	options: {
		isCached: state => Object.keys(state.loginUrls.items).length
	}
	})

export default loadLoginUrls
