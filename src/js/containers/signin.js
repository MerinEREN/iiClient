import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import loginUrlsGet from "../middlewares/signin"
import signinComponent from "../components/signin"

const mapStateToProps = (state) => {
	return {
		loginUrls: state.entities.loginUrls
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		loginUrlsGet
	}, 
		dispatch
	)
}

const Signin = connect(mapStateToProps, mapDispatchToProps)(signinComponent)

export default Signin
