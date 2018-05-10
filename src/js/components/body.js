import React, {Component}  from "react"
import PropTypes, {instanceOf} from 'prop-types'
import {Cookies, withCookies} from 'react-cookie'
import muiThemeable from 'material-ui/styles/muiThemeable'
import LinearProgress from 'material-ui/LinearProgress'
import AppBar from 'material-ui/AppBar'
import Snackbar from 'material-ui/Snackbar'
import {ToolbarGroup} from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import Badge from 'material-ui/Badge'
import NotificationsIcon from 'material-ui/svg-icons/social/notifications'
import Login from '../containers/login'
import LoginUrls  from '../containers/loginUrls'
import Logged  from '../containers/logged'
import Drawer from '../containers/drawer'

class Body extends Component {
	constructor(props) {
		super(props)
		// MODIFY THIS SESSION CONTROL !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		// 'ACSID' is for prod, and 'dev_appserver_login is for development.
		// true is optional "doNotParse" arg.
		// If not specified get() deserialize any cookies starting with "{" or "[".
		const {cookies} = this.props
		this.session = cookies.get('ACSID', true) 
				|| 
				cookies.get('dev_appserver_login', true)
		this.state = {completed: 0}
		// IT IS POSIBLE TO CALL THE FUNCTION EVEN BELOW BINDING !!!!!!!!!!!!!!!!!!
		this.progress = this.progress.bind(this)
	}
	componentWillMount() {
		if (this.session)
			this.props.loadData()
	}
	componentWillReceiveProps(nextProps) {
		if (!nextProps.isFetching) {
			this.setState({completed: 100})
		} else {
			this.progress(5)
		}
	}
	componentWillUnmount() {
		clearTimeout(this.timer)
	}
	// API call progress.
	progress(completed) {
		if (completed > 100) {
			this.setState({completed: 100})
		} else {
			this.setState({completed})
			const diff = Math.random() * 10
			this.timer = setTimeout(
				//() => this.progress(completed + diff), 
				this.progress(completed + diff), 
				50)
		}
	}
	render() {
		const {
			muiTheme, 
			isFetching, 
			snackbars, 
			account, 
			user, 
			toggleDrawer, 
			children
		} = this.props
		this.styles = {
			div: {
				backgroundColor: muiTheme.palette.canvasColor, 
				height: '100vh'
				// opacity: this.session ? 1 : 0.5
			}, 
			appBar: {
				fontStyle: "italic"
			}, 
			badge: {
				badgeStyle: {
					display: (this.session && 5) ? "flex" : "none", 
					width: 21, 
					height: 21, 
					zIndex: 1, 
					top: 12, 
					right: 13
				}, 
				style: {
					display: (this.session) ? "flex" : "none", 
					paddingTop: 5 ? 8 : 0, 
					paddingRight: 5 ? 14 : 0, 
					paddingBottom: 0, 
					paddingLeft: 0 
				}
			}
		}
		return (
			<div
				style={this.styles.div}
			>
				{
					isFetching && <LinearProgress 
						mode="determinate" 
						value={this.state.completed} 
					/>
				}
				<AppBar
					title={user.email || "Ince Is"}
					style={this.styles.appBar}
					showMenuIconButton={this.session !== undefined}
					onLeftIconButtonTouchTap={() => toggleDrawer()}
				>
					<ToolbarGroup>
							<Badge 
								badgeContent={5} 
								secondary={true} 
								badgeStyle={this.styles.badge.badgeStyle}
								style={this.styles.badge.style}
							>
								<IconButton 
									tooltip="Notifications"
								>
									<NotificationsIcon/>
								</IconButton>
							</Badge>
						{
							this.session === undefined 
								?
								<LoginUrls />
								:
								<Logged 
									account= {account} 
									user={user} 
								/>
						}
					</ToolbarGroup>
				</AppBar>
				{this.session && <Drawer {...this.props} />}
				{this.session ? children : <Login />}
				{
					Object.entries(snackbars).map(([k, v]) => 
						<Snackbar
							key={k}
							open={true} 
							message={v.message}
							autoHideDuration={v.duration || 5000}
							action={v.action}
							onActionTouchTap={v.onActionClick}
							onRequestClose={v.onRequestClose}
						/>
					)
				}
			</div>
		)
	}
}

Body.defaultProps = {
	account: {
		photo: {}
	}, 
	user: {
		photo: {}, 
		roles: []
	}
}

Body.propTypes = {
	cookies: instanceOf(Cookies).isRequired, 
	muiTheme: PropTypes.object.isRequired,
	isFetching: PropTypes.bool.isRequired,
	account: PropTypes.object,
	user: PropTypes.object,
	loadData: PropTypes.func.isRequired,
	toggleDrawer: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired, 
	snackbars: PropTypes.object
}

export default withCookies(muiThemeable()(Body))
