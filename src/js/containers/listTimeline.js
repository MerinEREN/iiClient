import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import ListTimelineComponent from "../components/listTimeline"
import itemsGet from "../middlewares/listTimeline"

const sortByLastModified = (is) => {
	// Return sorted items array here.
	// console.log(is)
	return is
}

function filterObjectsByKeys(pagination, entities) {
	const {
		demands: {timeline:{IDs: IDsD}}, 
		offers: {timeline:{IDs: IDsO}}, 
		servicePacks: {timeline:{IDs: IDsSp}}
	} = pagination
	const {
		demands, 
		offers, 
		servicePacks
	} = entities
	let aDs = []
	// If check is for undefined values of object[key].
	for (let ID of IDsD) {
		if (demands[ID]) {
			demands[ID].type = "demand"
			aDs.push(demands[ID])
		}
	}
	let aOs = []
	// If check is for undefined values of object[key].
	for (let ID of IDsO) {
		if (offers[ID]) {
			offers[ID].type = "offer"
			aOs.push(offers[ID])
		}
	}
	let aSps = []
	// If check is for undefined values of object[key].
	for (let ID of IDsSp) {
		if (ServicePacks[ID]) {
			ServicePacks[ID].type = "servicePack"
			aSps.push(ServicePacks[ID])
		}
	}
	return sortByLastModified([...aDs, ...aOs, ...aSps])
}

// Can use ownProps here.
const mapStateToProps = state => {
	const {
		pagination, 
		entitiesBuffered
	} = state
	return {
		uID: pagination.users.logged && pagination.users.logged.IDs[0], 
		items: filterObjectsByKeys(pagination, entitiesBuffered)
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		itemsGet
	},
	dispatch
)

// connect IS A MUST FOR INTERNAL dispatch !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const ListTimeline = connect(mapStateToProps, mapDispatchToProps)(ListTimelineComponent)

export default ListTimeline
