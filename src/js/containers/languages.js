import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import LanguagesComponent from "../components/languages"
import languagesGet, {languagesDelete}  from "../middlewares/languages"
import {filterAnObjectByKeys} from "../middlewares/utilities"

// Can use ownProps here.
const mapStateToProps = state => {
	const {
		pagination: {
			contexts: contextsPagination
		}, 
		entitiesBuffered: {
			contexts, 
			languages
		}, 
		appState: {languageIDsSelected}
	} = state
	return {
		contexts: contextsPagination.languages && 
		filterAnObjectByKeys(contexts, contextsPagination.languages.IDs), 
		languages, 
		languageIDsSelected
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		languagesGet, 
		languagesDelete
	},
	dispatch
)

const Languages = connect(mapStateToProps, mapDispatchToProps)(LanguagesComponent)

export default Languages
