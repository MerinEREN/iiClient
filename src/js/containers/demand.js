import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import DemandComponent from "../components/demand"
import photosGet from "../middlewares/photos"
import tagsDemandGet from "../middlewares/tagsDemand"
import tagsGet from "../middlewares/tags"
import offersGet from "../middlewares/offers"
import demandGet, {demandDelete} from "../middlewares/demand"
import {filterAnObjectByKeys} from "../middlewares/utilities"

const mapStateToProps = (state, ownProps) => {
	const {
		pagination: {
			contexts: {demand}, 
			photos: photosPagination, 
			tags: tagsPagination, 
			offers: offersPagination, 
			roles: rolesPagination, 
			users: usersPagination, 
			account: accountPagination
		}, 
		entitiesBuffered: {
			contexts, 
			photos, 
			tags, 
			offers, 
			demands, 
			roles
		}
	} = state
	return {
		contexts: demand && filterAnObjectByKeys(contexts, demand.IDs), 
		photosDemand: photosPagination[ownProps.params.ID] && 
		filterAnObjectByKeys(photos, photosPagination[ownProps.params.ID].IDs), 
		tagsDemand: tagsPagination[ownProps.params.ID] && 
		filterAnObjectByKeys(tags, tagsPagination[ownProps.params.ID].IDs), 
		tagsPagination, 
		tags, 
		offersDemand: offersPagination[ownProps.params.ID] && 
		filterAnObjectByKeys(offers, offersPagination[ownProps.params.ID].IDs), 
		demand: demands[ownProps.params.ID], 
		userID: usersPagination.logged && usersPagination.logged.IDs[0], 
		accountID: accountPagination.logged && accountPagination.logged.IDs[0],  
		rolesUser: (
			usersPagination.logged && 
			rolesPagination[usersPagination.logged.IDs[0]]
		) && 
		filterAnObjectByKeys(roles, rolesPagination[usersPagination.logged.IDs[0].IDs])
	}
}

const mapDispatchToProps = dispatch => bindActionCreators(
	{
		photosGet, 
		tagsDemandGet, 
		tagsGet, 
		offersGet, 
		demandGet, 
		demandDelete
	},
	dispatch
)

const Demand = connect(mapStateToProps, mapDispatchToProps)(DemandComponent)

export default Demand
