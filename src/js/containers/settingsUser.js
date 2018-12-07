import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import UserSettingsComponent from "../components/settingsUser"
import userGet from "../middlewares/user"
import rolesGet from "../middlewares/roles"
import tagsGet from "../middlewares/tags"
import userRolesGet, {userRolesPost, userRoleDelete} from "../middlewares/userRoles"
import userTagsGet, {userTagsPost, userTagDelete} from "../middlewares/userTags"
import {roleIDsSelectedByUserReset} from "../actions/roles"
import {tagIDsSelectedByUserReset} from "../actions/tags"

// Can use ownProps here.
const mapStateToProps = (state, ownProps) => {
	const {
		ui: {contents: {user: contents}}, 
		entitiesBuffered: {
			userLogged, 
			users, 
			tags, 
			roles, 
			rolesByUser, 
			tagsByUser
		}, 
		appState: {roleIDsByUser, tagIDsByUser}
	} = state
	const {ID} = ownProps.params
	return {
		contents, 
		userLogged, 
		user: ID ? (users[ID] || userLogged) : userLogged, 
		tags, 
		roles, 
		userRoles: rolesByUser[ID] || {}, 
		userTags: tagsByUser[ID] || {}, 
		roleIDsSelected: roleIDsByUser[ID] || [], 
		tagIDsSelected: tagIDsByUser[ID] || []
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		userGet, 
		rolesGet, 
		tagsGet, 
		userRolesGet, 
		userTagsGet, 
		roleIDsSelectedByUserReset, 
		tagIDsSelectedByUserReset, 
		userRolesPost, 
		userTagsPost, 
		userRoleDelete, 
		userTagDelete
	},
	dispatch
)

const UserSettings = connect(mapStateToProps, mapDispatchToProps)(UserSettingsComponent)

export default UserSettings
