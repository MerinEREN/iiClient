import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import UserSettingsComponent from "../components/settingsUser"
import userGet from "../middlewares/user"
import {userDelete} from "../middlewares/users"
import rolesGet from "../middlewares/roles"
import tagsGet from "../middlewares/tags"
import userRolesGet, {userRolesPost, userRoleDelete} from "../middlewares/userRoles"
import userTagsGet, {userTagsPost, userTagDelete} from "../middlewares/userTags"
import {roleIDsSelectedByKeySet, roleIDsSelectedByKeyRemove} from "../actions/roles"
import {tagIDsSelectedByKeySet, tagIDsSelectedByKeyRemove} from "../actions/tags"
import {userRolesRemove} from "../actions/userRoles"
import {userTagsRemove} from "../actions/userTags"

// Can use ownProps here.
const mapStateToProps = (state, ownProps) => {
	const {
		ui: {contentsByPage: {user: contents}}, 
		entitiesBuffered: {
			userLogged, 
			users, 
			tags, 
			roles, 
			rolesByUser, 
			tagsByUser
		}, 
		appState: {roleIDsByKey, tagIDsByKey}
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
		roleIDsSelected: roleIDsByKey[ID] || [], 
		tagIDsSelected: tagIDsByKey[ID] || []
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		userGet, 
		rolesGet, 
		tagsGet, 
		userRolesGet, 
		userTagsGet, 
		roleIDsSelectedByKeySet, 
		tagIDsSelectedByKeySet, 
		roleIDsSelectedByKeyRemove, 
		tagIDsSelectedByKeyRemove, 
		userRolesPost, 
		userTagsPost, 
		userRoleDelete, 
		userTagDelete, 
		userDelete, 
		userRolesRemove, 
		userTagsRemove
	},
	dispatch
)

const UserSettings = connect(mapStateToProps, mapDispatchToProps)(UserSettingsComponent)

export default UserSettings
