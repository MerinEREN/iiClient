import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import LanguagesComponent from '../components/languages'
import getLanguages, {postLanguage}  from '../middlewares/languages'

// Can use ownProps here.
const mapStateToProps = state => {
	return {
		languages: state.entities.languages
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		getLanguages, 
		postLanguage
	},
	dispatch
)

const Languages = connect(mapStateToProps, mapDispatchToProps)(LanguagesComponent)

export default Languages


