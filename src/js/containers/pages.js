import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PagesComponent from '../components/pages'
import getPages from '../middlewares/pages'
import {postPage} from '../middlewares/page'

// Can use ownProps here.
const mapStateToProps = state => {
	return {
		pages: state.entities.pages.byID
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		getPages, 
		postPage
	},
	dispatch
)

const Pages = connect(mapStateToProps, mapDispatchToProps)(PagesComponent)

export default Pages

