import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import UserSettingsComponent from "../components/settingsUser"
import userGet from "../middlewares/user"
import tagsGet from "../middlewares/tags"
import userTagsGet, {userTagsDelete} from "../middlewares/userTags"
import {tagIDsSelectedReset} from "../actions/tags"

// Can use ownProps here.
const mapStateToProps = (state, ownProps) => {
	const {
		ui: {contents: {user: contents}}, 
		entitiesBuffered: {userLogged, users, tags, tagsByUser}, 
		appState: {tagIDs}
	} = state
	const {ID} = ownProps.params
	return {
		contents, 
		userLogged, 
		user: ID ? (users[ID] || userLogged) : userLogged, 
		tags, 
		userTags: tagsByUser[ID] || {}, 
		tagIDsSelected: tagIDs
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		userGet, 
		tagsGet, 
		userTagsGet, 
		tagIDsSelectedReset, 
		userTagsDelete
	},
	dispatch
)

const UserSettings = connect(mapStateToProps, mapDispatchToProps)(UserSettingsComponent)

export default UserSettings
