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
import {isAdmin, isContentEditor} from "./utilities"
import {getFirstLetters} from "./utilities"

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
			accountLoggedGet, 
			toggleDrawer
		} = this.props
		accountLoggedGet().then(toggleDrawer())
	}
	tagTiles() {
		const {
			contents, 
			userTags
		} = this.props
		return Object.entries(userTags).map(([i, v]) => 
			<GridTile key={i}>
				<Avatar 
					size={32}
					color={blue300}
				>
					{getFirstLetters(contents[v.contentID])}
				</Avatar>
				{contents[v.contentID]}
			</GridTile>
		)
	}
	render() {
		const {
			contents, 
			cookies, 
			user, 
			account, 
			userRoles, 
			userTags, 
			open, 
			changeTheme
		} = this.props
		return (
			<Drawer 
				open={open}
				containerStyle={styles.drawer.containerStyle}
			>
				<AppBar
					title={user.email}
					onLeftIconButtonTouchTap={() => toggleDrawer()}
				/>
				{/*ADD ALL NECESSARY ACCOUNT INFO IN CARD !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
				ALSO ADD THE ACCOUNT RANK AS SUBTITLE OF CardTitle !!!!!!!!!!!!!!!!!!!!!*/}
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
									title={`${contents["aghkZXZ-Tm9uZXISCxIHQ29udGVudCIFU2NvcmUM"]}: 4`} 
								/>
							}
						>
							<img 
								src={account.link || "/img/matrix.gif"} 
							/>
						</CardMedia>
					</CardTitle>
					<CardText expandable={true}>
						<List>
							<ListItem 
								leftIcon={<Skills />} 
								primaryText={`${contents["aghkZXZ-Tm9uZXITCxIHQ29udGVudCIGU2tpbGxzDA"]}: 4`} 
								disabled={true}
							/>
							<ListItem 
								leftIcon={<Time />} 
								primaryText={`${contents["aghkZXZ-Tm9uZXITCxIHQ29udGVudCIGVGltaW5nDA"]}: 3`} 
								disabled={true}
							/>
							<ListItem 
								leftIcon={<Communication />} 
								primaryText={`${contents["aghkZXZ-Tm9uZXIaCxIHQ29udGVudCINQ29tbXVuaWNhdGlvbgw"]}: 5`} 
									disabled={true}
							/>
						</List>
						{ 
							Object.keys(userTags).length > 0 && 
								<Divider />
						}
						{ 
							Object.keys(userTags).length > 0 && 
								<GridList 
									cols={1} 
									cellHeight="auto" 
									style={styles.gridList}
								>
									{this.tagTiles()}
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
						primaryText={contents["aghkZXZ-Tm9uZXIRCxIHQ29udGVudCIESG9tZQw"] || "Home"}
						leftIcon={<Home />}
					/>
					<ListItem 
						containerElement={
							<Link
								to="/dashboard"
								activeStyle={styles.link.activeStyle}
							/>
						}
						primaryText={contents["aghkZXZ-Tm9uZXIWCxIHQ29udGVudCIJRGFzaGJvYXJkDA"] || "Dashboard"}
						leftIcon={<Dashboard />}
					/>
					{
						(user.type === "inHouse") && (isContentEditor(userRoles) || isAdmin(userRoles))
						&&
							<ListItem 
								containerElement={
									<Link
										to="/languages"
										activeStyle={styles.link.activeStyle}
									/>
								}
								primaryText={contents["aghkZXZ-Tm9uZXIWCxIHQ29udGVudCIJTGFuZ3VhZ2VzDA"] || "Languages"}
								leftIcon={<EditContent />}
							/>
					}
					{
						(user.type === "inHouse") && (isContentEditor(userRoles) || isAdmin(userRoles))
						&&
							<ListItem 
								containerElement={
									<Link
										to="/pages"
										activeStyle={styles.link.activeStyle}
									/>
								}
								primaryText={contents["aghkZXZ-Tm9uZXISCxIHQ29udGVudCIFUGFnZXMM"] || "Pages"}
								leftIcon={<EditContent />}
							/>
					}
					{
						(user.type === "inHouse") && (isContentEditor(userRoles) || isAdmin(userRoles))
						&&
							<ListItem 
								containerElement={
									<Link
										to="/contents"
										activeStyle={styles.link.activeStyle}
									/>
								}
								primaryText={contents["aghkZXZ-Tm9uZXIVCxIHQ29udGVudCIIQ29udGVudHMM"] || "Contents"}
								leftIcon={<EditContent />}
							/>
					}
					{
						(user.type === "inHouse") && (isAdmin(userRoles))
						&&
							<ListItem 
								containerElement={
									<Link
										to="/tags"
										activeStyle={styles.link.activeStyle}
									/>
								}
								primaryText={contents["aghkZXZ-Tm9uZXIRCxIHQ29udGVudCIEVGFncww"] || "Tags"}
								leftIcon={<EditContent />}
							/>
					}
					{
						(user.type === "inHouse") && (isAdmin(userRoles))
						&&
							<ListItem 
								containerElement={
									<Link
										to="/roles"
										activeStyle={styles.link.activeStyle}
									/>
								}
								primaryText={contents["aghkZXZ-Tm9uZXISCxIHQ29udGVudCIFUm9sZXMM"] || "Roles"}
								leftIcon={<EditContent />}
							/>
					}
					{
						(user.type === "inHouse") && (isAdmin(userRoles))
						&&
							<ListItem 
								containerElement={
									<Link
										to="/roleTypes"
										activeStyle={styles.link.activeStyle}
									/>
								}
								primaryText={contents["aghkZXZ-Tm9uZXIXCxIHQ29udGVudCIKUm9sZSBUeXBlcww"] || "Role Types"}
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
						primaryText={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudCIHUHJvZmlsZQw"] || "Profile"}
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
						primaryText={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudCIHRGVtYW5kcww"] || "Demands"}
						leftIcon={<ListAction />} 
					/>
					<ListItem 
						containerElement={
							<Link
								to="/offers"
								activeStyle={styles.link.activeStyle}
							/>
						} 
						primaryText={contents["aghkZXZ-Tm9uZXITCxIHQ29udGVudCIGT2ZmZXJzDA"] || "Offers"}
						leftIcon={<ListAction />} 
					/>
					<ListItem 
						containerElement={
							<Link
								to="/servicepacks"
								activeStyle={styles.link.activeStyle}
							/>
						} 
						primaryText={contents["aghkZXZ-Tm9uZXIaCxIHQ29udGVudCINU2VydmljZSBQYWNrcww"] || "Service Packs"}
						leftIcon={<ListAction />} 
					/>
				</List>
				<Divider />
				<List>
					<ListItem
						primaryText={contents["aghkZXZ-Tm9uZXIXCxIHQ29udGVudCIKTmlnaHQgTW9kZQw"] || "Night Mode"}
						rightToggle={
							<Toggle
								toggled={cookies.get("theme") === "dark"}
								onToggle={() => changeTheme(cookies)}
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
						primaryText={contents["aghkZXZ-Tm9uZXIVCxIHQ29udGVudCIIU2V0dGluZ3MM"] || "Settings"}
						leftIcon={<Settings />} 
					/>
					<ListItem 
						containerElement={
							<Link
								to="/help"
								activeStyle={styles.link.activeStyle}
							/>
						} 
						primaryText={contents["aghkZXZ-Tm9uZXIRCxIHQ29udGVudCIESGVscAw"] || "Help"}
						leftIcon={<Help />} 
					/>
					<ListItem 
						containerElement={
							<Link
								to="/feedback"
								activeStyle={styles.link.activeStyle}
							/>
						} 
						primaryText={contents["aghkZXZ-Tm9uZXIVCxIHQ29udGVudCIIRmVlZGJhY2sM"] || "Feedback"}
						leftIcon={<Feedback />} 
					/>
				</List>
			</Drawer>
		)
	}
}

MyDrawer.propTypes = {
	contents: PropTypes.object.isRequired,
	cookies: instanceOf(Cookies).isRequired, 
	open: PropTypes.bool.isRequired,
	account: PropTypes.object,
	user: PropTypes.object,
	userRoles: PropTypes.object,
	userTags: PropTypes.object,
	accountLoggedGet: PropTypes.func.isRequired, 
	toggleDrawer: PropTypes.func.isRequired,
	changeTheme: PropTypes.func.isRequired
}

MyDrawer.muiName = "Drawer"

export default withCookies(MyDrawer)
