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
		url: '/accounts'
	}, 
	actionCreators: {
		actionsRequest: [accountsRequest],
		actionsSuccess: [accountsSuccess],
		actionsFailure: [accountsFailure],
	}, 
	options: {
		// CHANGE THIS BELOW
		isCached: state => state.pagination.accounts.all.isFetching, 
	}
})

export default loadAccounts
