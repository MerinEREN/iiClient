import {combineReducers} from "redux"
import {paginationAccounts as accounts} from "./accounts"
import {paginationLanguages as languages} from "./languages"
import {paginationPages as pages} from "./pages"
import {paginationContents as contents} from "./contents"
import {paginationTags as tags} from "./tags"
import {paginationRoles as roles} from "./roles"
import {paginationRoleTypes as roleTypes} from "./roleTypes"
import {paginationDemands as demands} from "./demands"
import {paginationOffers as offers} from "./offers"
import {paginationServicePacks as servicePacks} from "./servicePacks"
// import * as ActionTypes from "./types"

// Higher-Order Reducer
const pagination = combineReducers({
	accounts, 
	languages, 
	pages, 
	contents, 
	tags, 
	roles, 
	roleTypes, 
	demands,
	offers, 
	servicePacks
})

export default pagination
