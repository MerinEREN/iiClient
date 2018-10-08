import React from "react"
import PropTypes from "prop-types"
import {GridTile} from "material-ui/GridList"
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import {blue300} from "material-ui/styles/colors"
import {getFirstLetters} from "./utilities"

const TagTile = ({tag: {ID}, name, handleDelete}) => (
	<GridTile>
		<Chip 
			onRequestDelete={() => handleDelete(ID)}
		>
			<Avatar 
				size={32}
				color={blue300}
			>
				{getFirstLetters(name)}
			</Avatar>
			{name}
		</Chip>
	</GridTile>
)

TagTile.propTypes = {
	tag: PropTypes.object.isRequired, 
	name: PropTypes.string, 
	handleDelete: PropTypes.func.isRequired
}

export default TagTile
