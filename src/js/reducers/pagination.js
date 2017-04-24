import {combineReducers} from 'redux'
import counters from './counters'
import {accountsInPagination as accounts} from './accounts'
import {usersByAccount} from './users'
import {paginationDemands as demands} from './demands'
import {paginationOffers as offers} from './offers'
import {paginationServicePacks as servicePacks} from './servicePacks'
// import * as ActionTypes from './types'

// Higher-Order Reducer
const pagination = combineReducers({
	counters, 
	accounts, 
	usersByAccount,
	demands,
	offers, 
	servicePacks
})

export default pagination
