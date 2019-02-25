import React from "react"
import PropTypes from "prop-types"
import {ListItem} from "material-ui/List"
import Link from "react-router/lib/Link"

const ListItemServicePack = ({ID, description}) => <ListItem
	containerElement={
		<Link
			to={`/servicePacks/${ID}`}
		/>
	}
>
	{description}
</ListItem>

ListItemServicePack.muiName = "ListItem"

ListItemServicePack.propTypes = {
	ID: PropTypes.string.isRequired
}

export default ListItemServicePack
