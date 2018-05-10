import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import ContentsComponent from "../components/contents"
import getContents, {
	postContents, 
	putContents, 
	deleteContents
} from "../middlewares/contents"
import getPages from "../middlewares/pages"

// Can use ownProps here.
const mapStateToProps = state => {
	return {
		contents: state.entitiesBuffered.contents, 
		contentIDsSelected: state.appState.contentIDs, 
		languageIDs: state.pagination.languages.all.IDs, 
		allPages: state.entitiesBuffered.pages
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		getContents, 
		postContents, 
		putContents, 
		deleteContents, 
		getPages
	},
	dispatch
)

const Contents = connect(mapStateToProps, mapDispatchToProps)(ContentsComponent)

export default Contents
