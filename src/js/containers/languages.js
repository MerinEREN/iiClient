import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import LanguagesComponent from "../components/languages"
import languagesGet, {languagePost, languagesDelete}  from "../middlewares/languages"

// Can use ownProps here.
const mapStateToProps = state => {
	const {
		entitiesBuffered: {languages}, 
		appState: {languageIDs: languageIDsSelected}, 
		ui: {contentsByPage: {languages: contents}}
	} = state
	return {
		languages, 
		languageIDsSelected, 
		contents
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		languagesGet, 
		languagePost, 
		languagesDelete
	},
	dispatch
)

const Languages = connect(mapStateToProps, mapDispatchToProps)(LanguagesComponent)

export default Languages
