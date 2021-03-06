import React, {Component} from "react"
import PropTypes from "prop-types"
import FlatButton from "material-ui/FlatButton"
import Popover from "material-ui/Popover"
import Menu from "material-ui/Menu"
import MenuItem from "material-ui/MenuItem"

const styles = {
	a: {
		textDecoration: "none"
	}
}

class Signin extends Component {
	constructor(props) {
		super(props)
		this.state = {
			open: false
		}
		this.handleTouchTap = this.handleTouchTap.bind(this)
		this.handleRequestClose = this.handleRequestClose.bind(this)
	}
	componentWillMount() {
		this.props.loginUrlsGet()
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
		const {
			contexts, 
			loginUrls 
		} = this.props
		return (
			<div>
				<FlatButton
					label={contexts["aghkZXZ-Tm9uZXITCxIHQ29udGVudCIGTG9nIGluDA"].value || "Log in"}
					onTouchTap={this.handleTouchTap}
				/>
				<Popover
					open={this.state.open}
					anchorEl={this.state.anchorEl}
					anchorOrigin={{horizontal: "right", vertical: "top"}}
					targetOrigin={{horizontal: "right", vertical: "top"}}
					onRequestClose={this.handleRequestClose}
				>
					<Menu>
						{
							Object.entries(loginUrls).map(([k, v]) => (
								<a 
									key={k}
									href={v}
									style={styles.a}
								>
									<MenuItem 
										primaryText={k}
									/>
								</a>
							))
						}
					</Menu>
				</Popover>
			</div>
		)
	}
}

Signin.propTypes = {
contexts: PropTypes.object.isRequired,
loginUrls: PropTypes.object.isRequired, 
loginUrlsGet: PropTypes.func.isRequired
}

export default Signin
