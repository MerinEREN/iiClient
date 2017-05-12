import {makeLoader} from './utilities'
import {
	signOutRequest, 
	signOutSuccess, 
	signOutFailure 
} from '../actions/signOut'

const signOut = makeLoader({
	defaults: {
		url: '/signout'
	},
	actionCreators: {
			actionsRequest: [signOutRequest],
			actionsSuccess: [signOutSuccess],
			actionsFailure: [signOutFailure]
	},
	options: {
		hideFetching: true
	}
})

export default signOut

