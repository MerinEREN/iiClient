import {makeLoader} from './utilities'
import {
	usersRequest, 
	usersSuccess, 
	usersFailure
} from '../actions/users'

const loadUsers = makeLoader({
	defaults: {
		URL: '/users/', 
		paginationID: 'users'
	}, 
	actionCreators: {
		actionsRequest: [usersRequest],
		actionsSuccess: [usersSuccess],
		actionsFailure: [usersFailure]
	}
})

export default loadUsers
