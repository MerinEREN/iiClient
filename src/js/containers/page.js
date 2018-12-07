import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import PageComponent from "../components/page"
import getPage, {putPage} from "../middlewares/page"
import {deletePages} from "../middlewares/pages"
import {removeUpdateContentsWithThatPage} from "../middlewares/contents"

const mapStateToProps = (state, ownProps) => {
	const {
		entitiesBuffered: {pages: {[ownProps.params.ID]: page}}, 
		ui: {contents: {page: contents}}
	} = state
	return {
		page, 
		contents
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		getPage, 
		putPage, 
		deletePages, 
		removeUpdateContentsWithThatPage
	},
	dispatch
)

const Page = connect(mapStateToProps, mapDispatchToProps)(PageComponent)

export default Page

