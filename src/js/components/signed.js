import React, {Component}  from "react"
import PropTypes, {instanceOf} from "prop-types"
import {Cookies} from "react-cookie"
import IconMenu from "material-ui/IconMenu"
import IconButton from "material-ui/IconButton"
import Avatar from "material-ui/Avatar"
import MenuItem from "material-ui/MenuItem"
import {Card, CardHeader} from "material-ui/Card"
import Divider from "material-ui/Divider"
import ChevronLeft from "material-ui/svg-icons/navigation/chevron-left"
import Language from "material-ui/svg-icons/action/language"
import SignOut from "material-ui/svg-icons/action/exit-to-app"
import {contextsGet} from "./utilities"

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

class Signed extends Component {
	constructor(props) {
		super(props)
		this.state = {
			lang: this.props.lang
		}
	}
	componentWillMount() {
		const {
			userGet, 
			photosGet, 
			rolesUserGet, 
			tagsUserGet, 
			languagesGet, 
			signOutURLGet
		} = this.props
		this.URL = new URL("/users/", window.location.href)
		userGet({
			URL: this.URL, 
			key: "logged"
		}).then(response => { 
			if (response.ok) {
				this.URL.pathname = "/photos"
				this.URL.searchParams.set("pID", response.ID)
				this.URL.searchParams.set("type", "main")
				photosGet({
					URL: this.URL, 
					key: response.ID
				})
				this.URL.pathname = "/rolesUser"
				this.URL.searchParams.delete("type")
				this.URL.searchParams.delete("pID")
				this.URL.searchParams.set("uID", response.ID)
				rolesUserGet({
					URL: this.URL, 
					key: response.ID
				})
				this.URL.pathname = "/tagsUser"
				tagsUserGet({
					URL: this.URL, 
					key: response.ID
				})
				signOutURLGet()
			} else {
				// Redirect unauthorized login attempts.
				// USE RETURNED HEADER LINK TO REDIRECT !!!!!!!!!!!!!!!!!!!
				browserHistory.push("/unauthorized")
			}
		})
		languagesGet()
	}
	languageSelect(lID) {
		const {
			cookies, 
			contextsResetAll, 
			contextsGet: get, 
			session
		} = this.props
		cookies.set("lang", lID)
		contextsResetAll()
		this.URL.pathname = "/contexts"
		this.URL.searchParams.set("pID", "body")
		get({
			URL: this.URL, 
			key: "body"
		})
		contextsGet(session, {}, this.props)
		this.setState({lang: lID})
	}
	render() {
		const {
			contexts, 
			user, 
			userPhoto, 
			languages, 
			signOutURL
		} = this.props
		return (
			<IconMenu
				iconButtonElement={
					<IconButton 
						style= {styles.iconButton}
					>
						<Avatar src={userPhoto.link || "/img/adele.jpg"} />
					</IconButton>
				}
				targetOrigin={{horizontal: "right", vertical: "top"}}
				anchorOrigin={{horizontal: "right", vertical: "top"}}
				listStyle={styles.iconMenu.listStyle}
			>
				<Card style={styles.card}>
					<CardHeader
						title={user.email}
						subtitle={`${contexts["aghkZXZ-Tm9uZXISCxIHQ29udGVudCIFU2NvcmUM"].value}: 4`} 
						textStyle={styles.cardHeader.textStyle}
						avatar={userPhoto.link || "/img/adele.jpg"}
					/>
				</Card>
				<Divider style={styles.divider} />
				{
					Object.keys(languages).length > 1 && 
						<MenuItem 
							primaryText={contexts["aghkZXZ-Tm9uZXIVCxIHQ29udGVudCIITGFuZ3VhZ2UM"].value || "Language"}
							leftIcon={<ChevronLeft />}
							rightIcon={<Language />}
							menuItems={
								Object.values(languages).
									map(
										l => 
										<MenuItem 
											key={l.ID}
											primaryText={contexts[l.contextID].value} 
											checked={l.ID === this.state.lang}
											insetChildren={true}
											onTouchTap={() => this.languageSelect(l.ID)}
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
						primaryText={contexts["aghkZXZ-Tm9uZXIUCxIHQ29udGVudCIHTG9nIG91dAw"].value || "Log out"}
						insetChildren={true}
						rightIcon={<SignOut />}
					/>
				</a>
			</IconMenu>
		)
	}
}

Signed.defaultProps = {
	userPhoto: {}
}

Signed.propTypes = {
	cookies: instanceOf(Cookies).isRequired, 
	session: PropTypes.string.isRequired,
	lang: PropTypes.string.isRequired, 
	contexts: PropTypes.object.isRequired,
	user: PropTypes.object.isRequired, 
	userPhoto: PropTypes.object, 
	languages: PropTypes.object.isRequired, 
	signOutURL: PropTypes.string.isRequired, 
	contextsGet: PropTypes.func.isRequired, 
	userGet: PropTypes.func.isRequired, 
	photosGet: PropTypes.func.isRequired, 
	rolesUserGet: PropTypes.func.isRequired, 
	tagsUserGet: PropTypes.func.isRequired, 
	languagesGet: PropTypes.func.isRequired, 
	signOutURLGet: PropTypes.func.isRequired, 
	contextsResetAll: PropTypes.func.isRequired
}

// My custom "Signed" component acts like "IconMenu" mui component !!!!!!!!!!!!!!!!!!!!!!!
Signed.muiName = "IconMenu"

export default Signed
