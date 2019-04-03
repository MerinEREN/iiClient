import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import ContextsComponent from "../components/contexts"
import contextsGet, {
	contextsPost, 
	contextsPut, 
	contextsDelete
} from "../middlewares/contexts"
import pagesGet from "../middlewares/pages"
import {filterAnObjectByKeys} from "../middlewares/utilities"

// Can use ownProps here.
const mapStateToProps = state => {
	const {
		pagination: {
			contexts: contextsPagination, 
			languages: languagesPagination, 
			pages: pagesPagination
		}, 
		entitiesBuffered: {
			contexts, 
			languages, 
			pages
		}, 
		appState: {
			contextIDs
		}
	} = state
	return {
		contextsRoot: contextsPagination.contexts && 
		filterAnObjectByKeys(contexts, contextsPagination.contexts.IDs), 
		contexts: contextsPagination.all && 
		filterAnObjectByKeys(contexts, contextsPagination.all.IDs), 
		contextIDsSelected: contextIDs, 
		languages: languagesPagination.all && 
		filterAnObjectByKeys(languages, languagesPagination.all.IDs), 
		pages: pagesPagination.all && 
		filterAnObjectByKeys(pages, pagesPagination.all.IDs)
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		contextsGet, 
		contextsPost, 
		contextsPut, 
		contextsDelete, 
		pagesGet
	},
	dispatch
)

const Contexts = connect(mapStateToProps, mapDispatchToProps)(ContextsComponent)

export default Contexts
