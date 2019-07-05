import {combineReducers} from "redux"
import {accountsPagination as accounts} from "./accounts"
import {languagesPagination as languages} from "./languages"
import {pagesPagination as pages} from "./pages"
import {contextsPagination as contexts} from "./contexts"
import {tagsPagination as tags} from "./tags"
import {rolesPagination as roles} from "./roles"
import {typesPagination as roleTypes} from "./roleTypes"
import {demandsPagination as demands} from "./demands"
import {offersPagination as offers} from "./offers"
import {servicePacksPagination as servicePacks} from "./servicePacks"
// import * as ActionTypes from "./types"

// Higher-Order Reducer
const pagination = combineReducers({
	accounts, 
	languages, 
	pages, 
	contexts, 
	tags, 
	roles, 
	roleTypes, 
	demands,
	offers, 
	servicePacks
})

export default pagination
