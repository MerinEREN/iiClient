import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import LoggedComponent from '../components/logged'
import signOut from '../middlewares/signOut'

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		signOut
	},
	dispatch
)

// connect IS A MUST FOR INTERNAL dispatch !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const Logged = connect(null, mapDispatchToProps)(LoggedComponent)

export default Logged

