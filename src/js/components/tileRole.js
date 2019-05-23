import React from "react"
import PropTypes from "prop-types"
import {GridTile} from "material-ui/GridList"
import Chip from "material-ui/Chip"
import Avatar from "material-ui/Avatar"
import {blue300} from "material-ui/styles/colors"
import {firstLettersGenerate} from "./utilities"

const TileRole = ({role: {ID}, name, handleDelete}) => (
	<GridTile>
		<Chip 
			onRequestDelete={() => handleDelete(ID)}
		>
			<Avatar 
				size={32}
				color={blue300}
			>
				{firstLettersGenerate(name)}
			</Avatar>
			{name}
		</Chip>
	</GridTile>
)

TileRole.defaultProps = {
	name: ""
}

TileRole.propTypes = {
	role: PropTypes.object.isRequired, 
	name: PropTypes.string.isRequired, 
	handleDelete: PropTypes.func.isRequired
}

TileRole.muiName = "GridTile"

export default TileRole
