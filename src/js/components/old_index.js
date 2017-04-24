import React, {Component}  from "react"
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import bodyContainer from '../containers'
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import {green100, green500, green700} from 'material-ui/styles/colors'
import AppBar from 'material-ui/AppBar'
import Login  from './login'
import Logged  from './logged'
import Toggle from 'material-ui/Toggle'
import FlatButton from 'material-ui/FlatButton'
import ToDos  from '../containers/todos'
// Needed for onTouchTap, REMOVE WHEN REACT HAS THIS FEATURE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// It's a mobile friendly onClick() alternative for all components in Material-UI 
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

// Creating custom theme or manipulating the current one. 
// And also setting userAgent for server rendering.
const muiTheme = getMuiTheme({
	// setting userAgent for server rendering !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	// userAgent: req.headers['user-agent'],
	/* palette: {
		primary1Color: green500,
		primary2Color: green700,
		primary3Color: green100,
	}, */
	// Customising specifically a component
	/* avatar: {
		borderColor: null,
	},
	appBar: {
		height: 50,
	}, */
})

class Body extends Component {
	constructor(props) {
		super(props)
		this.state = {
			muiTheme: muiTheme,
			logged: true
		}
		this.changeTheme = this.changeTheme.bind(this)
		this.handleLoggedToggle = this.handleLoggedToggle.bind(this)
	}
	getChildContext() {
		// ALSO USE CONTEXT FOR LANGUAGE and ACCOUNT/USER DATA !!!!!!!!!!!!!!!!!!!!
		// Should i store lang in cookie like theme info ???
		return {
			muiTheme: this.state.muiTheme
		}
	}
	/* componentDidMount() {
	// Get user theme info from cookie and apply !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		this.changeTheme(userT)
		this.accountAndUserData = $.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({aAndUData: data})
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString())
			}.bind(this)
		})
	} */
	changeTheme() {
		if (this.state.muiTheme === muiTheme) {
			this.setState({muiTheme: getMuiTheme(darkBaseTheme)})
		} else {
			this.setState({muiTheme: muiTheme})
		}
	}
	handleLoggedToggle() {
		this.setState({logged: !this.state.logged})
	}
	render() {
		const {user} = this.props.params
		{user === "MerinEREN" && console.log(user)}
		return (
			<div
				style={{backgroundColor: 
					this.state.muiTheme.palette.canvasColor}}
			>
				<AppBar
					title="User Name"
					iconElementRight={this.state.logged ? <Logged /> : 
						<Login />}
				/>
				<FlatButton
					label="Change Theme"
					primary={true}
					onTouchTap={this.changeTheme}
				/>
				<Toggle
					label="Logged"
					defaultToggled={true}
					onToggle={this.handleLoggedToggle}
					labelPosition="right"
					style={{margin: 20}}
				/>
				{user !== "MerinEREN" && 
						<Link
							style={{color: this.state.muiTheme.
								palette.textColor}}
						to="MerinEREN"
						activeStyle={{
							textDecoration: 'none',
							color: 'black'
						}}
					>
						Navigate to Merin
					</Link>
				}
				<ToDos />
			</div>
		)
	}
	/* componentWillUnmount() {
		this.accountAndUserData.abort()
	} */
}

Body.childContextTypes = {
	muiTheme: PropTypes.object.isRequired
}

export default connect(bodyContainer)(Body)
