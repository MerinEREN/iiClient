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

class Signed extends Component {
	constructor(props) {
		super(props)
		this.state = {
			lang: this.props.lang
		}
	}
	componentWillMount() {
		const {
			userLoggedGet, 
			userRolesGet, 
			userTagsGet, 
			languagesGet, 
			signOutURLGet
		} = this.props
		userLoggedGet().then(() => { 
			userRolesGet(
				{
					URL: `/userRoles/${this.props.user.ID}`, 
					key: this.props.user.ID
				}
			)
			userTagsGet(
				{
					URL: `/userTags/${this.props.user.ID}`, 
					key: this.props.user.ID
				}
			)
		})
		languagesGet()
		signOutURLGet()
	}
	selectLanguage(langID) {
		const {
			cookies, 
			routeContentsResetAll, 
			getRouteContents: get, 
			session
		} = this.props
		cookies.set("lang", langID)
		routeContentsResetAll()
		get({
			URL: "/contents?pageID=body", 
			key: "body"
		})
		getRouteContents(session, {}, this.props)
		this.setState({lang: langID})
	}
	render() {
		const {
			contents, 
			user, 
			languages, 
			signOutURL
		} = this.props
		return (
			<IconMenu
				iconButtonElement={
					<IconButton 
						style= {styles.iconButton}
					>
						<Avatar src={user.link || "/img/adele.jpg"} />
					</IconButton>
				}
				targetOrigin={{horizontal: "right", vertical: "top"}}
				anchorOrigin={{horizontal: "right", vertical: "top"}}
				listStyle={styles.iconMenu.listStyle}
			>
				<Card style={styles.card}>
					<CardHeader
						title={user.email}
						subtitle={`Score ${contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgIabCAw"]}: 4`} 
						textStyle={styles.cardHeader.textStyle}
						avatar={user.link || "/img/adele.jpg"}
					/>
				</Card>
				<Divider style={styles.divider} />
				{
					Object.values(languages).length !== 0 && 
						<MenuItem 
							primaryText={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgJaDCgw"] || "Language"}
							leftIcon={<ChevronLeft />}
							rightIcon={<Language />}
							menuItems={
								Object.values(languages).
									map(
										l => 
										<MenuItem 
											key={l.ID}
											primaryText={contents[l.contentID]} 
											checked={l.ID === this.state.lang}
											insetChildren={true}
											onTouchTap={() => this.selectLanguage(l.ID)}
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
						primaryText={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgJb9CAw"] || "Log out"}
						insetChildren={true}
						rightIcon={<SignOut />}
					/>
				</a>
			</IconMenu>
		)
	}
}

Signed.propTypes = {
	session: PropTypes.string.isRequired,
	cookies: instanceOf(Cookies).isRequired, 
	contents: PropTypes.object.isRequired,
	lang: PropTypes.string.isRequired, 
	languagesGet: PropTypes.func.isRequired, 
	languages: PropTypes.object.isRequired, 
	userLoggedGet: PropTypes.func.isRequired, 
	user: PropTypes.object.isRequired, 
	userRolesGet: PropTypes.func.isRequired, 
	userTagsGet: PropTypes.func.isRequired, 
	signOutURLGet: PropTypes.func.isRequired, 
	signOutURL: PropTypes.string.isRequired, 
	routeContentsResetAll: PropTypes.func.isRequired,
	getRouteContents: PropTypes.func.isRequired
}

// My custom "Signed" component acts like "IconMenu" mui component !!!!!!!!!!!!!!!!!!!!!!!
Signed.muiName = "IconMenu"

export default Signed
