import {combineReducers} from "redux"
import {contextsBuffered as contexts} from "./contexts"
import {languagesBuffered as languages} from "./languages"
import {pagesBuffered as pages} from "./pages"
import {tagsBuffered as tags} from "./tags"
import {rolesBuffered as roles} from "./roles"
import {roleTypesBuffered as roleTypes} from "./roleTypes"
import counters from "./counters"
import {demandsBuffered as demands} from "./demands"
import {offersBuffered as offers} from "./offers"
import {servicePacksBuffered as servicePacks} from "./servicePacks"
import {photosBuffered as photos} from "./photos"
import {accountsBuffered as accounts} from "./accounts"
import {usersBuffered as users} from "./users"

// Higher-Order Reducer
const entitiesBuffered = combineReducers({
	contexts, 
	languages, 
	pages, 
	tags, 
	roles, 
	roleTypes, 
	counters, 
	demands, 
	offers,
	servicePacks, 
	photos, 
	accounts,
	users
})

export default entitiesBuffered 
