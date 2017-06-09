import {connect} from 'react-redux'
import LoggedComponent from '../components/logged'

const mapStateToProps = state => {
	return {
		signOutURL: state.signOutURL
	}
}

// connect IS A MUST FOR INTERNAL dispatch !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const Logged = connect(mapStateToProps)(LoggedComponent)

export default Logged

