import React, {Component}  from "react"
import PropTypes, {instanceOf} from 'prop-types'
import {Cookies, withCookies} from 'react-cookie'
import {IndexLink, Link} from 'react-router'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import {List, ListItem} from 'material-ui/List'
import {Card, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import {GridList, GridTile} from 'material-ui/GridList'
import Badge from 'material-ui/Badge'
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import Toggle from 'material-ui/Toggle'
import Divider from 'material-ui/Divider'
import Skills from 'material-ui/svg-icons/action/build'
import Time from 'material-ui/svg-icons/action/alarm'
import Communication from 'material-ui/svg-icons/action/record-voice-over'
import Account from 'material-ui/svg-icons/action/account-circle'
import Dashboard from 'material-ui/svg-icons/action/dashboard'
import Home from 'material-ui/svg-icons/action/home'
import EditContent from 'material-ui/svg-icons/content/create'
import ListAction from 'material-ui/svg-icons/action/list'
import Settings from 'material-ui/svg-icons/action/settings'
import AccountSettings from 'material-ui/svg-icons/action/supervisor-account'
import UserSettings from 'material-ui/svg-icons/social/person'
import Help from 'material-ui/svg-icons/action/help'
import Feedback from 'material-ui/svg-icons/action/feedback'
import {isAdmin, isContentEditor} from './utilities'

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
				color: '#0097a7'
		}
	}
}

const drawer = ({cookies, acc, user, open, changeTheme, toggleDrawer}) => (
	<Drawer 
		open={open}
		containerStyle={styles.drawer.containerStyle}
	>
		<AppBar
			title={user.email}
			onLeftIconButtonTouchTap={() => 
					toggleDrawer()}
		/>
		{/*ADD ALL NECESSARY ACCOUNT INFO IN CARD !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!*/}
		<Card
			containerStyle={styles.card.containerStyle}
		>
			{/* BECAUSE OF 'CardMedia' 'actAsExpander' BUG I WRAPPED IT WITH
			'CardTitle'. AND THE BEST WAY TO USE THE FEAUTURE IS USING IT WITH
			'CardTitle' IN 'overlay' AT 'CardMedia'. */}
			<CardTitle 
				actAsExpander={true}
				style={styles.cardTitle.style}
			>
				<CardMedia
					overlay={
						<CardTitle 
							title={acc.ID} 
							subtitle={'Score: 4'} 
						/>
					}
				>
					<img src={acc.photo.path || 'img/matrix.gif'} />
				</CardMedia>
			</CardTitle>
			<CardText expandable={true}>
				<List>
					<ListItem 
						leftIcon={<Skills />} 
						primaryText={'Skills: 4'} 
						disabled={true}
					/>
					<ListItem 
						leftIcon={<Time />} 
						primaryText={'Timing: 3'} 
						disabled={true}
					/>
					<ListItem 
						leftIcon={<Communication />} 
						primaryText={'Communication: 5'} 
						disabled={true}
					/>
				</List>
				<Divider />
				<GridList 
					cols={1} 
					cellHeight='auto' 
					style={styles.gridList}
				>
					<GridTile>
						<Chip>
							<Avatar size={32}>
								WD
							</Avatar>
							Web Development
						</Chip>
					</GridTile>
					<GridTile>
						<Chip>
							<Avatar size={32}>
								G
							</Avatar>
							Golang
						</Chip>
					</GridTile>
					<GridTile>
						<Chip>
							<Avatar size={32}>
								R
							</Avatar>
							React
						</Chip>
					</GridTile>
					<GridTile>
						<Chip>
							<Avatar size={32}>
								R
							</Avatar>
							Redux
						</Chip>
					</GridTile>
					<GridTile>
						<Chip>
							<Avatar size={32}>
								GC
							</Avatar>
							Google Cloud
						</Chip>
					</GridTile>
					<GridTile>
						<Chip>
							<Avatar size={32}>
								GAE
							</Avatar>
							Google App Engine
						</Chip>
					</GridTile>
				</GridList>
			</CardText>
		</Card>
		<List>
			{/* Only show if not at root URL.*/}
			<ListItem 
				containerElement={
					<IndexLink
						to="/"
						activeStyle={styles.link.activeStyle}
					/>
				}
				primaryText='Home'
				leftIcon={<Home />}
			/>
			<ListItem 
				containerElement={
					<IndexLink
						to="/dashboard"
						activeStyle={styles.link.activeStyle}
					/>
				}
				primaryText='Dashboard'
				leftIcon={<Dashboard />}
			/>
			{
				// Also chack account type here.
				(isContentEditor(user.roles) || isAdmin(user.roles))
				&&
				<ListItem 
					containerElement={
						<Link
							to="/languages/"
							activeStyle={styles.link.activeStyle}
						/>
					}
					primaryText='Languages'
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
							to="/pages/"
							activeStyle={styles.link.activeStyle}
						/>
					}
					primaryText='Pages'
					leftIcon={<EditContent />}
				/>
			}
			<ListItem 
				containerElement={
					<Link
						to={"/accounts/" + acc.ID}
						activeStyle={styles.link.activeStyle}
					/>
				} 
				primaryText='Account'
				leftIcon={<Account />} 
			/>
			<ListItem 
				containerElement={
					<Link
						// add if at accounts page control to
						// attribute 'to'
						// to={condition ? '/Demands/' : `/${acc.ID}/Demands/`}
						to="/demands/"
						activeStyle={styles.link.activeStyle}
					/>
				} 
				primaryText='Demands'
				leftIcon={<ListAction />} 
			/>
			<ListItem 
				containerElement={
					<Link
						to="/offers/"
						activeStyle={styles.link.activeStyle}
					/>
				} 
				primaryText='Offers'
				leftIcon={<ListAction />} 
			/>
			<ListItem 
				containerElement={
					<Link
						to="/servicePacks/"
						activeStyle={styles.link.activeStyle}
					/>
				} 
				primaryText='Service Packs'
				leftIcon={<ListAction />} 
			/>
		</List>
		<Divider />
		<List>
			<ListItem
				primaryText='Night Mode'
				rightToggle={
					<Toggle
						defaultToggled={cookies.get('theme') === 'dark'}
						onToggle={() => changeTheme(cookies)}
					/>
				}
			/>
		</List>
		<Divider />
		<List>
			{
				// Also chack account type here.
				isAdmin(user.roles)
				?
				<ListItem 
					primaryText='Settings'
					leftIcon={<Settings />} 
					nestedItems={[
						<ListItem 
							key={1} 
							containerElement={
								<Link
									to="/accountSettings"
									activeStyle={styles.link.activeStyle}
								/>
							} 
							primaryText='Account Settings'
							leftIcon={<AccountSettings />} 
						/>, 
						<ListItem 
							key={2} 
							containerElement={
								<Link
									to="/userSettings"
									activeStyle={styles.link.activeStyle}
								/>
							} 
							primaryText='User Settings'
							leftIcon={<UserSettings />} 
						/>
					]}
					primaryTogglesNestedList={true}
				/>
				:
				<ListItem 
					containerElement={
						<Link
							to="/settings"
							activeStyle={styles.link.activeStyle}
						/>
					} 
					primaryText='Settings'
					leftIcon={<Settings />} 
				/>
			}
			<ListItem 
				containerElement={
					<Link
						to="/help"
						activeStyle={styles.link.activeStyle}
					/>
				} 
				primaryText='Help'
				leftIcon={<Help />} 
			/>
			<ListItem 
				containerElement={
					<Link
						to="/feedback"
						activeStyle={styles.link.activeStyle}
					/>
				} 
				primaryText='Send Feedback'
				leftIcon={<Feedback />} 
			/>
		</List>
	</Drawer>
)

drawer.propTypes = {
	cookies: instanceOf(Cookies).isRequired, 
	open: PropTypes.bool.isRequired,
	acc: PropTypes.object,
	user: PropTypes.object,
	changeTheme: PropTypes.func.isRequired,
	toggleDrawer: PropTypes.func.isRequired,
}

drawer.muiName = 'Drawer'

export default withCookies(drawer)
