import {makeLoader} from './utilities'
import {
	usersRequest, 
	usersSuccess, 
	usersFailure
} from '../actions/users'

const loadUsers = makeLoader({
	defaults: {
		url: '/users'
	}, 
	actionCreators: {
		actionsRequest: [usersRequest],
		actionsSuccess: [usersSuccess],
		actionsFailure: [usersFailure]
	}, 
	options: {
		// CHANGE THIS BELOW
		isCached: state => state.group.usersByAccount[props.groupID].isFetching
	}
})

export default loadUsers
