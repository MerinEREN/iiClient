import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import ContentComponent from '../components/content'
import getLanguages from '../middlewares/languages'
import getPages from '../middlewares/pages'

// Can use ownProps here.
const mapStateToProps = state => {
	return {
		allPages: state.entities.pages, 
		languageIDs: state.pagination.languages.all.IDs
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		getLanguages, 
		getPages
	},
	dispatch
)

const Content = connect(mapStateToProps, mapDispatchToProps)(ContentComponent)

export default Content
