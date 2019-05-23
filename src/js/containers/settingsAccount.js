import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import AccountSettingsComponent from "../components/settingsAccount"
import accountGet from "../middlewares/account"
import usersGet, {usersDelete} from "../middlewares/users"
import {filterAnObjectByKeys} from "../middlewares/utilities"

// Can use ownProps here.
const mapStateToProps = (state, ownProps) => {
	const {
		pagination: {
			contexts: {settings}, 
			accounts: accountsPagination, 
			users: usersPagination
		}, 
		entitiesBuffered: {
			contexts, 
			accounts, 
			users
		}, 
		appState: {userIDsSelected}
	} = state
	return {
		contexts: settings && filterAnObjectByKeys(contexts, settings.IDs), 
		account: accountsPagination.logged && 
		accounts[accountsPagination.logged.IDs[0]], 
		users: (
			usersPagination.logged && 
			ownProps.account && 
			usersPagination[ownProps.account.ID]
		) && 
		filterAnObjectByKeys(
			users, 
			[
				usersPagination.logged.IDs[0], 
				...usersPagination[ownProps.account.ID].IDs
			]
		), 
		userIDsSelected
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		usersGet, 
		usersDelete
	},
	dispatch
)

const AccountSettings = connect(mapStateToProps, mapDispatchToProps)(AccountSettingsComponent)

export default AccountSettings
