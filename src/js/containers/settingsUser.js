import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import UserSettingsComponent from "../components/settingsUser"
import userGet, {userDelete} from "../middlewares/user"
import rolesUserGet, {rolesUserPost} from "../middlewares/rolesUser"
import {roleUserDelete} from "../middlewares/roleUser"
import tagsUserGet, {tagsUserPost} from "../middlewares/tagsUser"
import {tagUserDelete} from "../middlewares/tagUser"
import rolesGet from "../middlewares/roles"
import tagsGet from "../middlewares/tags"
import {roleIDsSelectedByKeySet} from "../actions/roles"
import {
	tagIDSelectedByKeyAdd, 
	tagIDSelectedByKeyRemove
} from "../actions/tags"
import {filterAnObjectByKeys} from "../middlewares/utilities"

// Can use ownProps here.
const mapStateToProps = (state, ownProps) => {
	const {
		pagination: {
			contexts: {user}, 
			accounts: accountsPagination, 
			users: {logged}, 
			roles: rolesPagination, 
			tags: tagsPagination
		}, 
		entitiesBuffered: {
			contexts,
			users, 
			roles, 
			tags
		}, 
		appState: {roleIDsSelectedByKey, tagIDsSelectedByKey}
	} = state
	const {
		ID
	} = ownProps.params
	return {
		contexts: user && filterAnObjectByKeys(contexts, user.IDs), 
		IDAccount: accountsPagination.logged && accountsPagination.logged.IDs[0], 
		IDUserLogged: logged && logged.IDs[0], 
		user: ID ? users[ID] : (logged && users[logged.IDs[0]]), 
		rolesUser: ID ? 
		(
			rolesPagination[ID] && 
			filterAnObjectByKeys(roles, rolesPagination[ID].IDs)
		) : 
		(
			logged && 
			rolesPagination[logged.IDs[0]] && 
			filterAnObjectByKeys(roles, rolesPagination[logged.IDs[0]].IDs)
		), 
		tagsUser: ID ? 
		(
			tagsPagination[ID] && 
			filterAnObjectByKeys(tags, tagsPagination[ID].IDs)
		) : 
		(
			logged && 
			tagsPagination[logged.IDs[0]] && 
			filterAnObjectByKeys(tags, tagsPagination[logged.IDs[0]].IDs)
		), 
		roles, 
		tagsPagination, 
		tags, 
		roleIDsSelected: roleIDsSelectedByKey[ID], 
		tagIDsSelected: tagIDsSelectedByKey[ID]
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		userGet, 
		rolesGet, 
		tagsGet, 
		rolesUserGet, 
		tagsUserGet, 
		tagIDSelectedByKeyAdd, 
		tagIDSelectedByKeyRemove, 
		roleIDsSelectedByKeySet, 
		/* 
		roleIDsSelectedByKeyRemove, 
		tagIDsSelectedByKeyRemove, 
		*/
		rolesUserPost, 
		tagsUserPost, 
		roleUserDelete, 
		tagUserDelete, 
		userDelete
		/*
		rolesUserRemove, 
		tagsUserRemove
		*/
	},
	dispatch
)

const UserSettings = connect(mapStateToProps, mapDispatchToProps)(UserSettingsComponent)

export default UserSettings
