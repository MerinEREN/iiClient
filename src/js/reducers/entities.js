import {combineReducers} from "redux"
import contexts from "./contexts"
import loginUrls from "./loginUrls"
import languages from "./languages"
import signOutURL from "./signOutURL"
import pages from "./pages"
import tags from "./tags"
import roles from "./roles"
import roleTypes from "./roleTypes"
import demands from "./demands"
import offers from "./offers"
import servicePacks from "./servicePacks"
import photos from "./photos"
import accounts from "./accounts"
import users from "./users"

// Higher-Order Reducer
const entities = combineReducers({
	contexts, 
	loginUrls,
	languages, 
	signOutURL, 
	pages, 
	tags, 
	roles, 
	roleTypes, 
	demands, 
	offers,
	servicePacks, 
	photos, 
	accounts,
	users
})

export default entities
