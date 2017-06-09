import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import Avatar from 'material-ui/Avatar'
import MenuItem from 'material-ui/MenuItem'
import {Card, CardHeader} from 'material-ui/Card'
import Divider from 'material-ui/Divider'
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left'
import Language from 'material-ui/svg-icons/action/language'
import SignOut from 'material-ui/svg-icons/action/exit-to-app'

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
		boxShadow: 'none'
	}, 
	cardHeader: {
		textStyle: {
			paddingRight: 0
		}
	}, 
	a: {
		textDecoration: 'none'
	}
}

const Logged = ({acc, user, signOutURL}) => (
	<IconMenu
		iconButtonElement={
			<IconButton 
				style= {styles.iconButton}
			>
				<Avatar src={user.photo.path || 'img/adele.jpg'} />
			</IconButton>
		}
		targetOrigin={{horizontal: 'right', vertical: 'top'}}
		anchorOrigin={{horizontal: 'right', vertical: 'top'}}
		listStyle={styles.iconMenu.listStyle}
	>
		<Card style={styles.card}>
			<CardHeader
				title={acc.ID}
				subtitle={user.email}
				textStyle={styles.cardHeader.textStyle}
				avatar={user.photo.path || 'img/adele.jpg'}
			/>
		</Card>
		<Divider style={styles.divider} />
		<MenuItem 
			primaryText="Language" 
			leftIcon={<ChevronLeft />}
			rightIcon={<Language />}
			menuItems={[
				<MenuItem primaryText="Turkish" />, 
				<MenuItem primaryText="English" />, 
				<MenuItem primaryText="German" />
			]}
		/>
		<a 
			href={signOutURL.value}
			style={styles.a}
		>
			<MenuItem 
				primaryText="Sign Out"
				insetChildren={true}
				rightIcon={<SignOut />}
			/>
		</a>
	</IconMenu>
)

Logged.propTypes = {
	user: PropTypes.object.isRequired, 
	acc: PropTypes.object.isRequired, 
	signOutURL: PropTypes.object.isRequired
}

// My custom 'Logged' component acts like 'IconMenu' mui component !!!!!!!!!!!!!!!!!!!!!!!
Logged.muiName = 'IconMenu'

export default Logged
