import {combineReducers} from 'redux'
import accounts from './accounts'
import users from './users'
import demands from './demands'
import offers from './offers'
import servicePacks from './servicePacks'

// Higher-Order Reducer
const entities= combineReducers({
	accounts,
	users,
	offers,
	demands, 
	servicePacks
})

export default entities
