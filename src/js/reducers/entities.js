import {combineReducers} from "redux"
import contents from "./contents"
import loginUrls from "./loginUrls"
import languages from "./languages"
import userLogged from "./userLogged"
import rolesByUser from "./userRoles"
import tagsByUser from "./userTags"
import signOutURL from "./signOutURL"
import accountLogged from "./accountLogged"
import pages from "./pages"
import tags from "./tags"
import roles from "./roles"
import roleTypes from "./roleTypes"
import demands from "./demands"
import offers from "./offers"
import servicePacks from "./servicePacks"
import accounts from "./accounts"
import users from "./users"

// Higher-Order Reducer
const entities = combineReducers({
	contents, 
	loginUrls,
	languages, 
	userLogged, 
	rolesByUser, 
	tagsByUser, 
	signOutURL, 
	accountLogged, 
	pages, 
	tags, 
	roles, 
	roleTypes, 
	demands, 
	offers,
	servicePacks, 
	accounts,
	users
})

export default entities
