import React, {Component}  from "react"
import PropTypes, {instanceOf} from "prop-types"
import {Cookies} from "react-cookie"
import {Link} from "react-router"
import IconMenu from "material-ui/IconMenu"
import IconButton from "material-ui/IconButton"
import Avatar from "material-ui/Avatar"
import MenuItem from "material-ui/MenuItem"
import {Card, CardHeader} from "material-ui/Card"
import Divider from "material-ui/Divider"
import ChevronLeft from "material-ui/svg-icons/navigation/chevron-left"
import Language from "material-ui/svg-icons/action/language"
import SignOut from "material-ui/svg-icons/action/exit-to-app"
import {getRouteContents} from "./utilities"

const styles = {
	divider: {
		marginTop: 0
	}, 
	iconButton: {
		padding: 0
	}, 
	iconMenu: {
		listStyle: {
			paddingTop: 0
		}
	}, 
	card: {
		boxShadow: "none"
	}, 
	cardHeader: {
		textStyle: {
			paddingRight: 0
		}
	}, 
	a: {
		textDecoration: "none"
	}
}

class Logged extends Component {
	constructor(props) {
		super(props)
		this.state = {
			lang: this.props.lang
		}
	}
	componentWillMount() {
		this.props.getLanguages()
	}
	render() {
		const {
			contents, 
			account, 
			user, 
			cookies, 
			languages, 
			routeContentsResetAll, 
			getRouteContents: get, 
			signOutURL
		} = this.props
		// MODIFY THIS SESSION CONTROL !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		// "ACSID" is for prod, and "dev_appserver_login is for development.
		// true is optional "doNotParse" arg.
		// If not specified get() deserialize any cookies starting with "{" or "[".
		const session = cookies.get("ACSID", true) || 
			cookies.get("dev_appserver_login", true)
		return (
			<IconMenu
				iconButtonElement={
					<IconButton 
						style= {styles.iconButton}
					>
						<Avatar src={user.photo.path || "/img/adele.jpg"} />
					</IconButton>
				}
				targetOrigin={{horizontal: "right", vertical: "top"}}
				anchorOrigin={{horizontal: "right", vertical: "top"}}
				listStyle={styles.iconMenu.listStyle}
			>
				<Card style={styles.card}>
					<CardHeader
						title={user.email}
						subtitle={`${contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgIabCAw"]}: 4`} 
						textStyle={styles.cardHeader.textStyle}
						avatar={user.photo.path || "/img/adele.jpg"}
					/>
				</Card>
				<Divider style={styles.divider} />
				{
					Object.values(languages).length !== 0 && 
						<MenuItem 
							primaryText={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgJaDCgw"]}
							leftIcon={<ChevronLeft />}
							rightIcon={<Language />}
							menuItems={
								Object.values(languages).
									map(
										l => 
										<MenuItem 
											key={l.ID}
											primaryText={contents[l.name]} 
											checked={l.ID === this.state.lang}
											insetChildren={true}
											onTouchTap={() => {
												cookies.set("lang", l.ID)
												routeContentsResetAll()
			get({
				URL: "/contents?pageID=body", 
				key: "body"
			})
												getRouteContents(session, {}, this.props)
												this.setState({lang: l.ID})
											}}
										/>
									)
							}
						/>
				}
				<a 
					href={signOutURL}
					style={styles.a}
				>
					<MenuItem 
						primaryText={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgJb9CAw"]}
						insetChildren={true}
						rightIcon={<SignOut />}
					/>
				</a>
			</IconMenu>
		)
	}
}

Logged.propTypes = {
	contents: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired, 
	account: PropTypes.object.isRequired, 
	lang: PropTypes.string.isRequired, 
	cookies: instanceOf(Cookies).isRequired, 
	languages: PropTypes.object.isRequired, 
	getLanguages: PropTypes.func.isRequired, 
	getRouteContents: PropTypes.func.isRequired,
	routeContentsResetAll: PropTypes.func.isRequired,
	signOutURL: PropTypes.string.isRequired
}

// My custom "Logged" component acts like "IconMenu" mui component !!!!!!!!!!!!!!!!!!!!!!!
Logged.muiName = "IconMenu"

export default Logged
