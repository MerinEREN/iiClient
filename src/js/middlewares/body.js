import {makeLoader} from './utilities'
import {
	userAccountRequest, 
	userAccountSuccess, 
	userAccountFailure, 
	toggleDrawer
} from '../actions/body'

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
	}
}
