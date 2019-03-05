import React, {Component}  from "react"
import PropTypes, {instanceOf} from "prop-types"
import {Cookies, withCookies} from "react-cookie"
import muiThemeable from "material-ui/styles/muiThemeable"
import LinearProgress from "material-ui/LinearProgress"
import AppBar from "material-ui/AppBar"
import Snackbar from "material-ui/Snackbar"
import {ToolbarGroup} from "material-ui/Toolbar"
import IconButton from "material-ui/IconButton"
import Badge from "material-ui/Badge"
import NotificationsIcon from "material-ui/svg-icons/social/notifications"
import FloatingActionButton from "material-ui/FloatingActionButton"
import ContentAdd from "material-ui/svg-icons/content/add"
import Unauthorized from "./unauthorized"
import Signin  from "../containers/signin"
import Signed  from "../containers/signed"
import Drawer from "../containers/drawer"
import DialogDemand from "../containers/dialogDemand"
import {getRouteContents} from "./utilities"

class Body extends Component {
	constructor(props) {
		super(props)
		// MODIFY THIS SESSION CONTROL !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		// "ACSID" is for prod, and "dev_appserver_login is for development.
		// true is optional "doNotParse" arg.
		// If not specified get() deserialize any cookies starting with "{" or "[".
		const {cookies} = this.props
		this.session = cookies.get("ACSID", true) || 
			cookies.get("dev_appserver_login", true)
		this.lang = cookies.get("lang", true)
		if (!this.lang) {
			this.lang = window.navigator.language
			cookies.set("lang", this.lang)
		}
		this.state = {
			completed: 0, 
			showDialog: false
		}
		this.toggleDialog = this.toggleDialog.bind(this)
	}
	componentWillMount() {
		this.props.getRouteContents({
			URL: "/contents?pageID=body", 
			key: "body"
		})
		getRouteContents(this.session, {}, this.props)
	}
	componentWillReceiveProps(nextProps) {
		if (!nextProps.isFetching) {
			this.setState({completed: 100})
		} else {
			this.progress(5)
		}
		getRouteContents(this.session, this.props, nextProps)
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
				() => this.progress(completed + diff), 
				50)
		}
	}
	toggleDialog() {
		const {
			showDialog
		} = this.state
		// Getting most used six tags to show as initial autocomplete values 
		// if they does not exist yet.
		this.props.tagsByFilterGet({
			URL: "/tags?st=top", 
			key: "top"
		})
		this.setState({showDialog: !showDialog})
	}
	render() {
		const {
			showDialog
		} = this.state
		const {
			location, 
			muiTheme, 
			isFetching, 
			snackbars, 
			contents, 
			user, 
			userTags, 
			cookies, 
			toggleDrawer, 
			children, 
			timeline, 
			landingPage
		} = this.props
		this.styles = {
			div: {
				backgroundColor: muiTheme.palette.canvasColor, 
				height: "100vh"
				// opacity: this.session ? 1 : 0.5
			}, 
			appBar: {
				fontStyle: "italic"
			}, 
			badge: {
				badgeStyle: {
					display: this.session ? "flex" : "none", 
					width: 21, 
					height: 21, 
					Index: 1, 
					top: 12, 
					right: 13
				}, 
				style: {
					display: this.session ? "flex" : "none", 
					paddingTop: 5 ? 8 : 0, 
					paddingRight: 5 ? 14 : 0, 
					paddingBottom: 0, 
					paddingLeft: 0 
				}
			}, 
			floatingActionButton: {
				position: "fixed",
				bottom: 32, 
				right: 48
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
				{
					(user.status !== "deleted" && user.status !== "suspended") && 
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
										tooltip={contents["aghkZXZ-Tm9uZXIaCxIHQ29udGVudCINTm90aWZpY2F0aW9ucww"] || "notifications"}
									>
										<NotificationsIcon/>
									</IconButton>
								</Badge>
								{
									this.session ?
										<Signed 
											{...this.props} 
											session={this.session}
											lang={this.lang}
										/> :
										<Signin 
											contents={contents} 
										/>
								}
							</ToolbarGroup>
						</AppBar>
				}
				{(this.session && user.status !== "deleted" && user.status !== "suspended") && <Drawer {...this.props} />}
				{
					this.session ? 
						(
							(user.status !== "deleted" && user.status !== "suspended") ?
							(
								location.pathname === "/" ? 
								(
									userTags && Object.keys(userTags).length ? 
									timeline : 
									landingPage
								) : 
								children
							) : 
							<Unauthorized />
						) : 
						landingPage
				}
				{
					(
						!showDialog && 
						this.session && 
						(user.status !== "deleted" && user.status !== "suspended") && 
						location.pathname === "/"
					) && 
						<FloatingActionButton 
							secondary={true}
							style={this.styles.floatingActionButton}
							onTouchTap={this.toggleDialog}
						>
							<ContentAdd />
						</FloatingActionButton>
				}
				<DialogDemand
					contents={contents} 
					title={contents["aghkZXZ-Tm9uZXIgCxIHQ29udGVudCITQ3JlYXRlIEEgTmV3IERlbWFuZAw"] || "Create A New Demand"}
					showDialog={showDialog} 
					uID={user.ID}
					toggleDialog={this.toggleDialog}
				/>
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
	contents: {}
}

Body.propTypes = {
	cookies: instanceOf(Cookies).isRequired, 
	muiTheme: PropTypes.object.isRequired,
	isFetching: PropTypes.bool.isRequired,
	user: PropTypes.object,
	userTags: PropTypes.object,
	contents: PropTypes.object.isRequired,
	getRouteContents: PropTypes.func.isRequired,
	tagsByFilterGet: PropTypes.func.isRequired, 
	toggleDrawer: PropTypes.func.isRequired,
	children: PropTypes.node, 
	timeline: PropTypes.node, 
	landingPage: PropTypes.node, 
	snackbars: PropTypes.object
}

export default withCookies(muiThemeable()(Body))
