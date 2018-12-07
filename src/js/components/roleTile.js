import React from "react"
import PropTypes from "prop-types"
import {GridTile} from "material-ui/GridList"
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import {blue300} from "material-ui/styles/colors"
import {getFirstLetters} from "./utilities"

const RoleTile = ({role: {ID}, text, handleDelete}) => (
	<GridTile>
		<Chip 
			onRequestDelete={() => handleDelete(ID)}
		>
			<Avatar 
				size={32}
				color={blue300}
			>
				{getFirstLetters(text)}
			</Avatar>
			{text}
		</Chip>
	</GridTile>
)

RoleTile.propTypes = {
	role: PropTypes.object.isRequired, 
	text: PropTypes.string, 
	handleDelete: PropTypes.func.isRequired
}

export default RoleTile
