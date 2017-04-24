import React, {Component}  from "react"
import PropTypes from 'prop-types'
import cookie from 'react-cookie'
import {IndexLink, Link} from 'react-router'
import LinearProgress from 'material-ui/LinearProgress'
import AppBar from 'material-ui/AppBar'
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton'
import Drawer from 'material-ui/Drawer'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye'
import PersonAdd from 'material-ui/svg-icons/social/person-add'
import ContentLink from 'material-ui/svg-icons/content/link'
import ContentCopy from 'material-ui/svg-icons/content/content-copy'
import Download from 'material-ui/svg-icons/file/file-download'
import Delete from 'material-ui/svg-icons/action/delete'
import Login  from '../containers/loginUrls'
import Logged  from '../components/logged'
import ErrorMsg  from '../containers/errorMsg'
import Toggle from 'material-ui/Toggle'
import Divider from 'material-ui/Divider'

class Body extends Component {
	constructor(props) {
		super(props)
		// MODIFY THIS SESSION CONTROL !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		// 'ACSID' is for prod, and 'dev_appserver_login is for development.
		// true is optional "doNotParse" arg.
		// If not specified load() deserialize any cookie starting with "{" or "[".
		this.session = cookie.load('ACSID', true) 
			|| 
			cookie.load('dev_appserver_login', true)
		this.state = {completed: 0}
		// IT IS POSIBLE TO CALL FUNCTION EVEN BELOW BINDING !!!!!!!!!!!!!!!!!!!!!!
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
			theme, 
			isFetching, 
			acc, 
			user, 
			open, 
			changeTheme, 
			toggleDrawer, 
			children
		} = this.props
		return (
			<div
				style={{
					backgroundColor: theme.value.palette.canvasColor,
					opacity: this.session ? 1 : 0.5
				}}
			>
				{
					isFetching
						&&
						<LinearProgress 
							mode="determinate" 
							value={this.state.completed} 
						/>
				}
				{
					this.session
					&& 
					acc
					&&
					user
					&&
					<Drawer open={open}>
						<AppBar
							title="User Name"
							onLeftIconButtonTouchTap={() => 
									toggleDrawer()}
								/>
								<Menu>
									<MenuItem leftIcon={<RemoveRedEye />}>
										<IndexLink
											style={{textDecoration: 'none', 
												color: theme.value.
												palette.textColor}}
												to="/"
												activeStyle={{
													textDecoration: 
													'none', 
													color: '#0097a7'
												}}
											>
												Home
											</IndexLink>
										</MenuItem>
										<MenuItem leftIcon={<PersonAdd />} children={<Link
												style={{textDecoration: 'none', 
													color: theme.value.
													palette.textColor}}
													to={"/accounts/" + acc.id}
													activeStyle={{
														textDecoration: 
														'none', 
														color: '#0097a7'
													}}
												>Account</Link>} />
											<MenuItem>
												<Link
													style={{textDecoration: 'none', 
														color: theme.value.
														palette.textColor}}
														to={"/" + acc.id + "/Demands"}
														activeStyle={{
															textDecoration: 
															'none', 
															color: '#0097a7'
														}}
													>
														Demands
													</Link>
												</MenuItem>
												<MenuItem>
													<Link
														style={{textDecoration: 'none', 
															color: theme.value.
															palette.textColor}}
															to={"/" + acc.id + "/Offers"}
															activeStyle={{
																textDecoration: 
																'none',
																color: '#0097a7'
															}}
														>
															Offers
														</Link>
													</MenuItem>
													<MenuItem>
														<Link
															style={{textDecoration: 'none', 
																color: theme.value.
																palette.textColor}}
																to={"/" + acc.id + "/ServicePacks"}
																activeStyle={{
																	textDecoration: 
																	'none',
																	color: '#0097a7'
																}}
															>
																Service Packs
															</Link>
														</MenuItem>
													</Menu>
													<Divider />
													<Toggle
														label="Dark Theme"
														defaultToggled={theme.id === 'dark'}
														labelPosition='right'
														onToggle={() => changeTheme()}
														style={{margin: 20}}
													/>
													<Divider />
													<Menu>
														<MenuItem>
															<Link
																style={{textDecoration: 'none', 
																	color: theme.value.
																	palette.textColor}}
																	to="/Settings"
																	activeStyle={{
																		textDecoration: 
																		'none',
																		color: '#0097a7'
																	}}
																>
																	Settings
																</Link>
															</MenuItem>
															<MenuItem>
																<Link
																	style={{textDecoration: 'none', 
																		color: theme.value.
																		palette.textColor}}
																		to="/Feedback"
																		activeStyle={{
																			textDecoration: 
																			'none',
																			color: '#0097a7'
																		}}
																	>
																		Feedback
																	</Link>
																</MenuItem>
																<MenuItem>
																	<Link
																		style={{textDecoration: 'none', 
																			color: theme.value.
																			palette.textColor}}
																			to="/Help"
																			activeStyle={{
																				textDecoration: 'none',
																				color: '#0097a7'
																			}}
																		>
																			Help
																		</Link>
																	</MenuItem>
																</Menu>
															</Drawer>
				}
				<AppBar
					title="User Name"
					showMenuIconButton={this.session !== undefined}
					iconElementRight={this.session === undefined ?
							<Login />
							:
							<Logged />
					}
					onLeftIconButtonTouchTap={() => toggleDrawer()}
				/>
				{ErrorMsg}
				{children}
			</div>
		)
	}
}

Body.propTypes = {
	theme: PropTypes.object.isRequired,
	isFetching: PropTypes.bool.isRequired,
	open: PropTypes.bool.isRequired,
	acc: PropTypes.object,
	user: PropTypes.object,
	loadData: PropTypes.func.isRequired,
	changeTheme: PropTypes.func.isRequired,
	toggleDrawer: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired
}

export default Body
