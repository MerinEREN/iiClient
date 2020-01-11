import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import PagesComponent from "../components/pages"
import pagesGet, {pagesDelete}  from "../middlewares/pages"
import {removeUpdateCoxtentsWithThatPage} from "../middlewares/contexts"
import {filterAnObjectByKeys} from "../middlewares/utilities"

// Can use ownProps here.
const mapStateToProps = state => {
	const {
		pagination: {
			contexts: contextsPagination
		}, 
		entitiesBuffered: {
			contexts, 
			pages
		}, 
		appState: {pageIDsSelected}
	} = state
	return {
		contexts: contextsPagination.pages && 
		filterAnObjectByKeys(contexts, contextsPagination.pages.IDs), 
		pages, 
		pageIDsSelected
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		pagesGet, 
		pagesDelete, 
		removeUpdateCoxtentsWithThatPage
	},
	dispatch
)

const Pages = connect(mapStateToProps, mapDispatchToProps)(PagesComponent)

export default Pages
