import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import DrawerComponent from "../components/drawer"
import accountGet from "../middlewares/account"
import photosGet from "../middlewares/photos"
import {drawerToggle} from "../actions/drawer"
import {themeChange} from "../actions/theme"
import {filterAnObjectByKeys} from "../middlewares/utilities"

// Can use "ownProps" here
// For accessing params for example.
const mapStateToProps = (state, ownProps) => {
	const {
		pagination: {
			accounts: {logged}, 
			photos: photosPagination, 
			roles: rolesPagination
		}, 
		entitiesBuffered: {
			accounts, 
			photos, 
			roles
		}, 
		ui: {drawerOpen}
	} = state
	const {
		user
	} = ownProps
	return {
		account: logged && accounts[logged.IDs[0]], 
		accountPhoto: (logged && photosPagination[logged.IDs[0]]) && 
		photos[photosPagination[logged.IDs[0]].IDs[0]], 
		rolesUser: user.ID && rolesPagination[user.ID] && 
		filterAnObjectByKeys(roles, rolesPagination[user.ID].IDs), 
		open: drawerOpen
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		accountGet, 
		photosGet, 
		drawerToggle, 
		themeChange
	},
	dispatch
)

const Drawer = connect(mapStateToProps, mapDispatchToProps)(DrawerComponent)

export default Drawer

