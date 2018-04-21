import {makeLoader} from './utilities'
import {
	loginUrlsSuccess
} from '../actions/loginUrls'

const getLoginUrls = makeLoader({
	actionCreators: {
		actionsSuccess: [loginUrlsSuccess]
	}, 
	options: {
		isCached: state => Object.keys(state.entities.loginUrls).length
	}
	})

export default getLoginUrls
