import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import PagesComponent from "../components/pages"
import pagesGet, {pagePost, pagesDelete}  from "../middlewares/pages"

// Can use ownProps here.
const mapStateToProps = state => {
	const {
		entitiesBuffered: {pages}, 
		appState: {pageIDs}, 
		ui: {contentsByPage: {pages: contents}}
	} = state
	return {
		pages, 
		pageIDsSelected: pageIDs, 
		contents
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		pagesGet, 
		pagePost, 
		pagesDelete
	},
	dispatch
)

const Pages = connect(mapStateToProps, mapDispatchToProps)(PagesComponent)

export default Pages
