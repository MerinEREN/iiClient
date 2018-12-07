import React from "react"
import PropTypes from "prop-types"
import {GridTile} from "material-ui/GridList"
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import {blue300} from "material-ui/styles/colors"
import {getFirstLetters} from "./utilities"

const RoleTypeTile = ({roleType: {ID}, handleDelete}) => (
	<GridTile>
		<Chip 
			onRequestDelete={() => handleDelete(ID)}
		>
			<Avatar 
				size={32}
				color={blue300}
			>
				{getFirstLetters(ID)}
			</Avatar>
			{ID}
		</Chip>
	</GridTile>
)

RoleTypeTile.propTypes = {
	roleType: PropTypes.object.isRequired, 
	handleDelete: PropTypes.func.isRequired
}

export default RoleTypeTile
