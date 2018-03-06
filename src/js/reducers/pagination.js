import {combineReducers} from 'redux'
import countersByComponent from './counters'
import {paginationAccounts as accounts} from './accounts'
import {paginationUsers as usersByAccount} from './users'
import {paginationLanguages as languages} from './languages'
import {paginationPages as pages} from './pages'
import {paginationContents as contents} from './contents'
import {paginationDemands as demands} from './demands'
import {paginationOffers as offers} from './offers'
import {paginationServicePacks as servicePacks} from './servicePacks'
// import * as ActionTypes from './types'

// Higher-Order Reducer
const pagination = combineReducers({
	countersByComponent, 
	accounts, 
	usersByAccount,
	languages, 
	pages, 
	contents, 
	demands,
	offers, 
	servicePacks
})

export default pagination
