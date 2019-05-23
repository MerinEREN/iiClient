import {connect} from "react-redux"
import SettingsComponent from "../components/settings"
import {filterAnObjectByKeys} from "../middlewares/utilities"

// Can use ownProps here.
const mapStateToProps = state => {
	const {
		pagination: {
			users: {logged}, 
			roles: rolesPagination
		}, 
		entitiesBuffered: {
			roles
		}
	} = state
	return {
		rolesUser: (
			logged && 
			rolesPagination[logged.IDs[0]] 
		) && 
		filterAnObjectByKeys(roles, rolesPagination[logged.IDs[0]].IDs)
	}
}

const Settings = connect(mapStateToProps, null)(SettingsComponent)

export default Settings
