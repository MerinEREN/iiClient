import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import SnackbarComponent from '../components/snackbar'

const mapStateToProps = state => {
	return {message: state.appState.snackbarMessage}
}

const Snackbar = connect(mapStateToProps)(SnackbarComponent)

export default Snackbar
