import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router'
import IconMenu from 'material-ui/IconMenu'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'

const Logged = () => (
			<IconMenu
				iconButtonElement={
					<IconButton><MoreVertIcon /></IconButton>
				}
				targetOrigin={{horizontal: 'right', vertical: 'top'}}
				anchorOrigin={{horizontal: 'right', vertical: 'top'}}
			>
				{/* GET THOSE ITEMS FROM PROPS */}
				<MenuItem primaryText="Refresh" />
				<MenuItem primaryText="Help" />
				<MenuItem children={
					<a 
						style={{textDecoration: 'none'}}
								href="logout/"
								activeStyle={{
									textDecoration: 
									'none', 
									color: '#0097a7'
								}}
							>
								Logout
							</a>
				}
			/>
		</IconMenu>
			)

// My custom 'Logged' component acts like 'IconMenu' mui component !!!!!!!!!!!!!!!!!!!!!!!
Logged.muiName = 'IconMenu'

export default Logged
