import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import DrawerComponent from '../components/drawer'
import accountLoggedGet from "../middlewares/accountLogged"
import {toggleDrawer} from "../actions/drawer"
import {changeTheme} from '../actions/theme'

// Can use "ownProps" here
// For accessing params for example.
const mapStateToProps = state => {
	const {
		entitiesBuffered: {accountLogged, userLogged}, 
		ui: {openDrawer}
	} = state
	return {
		account: accountLogged, 
		user: userLogged, 
		open: openDrawer
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		accountLoggedGet, 
		toggleDrawer, 
		changeTheme
	},
	dispatch
)

const Drawer = connect(mapStateToProps, mapDispatchToProps)(DrawerComponent)

export default Drawer

