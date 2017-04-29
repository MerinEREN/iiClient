import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import loadLoginUrls from '../middlewares/loginUrls'
import LoginUrlsComponent from '../components/loginUrls'

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

const LoginUrls = connect(mapStateToProps, mapDispatchToProps)(LoginUrlsComponent)

export default LoginUrls
