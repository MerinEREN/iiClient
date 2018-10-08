import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import SignedComponent from "../components/signed"
import userLoggedGet from "../middlewares/userLogged"
import userTagsGet from "../middlewares/userTags"
import languagesGet from "../middlewares/languages"
import signOutURLGet from "../middlewares/signOutURL"
import {routeContentsResetAll} from "../actions/routeContents"

const mapStateToProps = state => {
	const {
		entitiesBuffered: {userLogged, languages}, 
		entities: {signOutURL}
	} = state
	return {
		user: userLogged, 
		languages, 
		signOutURL
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		userLoggedGet, 
		userTagsGet, 
		languagesGet, 
		signOutURLGet, 
		routeContentsResetAll
	},
	dispatch
)

// connect IS A MUST FOR INTERNAL dispatch !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const Signed = connect(mapStateToProps, mapDispatchToProps)(SignedComponent)

export default Signed

