import {combineReducers} from "redux"
import loginUrls from './loginUrls'
import signOutURL from './signOutURL'
import userAccount from "./userAccount"
import accounts from "./accounts"
import users from "./users"
import languages from "./languages"
import pages from "./pages"
import contents from "./contents"
import tags from "./tags"
import demands from "./demands"
import offers from "./offers"
import servicePacks from "./servicePacks"

// Higher-Order Reducer
const entities = combineReducers({
	loginUrls,
	signOutURL, 
	userAccount, 
	languages, 
	pages, 
	contents, 
	tags, 
	accounts,
	users,
	offers,
	demands, 
	servicePacks
})

export default entities
