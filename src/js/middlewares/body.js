import {makeLoader} from './utilities'
import {toggleDrawer} from '../actions/drawer'
import {
	userAccountRequest, 
	userAccountSuccess, 
	userAccountFailure
} from '../actions/body'
import loadSignOutURL from './signOutURL'

const loadUserAccount = makeLoader({
	actionCreators: {
		actionsRequest: [userAccountRequest],
		actionsSuccess: [userAccountSuccess],
		actionsFailure: [userAccountFailure]
	}
})

export default function loadData() {
	return dispatch => {
		dispatch(loadUserAccount()).then(dispatch(toggleDrawer()))
		dispatch(loadSignOutURL({URL: '/signout/'}))
	}
}
