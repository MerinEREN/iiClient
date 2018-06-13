import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import LandingPageComponent from "../components/landingPage"

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

const LandingPage = connect(mapStateToProps, mapDispatchToProps)(LandingPageComponent)

export default LandingPage
