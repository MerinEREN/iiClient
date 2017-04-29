import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import LoginComponent from '../components/login'

const mapStateToProps = (state) => {
	return {

	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({

	}, 
		dispatch
	)
}

const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComponent)

export default Login
