import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router'
import FlatButton from 'material-ui/FlatButton'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'

class LoginUrls extends Component {
	constructor(props) {
		super(props)
		this.state = {
			open: false
		}
		this.handleTouchTap = this.handleTouchTap.bind(this)
		this.handleRequestClose = this.handleRequestClose.bind(this)
	}

	componentDidMount() {
		this.props.loadLoginUrls()
	}

	handleTouchTap(event) {
		// This prevents ghost click.
		event.preventDefault()
		this.setState({
			open: true,
			anchorEl: event.currentTarget
		})
	}

	handleRequestClose() {
		this.setState({
			open: false
		})
	}

	render() {
		const {loginUrls} = this.props
		return (
			<div>
				<FlatButton
					label="Login"
					onTouchTap={this.handleTouchTap}
				/>
				<Popover
					open={this.state.open}
					anchorEl={this.state.anchorEl}
					anchorOrigin={{horizontal: 'left', vertical: 
						'top'}}
						targetOrigin={{horizontal: 'left', vertical: 
							'top'}}
							onRequestClose={this.handleRequestClose}
						>
							<Menu>
								{
									Object.keys(loginUrls.items).map(key => (
										<MenuItem 
											key={key}
											children={<a href={loginUrls.items[key]}>
												{key}
											</a>}
										/>
									)
									)
								}
							</Menu>
						</Popover>
					</div>
		)
	}
}

LoginUrls.propTypes = {
	loginUrls: PropTypes.object.isRequired, 
	loadLoginUrls: PropTypes.func.isRequired
}

export default LoginUrls
