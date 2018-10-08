import {connect} from "react-redux"
import SettingsComponent from "../components/settings"

// Can use ownProps here.
const mapStateToProps = state => {
	const {
		entitiesBuffered: {userLogged}, 
	} = state
	return {
		user: userLogged
	}
}

const Settings = connect(mapStateToProps, null)(SettingsComponent)

export default Settings
