import React, {Component}  from "react"
import PropTypes, {instanceOf} from "prop-types"
import {Cookies, withCookies} from "react-cookie"
import Link from "react-router/lib/Link"
import IndexLink from "react-router/lib/IndexLink"
import AppBar from "material-ui/AppBar"
import Drawer from "material-ui/Drawer"
import {List, ListItem} from "material-ui/List"
import {Card, CardMedia, CardTitle, CardText} from "material-ui/Card"
import {GridList, GridTile} from "material-ui/GridList"
import Badge from "material-ui/Badge"
import Avatar from "material-ui/Avatar"
import Chip from "material-ui/Chip"
import {blue300} from "material-ui/styles/colors"
import Toggle from "material-ui/Toggle"
import Divider from "material-ui/Divider"
import Skills from "material-ui/svg-icons/action/build"
import Time from "material-ui/svg-icons/action/alarm"
import Communication from "material-ui/svg-icons/action/record-voice-over"
import Account from "material-ui/svg-icons/action/account-circle"
import Dashboard from "material-ui/svg-icons/action/dashboard"
import Home from "material-ui/svg-icons/action/home"
import EditContent from "material-ui/svg-icons/content/create"
import ListAction from "material-ui/svg-icons/action/list"
import Settings from "material-ui/svg-icons/action/settings"
import Help from "material-ui/svg-icons/action/help"
import Feedback from "material-ui/svg-icons/action/feedback"
import {isAdmin, isContextEditor, firstLettersGenerate} from "./utilities"

const styles = {
	drawer: {
		containerStyle: {
			zIndex: 1099
		}
	}, 
	card: {
		containerStyle: {
			paddingBottom: 0
		}
	}, 
	cardTitle: {
		style: {
			padding: 0
		}
	}, 
	gridList: {
		paddingTop: 16
	}, 
	link: {
		activeStyle: {
			color: "#0097a7"
		}
	}
}

class MyDrawer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			open: false
		}
	}
	componentWillMount() {
		const {
			accountGet, 
			drawerToggle
		} = this.props
		let URL = new URL("/accounts/", window.location.href)
		accountGet({
			key: "logged", 
			URL
		}).then(response => {
			URL.pathname = "/photos"
			URL.searchParams.set("pID", response.ID)
			URL.searchParams.set("type", "main")
			photosGet({
				key: response.ID, 
				URL
			})
		}).then(response => drawerToggle())
	}
	TilesTag() {
		const {
			contexts, 
			tagsUser
		} = this.props
		return Object.entries(tagsUser).map(([i, v]) => 
			<GridTile key={i}>
				<Avatar 
					size={32}
					color={blue300}
				>
					{firstLettersGenerate(contexts[v.contextID].value)}
				</Avatar>
				{contexts[v.contextID].value}
			</GridTile>
		)
	}
	render() {
		const {
			contexts, 
			cookies, 
			user, 
			accountPhoto, 
			account, 
			rolesUser, 
			tagsUser, 
			open, 
			themeChange
		} = this.props
		return (
			<Drawer 
				open={open}
				containerStyle={styles.drawer.containerStyle}
			>
				<AppBar
					title={user.email}
					onLeftIconButtonTouchTap={() => drawerToggle()}
				/>
				{/*ADD ALL NECESSARY ACCOUNT INFO IN CARD !!!!!!!!!!!!!!!!!
				ALSO ADD THE ACCOUNT RANK AS SUBTITLE OF CardTitle !!!!!*/}
				<Card
					containerStyle={styles.card.containerStyle}
				>
					{/* BECAUSE OF "CardMedia" "actAsExpander" BUG I WRAPPED IT WITH
					"CardTitle". AND THE BEST WAY TO USE THE FEAUTURE IS USING IT WITH
					"CardTitle" IN "overlay" AT "CardMedia". */}
					<CardTitle 
						actAsExpander={true}
						style={styles.cardTitle.style}
					>
						<CardMedia
							overlay={
								<CardTitle 
									title={`${contexts["aghkZXZ-Tm9uZXISCxIHQ29udGVudCIFU2NvcmUM"].value}: 4`} 
								/>
							}
						>
							<img 
								src={accountPhoto.link || "/img/matrix.gif"} 
							/>
						</CardMedia>
					</CardTitle>
					<CardText expandable={true}>
						<List>
							<ListItem 
								leftIcon={<Skills />} 
								primaryText={`${contexts["aghkZXZ-Tm9uZXITCxIHQ29udGVudCIGU2tpbGxzDA"].value}: 4`} 
								disabled={true}
							/>
							<ListItem 
								leftIcon={<Time />} 
								primaryText={`${contexts["aghkZXZ-Tm9uZXITCxIHQ29udGVudCIGVGltaW5nDA"].value}: 3`} 
								disabled={true}
							/>
							<ListItem 
								leftIcon={<Communication />} 
								primaryText={`${contexts["aghkZXZ-Tm9uZXIaCxIHQ29udGVudCINQ29tbXVuaWNhdGlvbgw"].value}: 5`} 
									disabled={true}
							/>
						</List>
						{ 
							(
								tagsUser && 
								Object.keys(tagsUser).length > 0
							) && 
								<Divider />
						}
						{ 
							(
								tagsUser && 
								Object.keys(tagsUser).length > 0
							) && 
								<GridList 
									cols={1} 
									cellHeight="auto" 
									style={styles.gridList}
								>
									{this.TilesTag()}
								</GridList>
						}
					</CardText>
				</Card>
				<List>
					<ListItem 
						containerElement={
							<IndexLink
								to="/"
								activeStyle={styles.link.activeStyle}
							/>
						}
						primaryText={contexts["aghkZXZ-Tm9uZXIRCxIHQ29udGVudCIESG9tZQw"].value || "Home"}
						leftIcon={<Home />}
					/>
					<ListItem 
						containerElement={
							<Link
								to="/dashboard"
								activeStyle={styles.link.activeStyle}
							/>
						}
						primaryText={contexts["aghkZXZ-Tm9uZXIWCxIHQ29udGVudCIJRGFzaGJvYXJkDA"].value || "Dashboard"}
						leftIcon={<Dashboard />}
					/>
					{
						(user.type === "inHouse") && (isContextEditor(rolesUser) || isAdmin(rolesUser))
						&&
							<ListItem 
								containerElement={
									<Link
										to="/languages"
										activeStyle={styles.link.activeStyle}
									/>
								}
								primaryText={contexts["aghkZXZ-Tm9uZXIWCxIHQ29udGVudCIJTGFuZ3VhZ2VzDA"].value || "Languages"}
								leftIcon={<EditContent />}
							/>
					}
					{
						(user.type === "inHouse") && (isContextEditor(rolesUser) || isAdmin(rolesUser))
						&&
							<ListItem 
								containerElement={
									<Link
										to="/pages"
										activeStyle={styles.link.activeStyle}
									/>
								}
								primaryText={contexts["aghkZXZ-Tm9uZXISCxIHQ29udGVudCIFUGFnZXMM"].value || "Pages"}
								leftIcon={<EditContent />}
							/>
					}
					{
						(user.type === "inHouse") && (isContextEditor(rolesUser) || isAdmin(rolesUser))
						&&
							<ListItem 
								containerElement={
									<Link
										to="/contexts"
										activeStyle={styles.link.activeStyle}
									/>
								}
								primaryText={contexts["aghkZXZ-Tm9uZXIVCxIHQ29udGVudCIIQ29udGVudHMM"].value || "Contexts"}
								leftIcon={<EditContent />}
							/>
					}
					{
						(user.type === "inHouse") && (isAdmin(rolesUser))
						&&
							<ListItem 
								containerElement={
									<Link
										to="/tags"
										activeStyle={styles.link.activeStyle}
									/>
								}
								primaryText={contexts["aghkZXZ-Tm9uZXIRCxIHQ29udGVudCIEVGFncww"].value || "Tags"}
								leftIcon={<EditContent />}
							/>
					}
					{
						(user.type === "inHouse") && (isAdmin(rolesUser))
						&&
							<ListItem 
								containerElement={
									<Link
										to="/roles"
										activeStyle={styles.link.activeStyle}
									/>
								}
								primaryText={contexts["aghkZXZ-Tm9uZXISCxIHQ29udGVudCIFUm9sZXMM"].value || "Roles"}
								leftIcon={<EditContent />}
							/>
					}
					{
						(user.type === "inHouse") && (isAdmin(rolesUser))
						&&
							<ListItem 
								containerElement={
									<Link
										to="/roleTypes"
										activeStyle={styles.link.activeStyle}
									/>
								}
								primaryText={contexts["aghkZXZ-Tm9uZXIXCxIHQ29udGVudCIKUm9sZSBUeXBlcww"].value || "Role Types"}
								leftIcon={<EditContent />}
							/>
					}
					<ListItem 
						containerElement={
							<Link
								to={"/accounts/" + account.ID}
								activeStyle={styles.link.activeStyle}
							/>
						} 
						primaryText={contexts["aghkZXZ-Tm9uZXIUCxIHQ29udGVudCIHUHJvZmlsZQw"].value || "Profile"}
						leftIcon={<Account />} 
					/>
					<ListItem 
						containerElement={
							<Link
								// add if at accounts page control to
								// attribute "to"
								// to={condition ? "/demands" : `/${account.ID}/demands`}
								to="/demands"
								activeStyle={styles.link.activeStyle}
							/>
						} 
						primaryText={contexts["aghkZXZ-Tm9uZXIUCxIHQ29udGVudCIHRGVtYW5kcww"].value || "Demands"}
						leftIcon={<ListAction />} 
					/>
					<ListItem 
						containerElement={
							<Link
								to="/offers"
								activeStyle={styles.link.activeStyle}
							/>
						} 
						primaryText={contexts["aghkZXZ-Tm9uZXITCxIHQ29udGVudCIGT2ZmZXJzDA"].value || "Offers"}
						leftIcon={<ListAction />} 
					/>
					<ListItem 
						containerElement={
							<Link
								to="/servicepacks"
								activeStyle={styles.link.activeStyle}
							/>
						} 
						primaryText={contexts["aghkZXZ-Tm9uZXIaCxIHQ29udGVudCINU2VydmljZSBQYWNrcww"].value || "Service Packs"}
						leftIcon={<ListAction />} 
					/>
				</List>
				<Divider />
				<List>
					<ListItem
						primaryText={contexts["aghkZXZ-Tm9uZXIXCxIHQ29udGVudCIKTmlnaHQgTW9kZQw"].value || "Night Mode"}
						rightToggle={
							<Toggle
								toggled={cookies.get("theme") === "dark"}
								onToggle={() => themeChange(cookies)}
							/>
						}
					/>
				</List>
				<Divider />
				<List>
					<ListItem 
						containerElement={
							<Link
								to="/settings"
								activeStyle={styles.link.activeStyle}
							/>
						} 
						primaryText={contexts["aghkZXZ-Tm9uZXIVCxIHQ29udGVudCIIU2V0dGluZ3MM"].value || "Settings"}
						leftIcon={<Settings />} 
					/>
					<ListItem 
						containerElement={
							<Link
								to="/help"
								activeStyle={styles.link.activeStyle}
							/>
						} 
						primaryText={contexts["aghkZXZ-Tm9uZXIRCxIHQ29udGVudCIESGVscAw"].value || "Help"}
						leftIcon={<Help />} 
					/>
					<ListItem 
						containerElement={
							<Link
								to="/feedback"
								activeStyle={styles.link.activeStyle}
							/>
						} 
						primaryText={contexts["aghkZXZ-Tm9uZXIVCxIHQ29udGVudCIIRmVlZGJhY2sM"].value || "Feedback"}
						leftIcon={<Feedback />} 
					/>
				</List>
			</Drawer>
		)
	}
}

MyDrawer.defaultProps = {
	account: {}, 
	accountPhoto: {}
}

MyDrawer.propTypes = {
	contexts: PropTypes.object.isRequired,
	cookies: instanceOf(Cookies).isRequired, 
	open: PropTypes.bool.isRequired,
	accountGet: PropTypes.func.isRequired, 
	account: PropTypes.object.isRequired,
	photosGet: PropTypes.func.isRequired, 
	accountPhoto: PropTypes.object,
	user: PropTypes.object.isRequired,
	rolesUser: PropTypes.object.isRequired,
	tagsUser: PropTypes.object,
	drawerToggle: PropTypes.func.isRequired,
	themeChange: PropTypes.func.isRequired
}

MyDrawer.muiName = "Drawer"

export default withCookies(MyDrawer)
