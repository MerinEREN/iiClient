import {combineReducers} from "redux"
import {contentsBuffered as contents} from "./contents"
import {languagesBuffered as languages} from "./languages"
import {userLoggedBuffered as userLogged} from "./userLogged"
import {accountLoggedBuffered as accountLogged} from "./accountLogged"
import {pagesBuffered as pages} from "./pages"
import {tagsBuffered as tags} from "./tags"
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
	accountLogged, 
	pages, 
	tags, 
	demands, 
	offers,
	servicePacks, 
	accounts,
	users
})

export default entitiesBuffered 
