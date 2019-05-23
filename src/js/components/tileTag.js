import React from "react"
import PropTypes from "prop-types"
import {GridTile} from "material-ui/GridList"
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import {blue300} from "material-ui/styles/colors"
import {firstLettersGenerate} from "./utilities"

const TileTag = ({tag: {ID}, text, handleDelete}) => (
	<GridTile>
		<Chip 
			onRequestDelete={() => handleDelete(ID)}
		>
			<Avatar 
				size={32}
				color={blue300}
			>
				{firstLettersGenerate(text)}
			</Avatar>
			{text}
		</Chip>
	</GridTile>
)

TileTag.defaultProps = {
	text: ""
}

TileTag.propTypes = {
	tag: PropTypes.object.isRequired, 
	text: PropTypes.string.isRequired, 
	handleDelete: PropTypes.func.isRequired
}

TileTag.muiName = "GridTile"

export default TileTag
