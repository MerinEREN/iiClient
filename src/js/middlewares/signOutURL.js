import {makeLoader} from './utilities'
import {
	signOutURLRequest, 
	signOutURLSuccess, 
	signOutURLFailure 
} from '../actions/signOutURL'

const loadSignOutURL = makeLoader({
	actionCreators: {
			actionsRequest: [signOutURLRequest],
			actionsSuccess: [signOutURLSuccess],
			actionsFailure: [signOutURLFailure]
	},
	options: {
		hideFetching: true
	}
	})

export default loadSignOutURL

