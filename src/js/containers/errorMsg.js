import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import ErrorMsgComponent from '../components/errorMsg'
import {setErrorMessage} from '../actions/errorMsg'
// Needed for onTouchTap, REMOVE WHEN REACT HAS THIS FEATURE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const mapStateToProps = state => {
	errorMessage: state.errorMessage
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		setErrorMessage
	}, 
	dispatch
)

const ErrorMsg = connect(mapStateToProps, mapDispatchToProps)(ErrorMsgComponent)

export default ErrorMsg
