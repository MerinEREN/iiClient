import React, {Component} from 'react'
import PropTypes from 'prop-types'
import FlatButton from 'material-ui/FlatButton'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'

const styles = {
	a: {
		textDecoration: 'none'
	}
}

class LoginUrls extends Component {
	constructor(props) {
		super(props)
		this.state = {
			open: false
		}
		this.handleTouchTap = this.handleTouchTap.bind(this)
		this.handleRequestClose = this.handleRequestClose.bind(this)
	}
	componentWillMount() {
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
					anchorOrigin={{horizontal: 'right', vertical: 'top'}}
					targetOrigin={{horizontal: 'right', vertical: 'top'}}
					onRequestClose={this.handleRequestClose}
				>
					<Menu>
						{
							Object.keys(loginUrls.items).map(key => (
								<a 
									key={key}
									href={loginUrls.items[key]}
									style={styles.a}
								>
									<MenuItem 
										primaryText={key}
									/>
								</a>
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
