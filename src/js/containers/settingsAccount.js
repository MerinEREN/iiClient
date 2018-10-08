import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import AccountSettingsComponent from "../components/settingsAccount"
import usersGet, {userPost, usersDelete} from "../middlewares/users"
import tagsGet from "../middlewares/tags"

// Can use ownProps here.
const mapStateToProps = state => {
	const {
		ui: {contents: {settings: contents}}, 
		entitiesBuffered: {accountLogged, userLogged, users, tags}, 
		appState: {userIDs}
	} = state
	return {
		contents, 
		account: accountLogged, 
		users: {[userLogged.ID]: userLogged, ...users}, 
		userIDsSelected: userIDs, 
		tags
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		usersGet, 
		userPost, 
		usersDelete, 
		tagsGet
	},
	dispatch
)

const AccountSettings = connect(mapStateToProps, mapDispatchToProps)(AccountSettingsComponent)

export default AccountSettings
