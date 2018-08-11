import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import AccountSettingsComponent from "../components/settingsAccount"
import getTags from "../middlewares/tags"

// Can use ownProps here.
const mapStateToProps = state => {
	const {
		entitiesBuffered: {tags}, 
		ui: {contents: {accountsettings: contents}}
	} = state
	return {
		tags, 
		accountTags, 
		contents
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		getTags
		// removeTags, 
		// addUser
	},
	dispatch
)

const AccountSettings = connect(mapStateToProps, mapDispatchToProps)(AccountSettingsComponent)

export default AccountSettings
