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
					{getFirstLetters(contents[v.name])}
				</Avatar>
				{contents[v.name]}
			</GridTile>
		)
	}
	render() {
		const {
			contents, 
			cookies, 
			user, 
			account, 
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
									title={`${contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgIabCAw"]}: 4`} 
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
								primaryText={`${contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgJa9Cgw"]}: 4`} 
								disabled={true}
							/>
							<ListItem 
								leftIcon={<Time />} 
								primaryText={`${contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgJa9CQw"]}: 3`} 
								disabled={true}
							/>
							<ListItem 
								leftIcon={<Communication />} 
								primaryText={`${contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgJa9Cww"]}: 5`} 
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
						primaryText={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgJq3Cgw"]}
						leftIcon={<Home />}
					/>
					<ListItem 
						containerElement={
							<Link
								to="/dashboard"
								activeStyle={styles.link.activeStyle}
							/>
						}
						primaryText={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLrHCAw"]}
						leftIcon={<Dashboard />}
					/>
					{
						// Also chack account type here.
						(isContentEditor(user.roles) || isAdmin(user.roles))
							&&
							<ListItem 
								containerElement={
									<Link
										to="/languages"
										activeStyle={styles.link.activeStyle}
									/>
								}
								primaryText={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLqHCgw"]}
								leftIcon={<EditContent />}
							/>
					}
					{
						// Also chack account type here.
						(isContentEditor(user.roles) || isAdmin(user.roles))
							&&
							<ListItem 
								containerElement={
									<Link
										to="/pages"
										activeStyle={styles.link.activeStyle}
									/>
								}
								primaryText={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLqHCQw"]}
								leftIcon={<EditContent />}
							/>
					}
					{
						// Also chack account type here.
						(isContentEditor(user.roles) || isAdmin(user.roles))
							&&
							<ListItem 
								containerElement={
									<Link
										to="/contents"
										activeStyle={styles.link.activeStyle}
									/>
								}
								primaryText={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLqHCww"]}
								leftIcon={<EditContent />}
							/>
					}
					{
						(isAdmin(user.roles))
							&&
							<ListItem 
								containerElement={
									<Link
										to="/tags"
										activeStyle={styles.link.activeStyle}
									/>
								}
								primaryText={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgK6ZCgw"]}
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
						primaryText={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLrHCgw"]}
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
						primaryText={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLqnCww"]}
						leftIcon={<ListAction />} 
					/>
					<ListItem 
						containerElement={
							<Link
								to="/offers"
								activeStyle={styles.link.activeStyle}
							/>
						} 
						primaryText={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgLrnCQw"]}
						leftIcon={<ListAction />} 
					/>
					<ListItem 
						containerElement={
							<Link
								to="/servicepacks"
								activeStyle={styles.link.activeStyle}
							/>
						} 
						primaryText={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgIarCgw"]}
						leftIcon={<ListAction />} 
					/>
				</List>
				<Divider />
				<List>
					<ListItem
						primaryText={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgIbrCgw"]}
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
						primaryText={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgIarCQw"]}
						leftIcon={<Settings />} 
					/>
					<ListItem 
						containerElement={
							<Link
								to="/help"
								activeStyle={styles.link.activeStyle}
							/>
						} 
						primaryText={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgIbrCQw"]}
						leftIcon={<Help />} 
					/>
					<ListItem 
						containerElement={
							<Link
								to="/feedback"
								activeStyle={styles.link.activeStyle}
							/>
						} 
						primaryText={contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgIbrCww"]}
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
	userTags: PropTypes.object,
	accountLoggedGet: PropTypes.func.isRequired, 
	toggleDrawer: PropTypes.func.isRequired,
	changeTheme: PropTypes.func.isRequired
}

MyDrawer.muiName = "Drawer"

export default withCookies(MyDrawer)
