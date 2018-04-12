import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import ContentComponent from '../components/content'
import getPages from '../middlewares/pages'
import {contentUpdate} from '../actions/content'
import {selectedContentsAddRemove} from '../actions/contents'
import {buttonReset} from "../actions/buttons"

// Can use ownProps here.
const mapStateToProps = state => {
	return {
		allPages: state.entitiesBuffered.pages
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		getPages, 
		contentUpdate, 
		selectedContentsAddRemove, 
		buttonReset
	},
	dispatch
)

const Content = connect(mapStateToProps, mapDispatchToProps)(ContentComponent)

export default Content
