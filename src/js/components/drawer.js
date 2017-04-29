import React, {Component}  from "react"
import PropTypes from 'prop-types'
import {IndexLink, Link} from 'react-router'
import AppBar from 'material-ui/AppBar'
import Badge from 'material-ui/Badge'
import Drawer from 'material-ui/Drawer'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye'
import PersonAdd from 'material-ui/svg-icons/social/person-add'
import ContentLink from 'material-ui/svg-icons/content/link'
import ContentCopy from 'material-ui/svg-icons/content/content-copy'
import Download from 'material-ui/svg-icons/file/file-download'
import Delete from 'material-ui/svg-icons/action/delete'
import Toggle from 'material-ui/Toggle'
import Divider from 'material-ui/Divider'

const drawer = ({theme, acc, user, open, changeTheme, toggleDrawer}) => (
	<Drawer open={open}>
		<AppBar
			title="User Name"
			onLeftIconButtonTouchTap={() => 
					toggleDrawer()}
		/>
		<Menu>
			<MenuItem leftIcon={<RemoveRedEye />}>
				<IndexLink
					style={{
						textDecoration: 'none', 
						color: theme.value.
						palette.textColor
					}}
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
			<MenuItem 
				leftIcon={<PersonAdd />} 
				children={<Link
						style={{
							textDecoration: 'none', 
								color: theme.value.
							palette.textColor
						}}
						to={"/accounts/" + acc.ID}
						activeStyle={{
							textDecoration: 
							'none', 
							color: '#0097a7'
						}}
					>
						Account
					</Link>} 
			/>
			<MenuItem>
				<Link
					style={{
						textDecoration: 'none', 
						color: theme.value.
						palette.textColor
					}}
					to={"/" + acc.ID + "/Demands"}
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
					style={{
						textDecoration: 'none', 
						color: theme.value.
						palette.textColor
					}}
					to={"/" + acc.ID + "/Offers"}
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
					style={{
						textDecoration: 'none', 
						color: theme.value.
						palette.textColor
					}}
					to={"/" + acc.ID + "/ServicePacks"}
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
			defaultToggled={theme.ID === 'dark'}
			labelPosition='right'
			onToggle={() => changeTheme()}
			style={{margin: 20}}
		/>
		<Divider />
		<Menu>
			<MenuItem>
				<Link
					style={{
						textDecoration: 'none', 
						color: theme.value.
						palette.textColor
					}}
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
					style={{
						textDecoration: 'none', 
						color: theme.value.
						palette.textColor
					}}
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
					style={{
						textDecoration: 'none', 
						color: theme.value.
						palette.textColor
					}}
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
)

drawer.propTypes = {
	theme: PropTypes.object.isRequired,
	open: PropTypes.bool.isRequired,
	acc: PropTypes.object,
	user: PropTypes.object,
	changeTheme: PropTypes.func.isRequired,
	toggleDrawer: PropTypes.func.isRequired,
}

drawer.muiName = 'Drawer'

export default drawer

