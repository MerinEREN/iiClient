import React from "react"
import PropTypes from "prop-types"
import {GridTile} from "material-ui/GridList"
import Chip from "material-ui/Chip"
import Avatar from "material-ui/Avatar"
import {blue300} from "material-ui/styles/colors"
import {firstLettersGenerate} from "./utilities"

const TileRoleType = ({roleType: {ID}, handleDelete}) => (
	<GridTile>
		<Chip 
			onRequestDelete={() => handleDelete(ID)}
		>
			<Avatar 
				size={32}
				color={blue300}
			>
				{firstLettersGenerate(ID)}
			</Avatar>
			{ID}
		</Chip>
	</GridTile>
)

TileRoleType.propTypes = {
	roleType: PropTypes.object.isRequired, 
	handleDelete: PropTypes.func.isRequired
}

TileRoleType.muiName = "GridTile"

export default TileRoleType
