import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import SignedComponent from "../components/signed"
import userGet from "../middlewares/user"
import photosGet from "../middlewares/photos"
import rolesUserGet from "../middlewares/rolesUser"
import tagsUserGet from "../middlewares/tagsUser"
import languagesGet from "../middlewares/languages"
import signOutURLGet from "../middlewares/signOutURL"
import {contextsResetAll} from "../actions/contexts"

const mapStateToProps = (state, ownProps) => {
	const {
		pagination: {
			photos: photosPagination
		}, 
		entitiesBuffered: {
			photos, 
			languages
		}, 
		entities: {signOutURL}
	} = state
	const {
		user
	} = ownProps
	return {
		userPhoto: (user.ID && photosPagination[user.ID]) && 
		photos[photosPagination[user.ID].IDs[0]], 
		languages, 
		signOutURL
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		userGet, 
		photosGet, 
		rolesUserGet, 
		tagsUserGet, 
		languagesGet, 
		signOutURLGet, 
		contextsResetAll
	},
	dispatch
)

// connect IS A MUST FOR INTERNAL dispatch !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const Signed = connect(mapStateToProps, mapDispatchToProps)(SignedComponent)

export default Signed
