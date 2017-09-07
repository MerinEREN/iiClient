import {combineReducers} from 'redux'
import countersByComponent from './counters'
import {paginationAccounts as accounts} from './accounts'
import {paginationUsers as usersByAccount} from './users'
import {paginationLanguages as languages} from './languages'
import {paginationPages as pages} from './pages'
import {paginationContents as contentsByPage} from './contents'
import {paginationDemands as demandsByAccount} from './demands'
import {paginationOffers as offersByAccount} from './offers'
import {paginationServicePacks as servicePacksByAccount} from './servicePacks'
// import * as ActionTypes from './types'

// Higher-Order Reducer
const pagination = combineReducers({
	countersByComponent, 
	accounts, 
	usersByAccount,
	languages, 
	pages, 
	contentsByPage, 
	demandsByAccount,
	offersByAccount, 
	servicePacksByAccount
})

export default pagination
