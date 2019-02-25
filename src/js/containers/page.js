import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import PageComponent from "../components/page"
import pageGet, {pagePut} from "../middlewares/page"
import {pagesDelete} from "../middlewares/pages"
import {removeUpdateContentsWithThatPage} from "../middlewares/contents"

const mapStateToProps = (state, ownProps) => {
	const {
		ui: {contentsByPage: {page: contents}}, 
		entitiesBuffered: {pages: {[ownProps.params.ID]: page}}
	} = state
	return {
		contents, 
		page
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		pageGet, 
		pagePut, 
		pagesDelete, 
		removeUpdateContentsWithThatPage
	},
	dispatch
)

const Page = connect(mapStateToProps, mapDispatchToProps)(PageComponent)

export default Page

