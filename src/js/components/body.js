import React, {Component}  from "react"
import PropTypes from 'prop-types'
import cookie from 'react-cookie'
import LinearProgress from 'material-ui/LinearProgress'
import AppBar from 'material-ui/AppBar'
import Login from '../containers/login'
import LoginUrls  from '../containers/loginUrls'
import Logged  from '../components/logged'
import Drawer from '../containers/drawer'
import ErrorMsg  from '../containers/errorMsg'

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
		if (this.session)
			this.props.loadData()
		this.state = {completed: 0}
		// IT IS POSIBLE TO CALL THE FUNCTION EVEN BELOW BINDING !!!!!!!!!!!!!!!!!!
		this.progress = this.progress.bind(this)
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
			// acc, 
			user, 
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
				<AppBar
					title="User Name"
					showMenuIconButton={this.session !== undefined}
					iconElementRight={this.session === undefined ?
							<LoginUrls />
							:
							<Logged />
					}
					onLeftIconButtonTouchTap={() => toggleDrawer()}
				/>
				{
					isFetching && <LinearProgress 
						mode="determinate" 
						value={this.state.completed} 
					/>
				}
				{this.session && <Drawer {...this.props} />}
				{this.session ? children : <Login />}
				{<ErrorMsg />}
			</div>
		)
	}
}

Body.defaultProps = {
	acc: {}, 
	user: {}
}

Body.propTypes = {
	theme: PropTypes.object.isRequired,
	isFetching: PropTypes.bool.isRequired,
	acc: PropTypes.object,
	user: PropTypes.object,
	loadData: PropTypes.func.isRequired,
	toggleDrawer: PropTypes.func.isRequired,
	children: PropTypes.node.isRequired
}

export default Body
