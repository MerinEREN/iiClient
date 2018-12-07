import {combineReducers} from "redux"
import {contentsBuffered as contents} from "./contents"
import {languagesBuffered as languages} from "./languages"
import {userLoggedBuffered as userLogged} from "./userLogged"
import {rolesByUserBuffered as rolesByUser} from "./userRoles"
import {tagsByUserBuffered as tagsByUser} from "./userTags"
import {accountLoggedBuffered as accountLogged} from "./accountLogged"
import {pagesBuffered as pages} from "./pages"
import {tagsBuffered as tags} from "./tags"
import {rolesBuffered as roles} from "./roles"
import {roleTypesBuffered as roleTypes} from "./roleTypes"
import {demandsBuffered as demands} from "./demands"
import {offersBuffered as offers} from "./offers"
import {servicePacksBuffered as servicePacks} from "./servicePacks"
import {accountsBuffered as accounts} from "./accounts"
import {usersBuffered as users} from "./users"

// Higher-Order Reducer
const entitiesBuffered = combineReducers({
	contents, 
	languages, 
	userLogged, 
	rolesByUser, 
	tagsByUser, 
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

export default entitiesBuffered 
