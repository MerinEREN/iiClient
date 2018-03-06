import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import ContentComponent from '../components/content'
import getPages from '../middlewares/pages'
import {contentUpdate as contentChange} from '../actions/content'
import {deleteContent} from '../middlewares/content'

// Can use ownProps here.
const mapStateToProps = state => {
	return {
		allPages: state.entities.pages
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		getPages, 
		contentChange, 
		deleteContent
	},
	dispatch
)

const Content = connect(mapStateToProps, mapDispatchToProps)(ContentComponent)

export default Content
