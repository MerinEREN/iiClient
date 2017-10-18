import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import PagesComponent from '../components/pages'
import getPages, {postPage}  from '../middlewares/pages'

// Can use ownProps here.
const mapStateToProps = state => {
	return {
		pages: state.entities.pages
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

