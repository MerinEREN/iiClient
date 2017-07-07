import {combineReducers} from 'redux'
import counters from './counters'
import {accountsInPagination as accounts} from './accounts'
import {paginationUsers as users} from './users'
import {paginationLanguages as languages} from './languages'
import {paginationPages as pages} from './pages'
import {paginationDemands as demands} from './demands'
import {paginationOffers as offers} from './offers'
import {paginationServicePacks as servicePacks} from './servicePacks'
// import * as ActionTypes from './types'

// Higher-Order Reducer
const pagination = combineReducers({
	counters, 
	accounts, 
	users,
	languages, 
	pages, 
	demands,
	offers, 
	servicePacks
})

export default pagination
