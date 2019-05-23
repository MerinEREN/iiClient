import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import signinComponent from "../components/signin"
import loginUrlsGet from "../middlewares/signin"

const mapStateToProps = state => {
	const {
		entities: {
			loginUrls
		}
	} = state
	return {
		loginUrls
	}
}

const mapDispatchToProps = dispatch => {
	return bindActionCreators({
		loginUrlsGet
	}, 
		dispatch
	)
}

const Signin = connect(mapStateToProps, mapDispatchToProps)(signinComponent)

export default Signin
