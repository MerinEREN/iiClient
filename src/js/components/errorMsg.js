import React, {Component}  from "react"
import PropTypes from 'prop-types'
import Snackbar from 'material-ui/Snackbar'

class ErrorMsg extends Component {
	constructor(props) {
		super(props)
		this.state = {
			open: false
		}
		this.handleRequestClose = this.handleRequestClose.bind(this)
	}
	componentWillReceiveProps(nextProps) {
			this.setState({open: true})
	}
	handleRequestClose() {
		this.setState({open: false})
	}
	render() {
		const {errorMessage} = this.props
		return <Snackbar 
				open={this.state.open} 
				message={errorMessage} 
				autoHideDuration={5000} 
				onRequestClose={this.handleRequestClose}
			/>
	}
}

ErrorMsg.defaultProps = {
	errorMessage: 'dummy message'
}


ErrorMsg.propTypes = {
	errorMessage: PropTypes.string
}

ErrorMsg.muiName = 'Snackbar'

export default ErrorMsg
