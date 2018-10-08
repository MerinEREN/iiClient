import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import PagesComponent from "../components/pages"
import getPages, {postPage, deletePages}  from "../middlewares/pages"

// Can use ownProps here.
const mapStateToProps = state => {
	const {
		entitiesBuffered: {pages}, 
		appState: {pageIDs}, 
		ui: {contents: {pages: contents}}
	} = state
	return {
		pages, 
		pageIDsSelected: pageIDs, 
		contents
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		getPages, 
		postPage, 
		deletePages
	},
	dispatch
)

const Pages = connect(mapStateToProps, mapDispatchToProps)(PagesComponent)

export default Pages
