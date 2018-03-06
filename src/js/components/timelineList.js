import React, {Component}  from "react"
import PropTypes from 'prop-types'
import {List, ListItem} from 'material-ui/List'
import Demand from "../components/demand"
import Offer from "../components/offer"
import ServicePack from "../components/servicePack"

class TimelineList extends Component {
	componentWillMount() {
		this.props.loadData()
	}
	render() {
		const {items} =  this.props 
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
						<h3>No Item</h3>
				}
			</List>
		)
	}
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
	items: PropTypes.array, 
	loadData: PropTypes.func.isRequired, 
}

TimelineList.muiName = 'List'

export default TimelineList
