import React from "react"
import PropTypes from 'prop-types'
import Snackbar from 'material-ui/Snackbar'

const MySnackbar = ({message}) => (
	<Snackbar 
		open
		message={message} 
		autoHideDuration={5000} 
	/>
)

MySnackbar.propTypes = {
	message: PropTypes.string
}

MySnackbar.muiName = 'Snackbar'

export default MySnackbar
