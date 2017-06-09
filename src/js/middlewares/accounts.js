import {makeLoader} from './utilities'
import {
	accountsRequest, 
	accountsSuccess, 
	accountsFailure
} from '../actions/accounts'

// Should be loadAccountsByTags in the future !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Get tags as args to filter result.
const loadAccounts = makeLoader({
	defaults: {
		URL: '/accounts/', 
		paginationID: 'accounts'
	}, 
	actionCreators: {
		actionsRequest: [accountsRequest],
		actionsSuccess: [accountsSuccess],
		actionsFailure: [accountsFailure],
	}
	})

export default loadAccounts
