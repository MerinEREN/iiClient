import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import LoggedComponent from "../components/logged"
import getLanguages from "../middlewares/languages"
import {routeContentsResetAll} from "../actions/routeContents"

const mapStateToProps = state => {
	return {
		languages: state.entitiesBuffered.languages, 
		signOutURL: state.entities.signOutURL
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		getLanguages, 
		routeContentsResetAll
	},
	dispatch
)

// connect IS A MUST FOR INTERNAL dispatch !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const Logged = connect(mapStateToProps, mapDispatchToProps)(LoggedComponent)

export default Logged

