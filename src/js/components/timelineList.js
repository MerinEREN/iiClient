import React, {Component}  from "react"
import PropTypes from "prop-types"
import {List, ListItem} from "material-ui/List"
import Demand from "../components/listItemDemand"
import Offer from "../components/listItemOffer"
import ServicePack from "../components/listItemServicePack"

class TimelineList extends Component {
	componentWillMount() {
		const {
			uID, 
			getItems
		} = this.props
		getItems(uID, "timeline", null)
	}
	render() {
		const {
			contents, 
			items
		} =  this.props 
		return (
			<List>
				{
					items.length 
						?
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
						})
						:
						<h3>{contents["aghkZXZ-Tm9uZXIXCxIHQ29udGVudCIKTm8gQ29udGVudAw"] || "No Content"}</h3>
				}
			</List>
		)
	}
}

TimelineList.defaultProps = {
	contents: {}, 
	uID: ""
}

TimelineList.propTypes = {
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
	contents: PropTypes.object.isRequired, 
	items: PropTypes.array, 
	getItems: PropTypes.func.isRequired, 
	uID: PropTypes.string.isRequired
}

TimelineList.muiName = "List"

export default TimelineList
