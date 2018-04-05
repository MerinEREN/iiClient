import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import LanguagesComponent from "../components/languages"
import getLanguages, {postLanguage, deleteLanguages}  from "../middlewares/languages"
import {buttonSet} from "../actions/buttons"

// Can use ownProps here.
const mapStateToProps = state => {
	return {
		languages: state.entities.languages, 
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


