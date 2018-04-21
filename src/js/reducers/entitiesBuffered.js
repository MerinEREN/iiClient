import {combineReducers} from "redux"
import {accountsBuffered as accounts} from "./accounts"
import {userAccountBuffered as userAccount} from "./userAccount"
import {usersBuffered as users} from "./users"
import {languagesBuffered as languages} from "./languages"
import {pagesBuffered as pages} from "./pages"
import {contentsBuffered as contents} from "./contents"
import {demandsBuffered as demands} from "./demands"
import {offersBuffered as offers} from "./offers"
import {servicePacksBuffered as servicePacks} from "./servicePacks"

// Higher-Order Reducer
const entitiesBuffered = combineReducers({
	userAccount, 
	languages, 
	pages, 
	contents, 
	accounts,
	users,
	offers,
	demands, 
	servicePacks
})

export default entitiesBuffered 
