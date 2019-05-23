import React from "react"
import PropTypes from "prop-types"
import {ListItem} from "material-ui/List"
import Link from "react-router/lib/Link"

const ListItemOffer = ({ID, description}) => <ListItem
	containerElement={
		<Link
			to={`/offers/${ID}`}
		/>
	}
>
	{description}
</ListItem>

ListItemOffer.muiName = "ListItem"

ListItemOffer.propTypes = {
	ID: PropTypes.string.isRequired, 
	description: PropTypes.string.isRequired
}

export default ListItemOffer
