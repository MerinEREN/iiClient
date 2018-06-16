import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import LanguagesComponent from "../components/languages"
import getLanguages, {postLanguage, deleteLanguages}  from "../middlewares/languages"

// Can use ownProps here.
const mapStateToProps = state => {
	const {
		entitiesBuffered: {languages}, 
		appState: {languageIDs: languageIDsSelected}, 
		ui: {contents: {languages: contents}}
	} = state
	return {
		languages, 
		languageIDsSelected, 
		contents
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		getLanguages, 
		postLanguage, 
		deleteLanguages
	},
	dispatch
)

const Languages = connect(mapStateToProps, mapDispatchToProps)(LanguagesComponent)

export default Languages
