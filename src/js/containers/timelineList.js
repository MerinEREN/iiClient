import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import TimelineListComponent from '../components/timelineList'
import loadData from '../middlewares/timelineList'

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
	if(pds) {
		for (let ID of pds.IDs) {
			demands.byID[ID].type = 'demand'
			tds.push(demands[ID])
		}
	}
	let tos = []
	if(pos) {
		for (let ID of pos.IDs) {
			offers.byID[ID].type = 'offer'
			tos.push(offers[ID])
		}
	}
	let tsps = []
	if(psps) {
		for (let ID of psps.IDs) {
			servicePacks.byID[ID].type = 'servicePack'
			tsps.push(servicePacks[ID])
		}
	}
	return sortByLastModified([...tds, ...tos, ...tsps])
}

// Can use ownProps here.
const mapStateToProps = state => {
	const {
		entities, 
		pagination
	} = state
	return {
		items: getItemsFromEntities(pagination, entities)
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		loadData
	},
	dispatch
)

// connect IS A MUST FOR INTERNAL dispatch !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const TimelineList = connect(mapStateToProps, mapDispatchToProps)(TimelineListComponent)

export default TimelineList
