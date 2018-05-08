import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import PageComponent from "../components/page"
import getPage, {putPage} from "../middlewares/page"
import {deletePages} from "../middlewares/pages"
import {removeUpdateContentsWithThatPage} from "../middlewares/contents"

const mapStateToProps = (state, ownProps) => {
	return {
		page: state.entitiesBuffered.pages[ownProps.params.ID]
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

