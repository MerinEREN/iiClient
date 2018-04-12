import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PageComponent from '../components/page'
import getPage, {deletePage, putPage} from '../middlewares/page'

const mapStateToProps = (state, ownProps) => {
	return {
		page: state.entitiesBuffered.pages[ownProps.params.ID]
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		getPage, 
		deletePage, 
		putPage
	},
	dispatch
)

const Page = connect(mapStateToProps, mapDispatchToProps)(PageComponent)

export default Page

