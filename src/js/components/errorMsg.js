import React, {Component}  from "react"
import PropTypes from 'prop-types'

class ErrorMsg extends Component {
	constructor(props) {
		super(props)
		this.handleDismissClick = this.handleDismissClick.bind(this)
	}
	handleDismissClick(e) {
		this.props.setErrorMessage(null)
		e.preventDefault()
	}
	render() {
		const {errorMessage} = this.props
		return errorMessage 
			||
			(
				<p style={{backgroundColor: '#e99', padding: 10}}>
					<b>{errorMessage}</b>
					{' '}
					(<a href="#"
						onTouchTap={this.handleDismissClick}>
						Dismiss
					</a>)
				</p>
			)
	}
}

ErrorMsg.propTypes = {
	errorMessage : PropTypes.string,
	setErrorMessage: PropTypes.func.isRequired
}

export default ErrorMsg
