import React, {Component}  from "react"
import PropTypes from "prop-types"
import {List} from "material-ui/List"
import Demand from "../components/listItemDemand"
import Offer from "../components/listItemOffer"
import ServicePack from "../components/listItemServicePack"

class ListTimeline extends Component {
	componentWillReceiveProps(nextProps) {
		const {
			uID, 
			itemsGet
		} = this.props
		if (uID !== nextProps.uID)
			itemsGet(nextProps.uID, "timeline", null)
	}
	render() {
		const {
			contexts, 
			items
		} =  this.props 
		return (
			<List>
				{
					items.length ? 
						items.map((v, i) => {
							switch (v.type) {
								case "demand":
									return <Demand
										key={i}
										{...v}
									/>
								case "offer":
									return <Offer
										key={i}
										{...v}
									/>
								case "servicePack":
									return <ServicePack
										key={i}
										{...v}
									/>
							}
						}) : 
						<h3>{contexts["aghkZXZ-Tm9uZXIXCxIHQ29udGVudCIKTm8gQ29udGVudAw"] || "No Content"}</h3>
				}
			</List>
		)
	}
}

ListTimeline.defaultProps = {
	uID: ""
}

ListTimeline.propTypes = {
	/* items: PropTypes.objectOf(PropTypes.shape({
		offers: PropTypes.objectOf(PropTypes.shape({
			id: PropTypes.number.isRequired, 
			children: PropTypes.node.isRequired, 
			editable: PropTypes.bool.isRequired
		})),
		demands: PropTypes.objectOf(PropTypes.shape({
			id: PropTypes.number.isRequired, 
			children: PropTypes.node.isRequired, 
			editable: PropTypes.bool.isRequired
		}))
	})), */
	contexts: PropTypes.object.isRequired, 
	uID: PropTypes.string.isRequired, 
	items: PropTypes.array, 
	itemsGet: PropTypes.func.isRequired
}

ListTimeline.muiName = "List"

export default ListTimeline
