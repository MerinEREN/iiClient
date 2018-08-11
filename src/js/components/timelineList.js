import React, {Component}  from "react"
import PropTypes from 'prop-types'
import {List, ListItem} from 'material-ui/List'
import Demand from "../components/demand"
import Offer from "../components/offer"
import ServicePack from "../components/servicePack"

class TimelineList extends Component {
	componentWillReceiveProps(nextProps) {
		if (nextProps.uID !== this.props.uID) {
			this.props.getItems(nextProps.uID, "timeline")
		}
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
								case 'demand':
									return <Demand
										key={v.ID}
										index={i}
										{...v}
										remove={() => remove(v.ID)}
									/>
								case 'offer':
									return <Offer
										key={v.ID}
										index={i}
										{...v}
										remove={() => remove(v.ID)}
									/>
								case 'servicePack':
									return <ServicePack
										key={v.ID}
										index={i}
										{...v}
										remove={() => remove(v.ID)}
									/>
							}
						})
						:
						<h3>{contents["aghkZXZ-Tm9uZXIUCxIHQ29udGVudBiAgICAgI6lCgw"]}</h3>
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

TimelineList.muiName = 'List'

export default TimelineList
