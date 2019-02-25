import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import TimelineListComponent from "../components/timelineList"
import getItems from "../middlewares/timelineList"

const sortByLastModified = (is) => {
	// Return sorted items array here.
	// console.log(is)
	return is
}

function getItemsFromEntities(pagination, entities) {
	const pds = pagination.demands.timeline
	const pos = pagination.offers.timeline
	const psps = pagination.servicePacks.timeline
	const {
		demands, 
		offers, 
		servicePacks
	} = entities
	let tds = []
	// Second condition is for "DELETE" requests, 
	// entity is been removed by "request action" but pagination ID of the entity is 
	// been removed by "success action". \
	// And this couses "undefined objects type assertion" problem.
	if(pds) {
		for (let ID of pds.IDs) {
			if (demands.timeline[ID]) {
				demands.timeline[ID].type = "demand"
				tds.push(demands.timeline[ID])
			}
		}
	}
	let tos = []
	// Second condition is for "DELETE" requests, 
	// entity is been removed by "request action" but pagination ID of the entity is 
	// been removed by "success action". \
	// And this couses "undefined objects type assertion" problem.
	if(pos) {
		for (let ID of pos.IDs) {
			if (offers.timeline[ID]) {
				offers.timeline[ID].type = "offer"
				tos.push(offers.timeline[ID])
			}
		}
	}
	let tsps = []
	// Second condition is for "DELETE" requests, 
	// entity is been removed by "request action" but pagination ID of the entity is 
	// been removed by "success action". \
	// And this couses "undefined objects type assertion" problem.
	if(psps) {
		for (let ID of psps.IDs) {
			if (ServicePacks.timeline[ID]) {
				servicePacks.timeline[ID].type = "servicePack"
				tsps.push(servicePacks.timeline[ID])
			}
		}
	}
	return sortByLastModified([...tds, ...tos, ...tsps])
}

// Can use ownProps here.
const mapStateToProps = state => {
	const {
		entitiesBuffered, 
		pagination, 
		ui:{contentsByPage: {timeline: contents}}
	} = state
	return {
		contents, 
		items: getItemsFromEntities(pagination, entitiesBuffered), 
		uID: entitiesBuffered.userLogged.ID
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		getItems
	},
	dispatch
)

// connect IS A MUST FOR INTERNAL dispatch !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const TimelineList = connect(mapStateToProps, mapDispatchToProps)(TimelineListComponent)

export default TimelineList
