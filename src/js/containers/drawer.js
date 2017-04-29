import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import DrawerComponent from '../components/drawer'
import {changeTheme} from '../actions/theme'

// Can use "ownProps" here
// For accessing params for example.
const mapStateToProps = state => {
	const {
		ui: {openDrawer}
	} = state
	return {
		open: openDrawer
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		changeTheme,
	},
	dispatch
)

const Drawer = connect(mapStateToProps, mapDispatchToProps)(DrawerComponent)

export default Drawer

