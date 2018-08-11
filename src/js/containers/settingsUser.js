import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import UserSettingsComponent from "../components/settingsUser"
import getTags from "../middlewares/tags"

// Can use ownProps here.
const mapStateToProps = state => {
	const {
		entitiesBuffered: {tags}, 
		ui: {contents: {usersettings: contents}}
	} = state
	return {
		tags, 
		contents
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		getTags
	},
	dispatch
)

const UserSettings = connect(mapStateToProps, mapDispatchToProps)(UserSettingsComponent)

export default UserSettings
