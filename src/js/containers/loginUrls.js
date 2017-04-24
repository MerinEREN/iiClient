import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import loadLoginUrls from '../middlewares/loginUrls'
import LoginComponent from '../components/loginUrls'

const mapStateToProps = (state) => {
	return {
		loginUrls: state.loginUrls
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		loadLoginUrls
	}, 
		dispatch
	)
}

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent)

export default Login
