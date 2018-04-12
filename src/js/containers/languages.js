import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import LanguagesComponent from "../components/languages"
import getLanguages, {deleteLanguages}  from "../middlewares/languages"
import {postLanguage}  from "../middlewares/language"
import {buttonSet} from "../actions/buttons"

// Can use ownProps here.
const mapStateToProps = state => {
	return {
		languages: state.entitiesBuffered.languages, 
		languagesSelected: state.appState.languages, 
		deleteClicked: state.appState.buttons.clicked.languagesDelete
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		getLanguages, 
		postLanguage, 
		deleteLanguages, 
		buttonSet
	},
	dispatch
)

const Languages = connect(mapStateToProps, mapDispatchToProps)(LanguagesComponent)

export default Languages


