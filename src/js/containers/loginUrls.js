import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import getLoginUrls from '../middlewares/loginUrls'
import LoginUrlsComponent from '../components/loginUrls'

const mapStateToProps = (state) => {
	return {
		loginUrls: state.entities.loginUrls
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		getLoginUrls
	}, 
		dispatch
	)
}

const LoginUrls = connect(mapStateToProps, mapDispatchToProps)(LoginUrlsComponent)

export default LoginUrls
