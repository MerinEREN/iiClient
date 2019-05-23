import React from "react"
import PropTypes from "prop-types"
import {ListItem} from "material-ui/List"
import Link from "react-router/lib/Link"

const ListItemDemand = ({ID, description}) => <ListItem
	containerElement={
		<Link
			to={`/demands/${ID}`}
		/>
	}
>
	{description}
</ListItem>

ListItemDemand.muiName = "ListItem"

ListItemDemand.propTypes = {
	ID: PropTypes.string.isRequired, 
	description: PropTypes.string.isRequired
}

export default ListItemDemand
